/*=============== ADVANCED NAVIGATION SYSTEM ===============*/
(function() {
  'use strict';

  // Elements
  const navbar = document.querySelector('.navbar');
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;

  let isMenuOpen = false;

  // Initialize
  function init() {
    setupEventListeners();
    setupScrollEffects();
    setupTheme();
    setupActiveStates();
  }

  // Event Listeners
  function setupEventListeners() {
    // Menu toggle
    if (menuToggle && mobileMenu) {
      menuToggle.addEventListener('click', toggleMobileMenu);
      document.querySelectorAll('.mobile-nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
          const href = item.getAttribute('href') || '';
          if (!href || href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:')) {
            closeMobileMenu();
          } else {
            // Let page transition handle navigation; just reset overflow
            body.style.overflow = '';
            isMenuOpen = false;
            mobileMenu.classList.remove('active');
            menuToggle.classList.remove('active');
          }
        });
      });
      
      // Close menu on outside click
      document.addEventListener('click', (e) => {
        if (isMenuOpen && !mobileMenu.contains(e.target) && !menuToggle.contains(e.target)) {
          closeMobileMenu();
        }
      });
      
      // Prevent menu close on menu content click
      mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu) {
          closeMobileMenu();
        }
      });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && isMenuOpen) {
        closeMobileMenu();
      }
    });
  }

  // Mobile Menu Functions
  function toggleMobileMenu() {
    if (isMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  }

  function openMobileMenu() {
    isMenuOpen = true;
    mobileMenu.classList.add('active');
    menuToggle.classList.add('active');
    body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    isMenuOpen = false;
    mobileMenu.classList.remove('active');
    menuToggle.classList.remove('active');
    body.style.overflow = '';
  }

  // Scroll Effects
  function setupScrollEffects() {
    let ticking = false;

    function updateNavbar() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      
      // Add scrolled class
      if (navbar) {
        navbar.classList.toggle('scrolled', scrollTop > 50);
      }
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
  }

  // Theme System
  function setupTheme() {
    if (!themeToggle) return;

    // Check saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      body.classList.add('light-mode');
    }

    // Theme toggle handler
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      
      // Add visual feedback
      themeToggle.style.transform = 'scale(0.95)';
      setTimeout(() => {
        themeToggle.style.transform = '';
      }, 150);
    });
  }

  // Active States — HTML already sets active class; this syncs on direct URL access
  function setupActiveStates() {
    const currentPage = window.location.pathname;
    const navItems = document.querySelectorAll('.nav-item, .mobile-nav-item');

    navItems.forEach(item => {
      const href = item.getAttribute('href');
      const isHome = (currentPage === '/' || currentPage.endsWith('/index.html') || currentPage.endsWith('index.html')) && (href === '/' || href === 'index.html');
      const isOther = href !== '/' && currentPage.endsWith(href);
      if (isHome || isOther) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Performance optimization
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Resize handler
  const handleResize = debounce(() => {
      if (window.innerWidth > 992 && isMenuOpen) closeMobileMenu();
  }, 250);

  window.addEventListener('resize', handleResize);

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose functions globally if needed
  window.NavigationSystem = {
    openMenu: openMobileMenu,
    closeMenu: closeMobileMenu,
    toggleMenu: toggleMobileMenu
  };

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

// Shared form button reset
function resetBtn(btn) {
  btn.textContent = 'Send Message';
  btn.style.background = '';
  btn.style.color = '';
  btn.style.pointerEvents = '';
}

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
      setTimeout(() => resetBtn(btn), 3000);
    }).catch(() => {
      btn.textContent = '✗ Error. Try again.';
      setTimeout(() => resetBtn(btn), 3000);
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
      const isK = text.includes('K');
      const actualNum = isK ? num * 1000 : num;
      const suffix = text.replace(/[0-9K]/g, '');
      let current = 0;
      const step = Math.ceil(actualNum / 40);
      
      const timer = setInterval(() => {
        current += step;
        if (current >= actualNum) { 
          current = actualNum; 
          clearInterval(timer);
        }
        target.textContent = (isK ? Math.round(current / 1000) + 'K' : current) + suffix;
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
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
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
    const linkHref = link.getAttribute('href') || '';
    const isExternal = link.target === '_blank' || linkHref.startsWith('tel:') || linkHref.startsWith('mailto:') || linkHref.startsWith('http') && !linkHref.startsWith(window.location.origin);
    const isAnchor = link.hash && link.pathname === window.location.pathname;
    if (!isExternal && !isAnchor && linkHref && linkHref !== '#') {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        // Always clear overflow in case mobile menu was open
        document.body.style.overflow = '';
        const dest = link.href;
        if (prefersReducedMotion) {
          window.location.href = dest;
        } else {
          pageTransition.classList.add('active');
          setTimeout(() => { window.location.href = dest; }, 300);
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

// Expose quote functions globally (called from inline onclick in pricing.html)
window.updateQuoteTotal = updateQuoteTotal;
window.sendQuoteToWhatsApp = sendQuoteToWhatsApp;

// Initialize quote calculator event listeners
if (document.getElementById('serviceType')) {
  document.addEventListener('DOMContentLoaded', () => {
    const serviceSelect = document.getElementById('serviceType');
    if (serviceSelect) {
      document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.addEventListener('change', updateQuoteTotal));
      serviceSelect.addEventListener('change', updateQuoteTotal);
      updateQuoteTotal();
    }
  });
}
