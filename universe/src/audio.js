// Narration uses supplied recordings when present, otherwise the browser's voice.
// No network request is made for recordings that were not shipped with the site.
export class CosmicAudio {
  ctx = null;
  musicGain = null;
  music = false;
  effects = false;
  zh = false;
  en = false;
  speaking = false;
  paused = false;
  generation = 0;
  player = new Audio();
  fallbackSpeaking = false;
  utterance = null;

  constructor(notify, epochs) {
    this.notify = notify;
    this.epochs = epochs;
    this.player.id = 'narration-audio';
    this.player.preload = 'none';
    this.player.hidden = true;
    document.body.appendChild(this.player);
    this.player.onplaying = () => { this.player.dataset.state = 'playing'; };
    this.player.onpause = () => { this.player.dataset.state = 'paused'; };
  }

  get available() {
    return !!window.__COSMIC_AUDIO__ ||
      ('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window);
  }

  init() {
    if (this.ctx) {
      this.ctx.resume().catch(() => {});
      return;
    }
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.value = 0;
      this.musicGain.connect(this.ctx.destination);
      [55, 82.4069, 110, 164.8138, 220.3].forEach((frequency, index) => {
        const tone = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        tone.type = 'sine';
        tone.frequency.value = frequency;
        gain.gain.value = .035 / (1 + index * .5);
        tone.connect(gain);
        gain.connect(this.musicGain);
        tone.start();
        const modulation = this.ctx.createOscillator();
        const depth = this.ctx.createGain();
        modulation.frequency.value = .035 + index * .009;
        depth.gain.value = .007 / (index + 1);
        modulation.connect(depth);
        depth.connect(gain.gain);
        modulation.start();
      });
    } catch {
      this.notify('此浏览器无法启动背景音频 / Audio is unavailable.');
    }
  }

  setMusic(enabled) {
    this.init();
    this.music = enabled;
    this.updateVolume();
  }

  updateVolume() {
    if (this.ctx && this.musicGain) {
      this.musicGain.gain.setTargetAtTime(
        this.music && !this.paused ? (this.speaking ? .24 : .65) : 0,
        this.ctx.currentTime, .65
      );
    }
  }

  chime(epoch) {
    if (!this.effects || this.paused) return;
    this.init();
    if (!this.ctx) return;
    const tone = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;
    tone.type = 'sine';
    tone.frequency.setValueAtTime(130.81 * Math.pow(2, epoch / 12), now);
    tone.frequency.exponentialRampToValueAtTime(65.4, now + 2.2);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(.065, now + .06);
    gain.gain.exponentialRampToValueAtTime(.0001, now + 2.5);
    tone.connect(gain);
    gain.connect(this.ctx.destination);
    tone.start();
    tone.stop(now + 2.6);
  }

  cancel() {
    this.generation++;
    this.player.onended = null;
    this.player.onerror = null;
    this.player.pause();
    if (this.utterance) this.utterance.onend = this.utterance.onerror = null;
    if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    this.utterance = null;
    this.fallbackSpeaking = false;
    this.speaking = false;
    this.updateVolume();
  }

  narrate(epoch) {
    this.cancel();
    if (!this.zh && !this.en) return;
    const generation = this.generation;
    const languages = ['zh', 'en'].filter(language => this[language]);
    const number = String(this.epochs.indexOf(epoch) + 1).padStart(2, '0');
    const next = () => {
      if (generation !== this.generation) return;
      const language = languages.shift();
      if (!language) {
        this.speaking = false;
        this.updateVolume();
        return;
      }
      this.speaking = true;
      this.updateVolume();
      this.player.dataset.language = language;
      const text = language === 'zh' ? epoch.zhVoice : epoch.enVoice;
      const recording = window.__COSMIC_AUDIO__?.[`${number}-${language}`];
      let settled = false;
      const finish = () => {
        if (settled || generation !== this.generation) return;
        settled = true;
        this.player.onended = this.player.onerror = null;
        this.fallbackSpeaking = false;
        this.utterance = null;
        next();
      };
      let usingSpeech = false;
      const speak = () => {
        if (settled || usingSpeech || generation !== this.generation) return;
        usingSpeech = true;
        this.player.onended = this.player.onerror = null;
        this.player.pause();
        this.speakFallback(text, language, generation, finish);
      };
      if (recording) {
        this.player.src = recording;
        this.player.onended = finish;
        this.player.onerror = speak;
        this.player.play().catch(speak);
      } else {
        speak();
      }
    };
    next();
  }

  speakFallback(text, language, generation, finish) {
    if (!('speechSynthesis' in window && 'SpeechSynthesisUtterance' in window)) {
      this.notify('当前浏览器不支持解说，请使用字幕 / Narration is unavailable.');
      finish();
      return;
    }
    this.fallbackSpeaking = true;
    const utterance = new SpeechSynthesisUtterance(text);
    this.utterance = utterance;
    utterance.lang = language === 'zh' ? 'zh-CN' : 'en-US';
    const voices = window.speechSynthesis.getVoices();
    const voice = voices.find(item => item.lang === utterance.lang) ||
      voices.find(item => item.lang.toLowerCase().startsWith(language));
    if (voice) utterance.voice = voice;
    utterance.rate = .9;
    utterance.pitch = .86;
    utterance.volume = .9;
    utterance.onend = finish;
    utterance.onerror = () => {
      if (generation !== this.generation) return;
      this.notify('当前设备无法播放此语言的解说，字幕与动画继续播放。 / Narration unavailable; subtitles and animation continue.');
      finish();
    };
    window.speechSynthesis.speak(utterance);
  }

  pause() {
    this.paused = true;
    this.player.pause();
    if (this.fallbackSpeaking && 'speechSynthesis' in window) window.speechSynthesis.pause();
    this.updateVolume();
  }

  resume() {
    this.paused = false;
    this.init();
    if (this.speaking) {
      if (this.fallbackSpeaking && 'speechSynthesis' in window) window.speechSynthesis.resume();
      else this.player.play().catch(() => this.notify('请再次点击播放以启用解说。'));
    }
    this.updateVolume();
  }
}
