/*=============== NAVIGATION ===============*/
(function() {
  'use strict';
  
  // Navigation elements
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  const navClose = document.getElementById('nav-close');
  const navLinks = document.querySelectorAll('.nav__link');
  const nav = document.querySelector('.nav');
  
  // Show menu
  function showMenu() {
    if (navMenu) {
      navMenu.classList.add('show-menu');
    }
  }
  
  // Hide menu
  function hideMenu() {
    if (navMenu) {
      navMenu.classList.remove('show-menu');
    }
  }
  
  // Toggle menu
  if (navToggle) {
    navToggle.addEventListener('click', showMenu);
  }
  
  // Close menu
  if (navClose) {
    navClose.addEventListener('click', hideMenu);
  }
  
  // Close menu when clicking nav links
  navLinks.forEach(function(link) {
    link.addEventListener('click', hideMenu);
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(e) {
    if (navMenu && navMenu.classList.contains('show-menu')) {
      if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        hideMenu();
      }
    }
  });
  
  // Scroll header
  function scrollHeader() {
    if (nav) {
      if (window.scrollY >= 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    }
  }
  
  window.addEventListener('scroll', scrollHeader);
  
  // Theme toggle
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  
  if (themeToggle) {
    // Check for saved theme
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      body.classList.add('light-mode');
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
    
    themeToggle.addEventListener('click', function() {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      
      if (isLight) {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
      } else {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
      }
    });
  }
})();
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



// Preloader - hide after load



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
      
      // Prevent multiple animations
      if (target.dataset.animated === 'true') return;
      target.dataset.animated = 'true';
      
      const text = target.textContent;
      const num = parseInt(text);
      const suffix = text.replace(/[0-9]/g, '');
      let current = 0;
      const step = Math.ceil(num / 40);
      
      const timer = setInterval(() => {
        current += step;
        if (current >= num) { 
          current = num; 
          clearInterval(timer);
        }
        target.textContent = current + suffix;
      }, 40);
      
      // Store timer for cleanup if needed
      target.dataset.timer = timer;
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

// WhatsApp booking buttons - Enhanced
const whatsapp = document.createElement('a');
whatsapp.href = 'https://wa.me/2348059989192?text=Hi%20Cletus%2C%20I%27m%20interested%20in%20booking%20a%20photography%20session.%20Please%20send%20me%20more%20details.';
whatsapp.target = '_blank';
whatsapp.classList.add('whatsapp-btn');
whatsapp.innerHTML = '<i class="fab fa-whatsapp"></i>';
whatsapp.title = 'Book via WhatsApp - Quick Response!';
document.body.appendChild(whatsapp);

// Add WhatsApp booking to all CTA buttons
document.querySelectorAll('.btn').forEach(btn => {
  if (btn.textContent.includes('Book') || btn.textContent.includes('Get')) {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('href') === 'contact.html') {
        e.preventDefault();
        // Open WhatsApp with booking message
        const message = `Hi Cletus! I'm interested in the ${btn.closest('.pricing-card')?.querySelector('h3')?.textContent || 'photography'} package. Can you give me more details?`;
        window.open(`https://wa.me/2348059989192?text=${encodeURIComponent(message)}`, '_blank');
      }
    });
  }
});

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
  baSlider.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault();
  }, { passive: false });
  document.addEventListener('mouseup', () => isDragging = false);
  document.addEventListener('touchend', (e) => {
    isDragging = false;
    e.preventDefault();
  }, { passive: false });
  baSlider.addEventListener('mousemove', (e) => { if (isDragging) moveSlider(e.clientX); });
  baSlider.addEventListener('touchmove', (e) => {
    if (isDragging) {
      e.preventDefault();
      moveSlider(e.touches[0].clientX);
    }
  }, { passive: false });
  baSlider.addEventListener('click', (e) => moveSlider(e.clientX));
}



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

// Page Transitions (fast - 300ms) - with accessibility support
const pageTransition = document.querySelector('.page-transition');
if (pageTransition) {
  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  document.querySelectorAll('a[href]').forEach(link => {
    if (link.hostname === window.location.hostname && !link.hash && link.target !== '_blank') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.href;
        
        if (prefersReducedMotion) {
          // Skip transition for users who prefer reduced motion
          window.location.href = href;
        } else {
          pageTransition.classList.add('active');
          // Announce page change to screen readers
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.setAttribute('aria-atomic', 'true');
          announcement.textContent = 'Navigating to new page';
          announcement.style.position = 'absolute';
          announcement.style.left = '-10000px';
          document.body.appendChild(announcement);
          
          setTimeout(() => {
            window.location.href = href;
            document.body.removeChild(announcement);
          }, 300);
        }
      });
    }
  });
}

// Quote Calculator Functions
function updateQuoteTotal() {
  const serviceSelect = document.getElementById('serviceType');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  if (!serviceSelect) return;
  
  let total = parseInt(serviceSelect.value) || 0;
  
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      total += parseInt(checkbox.value) || 0;
    }
  });
  
  const totalElement = document.getElementById('totalPrice');
  if (totalElement) {
    totalElement.textContent = '₦' + total.toLocaleString();
  }
}

function sendQuoteToWhatsApp() {
  const serviceSelect = document.getElementById('serviceType');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const totalElement = document.getElementById('totalPrice');
  
  if (!serviceSelect || !serviceSelect.value) {
    alert('Please select a service first!');
    return;
  }
  
  let message = `Hi Cletus! I used your quote calculator and got this estimate:\n\n`;
  message += `Service: ${serviceSelect.options[serviceSelect.selectedIndex].text}\n`;
  
  let addOns = [];
  checkboxes.forEach(checkbox => {
    if (checkbox.checked) {
      const label = checkbox.parentElement.textContent.trim();
      addOns.push(label);
    }
  });
  
  if (addOns.length > 0) {
    message += `Add-ons: ${addOns.join(', ')}\n`;
  }
  
  message += `\nEstimated Total: ${totalElement.textContent}\n\n`;
  message += `Please confirm this pricing and availability. Thank you!`;
  
  window.open(`https://wa.me/2348059989192?text=${encodeURIComponent(message)}`, '_blank');
}

// Initialize quote calculator if elements exist
document.addEventListener('DOMContentLoaded', () => {
  const serviceSelect = document.getElementById('serviceType');
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  
  if (serviceSelect) {
    serviceSelect.addEventListener('change', updateQuoteTotal);
  }
  
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateQuoteTotal);
  });
});
