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

document.querySelectorAll(".lead-form").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const nome = String(data.get("nome") || "").trim();
    const telefone = String(data.get("telefone") || "").trim();
    const doctor = form.dataset.doctor || "Dr. Thiago Cerqueira";
    const phone = form.dataset.phone || "5561996079061";
    const message = encodeURIComponent(`Olá, gostaria de agendar uma avaliação com ${doctor}.\n\nNome: ${nome}\nTelefone: ${telefone}`);

    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "lead_form_submit", form_name: "cta_agendamento_thiago" });

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank", "noopener");
    form.reset();
  });
});
