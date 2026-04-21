// Power Diagnostics — Minimal Scripts

(function () {
  "use strict";

  // --- Navbar scroll effect ---
  const navbar = document.getElementById("mainNav");

  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll(); // set initial state

  // --- Auto-close mobile nav on link click ---
  const navCollapse = document.getElementById("navMenu");
  const bsCollapse = bootstrap.Collapse.getOrCreateInstance(navCollapse, {
    toggle: false,
  });

  // Close mobile nav when clicking nav links (except dropdown toggle)
  document.querySelectorAll("#navMenu .nav-link:not(.dropdown-toggle)").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // Close mobile nav when clicking dropdown items
  document.querySelectorAll("#navMenu .dropdown-item").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // --- Contact form opens email client ---
  const form = document.getElementById("contactForm");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.classList.add("was-validated");
        return;
      }

      // Get form values
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;

      // Build mailto link
      const to = "info@power-diagnostics.com";
      const subject = encodeURIComponent(`Contact Form Submission from ${name}`);
      const body = encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      );
      
      const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;

      // Open email client
      window.location.href = mailtoLink;

      // Show feedback
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Opening Email...';
      btn.disabled = true;
      btn.classList.add("btn-success");
      btn.classList.remove("btn-accent");

      setTimeout(function () {
        btn.innerHTML = originalText;
        btn.disabled = false;
        btn.classList.remove("btn-success");
        btn.classList.add("btn-accent");
        form.reset();
        form.classList.remove("was-validated");
      }, 2000);
    });
  }

  // --- Scroll animations with Intersection Observer ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with animation classes
  const animatedElements = document.querySelectorAll(
    '.animate-on-scroll, .slide-in-left, .slide-in-right, .fade-in, .scale-in'
  );
  
  animatedElements.forEach(function(el) {
    observer.observe(el);
  });

  // Trigger hero animations immediately
  setTimeout(function() {
    document.querySelectorAll('.hero-section .slide-in-left').forEach(function(el) {
      el.classList.add('animated');
    });
  }, 200);

  // --- Counter animation for About section stats ---
  function animateCounter(element, target, duration, suffix) {
    let current = 0;
    const increment = target / (duration / 16); // 60fps
    const timer = setInterval(function() {
      current += increment;
      if (current >= target) {
        element.textContent = target + suffix;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + suffix;
      }
    }, 16);
  }

  // Special observer for stat counters
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        
        // Find the counter element within this stat
        const counterElement = entry.target.querySelector('.fw-bold');
        if (counterElement && !counterElement.dataset.counted) {
          counterElement.dataset.counted = 'true';
          const text = counterElement.textContent.trim();
          
          // Parse the number and suffix
          if (text.includes('+')) {
            const num = parseInt(text.replace('+', ''));
            counterElement.textContent = '0+';
            animateCounter(counterElement, num, 1500, '+');
          } else if (text.includes('%')) {
            const num = parseInt(text.replace('%', ''));
            counterElement.textContent = '0%';
            animateCounter(counterElement, num, 1500, '%');
          } else if (text.includes('/')) {
            // For "24/7", just fade it in without counting
            counterElement.style.opacity = '0';
            setTimeout(function() {
              counterElement.style.transition = 'opacity 0.6s ease';
              counterElement.style.opacity = '1';
            }, 500);
          }
        }
        
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  // Observe stats in About section
  document.querySelectorAll('.d-flex.gap-4 > div').forEach(function(stat) {
    statsObserver.observe(stat);
  });

  // --- Sectors Carousel Auto-play ---
  const sectorsCarousel = document.getElementById('sectorsCarousel');
  if (sectorsCarousel) {
    const carousel = new bootstrap.Carousel(sectorsCarousel, {
      interval: 5000,
      wrap: true,
      keyboard: true
    });

    // Pause on hover
    sectorsCarousel.addEventListener('mouseenter', function() {
      carousel.pause();
    });

    sectorsCarousel.addEventListener('mouseleave', function() {
      carousel.cycle();
    });
  }
})();
