"""Verificador de icones das paginas regionais.

Dois checks:
1. Dominio clinico (ERRO, bloqueia): um icone de card nao pode conter um token
   de um dominio clinico diferente do dominio da pagina. Pega casos como um
   icone de pulso cardiaco (cardiologia) numa pagina de ortopedia.
2. Duplicidade na pagina inteira (AVISO, nao bloqueia): reporta icones
   repetidos entre secoes da mesma pagina, para revisao humana — repeticao
   pode ser aceitavel quando os dois cards descrevem o mesmo conceito clinico
   (ver mapa-icones.md), entao isso nao falha a build sozinho.

Uso: python3 check-icon-domains.py <pasta-do-repo-da-lp>
"""

import re
import sys
import os

REGIONS = ["coluna", "joelho", "ombro", "quadril", "mao-punho", "pe-tornozelo"]

# Dominio declarado de cada pagina desta LP. Para uma LP de outra especialidade,
# ajuste este mapa (ver CONTRIBUTING.md do repo de processo).
PAGE_DOMAIN = {r: "ortopedia" for r in REGIONS}

# Tokens que identificam um dominio clinico a partir do nome do icone (arquivo
# ou slug lucide). Se um icone usado numa pagina contiver um token de um
# dominio diferente do dominio da pagina, isso e um erro.
DOMAIN_TOKENS = {
    "cardiologia": ["pulse", "cardio", "heart", "ecg", "cardiogram"],
    "oftalmologia": ["eye", "vision", "eyeglass"],
    "odontologia": ["tooth", "dental"],
    "seguranca-generica": ["lock", "shield", "key", "padlock"],
}

# Icones genericos-clinicos legitimamente usados em qualquer especialidade —
# nunca devem disparar erro de dominio, mesmo que compartilhem um token com
# a lista acima por coincidencia de nome.
DOMAIN_ALLOWLIST = {
    "stethoscope", "syringe", "xray", "medical-records", "traumatism",
    "skeleton", "pain-outline", "weights", "walking", "joints",
}

section_class = "regional-card-grid|regional-care-grid"
icon_pat = re.compile(r'(?:src="[^"]*/([\w.-]+)\.svg"|data-lucide="([\w-]+)")')
title_pat = re.compile(r'<h3>([^<]*)</h3>')


def find_domain_violations(icon_name, page_domain):
    name = icon_name.lower()
    if any(allow in name for allow in DOMAIN_ALLOWLIST):
        return None
    for domain, tokens in DOMAIN_TOKENS.items():
        if domain == page_domain:
            continue
        for tok in tokens:
            if tok in name:
                return domain
    return None


def audit_page(path, region):
    with open(path, encoding="utf-8") as f:
        html = f.read()

    page_domain = PAGE_DOMAIN.get(region, "ortopedia")
    parts = re.split(r'<section class="section regional-section', html)

    errors = []
    warnings = []
    seen_page_wide = {}

    for part in parts[1:]:
        block = part.split("</section>")[0]
        icons = icon_pat.findall(block)
        icons = [a or b for a, b in icons]
        titles = title_pat.findall(block)
        if not titles:
            continue

        for icon, title in zip(icons, titles):
            violation = find_domain_violations(icon, page_domain)
            if violation:
                errors.append(
                    f'[{region}] ERRO DE DOMINIO: icone "{icon}" no card '
                    f'"{title}" contem token de dominio "{violation}", '
                    f'mas a pagina e de dominio "{page_domain}".'
                )
            seen_page_wide.setdefault(icon, []).append(title)

    for icon, titles in seen_page_wide.items():
        if len(titles) > 1:
            warnings.append(
                f'[{region}] aviso: icone "{icon}" repetido na pagina inteira '
                f'em {len(titles)} cards: {titles}. Confirme no mapa-icones.md '
                f'que e reuso documentado (mesmo conceito clinico), nao aleatorio.'
            )

    return errors, warnings


def main():
    base = sys.argv[1] if len(sys.argv) > 1 else "."
    all_errors = []
    all_warnings = []

    for region in REGIONS:
        path = os.path.join(base, region, "index.html")
        if not os.path.exists(path):
            continue
        errors, warnings = audit_page(path, region)
        all_errors.extend(errors)
        all_warnings.extend(warnings)

    if all_warnings:
        print("--- Avisos de duplicidade (revisar, nao bloqueia) ---")
        for w in all_warnings:
            print(w)
        print()

    if all_errors:
        print("--- Erros de dominio clinico (bloqueia) ---")
        for e in all_errors:
            print(e)
        sys.exit(1)

    print("OK: nenhum icone de dominio clinico incorreto encontrado.")


if __name__ == "__main__":
    main()
