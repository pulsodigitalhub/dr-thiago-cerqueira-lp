# Ícones de tópicos das LPs regionais

SVGs usados nos cards de sintomas, causas e avaliação das páginas regionais.

Fontes:

- Health Icons — CC0/public domain: https://healthicons.org/
- Material Symbols — Apache 2.0: https://icon-sets.iconify.design/material-symbols/
- Medical Icons — MIT: https://icon-sets.iconify.design/medical-icon/
- Huge Icons — MIT: https://icon-sets.iconify.design/hugeicons/

Os arquivos foram baixados como SVGs locais para evitar dependência de CDN no carregamento das páginas.

## Ícones compostos

Dois arquivos não vêm de um único set do Iconify — são SVGs desenhados à mão combinando dois ícones literais do mesmo domínio clínico, para conceitos sem ícone literal próprio (bucket B, ver `docs/repertorio-icones.md` no repo de processo):

- `composto-coluna-alerta.svg` — coluna (healthicons:spine-outline) + alerta (material-symbols:dangerous-outline), usado em "Crises recorrentes" (página coluna).
- `composto-ombro-noite.svg` — ombro (hugeicons:shoulder) + lua (material-symbols:mode-night-outline), usado em "Dor à noite" (página ombro).

## Auditoria e verificação

- `../mapa-icones.md` documenta, card por card, qual bucket (A/B/C) foi usado e a justificativa — preencher/atualizar ao adicionar ou trocar um ícone.
- `../check-icon-domains.py` roda depois de `node scripts/generate-regional-pages.mjs` e falha se algum ícone contiver token de um domínio clínico diferente do domínio da página (ex: ícone de cardiologia numa página de ortopedia); duplicidade de ícone na página inteira aparece como aviso, não erro, já que reuso entre cards do mesmo conceito clínico é aceitável quando documentado no mapa de ícones.
