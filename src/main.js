const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const mobileNav = document.querySelector('#mobile-menu');

function setHeaderState() {
  header?.classList.toggle('is-scrolled', window.scrollY > 28);
}

setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

toggle?.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') === 'true';
  toggle.setAttribute('aria-expanded', String(!open));
  toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  mobileNav.hidden = open;
});

mobileNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mobileNav.hidden = true;
  toggle?.setAttribute('aria-expanded', 'false');
  toggle?.setAttribute('aria-label', 'Open menu');
}));

const heroVideos = [...document.querySelectorAll('[data-hero-video]')];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (heroVideos.length > 1) {
  let activeIndex = 0;
  let transitionStarted = false;
  const crossfadeSeconds = 0.9;

  const startNextVideo = () => {
    if (transitionStarted) return;

    const current = heroVideos[activeIndex];
    const next = heroVideos[(activeIndex + 1) % heroVideos.length];
    next.currentTime = 0;
    next.playbackRate = 1.08;
    current.classList.remove('is-active');
    next.classList.add('is-active');
    transitionStarted = true;

    next.play()?.catch(() => {
      next.classList.remove('is-active');
      current.classList.add('is-active');
      transitionStarted = false;
    });
  };

  if (reduceMotion) {
    heroVideos.forEach(video => video.pause());
  } else {
    heroVideos.forEach((video, index) => {
      video.playbackRate = 1.08;
      video.addEventListener('timeupdate', () => {
        if (index !== activeIndex || transitionStarted || !Number.isFinite(video.duration)) return;
        if (video.duration - video.currentTime <= crossfadeSeconds) startNextVideo();
      });

      video.addEventListener('ended', () => {
        if (index !== activeIndex) return;
        if (!transitionStarted) startNextVideo();
        video.pause();
        video.currentTime = 0;
        activeIndex = (activeIndex + 1) % heroVideos.length;
        transitionStarted = false;
      });
    });

    heroVideos[0].play()?.catch(() => {});
  }
}
