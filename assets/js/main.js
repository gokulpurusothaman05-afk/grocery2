/**
 * Stackly Main JavaScript File
 * Coordinates animations, common layouts, and interactive widgets.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Inject Common Header and Footer
  injectHeader();
  injectFooter();

  // 2. Setup Mobile Navigation Menu
  initMobileNav();

  // 3. Initialize Preloader via imagesLoaded
  initPreloader();

  // 4. Initialize Animations and Scroll Effects
  initScrollAnimations();

  // 5. Lettering.js & CircleType.js Curved Text
  initTextEffects();

  // 6. Carousel Sliders (Owl Carousel, Slick, Tiny Slider)
  initSliders();

  // 7. Isotope Grid Filtering
  initIsotope();

  // 8. Countdown Timer
  initCountdown();

  // 9. Interactive Elements: Price Range Filter (noUiSlider)
  initPriceSlider();

  // 10. Forms Validation (jQuery Validate) and UI Widgets (jQuery UI Accordion, Datepicker)
  initFormsAndWidgets();
});

/* ==========================================================================
   1. Dynamic Header & Footer Injection
   ========================================================================== */

function injectHeader() {
  const headerPlaceholder = document.getElementById('header-placeholder');
  if (!headerPlaceholder) return;

  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1) || 'index.html';

  const isHome = pageName === 'index.html' ? 'active' : '';
  const isProducts = pageName === 'products.html' ? 'active' : '';
  const isRecipes = pageName === 'recipes.html' ? 'active' : '';
  const isAbout = pageName === 'about.html' ? 'active' : '';
  const isContact = pageName === 'contact.html' ? 'active' : '';
  const isLogin = pageName === 'login.html' ? 'active' : '';

  headerPlaceholder.innerHTML = `
    <header class="site-header">
      <div class="header-container">
        <a href="index.html" class="logo">
          <img src="assets/images/logo.webp" alt="Stackly logo">
        </a>
        
        <nav class="nav-bar">
          <ul class="nav-menu">
            <li><a href="index.html" class="nav-link ${isHome}">Home</a></li>
            <li><a href="products.html" class="nav-link ${isProducts}">Shop</a></li>
            <li><a href="recipes.html" class="nav-link ${isRecipes}">Recipes</a></li>
            <li><a href="about.html" class="nav-link ${isAbout}">About Us</a></li>
            <li><a href="contact.html" class="nav-link ${isContact}">Contact</a></li>
            <li><a href="login.html" class="nav-link ${isLogin}">Login / Register</a></li>
          </ul>
        </nav>

        <div class="nav-actions">
          <div class="cart-icon" onclick="window.location.href='products.html#cart-section'">
            <i class="fa-solid fa-cart-shopping"></i>
            <span class="cart-count">3</span>
          </div>
          <a href="login.html" class="btn-custom btn-primary-custom" style="padding: 0.5rem 1.2rem; font-size: 0.9rem;">
            <i class="fa-solid fa-user"></i> Portal
          </a>
          <div class="menu-toggle">
            <i class="fa-solid fa-bars"></i>
          </div>
        </div>
      </div>
    </header>
  `;
}

function injectFooter() {
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (!footerPlaceholder) return;

  footerPlaceholder.innerHTML = `
    <footer class="site-footer">
      <div class="footer-container">
        <div class="footer-about">
          <div class="footer-logo"><img src="assets/images/logo.webp" alt="Stackly logo"></div>
          <p>Stackly is your ultimate neighborhood grocer offering freshly harvested organic fruits, vegetables, nuts, and bakery goods delivered with premium care.</p>
          <div class="footer-socials">
            <a href="404.html"><i class="fa-brands fa-facebook-f"></i></a>
            <a href="404.html"><i class="fa-brands fa-twitter"></i></a>
            <a href="404.html"><i class="fa-brands fa-instagram"></i></a>
            <a href="404.html"><i class="fa-brands fa-pinterest"></i></a>
          </div>
        </div>
        
        <div>
          <h3 class="footer-links-title">Quick Navigation</h3>
          <ul class="footer-links">
            <li><a href="index.html">Home</a></li>
            <li><a href="products.html">Browse Products</a></li>
            <li><a href="recipes.html">Organic Recipes</a></li>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="contact.html">Reach Us</a></li>
            <li><a href="login.html">Login & Portals</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="footer-links-title">Healthy Baskets</h3>
          <ul class="footer-links">
            <li><a href="products.html">Fresh Berries Selection</a></li>
            <li><a href="products.html">Organic Raw Juices</a></li>
            <li><a href="products.html">High-Protein Nuts</a></li>
            <li><a href="products.html">Whole Wheat Bakery</a></li>
            <li><a href="404.html">Gluten-Free Hampers</a></li>
          </ul>
        </div>
        
        <div>
          <h3 class="footer-links-title">Contact & Help</h3>
          <ul class="footer-links">
            <li><a href="contact.html">Support Desk</a></li>
            <li><a href="404.html">Return Policy</a></li>
            <li><a href="404.html">Delivery Tracking</a></li>
            <li><a href="contact.html">Farmers Network</a></li>
            <li><a href="404.html">Career Openings</a></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <p>&copy; 2026 Stackly Inc. All rights reserved. Made for premium organic grocery delivery.</p>
        
      </div>
    </footer>
  `;
}

/* ==========================================================================
   2. Mobile Drawer Navigation
   ========================================================================== */

function initMobileNav() {
  const toggleBtn = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const icon = toggleBtn.querySelector('i');
      if (navMenu.classList.contains('open')) {
        icon.className = 'fa-solid fa-xmark';
      } else {
        icon.className = 'fa-solid fa-bars';
      }
    });
  }
}

/* ==========================================================================
   3. Preloader & imagesLoaded
   ========================================================================== */

function initPreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  // Optimize preloader speed: vanish safety timeout in 800ms
  if (typeof jQuery !== 'undefined' && typeof $.fn.imagesLoaded !== 'undefined') {
    $('body').imagesLoaded(() => {
      fadeOutPreloader(preloader);
    });
  } else {
    window.addEventListener('load', () => {
      fadeOutPreloader(preloader);
    });
  }
  
  // High-performance fallback timeout (800ms) to prevent long wait-times
  setTimeout(() => {
    fadeOutPreloader(preloader);
  }, 800);
}

function fadeOutPreloader(preloader) {
  if (preloader.classList.contains('loaded')) return;
  preloader.classList.add('loaded');

  // Snappy GSAP entrance animations (reduced delays and durations)
  if (typeof gsap !== 'undefined') {
    gsap.from('.hero-subtitle', { opacity: 0, y: -15, duration: 0.4, delay: 0.05 });
    gsap.from('.hero-title', { opacity: 0, x: -30, duration: 0.5, delay: 0.1 });
    gsap.from('.hero-text', { opacity: 0, y: 15, duration: 0.4, delay: 0.15 });
    gsap.from('.hero-actions', { opacity: 0, scale: 0.95, duration: 0.3, delay: 0.2 });
    gsap.from('.hero-image-wrap', { opacity: 0, scale: 0.9, duration: 0.6, delay: 0.1, ease: "power2.out" });
  }
}

/* ==========================================================================
   4. Scroll Animations (AOS & Jarallax)
   ========================================================================== */

function initScrollAnimations() {
  // Initialize AOS (Animate on Scroll) with responsive fast offsets
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 450,
      easing: 'ease-out',
      once: true,
      offset: 40
    });
  }

  // Initialize Jarallax Parallax
  if (typeof jarallax !== 'undefined') {
    jarallax(document.querySelectorAll('.jarallax'), {
      speed: 0.5
    });
  }
}

/* ==========================================================================
   5. Lettering.js & CircleType.js
   ========================================================================== */

function initTextEffects() {
  // Lettering.js - make letters animate on hover of section titles
  if (typeof jQuery !== 'undefined' && typeof $.fn.lettering !== 'undefined') {
    $('.lettering-title').lettering();
    
    // Add subtle CSS transition and hover styles to letters
    $('.lettering-title span').css({
      'display': 'inline-block',
      'transition': 'transform 0.3s ease, color 0.3s ease',
      'cursor': 'default'
    }).hover(
      function() {
        $(this).css({
          'transform': 'translateY(-10px) rotate(10deg)',
          'color': 'var(--color-accent)'
        });
      },
      function() {
        $(this).css({
          'transform': 'translateY(0) rotate(0)',
          'color': ''
        });
      }
    );
  }

  // CircleType.js - curved organic certified stamp text
  const circleEl = document.getElementById('curved-text-badge');
  if (circleEl && typeof CircleType !== 'undefined') {
    new CircleType(circleEl).radius(55);
  }
}

/* ==========================================================================
   6. Carousel Sliders (Owl Carousel, Slick, Tiny Slider)
   ========================================================================== */

function initSliders() {
  const jQueryExists = typeof jQuery !== 'undefined';

  // 1. Featured Category Carousel (Owl Carousel)
  if (jQueryExists && typeof $.fn.owlCarousel !== 'undefined' && $('.owl-carousel').length) {
    $('.owl-carousel').owlCarousel({
      loop: true,
      margin: 20,
      nav: false,
      dots: false,
      autoplay: true,
      autoplayTimeout: 4000,
      responsive: {
        0: { items: 1 },
        480: { items: 2 },
        768: { items: 3 },
        992: { items: 4 }
      }
    });
  }

  // 2. Customer Reviews (Slick Carousel)
  if (jQueryExists && typeof $.fn.slick !== 'undefined' && $('.slick-testimonial-slider').length) {
    $('.slick-testimonial-slider').slick({
      dots: false,
      infinite: true,
      speed: 600,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 5000,
      arrows: false
    });
  }

  // 3. Meet the Farmers Slider (Tiny Slider / tns)
  if (typeof tns !== 'undefined' && document.querySelector('.tiny-slider-team')) {
    tns({
      container: '.tiny-slider-team',
      items: 1,
      slideBy: 'page',
      autoplay: true,
      autoplayButtonOutput: false,
      controls: false,
      nav: false,
      mouseDrag: true,
      responsive: {
        576: { items: 2 },
        992: { items: 3 }
      }
    });
  }
}

/* ==========================================================================
   7. Isotope Product Filtering
   ========================================================================== */

function initIsotope() {
  if (typeof jQuery !== 'undefined' && typeof Isotope !== 'undefined' && $('.product-grid').length) {
    // Initialise Isotope
    const $grid = $('.product-grid').isotope({
      itemSelector: '.col-md-4, .col-sm-6',
      layoutMode: 'fitRows'
    });

    // Filter items on button click
    $('.product-filter-nav').on('click', 'button', function() {
      const filterValue = $(this).attr('data-filter');
      $grid.isotope({ filter: filterValue });

      $('.product-filter-nav button').removeClass('active');
      $(this).addClass('active');
    });

    // Run layout again after images are loaded (to prevent overlap)
    if (typeof $.fn.imagesLoaded !== 'undefined') {
      $grid.imagesLoaded().progress(function() {
        $grid.isotope('layout');
      });
    }
  }
}

/* ==========================================================================
   8. Daily Deal Countdown Timer
   ========================================================================== */

function initCountdown() {
  const countdownEl = document.getElementById('deal-countdown');
  if (!countdownEl) return;

  // Set target date to 48 hours from current local time
  const targetDate = new Date();
  targetDate.setHours(targetDate.getHours() + 48);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance < 0) {
      countdownEl.innerHTML = "EXPIRED";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (num) => String(num).padStart(2, '0');

    document.getElementById('days-val').innerText = pad(days);
    document.getElementById('hours-val').innerText = pad(hours);
    document.getElementById('mins-val').innerText = pad(minutes);
    document.getElementById('secs-val').innerText = pad(seconds);
  }

  updateTimer();
  const timerInterval = setInterval(updateTimer, 1000);
}

/* ==========================================================================
   9. Price Range Filter (noUiSlider & wNumb)
   ========================================================================== */

function initPriceSlider() {
  const sliderEl = document.getElementById('price-slider-widget');
  if (!sliderEl || typeof noUiSlider === 'undefined') return;

  noUiSlider.create(sliderEl, {
    start: [5, 45],
    connect: true,
    range: {
      'min': 0,
      'max': 60
    },
    format: typeof wNumb !== 'undefined' ? wNumb({
      decimals: 2,
      prefix: '₹'
    }) : {
      to: (v) => '₹' + Number(v).toFixed(2),
      from: (v) => Number(v.replace('₹', '').replace('$',''))
    }
  });

  const rangeValEl = document.getElementById('price-range-val');
  if (rangeValEl) {
    sliderEl.noUiSlider.on('update', function (values) {
      rangeValEl.innerText = values.join(' - ');
    });
  }
}

/* ==========================================================================
   10. Custom Dropdowns, jQuery UI & Validate
   ========================================================================== */

function initFormsAndWidgets() {
  const jQueryExists = typeof jQuery !== 'undefined';

  // 1. Custom Bootstrap-Select Simulator
  const selectTrigger = document.querySelector('.custom-select-trigger');
  const selectOptions = document.querySelector('.custom-options');
  if (selectTrigger && selectOptions) {
    selectTrigger.addEventListener('click', (e) => {
      e.stopPropagation();
      selectOptions.classList.toggle('open');
    });

    document.addEventListener('click', () => {
      selectOptions.classList.remove('open');
    });

    document.querySelectorAll('.custom-option').forEach(opt => {
      opt.addEventListener('click', function() {
        const text = this.innerText;
        const val = this.getAttribute('data-value');
        selectTrigger.querySelector('span').innerText = text;
        const input = document.getElementById('selected-planner-goal');
        if (input) input.value = val;
        
        // Custom interactive animation
        if (typeof gsap !== 'undefined') {
          gsap.fromTo('.planner-result-card', { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.5 });
        }
      });
    });
  }

  // 2. jQuery UI Datepicker & Accordion
  if (jQueryExists && typeof $.ui !== 'undefined') {
    // Accordion setup
    if ($('.faq-accordion').length) {
      $('.faq-accordion').accordion({
        collapsible: true,
        heightStyle: "content",
        active: false
      });
    }

    // Datepicker
    if ($('.datepicker-input').length) {
      $('.datepicker-input').datepicker({
        minDate: 0,
        dateFormat: "yy-mm-dd"
      });
    }
  }

  // 3. Magnific Popup for video lightboxes and galleries
  if (jQueryExists && typeof $.fn.magnificPopup !== 'undefined') {
    // Video Lightbox
    $('.video-popup-link').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      removalDelay: 160,
      preloader: false,
      fixedContentPos: false
    });

    // Gallery Lightbox
    $('.gallery-popup-grid').magnificPopup({
      delegate: 'a',
      type: 'image',
      gallery: {
        enabled: true
      }
    });
  }

  // 4. jQuery Validation
  if (jQueryExists && typeof $.fn.validate !== 'undefined') {
    // Newsletter form
    $('.newsletter-form').validate({
      rules: {
        email: { required: true, email: true }
      },
      messages: {
        email: { required: "Please enter your email address.", email: "Please enter a valid email." }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        alert("Success! Thank you for subscribing to Stackly newsletter.");
        form.reset();
      }
    });

    // Contact form
    $('.contact-form').validate({
      rules: {
        name: { required: true, minlength: 2 },
        email: { required: true, email: true },
        subject: { required: true },
        message: { required: true, minlength: 10 }
      },
      messages: {
        name: "Please enter your name (min 2 characters).",
        email: "Please enter a valid email address.",
        subject: "Please specify a subject.",
        message: "Please write your message (min 10 characters)."
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        alert("Thank you! Your message has been sent to the Stackly support team.");
        form.reset();
      }
    });
  }

  // 5. jQuery Appear: Number Counting Animation
  if (jQueryExists && typeof $.fn.appear !== 'undefined') {
    $('.count-num').appear(function() {
      const $this = $(this);
      const target = parseInt($this.attr('data-count'), 10);
      $({ countNum: 0 }).animate({ countNum: target }, {
        duration: 2000,
        easing: 'swing',
        step: function() {
          $this.text(Math.floor(this.countNum));
        },
        complete: function() {
          $this.text(this.countNum + "+");
        }
      });
    });
  }

  // 6. Validate-before-redirect anchors: require specific inputs before allowing navigation
  document.querySelectorAll('.validate-before-redirect').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const selector = this.getAttribute('data-required-selector');
      if (selector) {
        const requiredEl = document.querySelector(selector);
        const val = requiredEl ? (requiredEl.value || requiredEl.getAttribute('value') || '').toString().trim() : '';
        if (!val) {
          e.preventDefault();
          alert('Please complete the required selection before continuing.');
          return false;
        }
      }
    });
  });

  // Redirect all product "add" buttons to 404 page (as requested)
  document.querySelectorAll('.add-cart-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      // Optionally animate or show message before redirect
      try { this.classList.add('disabled'); } catch (err) {}
      window.location.href = '404.html';
    });
  });
}
