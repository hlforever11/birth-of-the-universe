import test from 'node:test';
import assert from 'node:assert/strict';
import { CosmicAudio, createMusicBuffer, createEffectBuffer } from '../src/audio.js';

class Param {
  value = 0;
  cancelScheduledValues() {}
  setValueAtTime(value) { this.value = value; }
  linearRampToValueAtTime(value) { this.value = value; }
  setTargetAtTime(value) { this.value = value; }
}
class AudioNode {
  gain = new Param();
  stopped = false;
  starts = [];
  connect() {}
  disconnect() {}
  start(...args) { this.starts.push(args); }
  stop() { this.stopped = true; }
}
class Context {
  state = 'suspended'; currentTime = 0; destination = {}; sources = [];
  resume() { this.state = 'running'; return Promise.resolve(); }
  createGain() { return new AudioNode(); }
  createBufferSource() { const node = new AudioNode(); this.sources.push(node); return node; }
  createBuffer(channels, length, rate) {
    const data = Array.from({length:channels}, () => new Float32Array(length));
    return { duration:length/rate, numberOfChannels:channels, getChannelData:channel => data[channel] };
  }
}
const epochs = [{zhVoice:'这是第一句。这是第二句。', enVoice:'This is sentence one. This is sentence two.'}];
function setup(t, voices = [{lang:'zh-CN', localService:true}, {lang:'en-US', localService:true}]) {
  const synth = {
    voices, paused:false, spoken:[], listeners:new Set(), cancellations:0,
    getVoices(){return this.voices;},
    cancel(){this.cancellations++;}, pause(){this.paused=true;}, resume(){this.paused=false;},
    speak(utterance){this.spoken.push(utterance);utterance.onstart?.();},
    addEventListener(name,listener){this.listeners.add(listener);},
    removeEventListener(name,listener){this.listeners.delete(listener);},
    emitVoices(){for(const listener of [...this.listeners])listener();}
  };
  globalThis.Audio = class {dataset={};src='';pause(){}play(){return Promise.resolve();}};
  globalThis.SpeechSynthesisUtterance = class {constructor(text){this.text=text;}};
  globalThis.window={speechSynthesis:synth,SpeechSynthesisUtterance,AudioContext:Context};
  globalThis.document={body:{appendChild(){}}};
  const messages=[],audio=new CosmicAudio(message=>messages.push(message),epochs);
  t.after(()=>{audio.cancel();audio.pause();});
  return {audio,synth,messages};
}

test('switching from Chinese to English stops old speech and ignores late callbacks', t=>{
  const {audio,synth}=setup(t);
  audio.setNarrationMode('zh');audio.narrate(epochs[0]);
  const old=synth.spoken[0],lateEnd=old.onend;
  audio.setNarrationMode('en');audio.narrate(epochs[0]);
  assert.equal(synth.spoken.at(-1).lang,'en-US');
  const count=synth.spoken.length;lateEnd();assert.equal(synth.spoken.length,count);
  audio.setNarrationMode('off');assert.equal(audio.speaking,false);assert.equal(audio.queue.length,0);
});

test('pausing then changing language resumes only the newly selected language', t=>{
  const {audio,synth}=setup(t);
  audio.setNarrationMode('zh');audio.narrate(epochs[0]);audio.pause();assert.equal(synth.paused,true);
  audio.setNarrationMode('en');assert.equal(synth.paused,false);
  const count=synth.spoken.length;audio.narrate(epochs[0]);assert.equal(synth.spoken.length,count);
  audio.resume();audio.narrate(epochs[0]);assert.equal(synth.spoken.at(-1).lang,'en-US');assert.equal(synth.paused,false);
});

test('bilingual mode speaks all Chinese sentences then English, without duplication', t=>{
  const {audio,synth}=setup(t);audio.setNarrationMode('both');audio.narrate(epochs[0]);
  for(let i=0;i<4;i++)synth.spoken[i].onend();
  assert.deepEqual(synth.spoken.map(u=>u.lang),['zh-CN','zh-CN','en-US','en-US']);
  assert.equal(audio.speaking,false);assert.equal(audio.status.state,'complete');
});

test('asynchronously loaded voices use the newest language selection', t=>{
  const {audio,synth}=setup(t,[]);audio.setNarrationMode('zh');audio.narrate(epochs[0]);
  audio.setNarrationMode('en');audio.narrate(epochs[0]);
  synth.voices=[{lang:'zh-CN'},{lang:'EN_us'}];synth.emitVoices();
  assert.equal(synth.spoken.length,1);assert.equal(synth.spoken[0].voice.lang,'EN_us');assert.equal(synth.listeners.size,0);
});

test('a missing language never borrows a voice of the wrong language or blocks the timeline', t=>{
  const {audio,synth}=setup(t,[{lang:'en-US'}]);audio.setNarrationMode('zh');audio.narrate(epochs[0]);
  assert.equal(synth.spoken.length,0);assert.equal(audio.speaking,false);assert.equal(audio.status.state,'unavailable');
});

test('a silent speech-engine failure times out and releases playback', t=>{
  t.mock.timers.enable({apis:['setTimeout']});
  const {audio,synth}=setup(t);synth.speak=function(u){this.spoken.push(u);};
  audio.setNarrationMode('zh');audio.narrate(epochs[0]);t.mock.timers.tick(6001);
  assert.equal(audio.speaking,false);assert.equal(audio.status.state,'unavailable');
});

test('pausing a sentence suspends its timeout and resumes it without restarting', t=>{
  t.mock.timers.enable({apis:['setTimeout']});
  const {audio,synth}=setup(t);audio.setNarrationMode('zh');audio.narrate(epochs[0]);audio.pause();
  t.mock.timers.tick(120000);assert.equal(audio.speaking,true);
  audio.resume();assert.equal(synth.spoken.length,1);assert.equal(synth.paused,false);
  synth.spoken[0].onend();assert.equal(synth.spoken.length,2);
});

test('turning music off while audio activation is pending never starts a stale loop', async t=>{
  const {audio}=setup(t);let release;
  audio.ctx=new Context();audio.ctx.resume=()=>new Promise(resolve=>{release=()=>{audio.ctx.state='running';resolve();};});
  audio.musicGain=new AudioNode();audio.effectsGain=new AudioNode();
  const pending=audio.setMusic(true);audio.setMusic(false);release();await pending;
  assert.equal(audio.ctx.sources.length,0);
});

test('music resumes at the paused offset and only one loop is active', async t=>{
  const {audio}=setup(t);await audio.setMusic(true);const first=audio.musicSource.source;
  audio.ctx.currentTime=7;audio.pause();assert.equal(first.stopped,true);
  audio.resume();await Promise.resolve();await Promise.resolve();
  assert.equal(audio.musicSource.source.starts[0][1],7);const second=audio.musicSource.source;
  await audio.setMusic(true);assert.equal(audio.musicSource.source,second);
  audio.setMusic(false);assert.equal(second.stopped,true);
});

test('disabling effects and pausing both stop already-playing transitions', async t=>{
  const {audio}=setup(t);audio.setEffects(true);await audio.chime(3);const first=[...audio.effectSources][0].source;
  audio.setEffects(false);assert.equal(first.stopped,true);assert.equal(audio.effectSources.size,0);
  audio.setEffects(true);await audio.chime(4);const second=[...audio.effectSources][0].source;
  audio.pause();assert.equal(second.stopped,true);assert.equal(audio.effectSources.size,0);
});

test('pausing also cancels an effect preview still waiting for audio activation', async t=>{
  const {audio}=setup(t);let release;audio.ctx=new Context();
  audio.ctx.resume=()=>new Promise(resolve=>{release=()=>{audio.ctx.state='running';resolve();};});
  audio.musicGain=new AudioNode();audio.effectsGain=new AudioNode();audio.setEffects(true);
  const pending=audio.chime(0,{preview:true});audio.pause();release();await pending;
  assert.equal(audio.ctx.sources.length,0);
});

test('generated score and effects contain finite, audible signals without clipping', ()=>{
  const context=new Context(),music=createMusicBuffer(context);
  for(let channel=0;channel<2;channel++){
    const samples=music.getChannelData(channel);let sum=0,peak=0;
    for(const sample of samples){assert(Number.isFinite(sample));sum+=sample*sample;peak=Math.max(peak,Math.abs(sample));}
    assert(Math.sqrt(sum/samples.length)>.04);assert(peak<.8);assert(Math.abs(samples[0])<.0001);assert(Math.abs(samples.at(-1))<.0001);
  }
  for(let epoch=0;epoch<11;epoch++){
    const samples=createEffectBuffer(context,epoch).getChannelData(0);let energy=0,peak=0;
    for(const sample of samples){energy+=sample*sample;peak=Math.max(peak,Math.abs(sample));}
    assert(Math.sqrt(energy/samples.length)>.05);assert(peak<.8);
  }
});
