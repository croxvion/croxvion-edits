(() => {
  // Keep the gallery tidy when a remote stock URL is retired or temporarily unavailable.
  document.querySelectorAll('.sample-card img').forEach(img => {
    img.addEventListener('error', () => {
      img.classList.add('image-fallback');
      img.alt = 'Stock reference temporarily unavailable';
    }, { once: true });
  });
  const menu = document.querySelector('.menu');
  const nav = document.querySelector('.nav');
  menu?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menu?.setAttribute('aria-expanded','false');
  }));

  const setCompare = (box, pct) => {
    const value = Math.max(6, Math.min(94, pct));
    const after = box.querySelector('.compare-after');
    const line = box.querySelector('.compare-line');
    const handle = box.querySelector('.compare-handle');
    after.style.clipPath = `inset(0 0 0 ${value}%)`;
    line.style.left = `${value}%`;
    handle.style.left = `calc(${value}% - 19px)`;
  };

  document.querySelectorAll('.compare').forEach(box => {
    setCompare(box, 50);
    const handle = box.querySelector('.compare-handle');
    let dragging = false;
    const update = clientX => {
      const rect = box.getBoundingClientRect();
      const pct = ((clientX - rect.left) / rect.width) * 100;
      setCompare(box, pct);
    };
    const start = e => { dragging = true; e.preventDefault(); };
    const end = () => { dragging = false; };
    handle.addEventListener('pointerdown', start);
    box.addEventListener('pointermove', e => { if (dragging) update(e.clientX); });
    window.addEventListener('pointerup', end);
    box.addEventListener('click', e => {
      if (e.target.closest('.compare-handle')) return;
      update(e.clientX);
    });
  });

  const galleryTabs = document.querySelectorAll('.gallery-tab');
  const galleryPanels = document.querySelectorAll('.gallery-panel');
  galleryTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const key = tab.dataset.gallery;
      galleryTabs.forEach(t => t.classList.toggle('active', t === tab));
      galleryPanels.forEach(panel => panel.classList.toggle('active', panel.dataset.panel === key));
      document.querySelector('#gallery')?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

})();
