(() => {
  if (document.getElementById('site-meta')) return;
  const style = document.createElement('style');
  style.textContent = `
    #site-meta {
      position: fixed;
      left: 50%;
      bottom: 1px;
      transform: translateX(-50%);
      z-index: 60;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      max-width: calc(100vw - 20px);
      color: rgba(112, 124, 158, .62);
      font: 500 9.5px/14px -apple-system, BlinkMacSystemFont, "PingFang SC", "Microsoft YaHei", sans-serif;
      letter-spacing: .025em;
      white-space: nowrap;
      text-shadow: 0 1px 6px rgba(0, 0, 10, .9);
      transition: opacity .25s ease;
      pointer-events: none;
    }
    #site-meta:hover { opacity: .9; }
    #site-meta a {
      color: rgba(104, 117, 150, .66);
      text-decoration: none;
      pointer-events: auto;
    }
    #site-meta a:hover { color: rgba(154, 167, 201, .9); }
    #site-meta .sep { opacity: .42; }
    #site-meta .visits { color: rgba(112, 124, 158, .58); }
    #busuanzi_site_pv {
      color: rgba(132, 145, 178, .72);
      font-variant-numeric: tabular-nums;
    }
    @media (max-width: 640px) {
      #site-meta { gap: 5px; font-size: 9px; letter-spacing: 0; }
    }
  `;
  document.head.appendChild(style);

  const meta = document.createElement('div');
  meta.id = 'site-meta';
  meta.setAttribute('aria-label', '联系邮箱与累计访问量');
  meta.innerHTML = '<a href="mailto:linhu@scu.edu.cn" aria-label="发送邮件至 linhu@scu.edu.cn">linhu@scu.edu.cn</a><span class="sep" aria-hidden="true">·</span><span class="visits">累计访问 <span id="busuanzi_site_pv">—</span> 次</span>';
  document.body.appendChild(meta);

  const counter = document.createElement('script');
  counter.defer = true;
  counter.src = 'https://cdn.busuanzi.cc/busuanzi/3.6.9/busuanzi.min.js';
  counter.onerror = () => {
    const value = document.getElementById('busuanzi_site_pv');
    if (value) value.textContent = '暂不可用';
  };
  document.body.appendChild(counter);
})();
