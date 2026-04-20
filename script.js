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

  // --- Contact form opens email client ---
  const form = document.getElementById("contactForm");

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
    const to = "info@powerdiagnostics.com";
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
})();
