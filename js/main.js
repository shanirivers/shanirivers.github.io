document.getElementById('yr').textContent = new Date().getFullYear();

/* ---- nav: solid shadow once scrolled ---- */
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 10);
onScroll();
window.addEventListener('scroll', onScroll, {passive:true});

/* ---- hamburger: identical state whether at top or scrolled ---- */
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
function closeMenu(){
  burger.classList.remove('open');
  navLinks.classList.remove('show');
  document.body.classList.remove('menu-open');
  burger.setAttribute('aria-expanded','false');
}
burger.addEventListener('click', () => {
  const open = burger.classList.toggle('open');
  navLinks.classList.toggle('show', open);
  document.body.classList.toggle('menu-open', open);
  burger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
/* close when any link is clicked */
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
/* close on Escape */
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeMenu(); });

/* ---- scroll reveal ---- */
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, {threshold:.12, rootMargin:"0px 0px -8% 0px"});
document.querySelectorAll('.reveal').forEach((el,i) => {
  el.style.transitionDelay = (i % 4) * 70 + 'ms';
  io.observe(el);
});

/* ---- project expand/collapse ---- */
document.querySelectorAll('.proj-head').forEach(head => {
  head.addEventListener('click', () => {
    const proj = head.closest('.proj');
    const body = proj.querySelector('.proj-body');
    const open = proj.classList.toggle('open');
    head.setAttribute('aria-expanded', open ? 'true' : 'false');
    body.style.maxHeight = open ? body.scrollHeight + 'px' : '0px';
  });
});

/* ---- project filter ---- */
const fBtns = document.querySelectorAll('.filters button');
const projs = document.querySelectorAll('.proj');
fBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    fBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projs.forEach(p => {
      const cats = p.dataset.cat.split(' ');
      const show = (f === 'all') || cats.includes(f);
      p.classList.toggle('hide', !show);
      if(!show && p.classList.contains('open')){
        p.classList.remove('open');
        p.querySelector('.proj-body').style.maxHeight = '0px';
        p.querySelector('.proj-head').setAttribute('aria-expanded','false');
      }
    });
  });
});

/* keep open panels correctly sized on resize */
window.addEventListener('resize', () => {
  document.querySelectorAll('.proj.open .proj-body').forEach(b => {
    b.style.maxHeight = b.scrollHeight + 'px';
  });
});

/* ---- in their words: auto-rotating slider with manual controls ---- */
(function(){
  const track = document.getElementById('wordsTrack');
  if(!track) return;
  const slider = document.getElementById('wordsSlider');
  const slides = track.children.length;
  const dots = document.getElementById('wordsDots');
  const ROTATE_MS = 6000;
  let i = 0, timer = null, hovering = false;

  for(let d=0; d<slides; d++){
    const b = document.createElement('button');
    b.setAttribute('aria-label','Go to quote ' + (d+1));
    if(d===0) b.classList.add('active');
    b.addEventListener('click', () => { go(d); restart(); });
    dots.appendChild(b);
  }
  const dotEls = dots.children;

  function go(n){
    i = (n + slides) % slides;
    track.style.transform = 'translateX(' + (-i * 100) + '%)';
    for(let k=0;k<dotEls.length;k++) dotEls[k].classList.toggle('active', k===i);
  }

  function start(){
    if(timer || slides < 2) return;
    timer = setInterval(() => { if(!hovering) go(i+1); }, ROTATE_MS);
  }
  function stop(){ clearInterval(timer); timer = null; }
  /* manual action: reset the clock so it doesn't jump right after */
  function restart(){ stop(); start(); }

  document.getElementById('wordsPrev').addEventListener('click', () => { go(i-1); restart(); });
  document.getElementById('wordsNext').addEventListener('click', () => { go(i+1); restart(); });

  /* pause while the pointer is over the slider */
  slider.addEventListener('mouseenter', () => { hovering = true; });
  slider.addEventListener('mouseleave', () => { hovering = false; });

  /* keyboard arrows when the slider is in view */
  document.addEventListener('keydown', e => {
    const r = slider.getBoundingClientRect();
    const visible = r.top < window.innerHeight && r.bottom > 0;
    if(!visible) return;
    if(e.key === 'ArrowLeft'){ go(i-1); restart(); }
    if(e.key === 'ArrowRight'){ go(i+1); restart(); }
  });

  /* only rotate while the section is actually on screen, and
     respect reduced-motion preferences */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!reduce){
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => e.isIntersecting ? start() : stop());
    }, {threshold:.25});
    io.observe(slider);
  }
})();
