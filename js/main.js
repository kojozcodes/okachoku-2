document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('.nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      
      nav.classList.toggle('active');
      hamburger.classList.toggle('active');
      document.body.classList.toggle('menu-open');
    });

    // Close when clicking a direct link (not dropdown parent)
    nav.querySelectorAll('a[href]:not(.nav__item > .nav__link)').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        hamburger.classList.remove('active');
        document.body.classList.remove('menu-open');
      });
    });

    // Toggle dropdowns on mobile
    nav.querySelectorAll('.nav__item > .nav__link').forEach(item => {
      item.addEventListener('click', (e) => {
        if (window.innerWidth <= 900) {
          e.preventDefault();
          e.stopPropagation();
          const dd = item.nextElementSibling;
          if (dd) {
            const wasOpen = dd.classList.contains('active');
            nav.querySelectorAll('.nav__dropdown').forEach(d => d.classList.remove('active'));
            if (!wasOpen) dd.classList.add('active');
          }
        }
      });
    });
  }

  // Scroll animations
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.08 });
  document.querySelectorAll('.fade-in').forEach(el => obs.observe(el));

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.closest('.faq-item');
      if (item) {
        const was = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!was) item.classList.add('active');
      }
    });
  });
});
