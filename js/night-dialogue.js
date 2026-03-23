"use strict";

/* ══════════ NIGHT DIALOGUE — Veille du Tournoi ══════════
   Dialogue nocturne entre le joueur et un persona aléatoire
   avant le début de l'aventure.
   ════════════════════════════════════════════════════════ */

var NIGHT_DIALOGUES = {
  /* Chaque persona a un arbre de dialogue.
     Structure : tableau de "beats" séquentiels.
     Chaque beat = { npc: "texte NPC", choices: [{text, reply}, ...] }
     → Le joueur choisit, le NPC répond, puis on passe au beat suivant.
     Le dernier beat n'a pas de choices (fin du dialogue). */

  "elrand": {
    greeting: "Tu ne dors pas non plus, à ce que je vois.",
    beats: [
      { npc: "Les nuits avant un Tournoi ont toujours ce goût étrange… entre l'excitation et la peur. Tu ressens quoi, toi ?",
        choices: [
          { text: "De l'excitation, surtout.", reply: "Ha. C'est bon signe. Les meilleurs commencent avec le feu, pas avec la prudence." },
          { text: "De la peur, honnêtement.", reply: "La peur est une alliée, pas une ennemie. Elle aiguise les sens quand tout le reste s'effondre." },
          { text: "Rien de spécial.", reply: "Hmm. Le calme avant la tempête. J'espère que c'est de la force, pas de l'ignorance." }
        ]},
      { npc: "J'ai vu des dizaines de Tournois. Des légendes naître, des héros tomber. Mais c'est toujours la même chose au fond…",
        choices: [
          { text: "Qu'est-ce qui ne change jamais ?", reply: "L'instant où tu réalises que personne ne viendra te sauver. C'est là que commence la vraie histoire." },
          { text: "Tu n'as jamais eu peur, toi ?", reply: "À chaque fois. Mais la peur, c'est juste le prix d'entrée pour les choses qui comptent." }
        ]},
      { npc: "Repose-toi. Demain, les soleils ne se lèveront pas pour ceux qui dorment encore. Bonne nuit, voyageur." }
    ]
  },

  "lux": {
    greeting: "Les étoiles sont différentes ici, tu ne trouves pas ?",
    beats: [
      { npc: "Chez moi, à Shar-Vaëlis, le ciel raconte des histoires. Ici, il murmure des avertissements. Qu'est-ce que tu vois quand tu regardes là-haut ?",
        choices: [
          { text: "De la beauté.", reply: "Oui… la beauté persiste même dans les endroits les plus dangereux. C'est peut-être sa plus grande force." },
          { text: "Des mondes inconnus.", reply: "Chaque point lumineux est un monde. Et quelque part là-haut, quelqu'un regarde dans notre direction en se posant les mêmes questions." },
          { text: "Rien. Juste le vide.", reply: "Le vide n'existe pas. Il y a toujours de la lumière, même quand on ne la voit pas encore." }
        ]},
      { npc: "Tu sais… la lumière ne force rien. Elle révèle ce qui était déjà là. Demain, le Tournoi va révéler qui tu es vraiment.",
        choices: [
          { text: "Et si je n'aime pas ce que je découvre ?", reply: "Alors tu auras au moins la vérité. C'est plus que ce que la plupart obtiennent dans une vie entière." },
          { text: "J'ai hâte de le savoir.", reply: "Garde cette flamme. Tu en auras besoin quand les ombres deviendront épaisses." }
        ]},
      { npc: "La lumière revient toujours. Souviens-toi de ça demain. Bonne nuit." }
    ]
  },

  "hyandi": {
    greeting: "Tu te caches, ou tu observes ? … Non, ne réponds pas. Je connais la différence.",
    beats: [
      { npc: "Les gens ont peur des ombres. Mais l'ombre, c'est juste l'endroit où la vérité se cache quand elle ne veut pas être vue. Tu aimes la vérité ?",
        choices: [
          { text: "Toujours.", reply: "Menteur. Personne n'aime la vérité tout le temps. Mais j'apprécie l'intention." },
          { text: "Ça dépend de la vérité.", reply: "Réponse honnête. C'est rafraîchissant dans un endroit où tout le monde joue un rôle." },
          { text: "Je préfère mes propres illusions.", reply: "Au moins tu le sais. La plupart des gens ne réalisent même pas qu'ils se mentent." }
        ]},
      { npc: "Demain, tout le monde portera un masque. Les champions, les organisateurs, même les spectateurs. La vraie question…",
        choices: [
          { text: "C'est de savoir qui enlèvera le sien en premier ?", reply: "Non. C'est de savoir qui sera encore debout quand tous les masques tomberont." },
          { text: "Tu portes un masque, toi aussi ?", reply: "Moi ? Je suis le masque. L'ombre et la personne ne font qu'un." }
        ]},
      { npc: "Dors bien, voyageur. Demain, les ombres auront des dents." }
    ]
  },

  "pipo": {
    greeting: "Hé ! Tu dors pas ? Moi non plus ! J'ai essayé, mais mon cerveau fait du bruit.",
    beats: [
      { npc: "Attends, attends — tu veux un conseil pour demain ? Un VRAI conseil, pas les trucs sérieux que les autres racontent ?",
        choices: [
          { text: "Vas-y, je t'écoute.", reply: "Okay : si tu vois un truc bizarre, fais comme si c'était normal. Et si quelque chose de normal arrive… méfie-toi. C'est un piège." },
          { text: "Tes conseils sont fiables ?", reply: "Absolument pas ! C'est pour ça qu'ils marchent. Personne ne s'attend à ce que le bouffon ait raison." },
          { text: "Je préfère dormir…", reply: "Dormir ?! La veille du Tournoi ?! C'est comme dormir avant un feu d'artifice ! Tu rates le meilleur moment : l'attente !" }
        ]},
      { npc: "Tu sais ce que je fais quand j'ai peur ? Je ris. Les gens pensent que je suis fou. Et les fous, personne ne les attaque en premier.",
        choices: [
          { text: "C'est… étrangement stratégique.", reply: "MERCI ! C'est exactement ce que je dis ! Le chaos est une stratégie comme une autre !" },
          { text: "Ou alors ils t'éliminent en premier.", reply: "Hmm. Possible. Mais au moins je serai parti en rigolant, et ça c'est une victoire." }
        ]},
      { npc: "Allez, bonne nuit ! Demain on va bien s'amuser. Enfin… « s'amuser ». Tu sais ce que je veux dire. Ou pas. Bref !" }
    ]
  },

  "brakk": {
    greeting: "T'es debout. Bien. Les faibles dorment la veille d'une guerre.",
    beats: [
      { npc: "Je vais te dire un truc que personne ici n'osera te dire : ce tournoi, c'est pas un jeu. C'est une arène. Et dans une arène, y'a ceux qui frappent et ceux qui tombent.",
        choices: [
          { text: "Je compte bien frapper.", reply: "Bien. Mais frappe juste. Un coup perdu, c'est une ouverture pour l'ennemi." },
          { text: "La force n'est pas tout.", reply: "T'as raison. Mais quand les mots s'arrêtent, c'est le poing qui tranche. Souviens-toi de ça." },
          { text: "On verra bien demain.", reply: "Ouais. On verra. J'espère que t'es aussi solide que ton regard le dit." }
        ]},
      { npc: "J'ai brisé mes chaînes à mains nues. Pas parce que j'étais fort. Parce que j'avais plus rien à perdre. Toi, t'as quoi à perdre ?",
        choices: [
          { text: "Tout.", reply: "Alors bats-toi pour tout. Les gens qui se battent pour tout sont les plus dangereux." },
          { text: "Rien.", reply: "Menteur. Tout le monde a quelque chose. Même les fantômes ont des regrets." }
        ]},
      { npc: "Dors. Ou dors pas. Mais demain, sois prêt. Je déteste perdre contre des gens qui dormaient." }
    ]
  },

  "tika": {
    greeting: "Oh. Tu m'as vue. Impressionnant. Ou alors j'ai fait exprès.",
    beats: [
      { npc: "Conseil gratuit : demain, regarde les mains, pas les visages. Les visages mentent. Les mains, jamais.",
        choices: [
          { text: "Tu parles d'expérience ?", reply: "Je parle de survie. Quand tu vis dans l'ombre, tu apprends vite où se cachent les lames." },
          { text: "Qu'est-ce que tes mains disent de toi ?", reply: "Qu'il ne faut pas me tourner le dos. Mais ça, tu le savais déjà, non ?" },
          { text: "Je préfère regarder les yeux.", reply: "Les yeux ? Tout le monde peut mentir avec ses yeux. C'est la première chose qu'on apprend." }
        ]},
      { npc: "Ce tournoi est plein de gens qui croient être les plus malins de la pièce. Le secret, c'est d'être celle que personne ne remarque.",
        choices: [
          { text: "Je retiendrai le conseil.", reply: "Non. Tu l'oublieras. Tout le monde l'oublie. Et c'est pour ça que ça marche." },
          { text: "Toi, je t'ai remarquée.", reply: "Hmm. C'est soit très bon pour toi, soit très mauvais. On verra demain lequel." }
        ]},
      { npc: "Disparais dans tes rêves, voyageur. Moi, je vais rester éveillée. Quelqu'un doit surveiller." }
    ]
  },

  "zara": {
    greeting: "Tu sens ça ? L'air brûle déjà. Demain, ça sera pire. Bien pire.",
    beats: [
      { npc: "Moi je dis qu'il faut foncer. La stratégie, la prudence, tout ça c'est bien joli… mais au bout du compte, c'est la passion qui gagne. T'es d'accord ?",
        choices: [
          { text: "Complètement.", reply: "Je t'aime bien, toi. Les gens prudents m'ennuient. Donne-moi du feu, et je te rendrai des cendres." },
          { text: "Pas toujours. Il faut un plan.", reply: "Un plan ? Les plans brûlent au premier contact avec la réalité. Mieux vaut être le feu que le papier." },
          { text: "La passion peut aussi te détruire.", reply: "Peut-être. Mais au moins, je brûle. C'est mieux que de moisir dans le confort." }
        ]},
      { npc: "Tu sais pourquoi je suis là ? Pas pour gagner. Pour brûler si fort que personne ne pourra m'oublier.",
        choices: [
          { text: "Respectable.", reply: "C'est pas du respect que je veux. C'est qu'on se souvienne de la chaleur quand je serai partie." },
          { text: "Et si tu perds ?", reply: "Si je perds ? Je préfère brûler que m'éteindre. C'est ma seule règle." }
        ]},
      { npc: "Dors bien, voyageur. Demain, je serai la flamme. À toi de décider si tu veux t'approcher ou fuir." }
    ]
  },

  "naia": {
    greeting: "L'eau est calme, ce soir. Tu entends ? Même la rivière retient son souffle.",
    beats: [
      { npc: "Tu portes quelque chose de lourd. Non, ne dis rien — ça se voit dans ta façon de respirer. Tu veux en parler ?",
        choices: [
          { text: "Je suis nerveux pour demain.", reply: "C'est normal. La nervosité, c'est juste ton corps qui se prépare. Laisse-le faire son travail." },
          { text: "Non. Je vais bien.", reply: "D'accord. Mais si tu changes d'avis, l'eau ne juge jamais. Et moi non plus." },
          { text: "Comment tu fais pour être si calme ?", reply: "L'eau ne lutte pas. Elle contourne, elle s'adapte. La force, c'est de savoir plier sans se briser." }
        ]},
      { npc: "Demain, les choses vont aller vite. Quand tu te sentiras submergé, souviens-toi de respirer. L'eau trouve toujours son chemin.",
        choices: [
          { text: "Merci, Naïa.", reply: "Pas de merci. C'est ce que fait l'eau — elle aide sans demander de reconnaissance." },
          { text: "Tu as peur, toi aussi ?", reply: "Bien sûr. Mais la peur et le courage boivent à la même source. L'important, c'est de ne pas se noyer." }
        ]},
      { npc: "Laisse le courant t'emporter vers le sommeil. Demain, tu nageras. Ce soir, tu flottes." }
    ]
  },

  "solen": {
    greeting: "…",
    beats: [
      { npc: "… Tu n'as pas besoin de parler. Moi non plus. Mais puisqu'on est là…",
        choices: [
          { text: "On peut juste rester en silence.", reply: "… Bien. Le silence dit plus que la plupart des discours." },
          { text: "Tu es prêt pour demain ?", reply: "Je suis toujours prêt. Être prêt, c'est la seule chose que je contrôle." },
          { text: "Pourquoi tu ne dors pas ?", reply: "Les gardiens ne dorment pas la veille d'une bataille. Quelqu'un doit veiller." }
        ]},
      { npc: "Les autres parlent de victoire. De gloire. Moi, je pense aux gens qu'il faudra protéger quand tout s'effondrera.",
        choices: [
          { text: "Tu protèges qui ?", reply: "N'importe qui. Tout le monde mérite un bouclier. Même ceux qui ne le demandent pas." },
          { text: "Et qui te protège, toi ?", reply: "… Personne. C'est le prix. Et je l'ai accepté il y a longtemps." }
        ]},
      { npc: "… Repose-toi. Demain, je serai là. Comme toujours." }
    ]
  }
};

/* ── Night intro narration builder ── */
function _buildNightIntro(cityName, regionName){
  return [
    "La téléportation s'achève. Ton corps se reconstitue, particule par particule, dans un lieu que tu ne connais pas. L'air est différent ici. Plus dense. Plus ancien.",
    "Tu es à " + cityName + ", en " + regionName + ". C'est ici que le Tournoi t'a assigné ta zone de repos — un recoin du monde choisi au hasard, loin de tout, loin de tous.",
    "Le ciel nocturne d'Extelua s'étend au-dessus de toi. Deux lunes — l'une pâle, l'autre cuivrée — projettent des ombres longues sur un paysage que tu découvres pour la première fois.",
    "Tu es seul. Complètement seul. Demain, le Tournoi commence. Demain, tout change. Mais ce soir, il n'y a que toi et le silence.",
    "Tu t'allonges. Tu fermes les yeux. Tu essaies de dormir. Le sommeil ne vient pas. Quelque chose te maintient éveillé — une tension dans l'air, un instinct qui refuse de se taire.",
    "Et puis tu la sens. Une présence. Quelqu'un est là, dans l'obscurité, tout près. Quelqu'un qui ne devrait pas être là."
  ];
}

/* ── Night outro narration ── */
var NIGHT_OUTRO_PARAGRAPHS = [
  "Le silence revient, plus doux qu'avant. La présence s'éloigne et disparaît dans la nuit comme elle était venue — sans prévenir.",
  "Tu restes là un moment, seul à nouveau, les yeux tournés vers les étoiles. Les mots échangés résonnent encore.",
  "Puis la fatigue arrive enfin, d'un coup, comme une vague. Tu fermes les yeux. Cette fois, le sommeil t'emporte.",
  "…",
  "Les premiers rayons des soleils d'Extelua percent l'horizon. Le Tournoi commence."
];

/* ── Fade out all site music ── */
function _ndlgFadeAllMusic(cb){
  var ids = ["bg-music","ic-music","extelua-music"];
  var pending = 0;
  ids.forEach(function(id){
    var a = document.getElementById(id);
    if(a && !a.paused){
      pending++;
      audioFade(a, 0, 1200, function(){
        a.pause();
        a.volume = id === "bg-music" ? 0.4 : 0.5;
        pending--;
        if(pending === 0 && cb) cb();
      });
    }
  });
  if(pending === 0 && cb) setTimeout(cb, 100);
}

/* ── Start scenario music for night intro ── */
function _ndlgStartScenarioMusic(){
  var sc = window._chosenScenario || "lambda";
  var src = (typeof SC_MUSIC !== "undefined" && SC_MUSIC[sc]) ? SC_MUSIC[sc] : "assets/music/emissaire.mp3";
  var extAudio = document.getElementById("extelua-music");
  var extSrc = document.getElementById("extelua-music-src");
  if(!extAudio) return;
  if(extSrc) extSrc.src = src;
  extAudio.load();
  extAudio.currentTime = 0;
  extAudio.volume = 0;
  extAudio.play().catch(function(){});
  audioFade(extAudio, 0.35, 3000);
}

/* ── Show cinematic night intro, then NPC dialogue, then outro ── */
function showNightDialogue(onDone, cityName, regionName){
  var personas = getNonGuidePersonas();
  var available = personas.filter(function(p){ return NIGHT_DIALOGUES[p.id] });
  if(available.length === 0){ if(onDone) onDone(); return; }

  var npc = available[Math.floor(Math.random() * available.length)];
  var tree = NIGHT_DIALOGUES[npc.id];
  var introParagraphs = _buildNightIntro(cityName || "un lieu inconnu", regionName || "une contrée lointaine");

  // Create fullscreen overlay
  var overlay = document.createElement("div");
  overlay.id = "night-dlg-overlay";
  overlay.className = "ndlg-overlay";

  overlay.innerHTML =
    '<div class="ndlg-stars"></div>'
    + '<div class="ndlg-intro-scene" id="ndlg-intro-scene">'
    +   '<div class="ndlg-intro-text" id="ndlg-intro-text"></div>'
    +   '<div class="ndlg-tap-hint" id="ndlg-intro-tap">\u25BC</div>'
    + '</div>'
    + '<div class="ndlg-scene ndlg-scene-hidden" id="ndlg-dialogue-scene">'
    +   '<div class="ndlg-header">'
    +     '<div class="ndlg-setting">' + esc(cityName || "Zone de repos") + ' \u2014 Nuit</div>'
    +   '</div>'
    +   '<div class="ndlg-portrait-area">'
    +     '<div class="ndlg-portrait" id="ndlg-portrait">'
    +       (npc.avatar ? '<img src="'+esc(npc.avatar)+'" alt="">' : '<div class="ndlg-portrait-icon" style="color:'+esc(npc.color)+'">'+esc(npc.name.charAt(0))+'</div>')
    +     '</div>'
    +     '<div class="ndlg-npc-name" style="color:'+esc(npc.color)+'">'+esc(npc.name)+'</div>'
    +     '<div class="ndlg-npc-title">'+esc(npc.title)+'</div>'
    +   '</div>'
    +   '<div class="ndlg-bubble" id="ndlg-bubble"></div>'
    +   '<div class="ndlg-choices" id="ndlg-choices"></div>'
    +   '<div class="ndlg-tap-hint" id="ndlg-tap-hint">\u25BC</div>'
    + '</div>'
    + '<div class="ndlg-intro-scene ndlg-scene-hidden" id="ndlg-outro-scene">'
    +   '<div class="ndlg-intro-text" id="ndlg-outro-text"></div>'
    +   '<div class="ndlg-tap-hint" id="ndlg-outro-tap">\u25BC</div>'
    + '</div>';

  var screen = document.querySelector(".screen");
  (screen || document.body).appendChild(overlay);

  /* ═══════ PHASE 1 : Cinematic intro narration ═══════ */
  var introScene = overlay.querySelector("#ndlg-intro-scene");
  var introText  = overlay.querySelector("#ndlg-intro-text");
  var introTap   = overlay.querySelector("#ndlg-intro-tap");
  var paraIdx = 0;

  function _showNarrationParagraph(textEl, tapEl, paragraphs, idx, onEnd){
    if(idx >= paragraphs.length){
      if(onEnd) onEnd();
      return;
    }
    textEl.style.opacity = "0";
    textEl.style.transform = "translateY(10px)";
    setTimeout(function(){
      textEl.textContent = paragraphs[idx];
      textEl.style.transition = "opacity .6s, transform .6s";
      textEl.style.opacity = "1";
      textEl.style.transform = "translateY(0)";
      tapEl.classList.add("visible");
    }, 200);
  }

  function advanceIntro(){
    overlay.removeEventListener("click", advanceIntro);
    introTap.classList.remove("visible");
    paraIdx++;
    if(paraIdx >= introParagraphs.length){
      introScene.classList.add("ndlg-intro-fading");
      setTimeout(function(){
        introScene.style.display = "none";
        _startDialoguePhase();
      }, 700);
    } else {
      _showNarrationParagraph(introText, introTap, introParagraphs, paraIdx);
      setTimeout(function(){ overlay.addEventListener("click", advanceIntro) }, 400);
    }
  }

  // Fade all existing music, then start intro
  requestAnimationFrame(function(){
    overlay.classList.add("visible");

    _ndlgFadeAllMusic(function(){
      setTimeout(_ndlgStartScenarioMusic, 800);
    });

    setTimeout(function(){
      _showNarrationParagraph(introText, introTap, introParagraphs, 0);
      setTimeout(function(){ overlay.addEventListener("click", advanceIntro) }, 600);
    }, 800);
  });

  /* ═══════ PHASE 2 : NPC Dialogue ═══════ */
  function _startDialoguePhase(){
    var dlgScene = overlay.querySelector("#ndlg-dialogue-scene");
    dlgScene.classList.remove("ndlg-scene-hidden");

    var bubble = overlay.querySelector("#ndlg-bubble");
    var choicesEl = overlay.querySelector("#ndlg-choices");
    var tapHint = overlay.querySelector("#ndlg-tap-hint");
    var beatIdx = -1;

    function showText(html){
      bubble.style.opacity = "0";
      bubble.style.transform = "translateY(8px)";
      setTimeout(function(){
        bubble.innerHTML = '<span class="ndlg-npc-tag" style="color:'+esc(npc.color)+'">'+esc(npc.name)+'</span> ' + html;
        bubble.style.transition = "opacity .4s, transform .4s";
        bubble.style.opacity = "1";
        bubble.style.transform = "translateY(0)";
      }, 150);
    }

    function showChoices(choices){
      choicesEl.innerHTML = "";
      choicesEl.style.opacity = "0";
      setTimeout(function(){
        choices.forEach(function(c, i){
          var btn = document.createElement("button");
          btn.className = "ndlg-choice-btn";
          btn.style.animationDelay = (i * 0.1) + "s";
          btn.innerHTML = '<span class="ndlg-choice-arrow">\u25B8</span> ' + esc(c.text);
          btn.onclick = function(e){
            e.stopPropagation();
            choicesEl.querySelectorAll("button").forEach(function(b){ b.disabled = true; b.classList.add("ndlg-choice-used") });
            btn.classList.add("ndlg-choice-selected");
            setTimeout(function(){
              choicesEl.style.opacity = "0";
              showText(esc(c.reply));
              tapHint.classList.add("visible");
              var advance = function(ev){
                if(ev.target.closest(".ndlg-choice-btn")) return;
                overlay.removeEventListener("click", advance);
                tapHint.classList.remove("visible");
                nextBeat();
              };
              setTimeout(function(){ overlay.addEventListener("click", advance) }, 400);
            }, 600);
          };
          choicesEl.appendChild(btn);
        });
        choicesEl.style.transition = "opacity .4s";
        choicesEl.style.opacity = "1";
      }, 500);
    }

    function nextBeat(){
      beatIdx++;
      if(beatIdx >= tree.beats.length){
        // Transition to outro
        dlgScene.classList.add("ndlg-intro-fading");
        setTimeout(function(){
          dlgScene.style.display = "none";
          _startOutroPhase();
        }, 700);
        return;
      }

      var beat = tree.beats[beatIdx];
      showText(esc(beat.npc));

      if(beat.choices){
        tapHint.classList.remove("visible");
        showChoices(beat.choices);
      } else {
        // Final NPC text, tap to go to outro
        tapHint.classList.add("visible");
        var toOutro = function(ev){
          if(ev.target.closest(".ndlg-choice-btn")) return;
          overlay.removeEventListener("click", toOutro);
          tapHint.classList.remove("visible");
          dlgScene.classList.add("ndlg-intro-fading");
          setTimeout(function(){
            dlgScene.style.display = "none";
            _startOutroPhase();
          }, 700);
        };
        setTimeout(function(){ overlay.addEventListener("click", toOutro) }, 600);
      }
    }

    // Show greeting first
    setTimeout(function(){
      showText(esc(tree.greeting));
      tapHint.classList.add("visible");
      var startDialogue = function(ev){
        if(ev.target.closest(".ndlg-choice-btn")) return;
        overlay.removeEventListener("click", startDialogue);
        tapHint.classList.remove("visible");
        nextBeat();
      };
      setTimeout(function(){ overlay.addEventListener("click", startDialogue) }, 400);
    }, 500);
  }

  /* ═══════ PHASE 3 : Outro narration ═══════ */
  function _startOutroPhase(){
    var outroScene = overlay.querySelector("#ndlg-outro-scene");
    var outroText  = overlay.querySelector("#ndlg-outro-text");
    var outroTap   = overlay.querySelector("#ndlg-outro-tap");
    outroScene.classList.remove("ndlg-scene-hidden");
    var outIdx = 0;

    function advanceOutro(){
      overlay.removeEventListener("click", advanceOutro);
      outroTap.classList.remove("visible");
      outIdx++;
      if(outIdx >= NIGHT_OUTRO_PARAGRAPHS.length){
        overlay.classList.add("ndlg-fading");
        setTimeout(function(){
          overlay.remove();
          if(onDone) onDone();
        }, 1000);
      } else {
        _showNarrationParagraph(outroText, outroTap, NIGHT_OUTRO_PARAGRAPHS, outIdx);
        setTimeout(function(){ overlay.addEventListener("click", advanceOutro) }, 400);
      }
    }

    setTimeout(function(){
      _showNarrationParagraph(outroText, outroTap, NIGHT_OUTRO_PARAGRAPHS, 0);
      setTimeout(function(){ overlay.addEventListener("click", advanceOutro) }, 600);
    }, 400);
  }
}

/* ── Complete pre-game setup: random city, save data, then show dialogue ── */
function startNightSequence(onDone){
  var u = loadUser();
  var scenario = window._chosenScenario || "lambda";
  u.scenario = scenario;

  // Random city placement
  var allCities = getCities().filter(function(c){ return !c.hidden });
  if(allCities.length > 0){
    var city = allCities[Math.floor(Math.random() * allCities.length)];
    u.startCity = city.id;
    u.region = city.region;
    u.mapX = city.wx;
    u.mapY = city.wy;
    currentCityId = city.id;
    acDB.set("ac_city", city.id);

    // Initialize reputation for starting location
    u.reputation["r_"+city.region] = 25;
    u.reputation["c_"+city.id] = 30;
    if(u.borderPasses.indexOf(city.region) < 0) u.borderPasses.push(city.region);
  }

  // Use className as job if no job already set
  if(!u.job && u.className){
    // Try to match className to a real job
    var jobs = getJobs();
    var match = jobs.find(function(j){
      return j.name.toLowerCase() === u.className.toLowerCase();
    });
    if(match) u.job = match.id;
  }

  // Initialize persona affinities
  getPersonas().forEach(function(p){
    if(p.role === "Guide") return;
    if(!u.personaAffinities[p.id]) u.personaAffinities[p.id] = 0;
  });

  u.gameDay = EXT_PREGAME_DAY;
  u.gameHour = EXT_PREGAME_HOUR;
  u.gameMinute = EXT_PREGAME_MINUTE;
  u.gameSecond = EXT_PREGAME_SECOND;

  saveUser(u);
  acDB.set("ac_charCreated", "1");

  // Resolve city/region names for intro narration
  var cityObj = getCities().find(function(c){ return c.id === u.startCity });
  var regionObj = getRegionById(u.region);
  var cName = cityObj ? cityObj.name : "un lieu inconnu";
  var rName = regionObj ? regionObj.name : "une contrée lointaine";

  // Show night dialogue, then enter main app
  showNightDialogue(function(){
    enterMainApp();
    if(onDone) onDone();
  }, cName, rName);
}
