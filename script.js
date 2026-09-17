/* ==========================================================================
   CAMPUS CONNECT PORTAL - INTERACTIVE SCRIPT
   - Responsive Navigation Toggle
   - Interactive Image Carousel with Touch / Button / Dot controls
   - Smooth Scrolling and Active Link Tracking
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ------------------------------------------------------------------------
  // 1. Mobile Navigation Toggle
  // ------------------------------------------------------------------------
  const menuToggle = document.getElementById('menuToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close menu when clicking on any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 2. Interactive Highlights Carousel
  // ------------------------------------------------------------------------
  const carouselTrack = document.getElementById('carouselTrack');
  const slides = document.querySelectorAll('.slide');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicators = document.querySelectorAll('.indicator');
  const carouselWrapper = document.getElementById('campusCarousel');

  let currentSlide = 0;
  const totalSlides = slides.length;
  let autoSlideTimer = null;

  function updateCarousel(slideIndex) {
    if (slideIndex < 0) {
      currentSlide = totalSlides - 1;
    } else if (slideIndex >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = slideIndex;
    }

    // Shift track
    if (carouselTrack) {
      carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    // Update active slide class
    slides.forEach((slide, index) => {
      if (index === currentSlide) {
        slide.classList.add('active-slide');
      } else {
        slide.classList.remove('active-slide');
      }
    });

    // Update indicators
    indicators.forEach((indicator, index) => {
      if (index === currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }

  if (prevBtn && nextBtn && carouselTrack) {
    prevBtn.addEventListener('click', () => {
      updateCarousel(currentSlide - 1);
      resetAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
      updateCarousel(currentSlide + 1);
      resetAutoSlide();
    });

    indicators.forEach(indicator => {
      indicator.addEventListener('click', (e) => {
        const slideIdx = parseInt(e.target.getAttribute('data-slide'), 10);
        updateCarousel(slideIdx);
        resetAutoSlide();
      });
    });

    // Automatic slide advance
    function startAutoSlide() {
      autoSlideTimer = setInterval(() => {
        updateCarousel(currentSlide + 1);
      }, 5000);
    }

    function resetAutoSlide() {
      if (autoSlideTimer) {
        clearInterval(autoSlideTimer);
        startAutoSlide();
      }
    }

    if (carouselWrapper) {
      // Pause auto rotation on user hover
      carouselWrapper.addEventListener('mouseenter', () => {
        if (autoSlideTimer) clearInterval(autoSlideTimer);
      });

      carouselWrapper.addEventListener('mouseleave', () => {
        startAutoSlide();
      });
    }

    // Start auto slide
    startAutoSlide();
  }

  // ------------------------------------------------------------------------
  // 3. Active Link Highlight on Scroll
  // ------------------------------------------------------------------------
  const sections = document.querySelectorAll('section[id], aside[id]');

  window.addEventListener('scroll', () => {
    let scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
});
