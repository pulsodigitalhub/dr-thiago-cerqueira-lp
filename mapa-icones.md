# Mapa de Icones — Dr. Thiago Cerqueira

Auditoria retroativa completa das ~94 entradas de `topicIconOverrides` em `scripts/generate-regional-pages.mjs`, seguindo o metodo em `docs/repertorio-icones.md` do repo de processo (`calilmf/processo-criacao-lp`). Preenchido apos a correcao dos casos ja reportados (icone de coracao em "Crises recorrentes", cadeado em "Travamento", icone de curativo em "Inchaco no joelho").

Legenda de bucket: **A** = match literal (nome do icone descreve o conceito). **B** = composto (dois icones literais do mesmo dominio combinados num SVG). **C** = fallback documentado (sem icone literal disponivel, usando icone anatomico do mesmo dominio/regiao).

## Coluna

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dor lombar persistente | Dor nas costas | healthicons:back-pain-outline | A | Nome descreve exatamente o conceito |
| Sintomas | Travamento nas costas | Limitacao de movimento por travamento | healthicons:crutches-outline | C | Sem icone literal de "travamento nas costas"; muleta representa a limitacao de mobilidade resultante, mesmo dominio, consistente com o mesmo conceito no joelho |
| Sintomas | Dor descendo para a perna | Dor irradiada por nervo | healthicons:nerve-outline | A | Nervo e o mecanismo literal da dor irradiada |
| Sintomas | Formigamento ou dormência | Alteracao de sensibilidade em extremidade | material-symbols:front-hand-outline | C | Sem icone literal para formigamento/dormencia; mao representa a extremidade afetada, sem tomar emprestado de outro dominio |
| Sintomas | Dor cervical | Dor localizada no pescoco | healthicons:pain-outline | C | Sem icone literal de "dor cervical"; marcador de dor generico, dentro do dominio clinico |
| Sintomas | Exame que gerou dúvida | Resultado de exame de imagem | healthicons:xray-outline | A | Raio-x descreve exame de imagem |
| Causas | Sobrecarga muscular | Esforco muscular excessivo | healthicons:weights-outline | A | Halteres = sobrecarga de esforco/treino |
| Causas | Alterações de disco | Alteracao estrutural da coluna | healthicons:spine-outline | A | Disco intervertebral e parte da coluna; icone de coluna e o mais literal disponivel para estrutura vertebral |
| Causas | Articulações da coluna | Articulacao | healthicons:joints-outline | A | Nome descreve exatamente articulacao |
| Causas | Irritação nervosa | Nervo sensibilizado | healthicons:nerve-outline | A | Nome descreve exatamente nervo |
| Causas | Crises recorrentes | Crise/piora recorrente na coluna | composto: spine + alerta | B | Sem icone literal para "crise recorrente"; composto de coluna (healthicons:spine-outline) + alerta (material-symbols:dangerous-outline), ambos literais e do mesmo dominio — substitui o icone de pulso cardiaco (dominio errado) reportado |
| Causas | Sinais de alerta | Sinal clinico de gravidade | healthicons:traumatism-outline | C | Sem icone literal de "sinal de alerta clinico"; traumatism transmite urgencia/gravidade dentro do vocabulario de saude, nao emprestado de dominio diferente |
| Cuidados | Exame clínico direcionado | Avaliacao clinica | healthicons:stethoscope-outline | A | Estetoscopio = exame clinico |
| Cuidados | Leitura dos exames | Interpretacao de exames de imagem | healthicons:skeleton-outline | C | Sem icone literal de "leitura de exame"; esqueleto representa a analise de imagem estrutural, mesmo dominio |
| Cuidados | Plano individual | Conduta/plano de tratamento | medical-icon:medical-records | A | Prontuario = plano/registro individual |
| Cuidados | Procedimentos quando indicados | Procedimento clinico | healthicons:syringe-outline | A | Seringa = procedimento |

## Joelho

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dor ao subir escadas | Dor ao caminhar/mobilidade | healthicons:walking-outline | A | Pessoa caminhando = mobilidade |
| Sintomas | Inchaço no joelho | Inchaco/trauma articular | healthicons:traumatism-outline | C | Sem icone literal de inchaco; marca de trauma representa lesao/inflamacao, mesmo dominio — substitui o icone de curativo na cabeca (sem relacao) reportado |
| Sintomas | Estalos e crepitação | Som articular | healthicons:joints-outline | A | Articulacao e a origem literal do estalo/crepitacao |
| Sintomas | Falseio ou instabilidade | Instabilidade ao caminhar | healthicons:walk-supported-outline | A | Pessoa andando amparada = instabilidade |
| Sintomas | Travamento | Bloqueio de movimento articular | healthicons:crutches-outline | C | Sem icone literal de "travamento"; muleta representa a limitacao de mobilidade resultante |
| Sintomas | Dor para caminhar | Dificuldade para caminhar por dor | healthicons:cane-outline | A | Bengala = apoio para caminhar por dor |
| Causas | Artrose e desgaste | Degeneracao articular | healthicons:joints-outline | A | Articulacao = local do desgaste |
| Causas | Lesões de menisco | Lesao de menisco | healthicons:orthopaedics-outline | C | Nao existe icone literal de menisco em nenhum set indexado (confirmado por busca); orteses/ortopedia geral como fallback do mesmo dominio |
| Causas | Lesões ligamentares | Lesao ligamentar | healthicons:cast-outline | B | Nao existe icone literal de ligamento; gesso representa a imobilizacao tipica de lesao ligamentar, associacao clinica real, mesmo dominio |
| Causas | Sobrecarga no treino | Sobrecarga de esforco fisico | healthicons:weights-outline | A | Halteres = sobrecarga de treino |
| Causas | Bursites e tendinites | Inflamacao de bursa/tendao | healthicons:pain-outline | C | Nao existe icone literal de bursite/tendinite; marcador de dor generico dentro do dominio clinico |
| Causas | Alterações no exame | Achado de exame de imagem | healthicons:xray-outline | A | Raio-x = exame de imagem |
| Cuidados | Avaliação do joelho | Avaliacao articular | healthicons:joints-outline | A | Articulacao = objeto da avaliacao |
| Cuidados | Conduta sem pressa | Plano de conduta | medical-icon:medical-records | A | Prontuario = conduta/plano |
| Cuidados | Infiltrações e viscossuplementação | Procedimento com injecao | healthicons:syringe-outline | A | Seringa = infiltracao |
| Cuidados | Retorno às atividades | Retorno a caminhar/atividade | healthicons:walking-outline | A | Pessoa caminhando = retorno a atividade |

## Ombro

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dificuldade para elevar o braço | Limitacao de movimento do ombro | hugeicons:shoulder | A | Icone de ombro = articulacao do ombro |
| Sintomas | Dor à noite | Dor noturna no ombro | composto: ombro + lua | B | Sem icone literal de "dor noturna"; composto de ombro (hugeicons:shoulder) + lua (material-symbols:mode-night-outline), ambos literais — substitui reaproveitamento de marcador de dor generico que colidia com "Bursite" na mesma pagina |
| Sintomas | Perda de força | Fraqueza muscular | healthicons:weights-outline | A | Halteres = forca/carga muscular |
| Sintomas | Ombro rígido | Rigidez/imobilidade do ombro | healthicons:sling-outline | A | Tipoia = imobilizacao do ombro, associacao clinica direta com rigidez |
| Sintomas | Dor após queda | Trauma por queda | healthicons:traumatism-outline | A | Nome descreve exatamente trauma |
| Sintomas | Laudo com tendinite ou bursite | Achado de exame | healthicons:xray-outline | A | Raio-x = laudo de exame |
| Causas | Tendinopatias | Alteracao de tendao | healthicons:orthopaedics-outline | C | Nao existe icone literal de tendinopatia; ortopedia geral como fallback do mesmo dominio |
| Causas | Bursite | Inflamacao da bursa | healthicons:pain-outline | C | Nao existe icone literal de bursite; marcador de dor generico, unico nesta pagina apos mover "Dor a noite" pro composto |
| Causas | Manguito rotador | Estrutura do manguito rotador | hugeicons:shoulder | A | Reuso aceito e documentado: unico icone literal de ombro disponivel; tanto este quanto "Dificuldade para elevar o braco" sao sobre a mesma articulacao, nao e escolha aleatoria |
| Causas | Capsulite adesiva | Ombro congelado | healthicons:sling-outline | A | Reuso aceito e documentado: capsulite adesiva e clinicamente a mesma condicao de "Ombro rigido" (sintoma), tipoia se aplica igualmente |
| Causas | Sobrecarga repetitiva | Sobrecarga de esforco repetitivo | healthicons:weights-outline | A | Halteres = sobrecarga |
| Causas | Dor irradiada | Dor de origem nervosa/cervical | healthicons:nerve-outline | A | Nervo = mecanismo da dor irradiada |
| Cuidados | Testes do ombro | Avaliacao clinica | healthicons:stethoscope-outline | A | Estetoscopio = avaliacao clinica |
| Cuidados | Análise de imagem | Exame de imagem | healthicons:xray-outline | A | Raio-x = exame de imagem |
| Cuidados | Plano de recuperação | Plano de tratamento | medical-icon:medical-records | A | Prontuario = plano |
| Cuidados | Procedimentos quando indicados | Procedimento clinico | healthicons:syringe-outline | A | Seringa = procedimento |

## Quadril

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dor ao deitar de lado | Dor lateral do quadril | healthicons:pain-outline | C | Sem icone literal de "dor ao deitar"; marcador de dor generico |
| Sintomas | Rigidez | Rigidez articular | healthicons:joints-outline | A | Articulacao = local da rigidez |
| Sintomas | Mancar | Claudicacao ao caminhar | healthicons:cane-outline | A | Bengala = apoio para claudicacao |
| Sintomas | Dor após queda ou esforço | Trauma por queda/esforco | healthicons:traumatism-outline | A | Nome descreve exatamente trauma |
| Sintomas | Exame com artrose ou bursite | Achado de exame | healthicons:xray-outline | A | Raio-x = achado de exame |
| Sintomas | Dor para caminhar | Dor ao caminhar | healthicons:walking-outline | A | Pessoa caminhando = dor ao caminhar |
| Causas | Artrose | Degeneracao articular | healthicons:joints-outline | A | Reuso aceito: mesmo conceito articular de "Rigidez" |
| Causas | Bursite trocantérica | Inflamacao lateral do quadril | material-symbols:femur-outline | C | Sem icone literal de bursite trocanterica; femur = regiao anatomica do quadril, mesmo dominio |
| Causas | Tendinopatias | Alteracao de tendao | healthicons:orthopaedics-outline | C | Sem icone literal de tendinopatia; ortopedia geral como fallback |
| Causas | Sobrecarga muscular | Sobrecarga de esforco | healthicons:weights-outline | A | Halteres = sobrecarga |
| Causas | Dor referida | Dor de origem nervosa/coluna | healthicons:nerve-outline | A | Nervo = mecanismo de dor referida |
| Causas | Traumas | Trauma fisico | healthicons:traumatism-outline | A | Reuso aceito: mesmo conceito de trauma do sintoma "Dor apos queda ou esforco" |
| Cuidados | Exame do quadril | Avaliacao/exame do quadril | material-symbols:femur-outline | A | Reuso aceito: femur = regiao anatomica avaliada |
| Cuidados | Imagem com contexto | Exame de imagem | healthicons:xray-outline | A | Raio-x = exame de imagem |
| Cuidados | Tratamento proporcional | Plano de tratamento | medical-icon:medical-records | A | Prontuario = plano |
| Cuidados | Recursos para dor | Procedimento clinico | healthicons:syringe-outline | A | Seringa = procedimento |

## Mão e punho

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dor ao digitar ou segurar objetos | Dor no punho | material-symbols:wrist-outline | A | Punho = regiao literal do sintoma |
| Sintomas | Formigamento nos dedos | Alteracao de sensibilidade nervosa | healthicons:nerve-outline | A | Nervo = mecanismo do formigamento |
| Sintomas | Perda de força | Fraqueza muscular | healthicons:weights-outline | A | Halteres = forca |
| Sintomas | Dedo travando | Dedo em gatilho | material-symbols:front-hand-outline | C | Nao existe icone literal de "dedo em gatilho" em nenhum set indexado; mao/palma como fallback do mesmo dominio |
| Sintomas | Cisto ou caroço no punho | Cisto/nodulo proximo a articulacao | healthicons:joints-outline | C | Sem icone literal de cisto; articulacao como fallback, cisto sinovial ocorre proximo a articulacoes |
| Sintomas | Dor após queda | Trauma por queda | healthicons:traumatism-outline | A | Nome descreve exatamente trauma |
| Causas | Tendinites e tenossinovites | Inflamacao de tendao do punho | material-symbols:wrist-outline | A | Reuso aceito: punho = regiao anatomica literal |
| Causas | Compressões nervosas | Compressao nervosa (ex: tunel do carpo) | healthicons:nerve-outline | A | Reuso aceito: nervo = mecanismo literal, ligado diretamente ao sintoma de formigamento |
| Causas | Artrose | Degeneracao articular | healthicons:joints-outline | A | Reuso aceito: mesmo conceito articular do sintoma de cisto |
| Causas | Cistos sinoviais | Cisto sinovial | material-symbols:hand-bones-outline | C | Sem icone literal de cisto sinovial; ossos da mao como fallback anatomico, diferenciado do icone de "Cisto ou caroço" para nao repetir |
| Causas | Fraturas e entorses | Fratura/entorse do antebraco | material-symbols:ulna-radius-outline | A | Ossos do antebraco = regiao literal da fratura |
| Cuidados | Exame da mão e punho | Avaliacao da mao/punho | material-symbols:wrist-outline | A | Reuso aceito: punho = regiao avaliada |
| Cuidados | Exames quando necessários | Exame de imagem | healthicons:xray-outline | A | Raio-x = exame de imagem |
| Cuidados | Conduta individualizada | Plano de tratamento | medical-icon:medical-records | A | Prontuario = plano |
| Cuidados | Procedimentos selecionados | Procedimento clinico | healthicons:syringe-outline | A | Seringa = procedimento |

## Pé e tornozelo

| Secao | Card | Conceito literal | Icone | Bucket | Justificativa |
| --- | --- | --- | --- | --- | --- |
| Sintomas | Dor no calcanhar | Dor no pe | healthicons:foot-outline | A | Pe = regiao literal do sintoma |
| Sintomas | Dor ao caminhar | Dor ao caminhar | healthicons:walking-outline | A | Pessoa caminhando = dor ao caminhar |
| Sintomas | Entorses recorrentes | Entorse de tornozelo | material-symbols:foot-bones-outline | C | Sem icone literal de entorse; ossos do pe como fallback anatomico |
| Sintomas | Inchaço | Inchaco/trauma no pe-tornozelo | healthicons:traumatism-outline | C | Sem icone literal de inchaco; marca de trauma representa lesao/inflamacao |
| Sintomas | Dor em tendões | Dor em tendao da perna | healthicons:leg-outline | C | Sem icone literal de tendinite especifico; perna como fallback anatomico (tendoes do tornozelo percorrem a perna) |
| Sintomas | Dificuldade com calçados | Desconforto com calcado | healthicons:orthotics-outline | A | Calcado ortopedico = literal ao conceito |
| Causas | Fascite plantar | Dor no calcanhar por fascite | healthicons:foot-outline | A | Reuso aceito: fascite plantar causa diretamente a dor no calcanhar do sintoma |
| Causas | Tendinites | Inflamacao de tendao | healthicons:leg-outline | C | Reuso aceito: mesmo fallback anatomico do sintoma "Dor em tendoes" |
| Causas | Entorses e instabilidade | Instabilidade por entorse | material-symbols:foot-bones-outline | C | Reuso aceito: mesmo fallback anatomico do sintoma "Entorses recorrentes" |
| Causas | Artrose e desgaste | Degeneracao articular | healthicons:joints-outline | A | Articulacao = local do desgaste |
| Causas | Sobrecarga no esporte | Sobrecarga de esforco esportivo | healthicons:weights-outline | A | Halteres = sobrecarga |
| Cuidados | Exame funcional | Avaliacao funcional | healthicons:stethoscope-outline | A | Estetoscopio = avaliacao clinica |
| Cuidados | Exames de imagem | Exame de imagem | healthicons:xray-outline | A | Raio-x = exame de imagem |
| Cuidados | Plano de retorno | Plano de tratamento | medical-icon:medical-records | A | Prontuario = plano |
| Cuidados | Procedimentos quando indicados | Procedimento clinico | healthicons:syringe-outline | A | Seringa = procedimento |

## Observacao sobre reusos entre secoes

Varios icones se repetem entre secoes diferentes da mesma pagina (ex: `hugeicons:shoulder` em "Dificuldade para elevar o braco" e "Manguito rotador", `healthicons:traumatism-outline` em multiplos sintomas de trauma). Isso e intencional e documentado nesta tabela: nos casos aceitos, os dois cards descrevem literalmente o mesmo conceito clinico ou anatomico (ex: rigidez do ombro e capsulite adesiva sao a mesma condicao), nao uma reutilizacao aleatoria. O verificador automatico (`check-icon-domains.py`) reporta esses casos como aviso, nao como erro — o erro que ele bloqueia de fato e um icone de dominio clinico errado (ex: cardiologia numa pagina de ortopedia).
