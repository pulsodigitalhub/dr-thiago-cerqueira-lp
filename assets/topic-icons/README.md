# Ícones dos cards das LPs regionais

Uma pasta por região. **Regra: card da página `X` só usa ícone de `X/`.** É o que impede o erro que já aconteceu aqui — um ícone de joelho (`healthicons:joints-outline`) parar num card "Articulações da coluna".

Um arquivo por card, nomeado pelo título do card (slug). Assim o par card↔ícone é explícito no nome, não escondido num mapa.

```
coluna/  joelho/  ombro/  quadril/  mao-punho/  pe-tornozelo/     16 svg cada
```

## Como foram escolhidos

Não por nome. Por **revisão visual**: para cada card, vários candidatos reais foram baixados de toda a base do Iconify (215 sets), renderizados lado a lado num contact sheet em 32px (tamanho real de uso) e 96px, e a escolha foi feita olhando o desenho.

Isso existe porque a rodada anterior escolheu por nome numa lista de texto e produziu ícone de cardiologia numa página de ortopedia, ícone de joelho numa página de coluna, e cadeado de segurança num card de sintoma. Revisão textual não pega esse tipo de erro — só olhar pega.

Duas armadilhas reais encontradas nessa revisão, ambas invisíveis no nome:
- buscar "cervical" traz **colo do útero** e **gravata**, não pescoço;
- `healthicons:joints-outline` se chama "joints" mas desenha um **joelho**.

Ferramentas e método completo: `ferramentas/` e `docs/repertorio-icones.md` no repo [processo-criacao-lp](https://github.com/calilmf/processo-criacao-lp).

## Fontes

Todos de [Iconify](https://iconify.design) — healthicons (MIT), material-symbols (Apache 2.0), hugeicons (MIT), game-icons (CC BY 3.0), streamline-ultimate, solar, tabler, lucide, mingcute, boxicons, icon-park. Baixados como SVG local, sem dependência de CDN.

O mapa completo card → ícone está em `../../mapa-icones.md` e no `topicIconOverrides` de `scripts/generate-regional-pages.mjs`.

## Ao trocar ou adicionar um ícone

1. Baixe candidatos, gere o contact sheet e **olhe** antes de decidir.
2. Salve em `<regiao>/<slug-do-titulo>.svg`.
3. Rode `node scripts/generate-regional-pages.mjs` e o verificador.
4. Confira a página renderizada, no tamanho real, com o texto do card ao lado.
