// Header: mobile menu + active link
const header = document.querySelector(".header");
document.querySelector(".menu-toggle")?.addEventListener("click", () => header.classList.toggle("open"));
const page = location.pathname.split("/").pop().replace(".html", "") || "index";
document.querySelectorAll(".nav a, .mobile-menu a").forEach((a) => {
  if (a.getAttribute("href").replace(".html", "").replace("./", "") === page) a.classList.add("active");
});

// Scroll reveal
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Location accordion (one open at a time)
document.querySelectorAll(".acc__btn").forEach((btn) =>
  btn.addEventListener("click", () => {
    const item = btn.parentElement;
    const wasOpen = item.classList.contains("open");
    item.parentElement.querySelectorAll(".acc__item").forEach((i) => i.classList.remove("open"));
    if (!wasOpen) item.classList.add("open");
  })
);

// Duplicate marquee / collage tracks for a seamless loop
document.querySelectorAll(".marquee").forEach((m) => {
  const t = m.querySelector(".marquee__track");
  m.appendChild(t.cloneNode(true)).setAttribute("aria-hidden", "true");
});
document.querySelectorAll(".collage__col .track").forEach((t) => (t.innerHTML += t.innerHTML));

// Interior hero slideshow
const slides = document.querySelectorAll(".slides img");
if (slides.length) {
  let i = 0;
  slides[0].classList.add("on");
  setInterval(() => {
    slides[i].classList.remove("on");
    i = (i + 1) % slides.length;
    slides[i].classList.add("on");
  }, 4500);
}

// Enquiry form (static site: opens the visitor's mail client with the details)
document.querySelectorAll(".enquiry-form").forEach((form) =>
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (form.website.value) return; // honeypot
    const d = Object.fromEntries(new FormData(form));
    const body = [
      `Name: ${d.fullName}`,
      `Mobile: ${d.mobile}`,
      `Email: ${d.email}`,
      `Interested in: ${d.interest || "-"}`,
      `Preferred date: ${d.visitDate || "-"}`,
      `Preferred time: ${d.visitTime || "-"}`,
    ].join("\n");
    location.href = `mailto:sandhatrijv@gmail.com?subject=${encodeURIComponent("AMARA ONE enquiry — " + d.fullName)}&body=${encodeURIComponent(body)}`;
    form.querySelector(".form-note").textContent = "Thank you — our consultant will be in touch shortly.";
    form.reset();
  })
);
