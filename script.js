const header = document.querySelector("[data-elevate]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-elevated", window.scrollY > 8);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

if (window.lucide) {
  window.lucide.createIcons();
}

document.querySelectorAll("[data-carousel]").forEach((carousel) => {
  const slides = Array.from(carousel.querySelectorAll("[data-carousel-slide]"));
  const prev = carousel.querySelector("[data-carousel-prev]");
  const next = carousel.querySelector("[data-carousel-next]");
  const dotsWrap = carousel.querySelector("[data-carousel-dots]");
  let active = Math.max(0, slides.findIndex((slide) => slide.classList.contains("is-active")));

  if (!slides.length) return;

  const dots = slides.map((_, index) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.setAttribute("aria-label", `Ver depoimento ${index + 1}`);
    dot.addEventListener("click", () => show(index));
    dotsWrap?.appendChild(dot);
    return dot;
  });

  function show(index) {
    active = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === active;
      slide.classList.toggle("is-active", isActive);
      slide.toggleAttribute("hidden", !isActive);
    });
    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("is-active", dotIndex === active);
      dot.setAttribute("aria-current", dotIndex === active ? "true" : "false");
    });
  }

  prev?.addEventListener("click", () => show(active - 1));
  next?.addEventListener("click", () => show(active + 1));
  carousel.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") show(active - 1);
    if (event.key === "ArrowRight") show(active + 1);
  });

  carousel.tabIndex = 0;
  show(active);
});

function formatPhone(value) {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits;
  if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

document.querySelectorAll("[data-phone-mask]").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatPhone(input.value);
  });

  input.addEventListener("blur", () => {
    input.value = formatPhone(input.value);
  });
});

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const telefoneDigits = telefone.replace(/\D/g, "");
    if (telefoneDigits.length !== 11) {
      const phoneInput = form.querySelector("[data-phone-mask]");
      phoneInput?.setCustomValidity("Informe o telefone com DDD e 9 dígitos.");
      phoneInput?.reportValidity();
      phoneInput?.setCustomValidity("");
      return;
    }
    const doctor = form.dataset.doctor || "Dr. Thiago Cerqueira";
    const phone = form.dataset.phone || "5561996079061";
    const message = encodeURIComponent(`Olá, gostaria de agendar uma avaliação com ${doctor}.\n\nNome: ${nome}\nTelefone: ${telefone}`);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit", form_name: "cta_agendamento_thiago" });

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
    form.reset();
  });
});
