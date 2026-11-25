/* AfyaPlus Tanzania — small progressive enhancements. The site works without this file. */
(function () {
  "use strict";
  var doc = document.documentElement;
  doc.classList.add("js");

  /* header shadow */
  var top = document.getElementById("top");
  var onScroll = function () { if (top) top.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* mobile menu */
  var burger = document.querySelector(".burger");
  var mnav = document.getElementById("mnav");
  if (burger && mnav) {
    burger.addEventListener("click", function () {
      var open = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!open));
      mnav.hidden = open;
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && burger.getAttribute("aria-expanded") === "true") {
        burger.setAttribute("aria-expanded", "false"); mnav.hidden = true; burger.focus();
      }
    });
  }

  /* carousels */
  document.querySelectorAll(".arrows").forEach(function (box) {
    var btns = box.querySelectorAll(".arr");
    var track = document.getElementById(btns[0].getAttribute("aria-controls"));
    if (!track) return;
    var update = function () {
      var max = track.scrollWidth - track.clientWidth - 2;
      btns[0].disabled = track.scrollLeft <= 2;
      btns[1].disabled = track.scrollLeft >= max;
      btns[0].classList.toggle("arr--on", !btns[0].disabled && btns[1].disabled);
      btns[1].classList.toggle("arr--on", !btns[1].disabled);
    };
    btns.forEach(function (b) {
      b.addEventListener("click", function () {
        var card = track.querySelector("li");
        var step = card ? card.getBoundingClientRect().width + 22 : track.clientWidth;
        track.scrollBy({ left: step * Number(b.dataset.dir), behavior: "smooth" });
      });
    });
    track.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
  });

  /* WhatsApp message builders */
  var wa = function (num, lines) {
    return "https://wa.me/" + num + "?text=" + encodeURIComponent(lines.filter(Boolean).join("\n"));
  };
  document.querySelectorAll(".cbar").forEach(function (bar) {
    var go = bar.querySelector(".cbar__go");
    var get = function (n) { var el = bar.querySelector('[name="' + n + '"]'); return el ? el.value : ""; };
    var d = bar.dataset;
    var update = function () {
      go.href = wa(d.wa, [d.hello, d.lAbout + ": " + get("topic"), d.lLang + ": " + get("lang"), d.lTime + ": " + get("time")]);
    };
    bar.addEventListener("change", update);
    update();
  });
  var form = document.getElementById("cform");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var d = form.dataset;
      var name = form.elements.name.value.trim();
      var msg = form.elements.msg.value.trim();
      var lang = form.querySelector('input[name="lang"]:checked');
      var href = wa(d.wa, [d.hello, name ? d.lName + ": " + name : "", d.lAbout + ": " + form.elements.topic.value,
        d.lLang + ": " + (lang ? lang.value : ""), msg ? d.lMsg + ": " + msg : ""]);
      window.open(href, "_blank", "noopener");
    });
  }

  /* reveal on scroll */
  var items = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  }
})();
