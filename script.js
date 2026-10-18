// Starfield              `         
const cv = document.getElementById("stars"), cx = cv.getContext("2d");
let stars = [];
function sizeStars() { cv.width = innerWidth; cv.height = innerHeight; stars = Array.from({ length: 90 }, () => ({ x: Math.random() * cv.width, y: Math.random() * cv.height, r: Math.random() * 1.3 + .2, s: Math.random() * .25 + .05, p: Math.random() * 6 })); }
sizeStars(); addEventListener("resize", sizeStars);
(function draw(t = 0) {
  cx.clearRect(0, 0, cv.width, cv.height);
  stars.forEach(s => { s.y = (s.y + s.s) % cv.height; cx.globalAlpha = .35 + .35 * Math.sin(t / 900 + s.p); cx.fillStyle = "#f5f3ff"; cx.beginPath(); cx.arc(s.x, s.y, s.r, 0, 7); cx.fill(); });
  requestAnimationFrame(draw);
})();

// Typing roles
const roles = ["Web Developer", "UI/UX Designer", "Problem-solving"], roleEl = document.getElementById("roleText");
let r = 0, c = 0, del = false;
(function type() {
  const w = roles[r]; roleEl.textContent = w.slice(0, del ? --c : ++c);
  let d = del ? 50 : 100;
  if (!del && c === w.length) { del = true; d = 1400; } else if (del && c === 0) { del = false; r = (r + 1) % roles.length; d = 300; }
  setTimeout(type, d);
})();

// Menu
const navLinks = document.getElementById("navLinks");
document.getElementById("menuBtn").onclick = () => navLinks.classList.toggle("open");
navLinks.querySelectorAll("a").forEach(a => a.onclick = () => navLinks.classList.remove("open"));

// Reveal + CGPA counter
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add("show");
  e.target.querySelectorAll("[data-n]").forEach(el => { const n = +el.dataset.n; let v = 0; const t = setInterval(() => { v = Math.min(n, v + n / 30); el.textContent = v.toFixed(2); if (v >= n) clearInterval(t); }, 35); });
  io.unobserve(e.target);
}), { threshold: .12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// Active link + back to top
const links = [...navLinks.querySelectorAll("a")];
const spy = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) links.forEach(l => l.classList.toggle("active", l.getAttribute("href") === "#" + e.target.id)); }), { rootMargin: "-45% 0px -50% 0px" });
document.querySelectorAll("main section[id]").forEach(s => spy.observe(s));
const toTop = document.getElementById("top");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 500));

// ===== CERTIFICATES (files in certs/) =====
const certs = [
  { t: "Generative AI Foundations", by: "AWS Academy", d: "Sep 2025", cat: "AI", chips: ["12 hours", "Digital badge"], f: "https://media.licdn.com/dms/document/media/v2/D4D1FAQFTAJ2GJkaPOw/feedshare-document-url-metadata-scrapper-pdf/B4DZklMPg5HYA0-/0/1757265591651?e=1792836000&v=beta&t=Ux5KerfOxGIaUCuach_yvM3YGJVAly0MrM-MqqLag5U", v: "https://www.credly.com/badges/5fa1ecb8-5e34-41e6-8c54-c64d7b9e9cab" },
  { t: "OCI 2025 AI Foundations Associate", by: "Oracle University", d: "Mar 2026", cat: "AI", chips: ["Valid till Mar 2028"], f: "file:///C:/Users/kavip/Downloads/certificate.pdf" },
  { t: "Python for Data Science", by: "NPTEL, IIT Madras", d: "Jan to Feb 2025", cat: "Programming", score: "61%", elite: 1, chips: ["4-week course", "Assignments 22.5/25", "Exam 38.52/75"], f: "file:///C:/Users/kavip/Downloads/Python%20for%20Data%20Science.pdf" },
  { t: "Data Base Management System", by: "NPTEL, IIT Kharagpur", d: "Jan to Mar 2026", cat: "Programming", score: "60%", elite: 1, chips: ["8-week course", "Assignments 22.08/25", "Exam 37.5/75"], f: "file:///C:/Users/kavip/Downloads/nptel-1792232042349.pdf" },
  { t: "Design Thinking: A Primer", by: "NPTEL, IIT Madras", d: "Jul to Aug 2025", cat: "Design", score: "49%", chips: ["4-week course", "Assignments 18.75/25", "Exam 30/75"], f: "file:///C:/Users/kavip/Downloads/Design%20Thinking%20-%20A%20Primer.pdf" },
  { t: "Java: 50 Very-Easy Challenges", by: "SkillRack", d: "16 Oct 2026", cat: "Programming", chips: ["Completion"], f: "https://www.skillrack.com/faces/free/certificate.xhtml?t=cert&id=642752&key=ZQS"},
  { t: "SQL: Basics (Standard)", by: "SkillRack", d: "17 Aug 2026", cat: "Programming", chips: ["Completion"], f: "https://www.skillrack.com/faces/free/certificate.xhtml?t=cert&id=636162&key=HJQ" },
  { t: "Bronze Medals: 400", by: "SkillRack", d: "05 Aug 2025", cat: "Programming", chips: ["Completion"], f: "https://www.skillrack.com/faces/free/certificate.xhtml?t=cert&id=583794&key=SQU" }
];
const grid = document.getElementById("certGrid"), fil = document.getElementById("filters"), modal = document.getElementById("modal"), mBody = document.getElementById("mBody");
const el = (tag, cls, txt) => { const n = document.createElement(tag); if (cls) n.className = cls; if (txt) n.textContent = txt; return n; };
function render(cat) {
  grid.innerHTML = "";
  certs.filter(x => cat === "All" || x.cat === cat).forEach(x => {
    const d = el("div", "card cert"), top = el("div", "ctop"), bd = el("div", "badges");
    top.appendChild(el("div", "ico", "🎓"));
    if (x.score) bd.appendChild(el("span", "badge", "Score " + x.score));
    if (x.elite) bd.appendChild(el("span", "badge elite", "Elite"));
    top.appendChild(bd);
    d.append(top, el("h3", "", x.t), el("span", "by", x.by), el("span", "dt", x.d));
    const ch = el("div", "chips"); x.chips.forEach(k => ch.appendChild(el("span", "", k))); d.appendChild(ch);
    d.onclick = () => openCert(x); grid.appendChild(d);
  });
}
["All", ...new Set(certs.map(x => x.cat))].forEach((cat, i) => {
  const b = el("button", i ? "" : "on", cat);
  b.onclick = () => { fil.querySelectorAll("button").forEach(k => k.classList.remove("on")); b.classList.add("on"); render(cat); };
  fil.appendChild(b);
});
render("All");

function openCert(x) {
  document.getElementById("mTitle").textContent = x.t + " · " + x.by;
  document.getElementById("mOpen").href = x.f;
  const v = document.getElementById("mVerify"); v.style.display = x.v ? "" : "none"; if (x.v) v.href = x.v;
  const fallback = `<div class="nofile"><p>This certificate can't be previewed here.</p><a class="btn primary sm" href="${x.f}" target="_blank" rel="noopener">Open certificate ↗</a>${x.v ? ` <a class="btn outline sm" href="${x.v}" target="_blank" rel="noopener">Verify ↗</a>` : ""}</div>`;
  if (/\.pdf$/i.test(x.f)) {
    mBody.innerHTML = `<object data="${x.f}" type="application/pdf">${fallback}</object>`;
  } else {
    mBody.innerHTML = `<img src="${x.f}" alt="${x.t}">`;
    mBody.firstChild.onerror = () => { mBody.innerHTML = fallback; };
  }
  modal.classList.add("open");
}
const closeM = () => { modal.classList.remove("open"); mBody.innerHTML = ""; };
document.getElementById("mClose").onclick = closeM;
modal.onclick = e => { if (e.target === modal) closeM(); };
addEventListener("keydown", e => { if (e.key === "Escape") closeM(); });

// Contact form
document.getElementById("contactForm").addEventListener("submit", e => {
  e.preventDefault();
  const n = name.value.trim(), m = message.value.trim(), em = email.value.trim();
  location.href = `mailto:kavipriya.skip@gmail.com?subject=${encodeURIComponent("Portfolio enquiry from " + n)}&body=${encodeURIComponent(m + "\n\nFrom: " + n + " (" + em + ")")}`;
  document.getElementById("formStatus").textContent = "Opening your email app…";
});
document.getElementById("year").textContent = new Date().getFullYear();

// Experience tabs
const tabs=[...document.querySelectorAll("#expTabs button")],panels=[...document.querySelectorAll(".exp-panel")];
tabs.forEach(b=>b.onclick=()=>{tabs.forEach((x,i)=>{x.classList.toggle("on",x===b);panels[i].classList.toggle("on",x===b)})});