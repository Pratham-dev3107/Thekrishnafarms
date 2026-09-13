/**
 * The Krishna Farms — Ultra Luxury Hospitality & Event Estate
 * Destination: Kala Bakra, Jalandhar, Punjab
 * Direct Helpline / WhatsApp: +91 94176 11073
 */

document.addEventListener('DOMContentLoaded', () => {
  const VENUE_PHONE = '919417611073';

  // 1. Mobile Drawer Navigation
  const drawer = document.getElementById('mobileDrawer');
  const drawerOverlay = document.getElementById('drawerOverlay');
  const openDrawerBtn = document.getElementById('mobileMenuOpen');
  const closeDrawerBtn = document.getElementById('mobileMenuClose');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  function openMenu() {
    if (drawer && drawerOverlay) {
      drawer.classList.add('active');
      drawerOverlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    if (drawer && drawerOverlay) {
      drawer.classList.remove('active');
      drawerOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  if (openDrawerBtn) openDrawerBtn.addEventListener('click', openMenu);
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', closeMenu);
  if (drawerOverlay) drawerOverlay.addEventListener('click', closeMenu);

  drawerLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // 2. Sticky Header Scroll Effect
  const siteHeader = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (!siteHeader) return;
    if (window.scrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }, { passive: true });

  // 3. Scroll Reveal Animations (Intersection Observer)
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  // 4. Real Photo Gallery Filtering
  const filterTabs = document.querySelectorAll('.gallery-filter-tab');
  const galleryBoxes = document.querySelectorAll('.gallery-box-item');

  filterTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.getAttribute('data-filter');

      galleryBoxes.forEach(box => {
        const category = box.getAttribute('data-category') || '';
        if (filter === 'all' || category.includes(filter)) {
          box.style.display = 'block';
          box.style.animation = 'fadeIn 0.4s ease forwards';
        } else {
          box.style.display = 'none';
        }
      });
    });
  });

  // 5. Estate Photo Lightbox Modal
  const lightboxModal = document.getElementById('estateLightboxModal');
  const lightboxPhoto = document.getElementById('lightboxPhotoTarget');
  const lightboxDesc = document.getElementById('lightboxDescText');
  const lightboxDismiss = document.getElementById('lightboxDismiss');

  galleryBoxes.forEach(box => {
    box.addEventListener('click', () => {
      const src = box.getAttribute('data-src');
      const caption = box.getAttribute('data-caption');
      if (lightboxPhoto && lightboxDesc && lightboxModal) {
        lightboxPhoto.src = src;
        lightboxDesc.textContent = caption;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  });

  const closeLightbox = () => {
    if (lightboxModal) {
      lightboxModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  if (lightboxDismiss) lightboxDismiss.addEventListener('click', closeLightbox);
  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) closeLightbox();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightboxModal && lightboxModal.classList.contains('active')) {
      closeLightbox();
    }
  });

  // 6. Hero Concierge Availability Inquiry
  const heroQuickBookForm = document.getElementById('heroQuickBookForm');
  if (heroQuickBookForm) {
    heroQuickBookForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = document.getElementById('quickEventType').value;
      const date = document.getElementById('quickDate').value;
      const guests = document.getElementById('quickGuests').value;

      const message = encodeURIComponent(
        `Hello The Krishna Farms! 🌿\n\nI want to check date availability for:\n` +
        `• Occasion: ${type}\n` +
        `• Preferred Date: ${date || 'Flexible / Finalizing'}\n` +
        `• Estimated Headcount: ${guests}\n\n` +
        `Please share available dates and packages.`
      );
      window.open(`https://wa.me/${VENUE_PHONE}?text=${message}`, '_blank');
    });
  }

  // 7. FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-panel-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-toggle-header');
    if (btn) {
      btn.addEventListener('click', () => {
        const isCurrentActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isCurrentActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // 8. Set minimum date for booking input to today
  const quickDateInput = document.getElementById('quickDate');
  if (quickDateInput) {
    const today = new Date().toISOString().split('T')[0];
    quickDateInput.min = today;
    quickDateInput.value = today;
  }
});
