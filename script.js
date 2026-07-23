/* ==========================================
   SPARTAN'S THE GYM CLUB - VANILLA JS ENGINE
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize lucide icons if available
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------
   * 1. PRELOADER
   * -------------------------------------------------- */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('hidden');
      }, 400);
    });
    // Fallback if load already fired
    setTimeout(() => {
      preloader.classList.add('hidden');
    }, 1500);
  }

  /* --------------------------------------------------
   * 2. STICKY NAVBAR & BACK TO TOP BUTTON
   * -------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const backToTopBtn = document.getElementById('backToTop');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (navbar) {
      if (scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // Active link highlighting based on scroll position
    updateActiveNavLink();
  });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  /* --------------------------------------------------
   * 3. MOBILE MENU TOGGLE
   * -------------------------------------------------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const closeMenu = document.getElementById('closeMenu');
  const mobileMenu = document.getElementById('mobileMenu');
  const menuOverlay = document.getElementById('menuOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileMenu() {
    mobileMenu?.classList.add('open');
    menuOverlay?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('open');
    menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openMobileMenu);
  closeMenu?.addEventListener('click', closeMobileMenu);
  menuOverlay?.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  /* --------------------------------------------------
   * 4. ACTIVE NAV LINK ON SCROLL
   * -------------------------------------------------- */
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  /* --------------------------------------------------
   * 5. ANIMATED STATS COUNTERS
   * -------------------------------------------------- */
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(stat => {
      const target = +stat.getAttribute('data-target');
      const prefix = stat.getAttribute('data-prefix') || '';
      const suffix = stat.getAttribute('data-suffix') || '';
      let count = 0;
      const speed = target / 50;

      const updateCount = () => {
        count += speed;
        if (count < target) {
          stat.innerText = prefix + Math.ceil(count) + suffix;
          setTimeout(updateCount, 25);
        } else {
          stat.innerText = prefix + target + suffix;
        }
      };

      updateCount();
    });
  };

  // Intersection observer for statistics
  const statsSection = document.querySelector('.hero-stats');
  if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animateCounters();
          animatedStats = true;
        }
      });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
  }

  /* --------------------------------------------------
   * 6. MEMBERSHIP PRICING TOGGLE (Monthly / Annual)
   * -------------------------------------------------- */
  const billingToggle = document.getElementById('billingToggle');
  const starterPrice = document.getElementById('starterPrice');
  const popularPrice = document.getElementById('popularPrice');
  const premiumPrice = document.getElementById('premiumPrice');
  const periodTexts = document.querySelectorAll('.pricing-period');

  if (billingToggle) {
    billingToggle.addEventListener('change', (e) => {
      const isAnnual = e.target.checked;

      if (isAnnual) {
        // 20% discount on annual plan
        if (starterPrice) starterPrice.innerText = '₹799';
        if (popularPrice) popularPrice.innerText = '₹1199';
        if (premiumPrice) premiumPrice.innerText = '₹1999';

        periodTexts.forEach(p => p.innerText = '/ month (billed annually)');
      } else {
        if (starterPrice) starterPrice.innerText = '₹999';
        if (popularPrice) popularPrice.innerText = '₹1499';
        if (premiumPrice) premiumPrice.innerText = '₹2499';

        periodTexts.forEach(p => p.innerText = '/ month');
      }
    });
  }

  /* --------------------------------------------------
   * 7. GALLERY FILTER & LIGHTBOX
   * -------------------------------------------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      galleryItems.forEach(item => {
        const cat = item.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          item.style.display = 'block';
          item.style.animation = 'fadeIn 0.4s ease';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  // Lightbox click
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const img = item.querySelector('.gallery-img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  lightboxClose?.addEventListener('click', () => {
    lightboxModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  lightboxModal?.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* --------------------------------------------------
   * 8. JOIN NOW MODAL & FORM
   * -------------------------------------------------- */
  const joinModal = document.getElementById('joinModal');
  const closeJoinModal = document.getElementById('closeJoinModal');
  const joinTriggers = document.querySelectorAll('.open-join-modal');
  const selectedPlanInput = document.getElementById('selectedPlanInput');

  joinTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const planName = btn.getAttribute('data-plan') || "Popular Plan (₹1499/mo)";
      if (selectedPlanInput) {
        selectedPlanInput.value = planName;
      }
      joinModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  closeJoinModal?.addEventListener('click', () => {
    joinModal?.classList.remove('active');
    document.body.style.overflow = '';
  });

  joinModal?.addEventListener('click', (e) => {
    if (e.target === joinModal) {
      joinModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  });

  /* --------------------------------------------------
   * 9. FORM VALIDATIONS & TOAST NOTIFICATIONS
   * -------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const joinForm = document.getElementById('joinForm');

  function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('contactName')?.value;
      const phone = document.getElementById('contactPhone')?.value;

      if (!name || !phone) {
        showToast('Please fill in your Name and Phone Number.', 'error');
        return;
      }

      showToast(`Thank you ${name}! Your inquiry has been received. Our team will contact you shortly.`, 'success');
      contactForm.reset();
    });
  }

  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('joinName')?.value;
      const phone = document.getElementById('joinPhone')?.value;

      if (!name || !phone) {
        showToast('Please provide your name and phone number.', 'error');
        return;
      }

      showToast(`Welcome to the Spartan family, ${name}! We'll contact you to confirm your membership setup.`, 'success');
      joinForm.reset();
      joinModal?.classList.remove('active');
      document.body.style.overflow = '';
    });
  }
});
