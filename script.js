(function () {
  "use strict";

  var CLINIC_PHONE = "919063139724";
  var INSTAGRAM_URL = ""; // TODO: add clinic's official Instagram profile URL here, e.g. "https://instagram.com/rxhealthcareanddentallounge"

  /* ---------- Sticky header shadow ---------- */
  var header = document.getElementById("siteHeader");
  function onScroll() {
    if (window.scrollY > 8) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile nav toggle ---------- */
  var hamburger = document.getElementById("hamburgerBtn");
  var mobileNav = document.getElementById("mobileNav");

  function closeMobileNav() {
    hamburger.classList.remove("is-open");
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
    document.body.style.overflow = "";
  }
  function openMobileNav() {
    hamburger.classList.add("is-open");
    hamburger.setAttribute("aria-expanded", "true");
    mobileNav.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  hamburger.addEventListener("click", function () {
    if (mobileNav.classList.contains("is-open")) {
      closeMobileNav();
    } else {
      openMobileNav();
    }
  });

  mobileNav.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", closeMobileNav);
  });

  window.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeMobileNav();
  });

  /* ---------- Instagram placeholder wiring ---------- */
  var igLink = document.getElementById("instagramLink");
  if (igLink) {
    if (INSTAGRAM_URL) {
      igLink.href = INSTAGRAM_URL;
    } else {
      igLink.href = "#";
      igLink.addEventListener("click", function (e) {
        e.preventDefault();
      });
      igLink.setAttribute("title", "Instagram link coming soon");
    }
  }

  /* ---------- Enquiry form -> WhatsApp ---------- */
  var form = document.getElementById("enquiryForm");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      var name = form.fname.value.trim();
      var phone = form.fphone.value.trim();
      var email = form.femail.value.trim();
      var dept = form.fdept.value;
      var date = form.fdate.value;
      var time = form.ftime.value;
      var message = form.fmessage.value.trim();

      var lines = [
        "Hello RX Healthcare And Dental Lounge,",
        "",
        "I would like to request a consultation.",
        "",
        "Name: " + (name || "-"),
        "Phone: " + (phone || "-"),
        "Department: " + (dept || "-"),
        "Preferred Date: " + (date || "-"),
        "Preferred Time: " + (time || "-")
      ];
      if (email) lines.push("Email: " + email);
      lines.push("Message: " + (message || "-"));

      var text = encodeURIComponent(lines.join("\n"));
      var url = "https://wa.me/" + CLINIC_PHONE + "?text=" + text;
      window.open(url, "_blank", "noopener");
    });
  }

  /* ---------- Scroll reveal (progressive enhancement) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    document.documentElement.classList.add("js-reveal");
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach(function (el) { io.observe(el); });
  }
})();
