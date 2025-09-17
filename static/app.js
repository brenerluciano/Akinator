// ======== CONSTANTES E ESTADO ========
const MIN_QUESTIONS = 5;
const HERO_CONFIRM_THRESHOLD = 3;

const HERO_LIST = [
  "Aquaman","Flash","Mulher-Maravilha","Batman","Superman",
  "Capitão América","Hulk","Thor","Homem-Aranha","Homem de Ferro",
];

let queue = [];
let current = null;
let asked = []; // {text, answer}
let count = 0;
let foundHero = null;
let finished = false;

// genéricas para cumprir mínimo de 5
const genericQuestions = [
  "O herói aparece frequentemente em filmes/séries?",
  "O herói é (ou já foi) membro de uma grande equipe?",
  "O herói possui uma identidade secreta?",
  "O herói é mais popular nos quadrinhos do que no cinema?",
  "O herói luta principalmente para proteger sua cidade natal?",
  "O herói tem um símbolo marcante no uniforme?",
  "O herói já protagonizou desenhos animados?",
];

// ======== ELEMENTOS DOM ========
const askedCountEl   = document.getElementById("askedCount");
const minQuestionsEl = document.getElementById("minQuestions");
const progressBarEl  = document.getElementById("progressBar");
const questionAreaEl = document.getElementById("questionArea");
const answersButtonsEl = document.getElementById("answersButtons");
const btnYes   = document.getElementById("btnYes");
const btnNo    = document.getElementById("btnNo");
const btnStart = document.getElementById("btnStart");
const btnReset = document.getElementById("btnReset");
const historyListEl = document.getElementById("historyList");

// ======== FUNÇÕES DE ESTADO ========
function pushQuestion(q) {
  queue.push(q);
  if (!current) advance();
}
function advance() {
  current = queue.shift() || null;
  render();
}
function recordAnswer(text, answer) {
  asked.push({ text, answer });
  count += 1;
  render();
}
function ensureMinQuestions(after) {
  if (count >= MIN_QUESTIONS) return after();
  const need = MIN_QUESTIONS - count;
  const picks = genericQuestions.slice(0, need).map((text, i) => ({
    id: `g-${Date.now()}-${i}`, text, kind: "generic",
    onAnswer: (yes) => {
      recordAnswer(text, yes);
      advance();
      if (i === need - 1) after();
    },
  }));
  queue = [...picks, ...queue];
  if (!current) advance();
}
function guess(hero) {
  ensureMinQuestions(() => {
    foundHero = hero; finished = true; current = null; queue = []; render();
  });
}
function finishAsUnknown() {
  ensureMinQuestions(() => {
    finished = true; foundHero = null; current = null; queue = []; render();
  });
}
function reset() {
  queue = []; current = null; asked = []; count = 0; foundHero = null; finished = false; render();
}

// ======== BLOCOS POR HERÓI ========
function askHeroBlock(hero, questions, onFail) {
  let yesCount = 0;
  const seq = questions.map((text, i) => ({
    id: `h-${hero}-${i}`, kind: "hero", text,
    onAnswer: (yes) => {
      recordAnswer(text, yes);
      if (yes) yesCount += 1;
      advance();
      if (i === questions.length - 1) {
        yesCount >= HERO_CONFIRM_THRESHOLD ? guess(hero) : onFail();
      }
    },
  }));
  queue = [...seq, ...queue];
  if (!current) advance();
}

// ======== FLUXO PRINCIPAL ========
function startGame() {
  reset();
  // Q1: Marvel?
  const q1 = {
    id: "q-marvel",
    text: "O herói é da Marvel?",
    onAnswer: (isMarvel) => {
      recordAnswer(q1.text, isMarvel);
      advance();

      if (isMarvel) {
        const q2 = {
          id: "q-armadura",
          text: "Ele usa uma armadura tecnológica?",
          onAnswer: (armadura) => {
            recordAnswer(q2.text, armadura);
            advance();
            if (armadura) {
              askHeroBlock("Homem de Ferro", [
                "Ele é bilionário?",
                "Ele é um gênio inventor?",
                "Ele tem um reator arc no peito?",
                "Ele liderou os Vingadores em alguns momentos?",
              ], () => askSpiderOrThorOrHulkOrCap());
            } else {
              askSpiderOrThorOrHulkOrCap();
            }
          },
        };
        pushQuestion(q2);

        function askSpiderOrThorOrHulkOrCap() {
          const qTeen = {
            id: "q-teen",
            text: "Ele é um adolescente?",
            onAnswer: (teen) => {
              recordAnswer(qTeen.text, teen);
              advance();
              if (teen) {
                askHeroBlock("Homem-Aranha", [
                  "Ele ganhou poderes após ser picado por uma aranha?",
                  "Ele vive em Nova York?",
                  "Ele tem um 'sentido-aranha'?",
                  "Ele usa teias para se locomover?",
                ], () => askThorOrHulkOrCap());
              } else {
                askThorOrHulkOrCap();
              }
            },
          };
          pushQuestion(qTeen);

          function askThorOrHulkOrCap() {
            const qMjolnir = {
              id: "q-martelo",
              text: "Ele empunha um martelo místico?",
              onAnswer: (hasHammer) => {
                recordAnswer(qMjolnir.text, hasHammer);
                advance();
                if (hasHammer) {
                  askHeroBlock("Thor", [
                    "Ele é filho de Odin?",
                    "Ele controla trovões?",
                    "Ele é príncipe de Asgard?",
                    "Ele tem um machado chamado Stormbreaker?",
                  ], () => askHulkOrCap());
                } else {
                  askHulkOrCap();
                }
              },
            };
            pushQuestion(qMjolnir);

            function askHulkOrCap() {
              const qHulk = {
                id: "q-forca",
                text: "Ele se transforma em uma criatura gigante e extremamente forte quando fica com raiva?",
                onAnswer: (rage) => {
                  recordAnswer(qHulk.text, rage);
                  advance();
                  if (rage) {
                    askHeroBlock("Hulk", [
                      "Ele é um cientista?",
                      "Ele tem pele esverdeada quando transforma?",
                      "Ele foi exposto a radiação gama?",
                      "Ele já foi membro dos Vingadores?",
                    ], () => askCap());
                  } else {
                    askCap();
                  }
                },
              };
              pushQuestion(qHulk);

              function askCap() {
                askHeroBlock("Capitão América", [
                  "Ele tem um escudo feito de vibranium?",
                  "Ele lutou na Segunda Guerra Mundial?",
                  "Ele foi congelado e despertou no futuro?",
                  "Ele é conhecido como 'Primeiro Vingador'?",
                ], () => finishAsUnknown());
              }
            }
          }
        }
      } else {
        // DC
        const qCapa = {
          id: "q-capa",
          text: "Ele usa capa?",
          onAnswer: (hasCape) => {
            recordAnswer(qCapa.text, hasCape);
            advance();
            if (hasCape) {
              const qAlien = {
                id: "q-alien",
                text: "Ele é alienígena?",
                onAnswer: (alien) => {
                  recordAnswer(qAlien.text, alien);
                  advance();
                  if (alien) {
                    askHeroBlock("Superman", [
                      "Ele veio do planeta Krypton?",
                      "Ele tem visão de calor?",
                      "Ele é vulnerável à kriptonita?",
                      "Ele pode voar?",
                    ], () => askBatman());
                  } else {
                    askBatman();
                  }
                },
              };
              pushQuestion(qAlien);

              function askBatman() {
                askHeroBlock("Batman", [
                  "Ele é bilionário?",
                  "Ele é considerado o maior detetive do mundo?",
                  "Ele opera em Gotham?",
                  "Ele não tem superpoderes mas compensa com treino?",
                ], () => finishAsUnknown());
              }
            } else {
              const qWoman = {
                id: "q-mulher",
                text: "É uma mulher?",
                onAnswer: (isWoman) => {
                  recordAnswer(qWoman.text, isWoman);
                  advance();
                  if (isWoman) {
                    askHeroBlock("Mulher-Maravilha", [
                      "Ela é uma amazona?",
                      "Ela usa um laço da verdade?",
                      "Ela é princesa de Themyscira?",
                      "Ela tem braceletes indestrutíveis?",
                    ], () => askFlashOrAquaman());
                  } else {
                    askFlashOrAquaman();
                  }
                },
              };
              pushQuestion(qWoman);

              function askFlashOrAquaman() {
                const qFast = {
                  id: "q-veloz",
                  text: "Ele tem supervelocidade?",
                  onAnswer: (fast) => {
                    recordAnswer(qFast.text, fast);
                    advance();
                    if (fast) {
                      askHeroBlock("Flash", [
                        "Ele tem acesso à Força de Aceleração?",
                        "Ele pode viajar no tempo em algumas histórias?",
                        "Ele usa um uniforme vermelho?",
                        "Ele trabalha como cientista/forense em algumas versões?",
                      ], () => askAquaman());
                    } else {
                      askAquaman();
                    }
                  },
                };
                pushQuestion(qFast);

                function askAquaman() {
                  askHeroBlock("Aquaman", [
                    "Ele é rei de Atlântida?",
                    "Ele consegue respirar debaixo d'água?",
                    "Ele se comunica com criaturas marinhas?",
                    "Ele carrega um tridente?",
                  ], () => finishAsUnknown());
                }
              }
            }
          },
        };
        pushQuestion(qCapa);
      }
    },
  };
  pushQuestion(q1);
}

// ======== RENDER ========
function render() {
  askedCountEl.textContent = count;
  minQuestionsEl.textContent = MIN_QUESTIONS;
  const progress = Math.min((count / 15) * 100, 100);
  progressBarEl.style.width = `${progress}%`;

  historyListEl.innerHTML = asked.length
    ? asked.map((a, i) => `
        <li class="flex items-start gap-3">
          <span class="text-slate-400 mt-0.5 text-sm">${i + 1}.</span>
          <div>
            <p class="leading-snug">${a.text}</p>
            <span class="text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${a.answer ? "tag tag-yes" : "tag tag-no"}">
              ${a.answer ? "Sim" : "Não"}
            </span>
          </div>
        </li>
      `).join("")
    : `<li class="text-slate-400">Sem respostas ainda.</li>`;

  if (finished) {
  answersButtonsEl.classList.add("hidden");

  if (foundHero) {
    const heroMap = window.__HERO_MAP__ || {};
    const imgSrc = heroMap[foundHero] || "";

    questionAreaEl.innerHTML = `
      <div>
        ${imgSrc ? `<img class="result-img" src="${imgSrc}" alt="${foundHero}">` : ""}
        <h2 class="text-2xl md:text-3xl font-semibold">
          💡 Seu herói é: <span class="text-emerald-400">${foundHero}</span>!
        </h2>
        <p class="text-slate-300 mt-2">Clique em Reiniciar para jogar novamente.</p>
      </div>
    `;
  } else {
    questionAreaEl.innerHTML = `
      <div>
        <h2 class="text-2xl md:text-3xl font-semibold">🤔 Pensei em... Zé Ninguém</h2>
        <p class="text-slate-300 mt-2">Não consegui adivinhar desta vez.</p>
      </div>
    `;
  }
  return;
}


  if (current) {
    answersButtonsEl.classList.remove("hidden");
    questionAreaEl.innerHTML = `<p class="text-xl md:text-2xl font-medium leading-snug">${current.text}</p>`;
  } else {
    answersButtonsEl.classList.add("hidden");
    questionAreaEl.innerHTML = count === 0
      ? `<p class="text-slate-300">Clique em <span class="text-slate-100 font-medium">Começar</span> para iniciar.</p>`
      : `<p class="text-slate-300">Processando...</p>`;
  }
}

// ======== EVENTOS ========
btnStart.addEventListener("click", startGame);
btnReset.addEventListener("click", reset);

btnYes.addEventListener("click", () => {
  if (!current) return;
  const cb = current.onAnswer; current = null; cb(true);
});
btnNo.addEventListener("click", () => {
  if (!current) return;
  const cb = current.onAnswer; current = null; cb(false);
});

// render inicial
render();
