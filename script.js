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

  document.querySelectorAll("#navMenu .nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      if (navCollapse.classList.contains("show")) {
        bsCollapse.hide();
      }
    });
  });

  // --- Contact form client-side validation feedback ---
  const form = document.getElementById("contactForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    // Static site — show success feedback, reset form
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="bi bi-check-circle me-1"></i> Message Sent!';
    btn.disabled = true;
    btn.classList.add("btn-success");
    btn.classList.remove("btn-accent");

    form.reset();
    form.classList.remove("was-validated");

    setTimeout(function () {
      btn.innerHTML = originalText;
      btn.disabled = false;
      btn.classList.remove("btn-success");
      btn.classList.add("btn-accent");
    }, 3000);
  });
})();
