// Preloader - hide after load
const preloader = document.querySelector('.preloader');
if (preloader) {
  window.addEventListener('load', () => preloader.classList.add('hidden'));
}

// Throttle helper
function throttle(fn, delay) {
  let last = 0;
  return function(...args) {
    const now = Date.now();
    if (now - last >= delay) { last = now; fn(...args); }
  };
}

// Navbar scroll + hide/show (throttled)
let lastScroll = 0;
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', throttle(() => {
  const currentScroll = window.scrollY;
  navbar.classList.toggle('scrolled', currentScroll > 50);
  if (currentScroll > lastScroll && currentScroll > 200) {
    navbar.classList.add('nav-hidden');
  } else {
    navbar.classList.remove('nav-hidden');
  }
  lastScroll = currentScroll;
}, 100));

// Mobile nav toggle
const navLinks = document.querySelector('.nav-links');
function toggleNav() {
  navLinks.classList.toggle('open');
  document.body.classList.toggle('nav-open');
}

// Close nav on outside click or link click
document.addEventListener('click', (e) => {
  if (navLinks.classList.contains('open') && !e.target.closest('.nav-links') && !e.target.closest('.nav-toggle')) {
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  }
});
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    document.body.classList.remove('nav-open');
  });
});

// Single IntersectionObserver for all reveals + stagger
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      // Check if it's a grid parent for stagger
      const children = el.querySelectorAll('.reveal');
      if (children.length > 0 && el.classList.contains('stagger-parent')) {
        children.forEach((child, i) => {
          child.style.transitionDelay = `${i * 0.12}s`;
          child.classList.add('active');
        });
      } else {
        el.classList.add('active');
      }
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => {
  const rect = el.getBoundingClientRect();
  if (rect.top < window.innerHeight) {
    el.classList.add('active');
  } else {
    revealObserver.observe(el);
  }
});

// Stagger parents
document.querySelectorAll('.services-grid, .process-grid, .stats-grid, .testimonials-grid, .pricing-grid').forEach(grid => {
  grid.classList.add('stagger-parent');
  revealObserver.observe(grid);
});

// Text typing effect on hero
const heroH1 = document.querySelector('.hero h1');
const heroP = document.querySelector('.hero p');
if (heroH1) {
  heroH1.style.opacity = '1';
  heroH1.style.animation = 'none';
  heroH1.innerHTML = '<span class="type-cursor">|</span>';

  const fullText = 'Cletus Blaze Capture';
  let i = 0;

  setTimeout(() => {
    const typeH1 = setInterval(() => {
      const typed = fullText.substring(0, i + 1);
      heroH1.innerHTML = typed.replace('Blaze', '<span class="highlight">Blaze</span>') + '<span class="type-cursor">|</span>';
      i++;
      if (i >= fullText.length) {
        clearInterval(typeH1);
        setTimeout(() => {
          heroH1.innerHTML = fullText.replace('Blaze', '<span class="highlight">Blaze</span>');
        }, 1500);
      }
    }, 80);
  }, 600);
}
if (heroP) {
  const originalText = heroP.textContent;
  heroP.textContent = '';
  heroP.style.opacity = '1';
  heroP.style.animation = 'none';
  setTimeout(() => {
    let j = 0;
    heroP.innerHTML = '<span class="type-cursor">|</span>';
    const typeP = setInterval(() => {
      heroP.innerHTML = originalText.substring(0, j + 1) + '<span class="type-cursor">|</span>';
      j++;
      if (j >= originalText.length) {
        clearInterval(typeP);
        setTimeout(() => { heroP.textContent = originalText; }, 2000);
      }
    }, 50);
  }, 2600);
}

// Portfolio filter
const filterBtns = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.dataset.filter;
    portfolioItems.forEach(item => {
      const matches = filter === 'all' || item.dataset.category === filter;
      if (matches) {
        item.style.display = 'block';
        item.classList.remove('hidden-item');
        item.classList.add('shown');
      } else {
        item.style.display = 'none';
      }
    });
    // Hide load more when filtering by category
    const loadBtn = document.getElementById('loadMoreBtn');
    if (loadBtn) loadBtn.style.display = filter === 'all' ? '' : 'none';
  });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Create lightbox if it doesn't exist on the page
let lb = lightbox;
let lbImg = lightboxImg;
if (!lb) {
  lb = document.createElement('div');
  lb.classList.add('lightbox');
  lb.id = 'lightbox';
  lb.innerHTML = '<span class="lightbox-close">&times;</span><img src="" alt="Preview" id="lightbox-img"><span class="lightbox-nav lb-prev"><i class="fas fa-chevron-left"></i></span><span class="lightbox-nav lb-next"><i class="fas fa-chevron-right"></i></span>';
  document.body.appendChild(lb);
  lbImg = lb.querySelector('img');
}

// Previewable images (not instagram - those are links)
const allPreviewImages = [];
document.querySelectorAll('.portfolio-item img, .featured-item img').forEach(img => {
  allPreviewImages.push(img.src);
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    lbImg.src = img.src;
    lb.classList.add('active');
    currentImgIndex = allPreviewImages.indexOf(img.src);
  });
});

let currentImgIndex = 0;
const lbPrev = lb.querySelector('.lb-prev');
const lbNext = lb.querySelector('.lb-next');

if (lbPrev && lbNext) {
  lbPrev.addEventListener('click', () => {
    if (allPreviewImages.length === 0) return;
    currentImgIndex = (currentImgIndex - 1 + allPreviewImages.length) % allPreviewImages.length;
    lbImg.src = allPreviewImages[currentImgIndex];
  });
  lbNext.addEventListener('click', () => {
    if (allPreviewImages.length === 0) return;
    currentImgIndex = (currentImgIndex + 1) % allPreviewImages.length;
    lbImg.src = allPreviewImages[currentImgIndex];
  });
}

lb.addEventListener('click', (e) => {
  if (e.target === lb || e.target.classList.contains('lightbox-close')) {
    lb.classList.remove('active');
  }
});
document.addEventListener('keydown', (e) => {
  if (lb.classList.contains('active')) {
    if (e.key === 'Escape') lb.classList.remove('active');
    if (e.key === 'ArrowLeft' && lbPrev) lbPrev.click();
    if (e.key === 'ArrowRight' && lbNext) lbNext.click();
  }
});

// Back to top
const backToTop = document.createElement('div');
backToTop.classList.add('back-to-top');
backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
document.body.appendChild(backToTop);
window.addEventListener('scroll', throttle(() => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
}, 200));
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form (Formspree)
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('.btn');
    btn.textContent = 'Sending...';
    btn.style.pointerEvents = 'none';
    fetch(contactForm.action, {
      method: 'POST',
      body: new FormData(contactForm),
      headers: { 'Accept': 'application/json' }
    }).then(res => {
      if (res.ok) {
        contactForm.reset();
        btn.textContent = '✓ Message Sent!';
        btn.style.background = 'var(--gold)';
        btn.style.color = 'var(--dark)';
      } else {
        btn.textContent = '✗ Failed. Try again.';
      }
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.background = '';
        btn.style.color = '';
        btn.style.pointerEvents = '';
      }, 3000);
    }).catch(() => {
      btn.textContent = '✗ Error. Try again.';
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.style.pointerEvents = '';
      }, 3000);
    });
  });
}

// Animated counter for stats
const statItems = document.querySelectorAll('.stat-item h2');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const target = entry.target;
      const text = target.textContent;
      const num = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        current += step;
        if (current >= num) { current = num; clearInterval(timer); }
        target.textContent = current + suffix;
      }, 40);
      counterObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });
statItems.forEach(el => counterObserver.observe(el));

// Scroll progress bar (throttled)
const progressBar = document.createElement('div');
progressBar.classList.add('scroll-progress');
document.body.appendChild(progressBar);
window.addEventListener('scroll', throttle(() => {
  const progress = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
  progressBar.style.width = progress + '%';
}, 50));

// WhatsApp button
const whatsapp = document.createElement('a');
whatsapp.href = 'https://wa.me/2348059989192?text=Hi%20Cletus%2C%20I%27m%20interested%20in%20booking%20a%20session';
whatsapp.target = '_blank';
whatsapp.classList.add('whatsapp-btn');
whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
document.body.appendChild(whatsapp);

// Before/After Slider
const baSlider = document.getElementById('baSlider');
const baHandle = document.getElementById('baHandle');
const baBefore = document.querySelector('.ba-before');
if (baSlider && baHandle && baBefore) {
  let isDragging = false;
  const moveSlider = (x) => {
    const rect = baSlider.getBoundingClientRect();
    let pos = Math.max(5, Math.min(95, ((x - rect.left) / rect.width) * 100));
    baBefore.style.width = pos + '%';
    baHandle.style.left = pos + '%';
  };
  baSlider.addEventListener('mousedown', () => isDragging = true);
  baSlider.addEventListener('touchstart', () => isDragging = true);
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('touchend', () => isDragging = false);
  baSlider.addEventListener('mousemove', (e) => { if (isDragging) moveSlider(e.clientX); });
  baSlider.addEventListener('touchmove', (e) => { if (isDragging) moveSlider(e.touches[0].clientX); });
  baSlider.addEventListener('click', (e) => moveSlider(e.clientX));
}

// Dark/Light Mode
const themeToggle = document.createElement('div');
themeToggle.classList.add('theme-toggle');
themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
document.body.appendChild(themeToggle);
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
  themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
}
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  const isLight = document.body.classList.contains('light-mode');
  themeToggle.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Load More Button
const loadMoreBtn = document.getElementById('loadMoreBtn');
if (loadMoreBtn) {
  loadMoreBtn.addEventListener('click', () => {
    const hiddenItems = document.querySelectorAll('.portfolio-item.hidden-item:not(.shown)');
    hiddenItems.forEach((item, i) => {
      item.classList.add('shown');
      item.style.animationDelay = `${i * 0.05}s`;
    });
    loadMoreBtn.style.display = 'none';
  });
}

// Carousel
const carouselTrack = document.getElementById('carouselTrack');
const carouselPrev = document.getElementById('carouselPrev');
const carouselNext = document.getElementById('carouselNext');
if (carouselTrack && carouselPrev && carouselNext) {
  let carouselIndex = 0;
  const getSlideCount = () => {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  };
  const slides = carouselTrack.querySelectorAll('.carousel-slide');
  const updateCarousel = () => {
    const perView = getSlideCount();
    const maxIndex = Math.max(0, slides.length - perView);
    if (carouselIndex > maxIndex) carouselIndex = maxIndex;
    const offset = -(carouselIndex * (100 / perView));
    carouselTrack.style.transform = `translateX(${offset}%)`;
  };
  carouselNext.addEventListener('click', () => {
    const perView = getSlideCount();
    const maxIndex = slides.length - perView;
    if (carouselIndex < maxIndex) { carouselIndex++; updateCarousel(); }
  });
  carouselPrev.addEventListener('click', () => {
    if (carouselIndex > 0) { carouselIndex--; updateCarousel(); }
  });
  window.addEventListener('resize', throttle(updateCarousel, 200));
  // Touch swipe
  let touchStartX = 0;
  carouselTrack.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; });
  carouselTrack.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 50) carouselNext.click();
    else if (diff < -50) carouselPrev.click();
  });
}

// Page Transitions (fast - 300ms)
const pageTransition = document.querySelector('.page-transition');
if (pageTransition) {
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.hostname === window.location.hostname && !link.hash && link.target !== '_blank') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.href;
        pageTransition.classList.add('active');
        setTimeout(() => { window.location.href = href; }, 300);
      });
    }
  });
}
