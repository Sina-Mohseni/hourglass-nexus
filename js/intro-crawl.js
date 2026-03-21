"use strict";

/* ══════════ INTRO CRAWL + SCENARIO CHOICE ══════════ */

var _icMuted = false;

function showIntroCrawl(onDone){
  var overlay = document.getElementById("intro-crawl");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

  var audio = document.getElementById("ic-music");
  var skipBtn = document.getElementById("ic-skip-btn");
  var volBtn = document.getElementById("ic-volume-btn");
  var volOn = document.getElementById("ic-vol-on");
  var volOff = document.getElementById("ic-vol-off");
  var crawlText = document.getElementById("ic-crawl-text");

  // Start music
  if(audio){
    audio.currentTime = 0;
    audio.volume = 0.5;
    _icMuted = false;
    audio.play().catch(function(){});
  }

  // Volume toggle
  if(volBtn) volBtn.onclick = function(){
    _icMuted = !_icMuted;
    if(audio) audio.muted = _icMuted;
    if(volOn) volOn.style.display = _icMuted ? "none" : "";
    if(volOff) volOff.style.display = _icMuted ? "" : "none";
  };

  var dismissed = false;
  function endCrawl(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.style.display = "none";
      overlay.classList.remove("fading-out");
      // Reset crawl animation for potential replay
      if(crawlText) crawlText.style.animation = "none";
      onDone();
    }, 800);
  }

  // Skip button
  if(skipBtn) skipBtn.onclick = endCrawl;

  // Auto-end when crawl animation finishes
  if(crawlText){
    crawlText.addEventListener("animationend", function(){
      setTimeout(endCrawl, 1500);
    }, {once: true});
  }
}

function showScenarioChoice(onChosen){
  var overlay = document.getElementById("scenario-choice");
  if(!overlay){ onChosen("lambda"); return; }
  overlay.style.display = "";

  var audio = document.getElementById("ic-music");
  // Keep the intro music playing during scenario choice
  // (it was started in the crawl)

  overlay.querySelectorAll(".sc-choice").forEach(function(btn){
    btn.onclick = function(){
      var scenario = btn.getAttribute("data-scenario");
      window._chosenScenario = scenario;

      // Fade out music
      if(audio && !audio.paused){
        var vol = audio.volume;
        var steps = 0;
        var fade = setInterval(function(){
          steps++;
          audio.volume = Math.max(0, vol * (1 - steps / 20));
          if(steps >= 20){
            clearInterval(fade);
            audio.pause();
            audio.volume = vol;
          }
        }, 40);
      }

      // Fade out overlay
      overlay.classList.add("fading-out");
      setTimeout(function(){
        overlay.style.display = "none";
        overlay.classList.remove("fading-out");
        onChosen(scenario);
      }, 800);
    };
  });
}

/* Full intro sequence: crawl → scenario → lock screen */
function startIntroSequence(onNewVoyage){
  showIntroCrawl(function(){
    showScenarioChoice(function(scenario){
      onNewVoyage();
    });
  });
}
