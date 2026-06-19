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

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "campaign_id",
  "adset_name",
  "adset_id",
  "ad_id",
  "placement",
  "platform",
  "gclid",
  "fbclid",
  "gbraid",
  "wbraid",
  "msclkid",
  "ttclid",
  "device",
  "user_agent",
  "page_url",
  "referrer",
  "pagina",
  "fbp",
  "fbc"
];

function getTrackingData() {
  let tracking = {};

  try {
    if (typeof window.getTracking === "function") {
      tracking = window.getTracking() || {};
    }
  } catch (_) {
    tracking = {};
  }

  return TRACKING_KEYS.reduce((data, key) => {
    const value = tracking[key];
    data[key] = value === undefined || value === null ? "" : String(value);
    return data;
  }, {});
}

document.querySelectorAll("[data-phone-mask]").forEach((input) => {
  input.addEventListener("input", () => {
    input.value = formatPhone(input.value);
  });

  input.addEventListener("blur", () => {
    input.value = formatPhone(input.value);
  });
});

const leadModal = document.querySelector("[data-lead-modal]");
let leadModalLastFocus = null;

function openLeadModal(event) {
  event?.preventDefault();
  if (!leadModal) return;
  leadModalLastFocus = document.activeElement;
  leadModal.hidden = false;
  document.body.classList.add("modal-open");
  const firstInput = leadModal.querySelector("input");
  window.setTimeout(() => firstInput?.focus(), 50);
}

function closeLeadModal() {
  if (!leadModal) return;
  leadModal.hidden = true;
  document.body.classList.remove("modal-open");
  if (leadModalLastFocus && typeof leadModalLastFocus.focus === "function") {
    leadModalLastFocus.focus();
  }
}

document.querySelectorAll("[data-open-lead-modal]").forEach((trigger) => {
  trigger.addEventListener("click", openLeadModal);
});

document.querySelectorAll("[data-close-lead-modal]").forEach((trigger) => {
  trigger.addEventListener("click", closeLeadModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && leadModal && !leadModal.hidden) {
    closeLeadModal();
  }
});

document.querySelectorAll(".lead-form").forEach((form) => {
  let isSubmitting = false;

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (isSubmitting) return;
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
    const webhook = form.dataset.webhook || form.getAttribute("action");
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonContent = submitButton?.innerHTML;
    const webhookData = new FormData(form);
    const trackingData = getTrackingData();
    webhookData.set("nome", nome);
    webhookData.set("telefone", telefone);
    webhookData.set("telefone_digits", telefoneDigits);
    webhookData.set("medico", doctor);
    webhookData.set("origem", window.location.href);
    webhookData.set("evento", "lead_form_submit");
    webhookData.set("timestamp", new Date().toISOString());
    TRACKING_KEYS.forEach((key) => webhookData.set(key, trackingData[key]));

    isSubmitting = true;
    form.setAttribute("aria-busy", "true");
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.innerHTML = "Enviando...";
    }

    // Abre uma aba vazia durante o gesto do usuário para evitar bloqueio de popup
    // enquanto o webhook recebe os dados.
    const whatsAppWindow = window.open("", "_blank");

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit", form_name: "cta_agendamento_thiago" });

    try {
      if (webhook) {
        await fetch(webhook, {
          method: "POST",
          mode: "no-cors",
          body: webhookData
        });
      }
    } catch (_) {
      // O WhatsApp continua disponível mesmo quando o webhook estiver indisponível.
    } finally {
      if (whatsAppWindow) {
        whatsAppWindow.location.href = `https://wa.me/${phone}?text=${message}`;
      } else {
        window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
      }

      form.reset();
      closeLeadModal();
      form.removeAttribute("aria-busy");
      isSubmitting = false;
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonContent;
      }
    }
  });
});
