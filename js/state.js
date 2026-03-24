"use strict";

/* STATE */
var curPage = "accueil";
var avatarMap = {};
var teamIds = [];
var selectedPersona = null;
var selectedGame = null;
var selectedCard = null;
var selectedElement = null;
var userSection = null;
var currentCityId = null;
var activeLocId = null;
var drawerOpen = false;

/* DATA */
var authData = {author:null, guides:[], groupDialog:{}};
var encyData = {categories:[], cards:[]};
var personasData = {personas:[], guide:"atom"};
var locsData = {locations:[], cities:[], currency:{name:"Sablons",icon:"\u{1FA99}",symbol:"\u00A7"}};
var gamesData = {games:[]};
var elementsData = [];
var dialogData = {};
var projectsData = {};
var calendarData = {events:[]};
var weatherData = {types:{}, forecast:{}, default:"eclat"};
var jobsData = {jobs:[]};
var tournamentData = {quotidiens:[], univers:[], races:[]};

/* UTILS */
function $(s,c){ return (c||document).querySelector(s) }
function $$(s,c){ return [].slice.call((c||document).querySelectorAll(s)) }
function esc(s){ return String(s).replace(/[&<>"']/g, function(m){ return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m] }) }

