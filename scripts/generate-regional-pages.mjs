import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, "..");

const whatsapp = "5561996079061";
const webhook = "https://api.icebergcompany.com.br/lead-webhook/dr-thiago";

const convenios = [
  "AFEB BRASAL",
  "AFFEGO",
  "ANAFE SAÚDE",
  "BACEN",
  "BRB (SAÚDE BRB)",
  "CAEME - GO",
  "CAESAN",
  "CAMED",
  "CARE PLUS",
  "CASEC (CODEVASF)",
  "CASEMBRAPA (EMBRAPA)",
  "CBMDF",
  "CLIQUE MÉDICOS",
  "CNTI",
  "CONAB",
  "EMBRATEL (TELOS)",
  "FAPES (BNDES)",
  "FASCAL",
  "GDF SAÚDE",
  "GEAP",
  "GRAVIA",
  "LIFE EMPRESARIAL",
  "LUMINAR SAÚDE (EVIDA)",
  "NOTRE DAME",
  "OMINT SAÚDE",
  "PF SAÚDE (POLÍCIA FEDERAL)",
  "PLAN ASSISTE (MPU)",
  "PLAS/JMU (STM)",
  "PMDF - CONSULTAS MÉDICAS",
  "PMDF - SAÚDE MENTAL E TERAPIAS",
  "PROASA",
  "PRÓ-SAÚDE (CÂMARA DOS DEPUTADOS)",
  "PRÓ-SAÚDE (TJDFT)",
  "PRÓ-SER (STJ)",
  "PRÓ-SOCIAL (TRF)",
  "REAL GRANDEZA (DEMAIS PLANOS)",
  "REAL GRANDEZA (SALVUS E SALUTEM)",
  "SAÚDE CAIXA",
  "SAÚDE PETROBRAS",
  "SERPRO",
  "SIS SENADO",
  "STF-MED (STF)",
  "TRE SAÚDE",
  "TRT SAÚDE",
  "TST SAÚDE",
  "UNAFISCO SAÚDE (DEMAIS PLANOS)",
  "UNAFISCO SAÚDE (PREMIUM)",
];

// Mapa de icones por pagina (nao mais global por titulo) para que a mesma
// palavra em regioes diferentes possa ter icones diferentes e para que nenhuma
// secao de uma pagina repita o mesmo icone em varios cards.
const topicIconOverrides = {
  coluna: {
    "Dor lombar persistente": "healthicons:back-pain-outline",
    "Travamento nas costas": "healthicons:spine-outline",
    "Dor descendo para a perna": "healthicons:nerve-outline",
    "Formigamento ou dormência": "material-symbols:front-hand-outline",
    "Dor cervical": "healthicons:pain-outline",
    "Exame que gerou dúvida": "healthicons:xray-outline",
    "Sobrecarga muscular": "healthicons:weights-outline",
    "Alterações de disco": "healthicons:spine-outline",
    "Articulações da coluna": "healthicons:joints-outline",
    "Irritação nervosa": "healthicons:nerve-outline",
    "Crises recorrentes": "material-symbols:pulse-alert-outline",
    "Sinais de alerta": "healthicons:traumatism-outline",
    "Exame clínico direcionado": "healthicons:stethoscope-outline",
    "Leitura dos exames": "healthicons:skeleton-outline",
    "Plano individual": "medical-icon:medical-records",
    "Procedimentos quando indicados": "healthicons:syringe-outline",
  },

  joelho: {
    "Dor ao subir escadas": "healthicons:walking-outline",
    "Inchaço no joelho": "healthicons:traumatism-outline",
    "Estalos e crepitação": "healthicons:joints-outline",
    "Falseio ou instabilidade": "healthicons:walk-supported-outline",
    "Travamento": "healthicons:crutches-outline",
    "Dor para caminhar": "healthicons:cane-outline",
    "Artrose e desgaste": "healthicons:joints-outline",
    "Lesões de menisco": "healthicons:orthopaedics-outline",
    "Lesões ligamentares": "healthicons:cast-outline",
    "Sobrecarga no treino": "healthicons:weights-outline",
    "Bursites e tendinites": "healthicons:pain-outline",
    "Alterações no exame": "healthicons:xray-outline",
    "Avaliação do joelho": "healthicons:joints-outline",
    "Conduta sem pressa": "medical-icon:medical-records",
    "Infiltrações e viscossuplementação": "healthicons:syringe-outline",
    "Retorno às atividades": "healthicons:walking-outline",
  },

  ombro: {
    "Dificuldade para elevar o braço": "hugeicons:shoulder",
    "Dor à noite": "healthicons:pain-outline",
    "Perda de força": "healthicons:weights-outline",
    "Ombro rígido": "healthicons:sling-outline",
    "Dor após queda": "healthicons:traumatism-outline",
    "Laudo com tendinite ou bursite": "healthicons:xray-outline",
    "Tendinopatias": "healthicons:orthopaedics-outline",
    "Bursite": "healthicons:pain-outline",
    "Manguito rotador": "hugeicons:shoulder",
    "Capsulite adesiva": "healthicons:sling-outline",
    "Sobrecarga repetitiva": "healthicons:weights-outline",
    "Dor irradiada": "healthicons:nerve-outline",
    "Testes do ombro": "healthicons:stethoscope-outline",
    "Análise de imagem": "healthicons:xray-outline",
    "Plano de recuperação": "medical-icon:medical-records",
    "Procedimentos quando indicados": "healthicons:syringe-outline",
  },

  quadril: {
    "Dor ao deitar de lado": "healthicons:pain-outline",
    "Rigidez": "healthicons:joints-outline",
    "Mancar": "healthicons:cane-outline",
    "Dor após queda ou esforço": "healthicons:traumatism-outline",
    "Exame com artrose ou bursite": "healthicons:xray-outline",
    "Dor para caminhar": "healthicons:walking-outline",
    "Artrose": "healthicons:joints-outline",
    "Bursite trocantérica": "material-symbols:femur-outline",
    "Tendinopatias": "healthicons:orthopaedics-outline",
    "Sobrecarga muscular": "healthicons:weights-outline",
    "Dor referida": "healthicons:nerve-outline",
    "Traumas": "healthicons:traumatism-outline",
    "Exame do quadril": "material-symbols:femur-outline",
    "Imagem com contexto": "healthicons:xray-outline",
    "Tratamento proporcional": "medical-icon:medical-records",
    "Recursos para dor": "healthicons:syringe-outline",
  },

  "mao-punho": {
    "Dor ao digitar ou segurar objetos": "material-symbols:wrist-outline",
    "Formigamento nos dedos": "healthicons:nerve-outline",
    "Perda de força": "healthicons:weights-outline",
    "Dedo travando": "material-symbols:front-hand-outline",
    "Cisto ou caroço no punho": "healthicons:joints-outline",
    "Dor após queda": "healthicons:traumatism-outline",
    "Tendinites e tenossinovites": "material-symbols:wrist-outline",
    "Compressões nervosas": "healthicons:nerve-outline",
    "Artrose": "healthicons:joints-outline",
    "Cistos sinoviais": "material-symbols:hand-bones-outline",
    "Fraturas e entorses": "material-symbols:ulna-radius-outline",
    "Exame da mão e punho": "material-symbols:wrist-outline",
    "Exames quando necessários": "healthicons:xray-outline",
    "Conduta individualizada": "medical-icon:medical-records",
    "Procedimentos selecionados": "healthicons:syringe-outline",
  },

  "pe-tornozelo": {
    "Dor no calcanhar": "healthicons:foot-outline",
    "Dor ao caminhar": "healthicons:walking-outline",
    "Entorses recorrentes": "material-symbols:foot-bones-outline",
    "Inchaço": "healthicons:traumatism-outline",
    "Dor em tendões": "healthicons:leg-outline",
    "Dificuldade com calçados": "healthicons:orthotics-outline",
    "Fascite plantar": "healthicons:foot-outline",
    "Tendinites": "healthicons:leg-outline",
    "Entorses e instabilidade": "material-symbols:foot-bones-outline",
    "Artrose e desgaste": "healthicons:joints-outline",
    "Sobrecarga no esporte": "healthicons:weights-outline",
    "Exame funcional": "healthicons:stethoscope-outline",
    "Exames de imagem": "healthicons:xray-outline",
    "Plano de retorno": "medical-icon:medical-records",
    "Procedimentos quando indicados": "healthicons:syringe-outline",
  },
};

const pages = [
  {
    slug: "coluna",
    name: "coluna",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para coluna em Brasília",
    metaDescription: "Avaliação ortopédica para dor lombar, dor cervical, dor irradiada, formigamento e limitações de movimento em Brasília.",
    heroTitle: "Ortopedista para coluna em Brasília",
    heroLead: "Avaliação para dor lombar, dor cervical, travamentos, formigamento e dores que irradiam para braços ou pernas, com orientação clara sobre o que pode estar por trás do seu quadro.",
    heroFocus: "Dor lombar, cervical e dor irradiada",
    symptomTitle: "Sinais de que sua coluna merece atenção",
    symptoms: [
      ["activity", "Dor lombar persistente", "Dor na parte baixa das costas que limita trabalho, sono, treino ou atividades simples."],
      ["move-3d", "Travamento nas costas", "Crises em que fica difícil levantar, virar o corpo ou caminhar com naturalidade."],
      ["zap", "Dor descendo para a perna", "Dor, choque, queimação ou peso que irradia para glúteo, coxa, panturrilha ou pé."],
      ["mouse-pointer-2", "Formigamento ou dormência", "Alteração de sensibilidade em braços, mãos, pernas ou pés."],
      ["monitor", "Dor cervical", "Dor no pescoço, rigidez ou desconforto que piora com telas, direção ou postura mantida."],
      ["file-search", "Exame que gerou dúvida", "Ressonância, raio-x ou tomografia com alterações que precisam ser interpretadas junto com seus sintomas."],
    ],
    causesTitle: "O que pode causar dor na coluna",
    causes: [
      ["dumbbell", "Sobrecarga muscular", "Esforço, postura, treino, rotina de trabalho e tensão podem gerar dor recorrente."],
      ["layers", "Alterações de disco", "Protusões e hérnias podem ou não ter relação com a dor; a avaliação ajuda a diferenciar."],
      ["circle-dot", "Articulações da coluna", "Desgaste ou irritação das articulações pode causar dor localizada e rigidez."],
      ["radio-tower", "Irritação nervosa", "Sintomas irradiados podem estar ligados a estruturas nervosas sensibilizadas."],
      ["repeat", "Crises recorrentes", "Quadros que melhoram e voltam precisam de investigação para reduzir repetição e piora."],
      ["shield-alert", "Sinais de alerta", "Perda de força, trauma, febre ou dor intensa exigem avaliação sem demora."],
    ],
    careTitle: "Como a avaliação pode ajudar",
    care: [
      ["stethoscope", "Exame clínico direcionado", "Avaliação da mobilidade, força, sensibilidade, pontos de dor e testes funcionais."],
      ["scan-line", "Leitura dos exames", "Análise de exames anteriores para entender o que realmente conversa com sua dor."],
      ["clipboard-check", "Plano individual", "Orientação sobre medicação, reabilitação, hábitos, atividade física e próximos passos."],
      ["syringe", "Procedimentos quando indicados", "Infiltrações, bloqueios e outras abordagens podem ser discutidas em casos selecionados."],
    ],
    faq: [
      ["Dor na coluna sempre é hérnia de disco?", "Não. Muitas dores têm relação com sobrecarga, musculatura, articulações, postura ou outros fatores. A imagem precisa ser analisada junto com seus sintomas."],
      ["Quando devo procurar avaliação?", "Quando a dor persiste por mais de alguns dias, volta com frequência, irradia para braço ou perna, causa formigamento ou limita sua rotina."],
      ["Preciso levar exames?", "Se você já tiver exames, leve. Eles ajudam, mas não substituem a avaliação clínica."],
      ["Toda dor na coluna precisa de procedimento?", "Não. Procedimentos só são considerados quando fazem sentido para o diagnóstico, intensidade da dor e resposta a tratamentos anteriores."],
    ],
  },
  {
    slug: "joelho",
    name: "joelho",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para joelho em Brasília",
    metaDescription: "Avaliação ortopédica para dor no joelho, inchaço, estalos, falseio, artrose, lesões e dificuldade para caminhar em Brasília.",
    heroTitle: "Ortopedista para joelho em Brasília",
    heroLead: "Consulta para investigar dor no joelho, inchaço, estalos, falseio, travamentos, desgaste articular e limitações para caminhar, subir escadas ou praticar atividade física.",
    heroFocus: "Dor, artrose e lesões no joelho",
    symptomTitle: "Sinais comuns em quem sente dor no joelho",
    symptoms: [
      ["activity", "Dor ao subir escadas", "Desconforto ao subir, descer, agachar ou levantar de cadeiras baixas."],
      ["circle-dot", "Inchaço no joelho", "Aumento de volume, sensação de pressão, calor local ou piora após esforço."],
      ["volume-2", "Estalos e crepitação", "Sons, atrito ou sensação de areia ao dobrar e esticar o joelho."],
      ["shield-alert", "Falseio ou instabilidade", "Sensação de que o joelho vai falhar, ceder ou não sustentar o peso."],
      ["lock", "Travamento", "Dificuldade para dobrar ou esticar completamente o joelho."],
      ["activity", "Dor para caminhar", "Dor após caminhadas, treino, corrida ou longos períodos em pé."],
    ],
    causesTitle: "O que pode estar por trás da dor no joelho",
    causes: [
      ["layers", "Artrose e desgaste", "Alterações da cartilagem podem gerar dor, rigidez e limitação progressiva."],
      ["scan-line", "Lesões de menisco", "Podem causar dor localizada, estalos, bloqueios e piora com rotação."],
      ["shield", "Lesões ligamentares", "Entorses e traumas podem causar instabilidade, dor e insegurança ao apoiar."],
      ["dumbbell", "Sobrecarga no treino", "Aumento rápido de carga, corrida, salto ou musculação podem irritar tendões e articulações."],
      ["waves", "Bursites e tendinites", "Inflamações ao redor do joelho podem doer em pontos específicos."],
      ["file-search", "Alterações no exame", "Laudos precisam ser correlacionados com exame físico e história da dor."],
    ],
    careTitle: "Como o tratamento pode ser feito",
    care: [
      ["stethoscope", "Avaliação do joelho", "Exame de meniscos, ligamentos, alinhamento, força, mobilidade e pontos de dor."],
      ["clipboard-check", "Conduta sem pressa", "Nem toda dor precisa de cirurgia. A prioridade é entender o diagnóstico e a melhor sequência de cuidado."],
      ["syringe", "Infiltrações e viscossuplementação", "Podem ser consideradas em casos selecionados, conforme diagnóstico e indicação médica."],
      ["activity", "Retorno às atividades", "Orientação para caminhar, treinar e retomar rotina com mais segurança."],
    ],
    faq: [
      ["Dor no joelho é sempre artrose?", "Não. Pode haver sobrecarga, menisco, tendão, bursite, ligamento, cartilagem ou dor referida. A avaliação diferencia as causas."],
      ["Quando devo marcar consulta?", "Quando há dor persistente, inchaço, falseio, travamento, piora ao subir escadas ou dor após trauma."],
      ["Infiltração pode ajudar?", "Pode ser avaliada em alguns casos, mas depende do diagnóstico, intensidade da dor e objetivos do paciente."],
      ["Preciso parar de treinar?", "Se o treino piora a dor, é prudente reduzir carga até a avaliação. A orientação definitiva depende do exame."],
    ],
  },
  {
    slug: "ombro",
    name: "ombro",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para ombro em Brasília",
    metaDescription: "Avaliação ortopédica para dor no ombro, dor noturna, limitação para elevar o braço, tendinites, bursites e lesões em Brasília.",
    heroTitle: "Ortopedista para ombro em Brasília",
    heroLead: "Avaliação para dor no ombro, dificuldade para levantar o braço, dor noturna, perda de força, rigidez, tendinites, bursites e lesões relacionadas ao esforço ou trauma.",
    heroFocus: "Dor, rigidez e perda de força no ombro",
    symptomTitle: "Quando a dor no ombro atrapalha a rotina",
    symptoms: [
      ["arrow-up", "Dificuldade para elevar o braço", "Dor para pegar objetos no alto, vestir roupa, pentear o cabelo ou alcançar as costas."],
      ["moon", "Dor à noite", "Desconforto para dormir de lado ou acordar por dor no ombro."],
      ["dumbbell", "Perda de força", "Fraqueza para carregar peso, empurrar, puxar ou sustentar o braço."],
      ["snowflake", "Ombro rígido", "Sensação de ombro preso ou perda progressiva de movimento."],
      ["shield-alert", "Dor após queda", "Dor depois de trauma, pancada, treino, esforço ou movimento brusco."],
      ["file-search", "Laudo com tendinite ou bursite", "Exames com alterações precisam ser interpretados junto com a sua limitação."],
    ],
    causesTitle: "Possíveis causas de dor no ombro",
    causes: [
      ["activity", "Tendinopatias", "Sobrecarga dos tendões pode gerar dor em movimentos e perda de força."],
      ["waves", "Bursite", "Inflamação da bursa pode causar dor ao elevar o braço e ao deitar."],
      ["circle-dot", "Manguito rotador", "Lesões ou irritações nos tendões podem limitar força e amplitude."],
      ["lock", "Capsulite adesiva", "O ombro pode ficar rígido e doloroso, com perda progressiva de movimento."],
      ["repeat", "Sobrecarga repetitiva", "Trabalho, academia, esporte e postura podem manter a dor ativa."],
      ["zap", "Dor irradiada", "Alguns sintomas podem vir da coluna cervical ou de estruturas próximas."],
    ],
    careTitle: "Como a avaliação direciona o cuidado",
    care: [
      ["stethoscope", "Testes do ombro", "Exame da força, amplitude, estabilidade, dor em tendões e articulações."],
      ["scan-line", "Análise de imagem", "Ultrassom, raio-x ou ressonância são avaliados conforme o quadro clínico."],
      ["clipboard-check", "Plano de recuperação", "Orientação sobre controle de dor, reabilitação, ajustes de carga e retorno às atividades."],
      ["syringe", "Procedimentos quando indicados", "Infiltrações e outras abordagens podem ser discutidas caso a caso."],
    ],
    faq: [
      ["Dor no ombro é sempre tendinite?", "Não. Pode envolver tendões, bursas, cápsula articular, articulações, coluna cervical ou trauma."],
      ["Quando devo procurar atendimento?", "Quando a dor limita movimentos, atrapalha o sono, reduz força ou persiste mesmo com repouso."],
      ["Preciso de ressonância?", "Nem sempre. A necessidade de exame depende da avaliação clínica e da evolução dos sintomas."],
      ["Infiltração no ombro resolve todos os casos?", "Não. Ela pode ser útil em casos selecionados, mas precisa de indicação e acompanhamento."],
    ],
  },
  {
    slug: "quadril",
    name: "quadril",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para quadril em Brasília",
    metaDescription: "Avaliação ortopédica para dor no quadril, dor lateral, artrose, bursite, rigidez, limitação para caminhar e dor ao deitar em Brasília.",
    heroTitle: "Ortopedista para quadril em Brasília",
    heroLead: "Consulta para investigar dor no quadril, dor lateral ao deitar, rigidez, limitação para caminhar, artrose, bursites, tendinites e sintomas que afetam a mobilidade.",
    heroFocus: "Dor no quadril e dificuldade para caminhar",
    symptomTitle: "Sinais de que o quadril precisa ser avaliado",
    symptoms: [
      ["footprints", "Dor para caminhar", "Dor ao iniciar passos, subir escadas, andar mais tempo ou ficar em pé."],
      ["bed", "Dor ao deitar de lado", "Desconforto na lateral do quadril que atrapalha o sono."],
      ["move-3d", "Rigidez", "Dificuldade para cruzar as pernas, calçar sapatos, entrar no carro ou agachar."],
      ["activity", "Mancar", "Mudança na forma de caminhar ou sensação de poupar uma perna."],
      ["shield-alert", "Dor após queda ou esforço", "Sintomas que surgem depois de impacto, caminhada longa, treino ou aumento de carga."],
      ["file-search", "Exame com artrose ou bursite", "Laudos devem ser analisados junto com dor, mobilidade e impacto na rotina."],
    ],
    causesTitle: "O que pode causar dor no quadril",
    causes: [
      ["layers", "Artrose", "Desgaste articular pode causar dor na virilha, rigidez e limitação progressiva."],
      ["waves", "Bursite trocantérica", "Dor na lateral do quadril, muitas vezes pior ao deitar sobre o lado dolorido."],
      ["activity", "Tendinopatias", "Tendões ao redor do quadril podem sofrer sobrecarga e gerar dor persistente."],
      ["dumbbell", "Sobrecarga muscular", "Treino, caminhada, postura e compensações podem manter sintomas."],
      ["zap", "Dor referida", "Coluna lombar e outras estruturas podem gerar dor percebida no quadril."],
      ["shield", "Traumas", "Quedas e pancadas precisam ser avaliadas quando há dor intensa ou dificuldade para apoiar."],
    ],
    careTitle: "O que a consulta ajuda a definir",
    care: [
      ["stethoscope", "Exame do quadril", "Avaliação de mobilidade, marcha, força, pontos de dor e testes específicos."],
      ["scan-line", "Imagem com contexto", "Raio-x, ultrassom ou ressonância são interpretados junto com seus sintomas."],
      ["clipboard-check", "Tratamento proporcional", "Conduta ajustada ao diagnóstico, nível de dor, rotina e objetivos do paciente."],
      ["syringe", "Recursos para dor", "Procedimentos podem ser considerados quando houver indicação clínica."],
    ],
    faq: [
      ["Dor no quadril sempre é artrose?", "Não. Pode ser bursite, tendão, músculo, coluna, sobrecarga ou outras causas."],
      ["Dor lateral ao deitar pode ser bursite?", "Pode, mas a confirmação depende de avaliação. Outras estruturas também podem gerar dor lateral."],
      ["Quando procurar atendimento?", "Quando a dor limita caminhada, sono, escadas, apoio ou persiste por semanas."],
      ["Toda artrose precisa de cirurgia?", "Não. Muitos casos começam com medidas para controle da dor, melhora da mobilidade e fortalecimento."],
    ],
  },
  {
    slug: "mao-punho",
    name: "mão e punho",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para mão e punho em Brasília",
    metaDescription: "Avaliação ortopédica para dor na mão, dor no punho, formigamento, tendinites, dedo em gatilho, cistos e perda de força em Brasília.",
    heroTitle: "Ortopedista para mão e punho em Brasília",
    heroLead: "Avaliação para dor na mão ou no punho, formigamento, dormência, perda de força, tendinites, dedo em gatilho, cistos e desconfortos em atividades repetitivas.",
    heroFocus: "Dor, formigamento e perda de força",
    symptomTitle: "Sintomas que merecem investigação",
    symptoms: [
      ["mouse-pointer-click", "Dor ao digitar ou segurar objetos", "Desconforto em tarefas simples, no trabalho ou em atividades repetitivas."],
      ["zap", "Formigamento nos dedos", "Dormência, choque ou sensação de mão adormecida, especialmente à noite."],
      ["hand", "Perda de força", "Dificuldade para abrir potes, segurar objetos ou manter firmeza."],
      ["lock", "Dedo travando", "Dedo que prende, estala ou precisa de ajuda para abrir e fechar."],
      ["circle-dot", "Cisto ou caroço no punho", "Aumento de volume que incomoda, dói ou limita movimento."],
      ["shield-alert", "Dor após queda", "Trauma com dor persistente, inchaço ou dificuldade para apoiar a mão."],
    ],
    causesTitle: "Possíveis causas de dor na mão e punho",
    causes: [
      ["activity", "Tendinites e tenossinovites", "Inflamações por sobrecarga ou uso repetitivo podem limitar movimentos."],
      ["radio-tower", "Compressões nervosas", "Quadros como síndrome do túnel do carpo podem gerar formigamento e perda de força."],
      ["fingerprint", "Dedo em gatilho", "Travamento doloroso do dedo por irritação do tendão."],
      ["layers", "Artrose", "Desgaste em articulações da mão pode causar dor, rigidez e deformidades."],
      ["circle", "Cistos sinoviais", "Nódulos no punho ou mão podem causar dor ou limitação."],
      ["bone", "Fraturas e entorses", "Traumas precisam ser avaliados quando a dor não melhora ou há perda de movimento."],
    ],
    careTitle: "Como o atendimento ajuda",
    care: [
      ["stethoscope", "Exame da mão e punho", "Avaliação de força, sensibilidade, tendões, articulações, nervos e amplitude de movimento."],
      ["scan-line", "Exames quando necessários", "Raio-x, ultrassom, ressonância ou eletroneuromiografia podem ser solicitados conforme o caso."],
      ["clipboard-check", "Conduta individualizada", "Orientação sobre controle de dor, imobilização, reabilitação e ajuste de atividades."],
      ["syringe", "Procedimentos selecionados", "Infiltrações ou outros recursos podem ser considerados conforme diagnóstico."],
    ],
    faq: [
      ["Formigamento na mão pode ser túnel do carpo?", "Pode, mas existem outras causas. A avaliação ajuda a localizar a origem do sintoma."],
      ["Dedo em gatilho precisa operar?", "Nem sempre. Em fases iniciais, pode ser possível controlar dor e inflamação antes de considerar cirurgia."],
      ["Cisto no punho é perigoso?", "Na maioria das vezes é benigno, mas deve ser avaliado quando dói, cresce ou limita movimentos."],
      ["Quando devo procurar atendimento após queda?", "Quando há dor persistente, inchaço, deformidade, perda de força ou dificuldade para apoiar a mão."],
    ],
  },
  {
    slug: "pe-tornozelo",
    name: "pé e tornozelo",
    metaTitle: "Dr. Thiago Cerqueira | Ortopedista para pé e tornozelo em Brasília",
    metaDescription: "Avaliação ortopédica para dor no pé, dor no tornozelo, fascite plantar, entorses, tendinites, instabilidade e dor ao caminhar em Brasília.",
    heroTitle: "Ortopedista para pé e tornozelo em Brasília",
    heroLead: "Consulta para investigar dor no pé, dor no tornozelo, dor no calcanhar, entorses, fascite plantar, tendinites, instabilidade e limitações para caminhar ou praticar atividade física.",
    heroFocus: "Dor ao caminhar, entorses e fascite plantar",
    symptomTitle: "Sinais comuns no pé e tornozelo",
    symptoms: [
      ["footprints", "Dor no calcanhar", "Dor ao pisar pela manhã, após repouso ou depois de caminhar por mais tempo."],
      ["footprints", "Dor ao caminhar", "Desconforto que limita deslocamentos, trabalho, treino ou atividades simples."],
      ["rotate-ccw", "Entorses recorrentes", "Tornozelo que vira com facilidade ou gera insegurança ao apoiar."],
      ["circle-dot", "Inchaço", "Aumento de volume no tornozelo ou pé, principalmente após esforço."],
      ["activity", "Dor em tendões", "Dor atrás do tornozelo, na sola do pé ou na lateral, com piora ao esforço."],
      ["circle-dot", "Dificuldade com calçados", "Dor, pressão, deformidades ou incômodo que piora com determinados sapatos."],
    ],
    causesTitle: "Possíveis causas da dor",
    causes: [
      ["waves", "Fascite plantar", "Causa comum de dor no calcanhar, especialmente nos primeiros passos do dia."],
      ["activity", "Tendinites", "Sobrecarga do tendão de Aquiles, tibial posterior ou outros tendões pode gerar dor persistente."],
      ["shield-alert", "Entorses e instabilidade", "Lesões ligamentares podem causar dor, inchaço e insegurança para caminhar."],
      ["layers", "Artrose e desgaste", "Alterações articulares podem gerar rigidez, dor e limitação."],
      ["bone", "Fraturas por trauma ou estresse", "Impactos ou sobrecarga repetitiva podem causar dor que não melhora com repouso."],
      ["repeat", "Sobrecarga no esporte", "Mudança de treino, calçado, terreno ou volume pode provocar sintomas."],
    ],
    careTitle: "Como a avaliação direciona o cuidado",
    care: [
      ["stethoscope", "Exame funcional", "Avaliação de apoio, marcha, mobilidade, estabilidade, tendões e pontos de dor."],
      ["scan-line", "Exames de imagem", "Raio-x, ultrassom ou ressonância podem ser usados quando ajudam a confirmar a causa."],
      ["clipboard-check", "Plano de retorno", "Orientação sobre carga, calçados, reabilitação, controle de dor e prevenção de recidiva."],
      ["syringe", "Procedimentos quando indicados", "Alguns casos podem se beneficiar de procedimentos para dor, sempre após avaliação."],
    ],
    faq: [
      ["Dor no calcanhar é sempre esporão?", "Não. Muitas vezes a dor vem da fáscia plantar, tendões ou sobrecarga. O esporão nem sempre é a causa principal."],
      ["Tornozelo que vira com frequência precisa ser avaliado?", "Sim. Entorses repetidas podem indicar instabilidade e aumentar o risco de novas lesões."],
      ["Quando devo procurar atendimento?", "Quando a dor limita caminhar, há inchaço persistente, trauma, instabilidade ou sintomas que não melhoram."],
      ["Preciso parar de caminhar ou correr?", "Se a atividade piora a dor, reduza carga até a avaliação. O retorno depende do diagnóstico."],
    ],
  },
];

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function topicIconFileName(icon) {
  return `${icon.replaceAll(":", "-")}.svg`;
}

function topicIconMarkup(icon, title, pageSlug) {
  const resolvedIcon = topicIconOverrides[pageSlug]?.[title] || icon;

  if (resolvedIcon.includes(":")) {
    return `<img class="topic-icon" src="../assets/topic-icons/${escapeHtml(topicIconFileName(resolvedIcon))}" alt="" aria-hidden="true" loading="lazy">`;
  }

  return `<i data-lucide="${escapeHtml(resolvedIcon)}" aria-hidden="true"></i>`;
}

function cardMarkup(items, pageSlug) {
  return items.map(([icon, title, text]) => `
            <article>
              ${topicIconMarkup(icon, title, pageSlug)}
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(text)}</p>
            </article>`).join("");
}

function faqMarkup(items) {
  return items.map(([question, answer]) => `
            <details>
              <summary>${escapeHtml(question)}</summary>
              <p>${escapeHtml(answer)}</p>
            </details>`).join("");
}

function convenioMarkup() {
  return convenios.map((convenio) => `
            <span class="convenio-item">${escapeHtml(convenio)}</span>`).join("");
}

const processIconSprite = String.raw`
    <svg class="icon-sprite" aria-hidden="true">
      <symbol id="icon-process-phone" viewBox="0 0 64 64">
        <rect x="18" y="9" width="28" height="46" rx="5" fill="#3d6373"/>
        <rect x="20" y="11" width="24" height="42" rx="3.5" fill="#527d8f"/>
        <rect x="22" y="15" width="20" height="32" rx="2" fill="#ffffff"/>
        <circle cx="32" cy="50.5" r="1.8" fill="#2c4d5a"/>
        <rect x="29" y="13" width="6" height="1.2" rx="0.6" fill="#2c4d5a"/>
        <rect x="25" y="19" width="11" height="5" rx="2.5" fill="#6e8f71"/>
        <rect x="28" y="27" width="11" height="5" rx="2.5" fill="#e0e6e1"/>
        <rect x="25" y="35" width="9" height="5" rx="2.5" fill="#6e8f71"/>
        <circle cx="47" cy="14" r="7.5" fill="#25d366"/>
        <path d="M43.5 14l2.5 2.5 5-5" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="icon-process-eval" viewBox="0 0 64 64">
        <circle cx="20" cy="11" r="3" fill="#b4863f"/>
        <circle cx="20" cy="11" r="1.4" fill="#7a5a26"/>
        <circle cx="38" cy="11" r="3" fill="#b4863f"/>
        <circle cx="38" cy="11" r="1.4" fill="#7a5a26"/>
        <path d="M20 14v14c0 5 4 9 9 9s9-4 9-9V14" fill="none" stroke="#527d8f" stroke-width="3.5" stroke-linecap="round"/>
        <path d="M29 37v6c0 5 4 9 9 9s9-4 9-9" fill="none" stroke="#527d8f" stroke-width="3.5" stroke-linecap="round"/>
        <circle cx="47" cy="46" r="8" fill="#6e8f71"/>
        <circle cx="47" cy="46" r="5" fill="#8aab8d"/>
        <circle cx="47" cy="46" r="1.8" fill="#3f5d42"/>
        <path d="M9 30l2.5 0 1.8-4 3.5 8 1.8-4h2.5" fill="none" stroke="#b2694f" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
      <symbol id="icon-process-plan" viewBox="0 0 64 64">
        <rect x="14" y="11" width="36" height="46" rx="4" fill="#3d6373"/>
        <rect x="16" y="13" width="32" height="42" rx="3" fill="#ffffff"/>
        <rect x="22" y="6" width="20" height="10" rx="3" fill="#b4863f"/>
        <rect x="24" y="8" width="16" height="6" rx="2" fill="#d9b36a"/>
        <circle cx="22" cy="24" r="3.2" fill="#6e8f71"/>
        <path d="M20.4 24l1.2 1.2 2.4-2.6" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="28" y="22.6" width="16" height="2.8" rx="1.4" fill="#cbd3d1"/>
        <circle cx="22" cy="34" r="3.2" fill="#6e8f71"/>
        <path d="M20.4 34l1.2 1.2 2.4-2.6" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <rect x="28" y="32.6" width="13" height="2.8" rx="1.4" fill="#cbd3d1"/>
        <circle cx="22" cy="44" r="3.2" fill="#b2694f"/>
        <path d="M20.6 42.6l2.8 2.8M23.4 42.6l-2.8 2.8" fill="none" stroke="#ffffff" stroke-width="1.6" stroke-linecap="round"/>
        <rect x="28" y="42.6" width="15" height="2.8" rx="1.4" fill="#cbd3d1"/>
      </symbol>
      <symbol id="icon-process-calendar" viewBox="0 0 64 64">
        <rect x="11" y="15" width="42" height="42" rx="4" fill="#ffffff"/>
        <rect x="11" y="15" width="42" height="42" rx="4" fill="none" stroke="#3d6373" stroke-width="2"/>
        <path d="M11 19a4 4 0 0 1 4-4h34a4 4 0 0 1 4 4v8H11Z" fill="#527d8f"/>
        <rect x="19" y="9" width="4.5" height="12" rx="2.25" fill="#b4863f"/>
        <rect x="40.5" y="9" width="4.5" height="12" rx="2.25" fill="#b4863f"/>
        <rect x="16" y="32" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="25" y="32" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="34" y="32" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="43" y="32" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="16" y="40" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="25" y="40" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="43" y="40" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="16" y="48" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <rect x="25" y="48" width="6" height="5" rx="1.2" fill="#dde3e1"/>
        <circle cx="37" cy="46" r="11" fill="#6e8f71" stroke="#ffffff" stroke-width="2.5"/>
        <path d="M32 46l3.5 3.5 7-7" fill="none" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      </symbol>
    </svg>`;

function leadModal(page) {
  return `
    <div class="lead-modal" id="agendamento" data-lead-modal hidden>
      <div class="lead-modal-backdrop" data-close-lead-modal></div>
      <div class="lead-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="lead-modal-title">
        <button class="modal-close" type="button" data-close-lead-modal aria-label="Fechar formulário">
          <i data-lucide="x" aria-hidden="true"></i>
        </button>
        <form class="lead-form" action="${webhook}" method="post" data-phone="${whatsapp}" data-doctor="Dr. Thiago Cerqueira" data-webhook="${webhook}" aria-label="Formulário de agendamento">
          <input type="hidden" name="regiao" value="${escapeHtml(page.slug)}">
          <div class="form-heading">
            <strong id="lead-modal-title">Preencha para falar pelo WhatsApp</strong>
            <span>Informe nome e telefone. Ao enviar, a mensagem já abre pronta para a equipe.</span>
          </div>
          <label>
            <span>Nome</span>
            <input type="text" name="nome" autocomplete="name" placeholder="Seu nome" required>
          </label>
          <label>
            <span>Telefone</span>
            <input type="tel" name="telefone" autocomplete="tel" inputmode="tel" placeholder="(61) 99999-9999" maxlength="15" pattern="\\([0-9]{2}\\) [0-9]{5}-[0-9]{4}" data-phone-mask required>
          </label>
          <button class="btn btn-primary" type="submit">
            <i data-lucide="send" aria-hidden="true"></i>
            Enviar pelo WhatsApp
          </button>
        </form>
      </div>
    </div>`;
}

function renderPage(page) {
  const leadMessage = encodeURIComponent(`Olá, gostaria de verificar disponibilidade para avaliação de ${page.name} com o Dr. Thiago Cerqueira.`);

  return `<!doctype html>
<html lang="pt-BR">
  <head>
    <script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
    })(window,document,'script','dataLayer','GTM-NLWCWSRM');</script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${escapeHtml(page.metaTitle)}</title>
    <meta name="description" content="${escapeHtml(page.metaDescription)}">
    <meta property="og:title" content="${escapeHtml(page.metaTitle)}">
    <meta property="og:description" content="${escapeHtml(page.metaDescription)}">
    <meta property="og:type" content="website">
    <meta property="og:image" content="../assets/dr-thiago-hero.avif">
    <link rel="icon" href="../favicon.ico" sizes="any">
    <link rel="icon" type="image/png" sizes="16x16" href="../assets/brand/favicon-16x16.png">
    <link rel="icon" type="image/png" sizes="32x32" href="../assets/brand/favicon-32x32.png">
    <link rel="apple-touch-icon" sizes="180x180" href="../assets/brand/apple-touch-icon.png">
    <link rel="preconnect" href="https://unpkg.com">
    <link rel="stylesheet" href="../styles.css?v=20260713-regioes-1">
  </head>
  <body class="regional-page">
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NLWCWSRM" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
${processIconSprite}

    <header class="site-header" data-elevate>
      <a class="brand" href="../" aria-label="Dr. Thiago Cerqueira">
        <img src="../assets/brand/logo-horizontal-gray.png" alt="Thiago Cerqueira - Tratamento da dor e Medicina regenerativa">
      </a>
      <nav class="nav" aria-label="Navegação principal">
        <a href="#sintomas">Sintomas</a>
        <a href="#tratamentos">Tratamentos</a>
        <a href="#convenios">Convênios</a>
        <a href="#localizacao">Localização</a>
      </nav>
      <a class="header-cta" href="#agendamento" data-open-lead-modal aria-controls="agendamento">
        <i data-lucide="calendar-check" aria-hidden="true"></i>
        Agendar
      </a>
    </header>

    <main id="top">
      <section class="regional-hero section-dark">
        <div class="hero-media" aria-hidden="true">
          <img src="../assets/dr-thiago-hero.avif?v=20260601-consultorio" alt="">
        </div>
        <div class="container region-hero-grid">
          <div class="hero-copy">
            <p class="eyebrow">Avaliação ortopédica para ${escapeHtml(page.name)}</p>
            <h1>${escapeHtml(page.heroTitle)}</h1>
            <div class="hero-mobile-photo" aria-hidden="true">
              <img src="../assets/dr-thiago-hero.avif?v=20260601-consultorio" alt="">
            </div>
            <p class="hero-lead">${escapeHtml(page.heroLead)}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="#agendamento" data-open-lead-modal aria-controls="agendamento">
                <i data-lucide="calendar-check" aria-hidden="true"></i>
                Agendar avaliação
              </a>
              <a class="btn btn-convenios" href="#convenios">
                <i data-lucide="credit-card" aria-hidden="true"></i>
                Ver lista de convênios
              </a>
            </div>
          </div>
          <aside class="region-hero-card" aria-label="Resumo do atendimento">
            <i data-lucide="badge-check" aria-hidden="true"></i>
            <strong>${escapeHtml(page.heroFocus)}</strong>
            <span>Consulta na Asa Sul para entender a origem da dor e orientar o próximo passo com clareza.</span>
          </aside>
        </div>
      </section>

      <section class="quick-proof" aria-label="Diferenciais do atendimento">
        <div class="container proof-grid">
          <article>
            <i data-lucide="stethoscope" aria-hidden="true"></i>
            <h2>Avaliação individual</h2>
            <p>O atendimento começa pela história da dor, exame físico e análise dos exames disponíveis.</p>
          </article>
          <article>
            <i data-lucide="activity" aria-hidden="true"></i>
            <h2>Foco na função</h2>
            <p>A consulta considera como a dor afeta sono, trabalho, treino, caminhada e rotina.</p>
          </article>
          <article>
            <i data-lucide="syringe" aria-hidden="true"></i>
            <h2>Recursos quando indicados</h2>
            <p>Procedimentos para dor e ortopedia regenerativa podem ser discutidos conforme o diagnóstico.</p>
          </article>
          <article>
            <i data-lucide="credit-card" aria-hidden="true"></i>
            <h2>Convênios AMHP</h2>
            <p>A equipe confirma cobertura, autorização e disponibilidade antes do atendimento.</p>
          </article>
        </div>
      </section>

      <section class="section regional-section" id="sintomas">
        <div class="container section-heading">
          <p class="eyebrow">Sintomas</p>
          <h2>${escapeHtml(page.symptomTitle)}</h2>
          <p>Quando a dor começa a limitar movimentos, sono ou atividades simples, vale investigar a causa antes que o problema se arraste.</p>
        </div>
        <div class="container regional-card-grid">
${cardMarkup(page.symptoms, page.slug)}
        </div>
      </section>

      <section class="section regional-section regional-muted">
        <div class="container two-column">
          <div>
            <p class="eyebrow">Possíveis causas</p>
            <h2>${escapeHtml(page.causesTitle)}</h2>
          </div>
          <div class="section-copy">
            <p>Dor parecida pode ter causas diferentes. Por isso, a consulta não se resume ao laudo: ela cruza sintomas, exame físico, rotina, histórico e objetivos do paciente.</p>
          </div>
        </div>
        <div class="container regional-card-grid regional-card-grid-compact">
${cardMarkup(page.causes, page.slug)}
        </div>
      </section>

      <section class="section regional-section" id="tratamentos">
        <div class="container section-heading">
          <p class="eyebrow">Tratamento</p>
          <h2>${escapeHtml(page.careTitle)}</h2>
          <p>O objetivo é definir um caminho coerente para o seu caso: controlar a dor, recuperar função e evitar decisões apressadas.</p>
        </div>
        <div class="container regional-care-grid">
${cardMarkup(page.care, page.slug)}
        </div>
        <div class="container treatment-note regional-note">
          <i data-lucide="info" aria-hidden="true"></i>
          <div>
            <h3>Procedimento não é ponto de partida obrigatório.</h3>
            <p>Quando infiltrações, bloqueios, ondas de choque, PRP ou outros recursos forem considerados, a indicação é explicada com benefícios, limites, preparo e alternativas.</p>
          </div>
        </div>
      </section>

      <section class="section convenios-section" id="convenios">
        <div class="container convenios-heading">
          <p class="eyebrow">Convênios AMHP</p>
          <h2>Lista de convênios atendidos</h2>
          <p>Confira os convênios disponíveis para consulta. Cobertura, disponibilidade de agenda e autorizações devem ser confirmadas com a equipe antes do atendimento.</p>
        </div>
        <div class="container convenios-card">
          <div class="convenios-card-intro">
            <span class="convenios-icon" aria-hidden="true">
              <i data-lucide="shield-check"></i>
            </span>
            <div>
              <h3>Convênios disponíveis para consulta</h3>
              <p>${convenios.length} convênios listados.</p>
            </div>
          </div>
          <div class="convenios-list" id="convenios-list" data-convenios-list>
${convenioMarkup()}
          </div>
          <button class="btn convenios-toggle" type="button" data-convenios-toggle aria-expanded="false" aria-controls="convenios-list">
            <span>Ver mais convênios</span>
            <i data-lucide="chevron-down" aria-hidden="true"></i>
          </button>
        </div>
      </section>

      <section class="section" id="como-funciona">
        <div class="container section-heading">
          <p class="eyebrow">Como funciona</p>
          <h2>Da primeira conversa ao plano de cuidado</h2>
        </div>
        <div class="container process-steps">
          <article>
            <span>01</span>
            <svg class="process-icon" aria-hidden="true"><use href="#icon-process-phone"></use></svg>
            <h3>Fale com a equipe</h3>
            <p>Confirme agenda, convênio e orientações iniciais para a avaliação.</p>
          </article>
          <article>
            <span>02</span>
            <svg class="process-icon" aria-hidden="true"><use href="#icon-process-eval"></use></svg>
            <h3>Passe pela consulta</h3>
            <p>O Dr. Thiago avalia sua queixa, rotina, histórico e exames já realizados.</p>
          </article>
          <article>
            <span>03</span>
            <svg class="process-icon" aria-hidden="true"><use href="#icon-process-plan"></use></svg>
            <h3>Entenda as opções</h3>
            <p>Você recebe explicação sobre diagnóstico provável, alternativas e próximos passos.</p>
          </article>
          <article>
            <span>04</span>
            <svg class="process-icon" aria-hidden="true"><use href="#icon-process-calendar"></use></svg>
            <h3>Siga a conduta indicada</h3>
            <p>Quando houver procedimento, a equipe orienta preparo, autorização e acompanhamento.</p>
          </article>
        </div>
      </section>

      <section class="section about">
        <div class="container about-grid">
          <div class="doctor-photo" role="img" aria-label="Dr. Thiago Cerqueira em atendimento"></div>
          <div>
            <p class="eyebrow">Sobre o médico</p>
            <h2>Dr. Thiago Cerqueira</h2>
            <p>Ortopedista e traumatologista com atuação no cuidado de pacientes com dor musculoesquelética, lesões, queixas articulares e limitações de movimento.</p>
            <p>Seu trabalho combina avaliação médica, explicação clara e recursos de tratamento definidos caso a caso, incluindo procedimentos em consultório e em ambiente hospitalar quando indicados.</p>
            <div class="regional-credential">
              <span><i data-lucide="shield-check" aria-hidden="true"></i></span>
              <p>CRM 18843 | RQE 18832</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section location" id="localizacao">
        <div class="container location-grid">
          <div>
            <p class="eyebrow">Localização</p>
            <h2>Atendimento na Asa Sul, Brasília</h2>
            <ul class="location-list">
              <li><i data-lucide="map-pin" aria-hidden="true"></i>SGAS II 610, Edifício Lúcio Costa, Bloco 01 - Sala 120</li>
              <li><i data-lucide="building-2" aria-hidden="true"></i>Clínica Vitalité, Asa Sul, Brasília/DF</li>
              <li><i data-lucide="clock" aria-hidden="true"></i>Segunda a sexta, 08:00-18:00</li>
            </ul>
            <div class="inline-actions">
              <a class="btn btn-primary" href="#agendamento" data-open-lead-modal aria-controls="agendamento">
                <i data-lucide="calendar-check" aria-hidden="true"></i>
                Agendar avaliação
              </a>
            </div>
          </div>
          <div class="map-preview">
            <iframe src="https://www.openstreetmap.org/export/embed.html?bbox=-47.9042567%2C-15.8288704%2C-47.9002567%2C-15.8248704&layer=mapnik&marker=-15.8268704%2C-47.9022567" title="Mapa do Centro Médico Lúcio Costa - SGAS II 610, Asa Sul, Brasília/DF" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </section>

      <section class="section faq">
        <div class="container faq-grid">
          <div>
            <p class="eyebrow">Dúvidas frequentes</p>
            <h2>Perguntas sobre dor em ${escapeHtml(page.name)}</h2>
          </div>
          <div class="faq-list">
${faqMarkup(page.faq)}
          </div>
        </div>
      </section>

      <section class="final-cta section-dark" id="contato">
        <div class="container final-grid final-grid-single">
          <div>
            <p class="eyebrow">Agendamento</p>
            <h2>Quer entender o melhor caminho para sua dor em ${escapeHtml(page.name)}?</h2>
            <p>Fale com a equipe para verificar disponibilidade, convênio e agendar uma avaliação com o Dr. Thiago Cerqueira.</p>
            <div class="inline-actions final-copy-action">
              <a class="btn btn-primary" href="#agendamento" data-open-lead-modal aria-controls="agendamento">
                <i data-lucide="message-circle" aria-hidden="true"></i>
                Falar com a equipe
              </a>
              <a class="btn btn-outline" href="https://wa.me/${whatsapp}?text=${leadMessage}" target="_blank" rel="noopener">
                <i data-lucide="send" aria-hidden="true"></i>
                Abrir WhatsApp direto
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>

${leadModal(page)}

    <footer class="site-footer">
      <div class="container footer-grid">
        <img class="footer-logo" src="../assets/brand/logo-horizontal-white.png" alt="Thiago Cerqueira - Tratamento da dor e Medicina regenerativa">
        <p>CRM 18843 | RQE 18832</p>
      </div>
    </footer>

    <script src="https://unpkg.com/lucide@latest/dist/umd/lucide.min.js"></script>
    <script src="../script.js?v=20260713-regioes-1"></script>
  </body>
</html>
`;
}

for (const page of pages) {
  const targetDir = path.join(rootDir, page.slug);
  fs.mkdirSync(targetDir, { recursive: true });
  fs.writeFileSync(path.join(targetDir, "index.html"), renderPage(page), "utf8");
}

console.log(`Generated ${pages.length} regional landing pages.`);
