"use strict";

/* ══════════ INTRO NARRATION + SCENARIO CHOICE ══════════ */

/* ── Pre-identity intro (before profile/name) ── */
var PRE_IDENTITY_PARAGRAPHS = [
  {text: "LE TOURNOI D'EXTELUA", cls: "ic-title"},
  {text: "Quelque part au-delà des mondes connus, un événement se prépare. Le plus grand spectacle que l'univers ait jamais engendré. On l'appelle le Tournoi d'Extelua."},
  {text: "Tous les cycles, quarante candidats venus de tous les horizons sont rassemblés pour s'affronter dans des épreuves qui testent le corps, l'esprit et la volonté. Le vainqueur obtient le pouvoir de changer le destin de tout un monde."},
  {text: "L'organisation qui contrôle tout — le groupe Morkar — a lancé l'appel. Les mondes ont répondu. Et toi… tu as été choisi.", cls: "ic-final"}
];

/* ── Pre-scenario intro (before scenario choice) ── */
var PRE_SCENARIO_PARAGRAPHS = [
  {text: "TON RÔLE", cls: "ic-title"},
  {text: "Dans ce Tournoi, chacun arrive avec son histoire. Certains sont des champions désignés par leur peuple, portés par la gloire et les attentes de milliards d'êtres. D'autres sont des isolés — des inconnus arrachés à des mondes coupés de tout, qui ne savaient même pas que l'univers était si vaste."},
  {text: "Mais tous ne jouent pas le même jeu. Derrière les caméras et les acclamations, des forces s'opposent. Morkar surveille. Des dissidents conspirent dans l'ombre. Et certains candidats portent des missions secrètes qu'ils ne peuvent révéler à personne."},
  {text: "Avant que la cérémonie ne commence, une question se pose…", cls: "ic-final"}
];

/* ── Default ceremony paragraphs (used as fallback) ── */
var IC_PARAGRAPHS_DEFAULT = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "La lumière t'aveugle. Des milliers de projecteurs percent l'obscurité en même temps, révélant une arène colossale taillée dans la roche d'un astéroïde artificiel. Tu es là, au milieu de la foule, le cœur battant — et rien de ce que tu as imaginé ne t'avait préparé à ça."},
  {text: "Autour de toi, des centaines de milliers d'êtres venus de tous les horizons d'Extelua. Des silhouettes de toutes formes, de toutes tailles, drapées dans les couleurs de leurs mondes. L'air vibre d'une énergie que tu n'as jamais ressentie — un mélange de ferveur, de peur et d'excitation pure."},
  {text: "Un grondement sourd monte du sol. La structure entière tremble. Puis la musique explose — un son massif, ancien et futuriste à la fois, qui résonne dans ta poitrine comme un second battement de cœur. Le spectacle commence."},
  {text: "Des formes holographiques gigantesques se déploient dans le ciel de l'arène. Des constellations entières se dessinent et se défont, racontant sans mots l'histoire d'Extelua — ses âges de ténèbres, ses alliances brisées, ses renaissances. Tu ne comprends pas tout, mais ton corps comprend. Tu frissonnes."},
  {text: "Sur la scène centrale, des artistes que tu n'as jamais vus exécutent une chorégraphie impossible — leurs corps suspendus dans des champs de gravité inversée, leurs mouvements synchronisés avec les déflagrations de lumière qui balaient la foule."},
  {text: "Les voix de milliers de spectateurs se mêlent en un chant que tu ne connais pas. Un hymne, peut-être. Ou une prière. Les mots te sont étrangers, mais la mélodie te serre la gorge. Certains autour de toi pleurent. D'autres crient de joie."},
  {text: "Tu lèves les yeux. Au-dessus de l'arène, un sablier holographique immense flotte, immobile — ses grains de lumière suspendus entre les deux chambres, comme si le temps lui-même retenait son souffle. C'est le symbole que tu as vu sur ton invitation. Celui qui t'a conduit ici."},
  {text: "Une vague de flammes contrôlées traverse la scène, et la musique s'intensifie jusqu'à un crescendo qui te coupe le souffle. Des drones lumineux dessinent des motifs impossibles dans l'espace — des fractales vivantes qui semblent réagir aux émotions de la foule."},
  {text: "Tu regardes autour de toi. Parmi les spectateurs, tu devines d'autres visages comme le tien — des visages qui ne sont pas là pour regarder, mais pour participer. Des visages marqués par le doute, l'ambition, ou la résignation. Tu te demandes combien d'entre eux reviendront."},
  {text: "Le spectacle atteint son apogée. La musique se tait d'un coup. Le silence qui tombe est si brutal qu'il est presque douloureux. L'arène entière retient son souffle dans une obscurité totale."},
  {text: "Puis une seule lumière s'allume. Un faisceau doré, vertical, qui transperce le centre de l'arène comme une lame. Et dans cette lumière, un emblème apparaît — celui du groupe Morkar. Un symbole que tout Extelua connaît. Un symbole qui, pour toi, ne signifiait rien il y a encore quelques jours."},
  {text: "Un murmure parcourt la foule. Puis le murmure devient un grondement. Puis le grondement devient un rugissement. Ils les attendent. Ils les appellent."},
  {text: "Les écrans géants s'illuminent. Des silhouettes apparaissent sur la scène, portées par la lumière. Le groupe Morkar est là — en personne. Ceux qui organisent tout. Ceux qui décident de tout. Ceux entre les mains de qui tu as remis ton destin."},
  {text: "La voix qui s'élève alors fait taire l'univers entier.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Isolé ceremony paragraphs ── */
var IC_PARAGRAPHS_ISOLE = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Tu ne sais pas où tu es. Il y a quelques jours encore, le ciel de ton monde était la seule chose au-dessus de ta tête. Maintenant tu es ailleurs — quelque part que ton esprit refuse de comprendre. Une structure impossible, taillée dans la roche d'un astre que tu n'aurais jamais pu voir à l'œil nu depuis chez toi. Et autour de toi, la foule."},
  {text: "Des êtres. Des centaines de milliers d'êtres. Certains te ressemblent vaguement. D'autres pas du tout. Des silhouettes immenses, des formes que tu n'as pas de mots pour décrire, des visages — si on peut appeler ça des visages — tournés vers une scène que tu ne comprends pas encore. L'air lui-même est différent. Il vibre. Il pulse. Comme si l'endroit entier était vivant."},
  {text: "Quelque chose gronde sous tes pieds. Le sol tremble et tu manques de perdre l'équilibre. Puis le son te frappe — un mur de musique qui t'écrase la poitrine, un son qui n'a rien à voir avec ce que tu as connu. Pas d'instruments que tu reconnais. Pas de mélodie familière. Juste une puissance brute, ancienne et terrifiante, qui résonne dans tes os."},
  {text: "Des images apparaissent dans le vide au-dessus de toi. Tu recules d'un pas. Ce ne sont pas des peintures, pas des projections — ce sont des formes de lumière pure qui flottent dans l'air, immenses, mouvantes. Des étoiles naissent et meurent en quelques secondes. Des mondes se forment, se brisent, se reforment. C'est beau. C'est terrifiant. Tu ne comprends rien, mais quelque chose en toi comprend que c'est important."},
  {text: "Sur ce qui semble être une scène, des corps flottent. Ils flottent. Sans fil, sans support, suspendus dans le vide comme si la gravité n'existait plus. Ils dansent — ou du moins c'est le mot le plus proche que tu trouves — leurs mouvements synchronisés avec des explosions de lumière qui traversent la foule comme des vagues. Chez toi, on appellerait ça de la magie. Ici, personne ne semble surpris."},
  {text: "Un chant monte de la foule. Des milliers de voix, peut-être des millions, unies dans quelque chose que tu ne connais pas. Un hymne ? Une prière ? Les mots n'ont aucun sens pour toi, mais la mélodie te serre la gorge quand même. Tu sens tes yeux piquer. Tu ne sais pas pourquoi. Autour de toi, des créatures que tu ne pourrais même pas nommer pleurent ouvertement. D'autres poussent des cris qui ressemblent à de la joie."},
  {text: "Tu lèves les yeux. Là-haut, quelque chose flotte — un objet immense, fait de lumière, en forme de sablier. Ses grains brillent, suspendus entre deux chambres transparentes, immobiles, comme si le temps s'était arrêté. Tu l'as déjà vu. C'est le symbole gravé sur l'objet que les éclaireurs t'ont donné le jour où ils sont venus te chercher. Le jour où tout a basculé."},
  {text: "Le spectacle s'intensifie. Du feu traverse la scène — du feu qui ne brûle rien, qui danse et disparaît comme s'il obéissait à une volonté. Des objets lumineux, trop petits pour être des vaisseaux, trop nombreux pour être comptés, dessinent dans le ciel des formes impossibles — des motifs qui changent, qui réagissent aux cris de la foule. Tu te demandes si tu es en train de rêver."},
  {text: "Tu cherches des repères. Des visages comme le tien. Et tu en trouves — quelques-uns, perdus dans l'immensité de la foule. Des regards aussi perdus que le tien. Des gens qui ne sont pas là pour regarder. Des gens qui, comme toi, vont devoir se battre. Tu vois la peur dans leurs yeux. Tu te demandes s'ils voient la même chose dans les tiens."},
  {text: "Tout s'arrête. D'un coup. Le son, la lumière, le mouvement — tout disparaît. Le silence qui tombe est le plus violent que tu aies jamais entendu. Plus de musique. Plus de cris. Juste le noir, total, absolu, et le battement de ton propre cœur dans tes oreilles. Tu retiens ton souffle sans t'en rendre compte."},
  {text: "Une lumière. Une seule. Un rayon doré qui perce l'obscurité comme une lame et frappe le centre de la scène. Dans cette lumière, un symbole apparaît — un losange, simple, géométrique, presque banal. Mais autour de toi, la réaction est immédiate. La foule retient son souffle. Tu ne sais pas ce que ce symbole signifie. Mais tu sens que ceux qui le connaissent en ont peur. Ou le vénèrent. Ou les deux."},
  {text: "Un murmure parcourt la foule. Puis le murmure enfle. Puis il devient un grondement. Puis un rugissement. Ils appellent quelqu'un. Ou quelque chose. L'énergie est si dense que tu la sens sur ta peau, comme une pression physique."},
  {text: "Des silhouettes apparaissent dans la lumière. Tu ne les connais pas. Tu ne sais pas leurs noms, leurs titres, leur pouvoir. Mais la façon dont la foule les regarde te dit tout ce que tu as besoin de savoir. Ces gens contrôlent tout. Et toi, tu es entre leurs mains maintenant."},
  {text: "L'une des silhouettes s'avance. Et quand elle parle, le silence qui se fait est différent de celui d'avant. Ce n'est pas un silence imposé. C'est un silence choisi. Comme si l'univers entier avait décidé d'écouter.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Connecté ceremony paragraphs ── */
var IC_PARAGRAPHS_CONNECTE = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Tu l'as vue mille fois sur les écrans de ta planète. Chaque cycle, depuis que tu es enfant, tu regardais la cérémonie d'ouverture en retenant ton souffle, assis devant les retransmissions du Réseau. Tu connaissais chaque moment par cœur — les projecteurs, le grondement, l'hymne. Mais être là, en vrai, debout au milieu de l'arène… c'est autre chose. Rien ne t'avait préparé à l'échelle de ce que tu vois."},
  {text: "L'arène du Nexus est encore plus immense que sur les écrans. Taillée dans la roche d'un astéroïde artificiel, elle s'étend à perte de vue. Autour de toi, des centaines de milliers d'êtres venus de tous les mondes connectés. Tu reconnais certaines espèces — les délégations de Veruhn avec leurs bannières argentées, les Khorans en armures cérémonielles, les Tessalins dont tu as étudié les stratégies dans les archives des Cycles passés. Pour la première fois, ils ne sont pas des images. Ils sont réels."},
  {text: "Un grondement sourd monte du sol. La structure tremble, et la musique explose — tu la reconnais. L'Ouverture du Sablier, le thème que tout le Réseau connaît. Mais ici, diffusé en direct, amplifié par l'acoustique de l'arène, le son te traverse le corps comme une décharge. C'est le signal. Le spectacle commence."},
  {text: "Les hologrammes se déploient dans le ciel de l'arène — les mêmes constellations que celles des retransmissions, mais en trois dimensions réelles, à une échelle qui te donne le vertige. L'histoire d'Extelua se rejoue sous tes yeux : les âges de ténèbres, la fondation du Réseau, les alliances brisées et les renaissances. Tu connais cette histoire. On te l'a enseignée. Mais la voir ainsi, portée par la lumière et le son, c'est comme la comprendre pour la première fois."},
  {text: "Les artistes font leur entrée sur la scène centrale — suspendus dans des champs de gravité inversée, leurs mouvements synchronisés avec les déflagrations de lumière. Tu as vu ces performances dans les compilations que ton monde rediffuse chaque cycle. Tu reconnaissais certains numéros. Mais en vrai, la précision est sidérante. Le public retient son souffle à l'unisson."},
  {text: "L'hymne monte de la foule. Et cette fois, tu le connais. Les mots que des milliards d'êtres chantent en même temps à travers tout le Réseau — tu les as appris, comme tout le monde sur ta planète. Tu les chantes aussi, et ta voix se perd dans celle de la multitude. C'est un moment que tu as rêvé toute ta vie. Certains autour de toi pleurent. Tu comprends pourquoi."},
  {text: "Tu lèves les yeux. Le Sablier holographique apparaît au-dessus de l'arène — immense, immobile, ses grains de lumière suspendus entre les deux chambres. Le symbole d'Extelua. Celui que tu as porté en pendentif, imprimé sur tes affaires, vu sur chaque écran de ta planète depuis ta naissance. Mais là-haut, flottant dans le vide de l'arène, il est autre chose. Il est réel. Et il t'attend."},
  {text: "Les flammes contrôlées traversent la scène et les drones lumineux dessinent leurs fractales dans l'espace. Tu connais ce passage — c'est le moment que les commentateurs appellent « la Convergence », quand les motifs réagissent aux émotions de la foule. Sur les écrans, c'est impressionnant. En vrai, c'est écrasant. Les fractales changent de forme autour de toi, et tu jures qu'elles te voient."},
  {text: "Tu regardes les autres candidats. Tu en reconnais certains — leurs visages étaient dans le dossier préliminaire que Morkar t'a transmis. Des champions comme toi, portés par leurs mondes. Mais aussi des isolés — des visages perdus, terrifiés, qui n'ont visiblement jamais rien vu de tout ça. Tu te demandes ce qu'ils ressentent. Tu te demandes aussi combien d'entre vous seront encore là à la fin."},
  {text: "Le spectacle atteint son apogée. La musique se tait d'un coup. Le silence est brutal — tu le connais, tu l'as entendu dans chaque retransmission, mais le vivre est différent. L'obscurité totale tombe sur l'arène. Tu n'entends plus que ton propre souffle et les battements de ton cœur."},
  {text: "Un faisceau doré transperce le centre de l'arène. L'emblème de Morkar apparaît — le losange que tout le Réseau connaît, celui qui figure sur chaque contrat, chaque retransmission, chaque décision qui a façonné l'univers connecté. Tu sais exactement ce qui va suivre. Et pourtant, ton cœur accélère."},
  {text: "Le rugissement de la foule monte comme une vague. Tu l'as entendu des dizaines de fois à travers les haut-parleurs de ta planète. Mais le sentir vibrer dans ta poitrine, porté par des centaines de milliers de voix réelles, c'est une sensation que les écrans ne pourront jamais transmettre."},
  {text: "Les silhouettes du groupe Morkar apparaissent sur la scène, portées par la lumière. Tu connais leurs noms. Tu connais leurs visages. Tu as grandi en les regardant diriger le Tournoi depuis les retransmissions. Ceux qui organisent tout. Ceux qui décident de tout. Et maintenant, pour la première fois, ils ne sont pas derrière un écran. Ils sont là, devant toi. Et toi, tu es devant eux."},
  {text: "La voix qui s'élève alors, tu l'as entendue cent fois. Mais jamais comme ça. Jamais en vrai. Et quand elle résonne dans l'arène, le silence qui se fait n'est pas celui d'un public — c'est celui d'un univers entier qui écoute.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Dissident connecté ceremony paragraphs ── */
var IC_PARAGRAPHS_REBELLE_CONNECTE = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Les projecteurs s'allument. Le spectacle commence. Tu connais chaque seconde de ce qui va suivre — tu l'as étudié, décortiqué, analysé. Chaque transition lumineuse, chaque crescendo musical, chaque pause calculée. Ce n'est pas un spectacle. C'est une machine à fabriquer du consentement. Et tu es assis à l'intérieur."},
  {text: "L'arène est immense, oui. Impressionnante, oui. Mais tu sais comment elle a été construite — avec les ressources de mondes qui n'ont jamais eu leur mot à dire. Les astéroïdes minés par des populations qui n'ont pas accès au Réseau. Tu regardes les bannières, les délégations, les visages émerveillés autour de toi, et tu te demandes combien d'entre eux savent. Combien d'entre eux veulent savoir."},
  {text: "La musique explose. L'Ouverture du Sablier — l'hymne que tout le Réseau fredonne sans réfléchir. Tu le connais par cœur, toi aussi. Il fut un temps où il te donnait des frissons. Maintenant, tu entends autre chose derrière les notes : une fréquence subliminale, conçue pour provoquer l'adhésion émotionnelle. Les recherches du réseau dissident l'ont prouvé. Mais tu ne peux pas te boucher les oreilles. Alors tu écoutes, et tu fais semblant de frissonner comme les autres."},
  {text: "Les hologrammes se déploient dans le ciel. L'histoire officielle d'Extelua — celle que Morkar a écrite. Les âges de ténèbres, la fondation du Réseau, les « renaissances ». Tu connais une autre version de cette histoire. Celle des mondes sacrifiés, des alliances forcées, des peuples dont les noms ont été effacés des archives. Mais ce soir, c'est la version de Morkar qui brille dans le ciel. Comme toujours."},
  {text: "Les artistes flottent dans leurs champs de gravité inversée. Le public est hypnotisé. Toi, tu observes autre chose — les caméras. Des centaines de drones de captation, positionnés à des angles précis, cadrant les réactions de la foule. Chaque larme, chaque cri de joie sera monté, diffusé, utilisé. La cérémonie n'est pas faite pour ceux qui sont ici. Elle est faite pour les milliards qui regardent sur leurs écrans."},
  {text: "L'hymne monte de la foule. Des milliers de voix unies dans un chant que tu connais — que tu as chanté toi-même, avant. Avant de comprendre. Maintenant les mots te restent en travers de la gorge. Tu ouvres la bouche quand même. Tu mimes. Tu joues le jeu. Parce que ne pas chanter, ici, c'est se faire remarquer. Et se faire remarquer, c'est mourir."},
  {text: "Le Sablier holographique apparaît au-dessus de l'arène. Le symbole sacré d'Extelua. Celui que Morkar a transformé en logo, en marque, en outil de contrôle. Tu lèves les yeux comme tout le monde. Tu affiches l'émerveillement approprié. Mais dans ta tête, tu comptes : les sorties, les patrouilles de sécurité, les angles morts des caméras. Le travail a déjà commencé."},
  {text: "Les flammes traversent la scène. Les drones lumineux dessinent leurs fractales. Le public est en extase. Toi, tu cherches les autres. Pas les candidats — les contacts. Le réseau t'a dit qu'il y aurait peut-être quelqu'un d'autre ici, un autre dissident infiltré. Mais tu ne sais pas qui. Tu ne sais pas à quoi il ressemble. Tu sais juste qu'il existe. Peut-être. Et que s'il est là, il fait exactement la même chose que toi en ce moment : il regarde le spectacle en cherchant un visage qui ne sourit pas tout à fait comme les autres."},
  {text: "Tu balaies la foule du regard. Les champions des mondes connectés, gonflés de fierté et d'ambition. Les isolés, terrifiés, perdus, qui ne comprennent rien à ce qu'ils voient. Tu les plains. Ils ne savent pas dans quoi ils sont tombés. Ils ne savent pas ce que Morkar fait aux perdants qui viennent de mondes isolés. Toi, tu sais. C'est pour ça que tu es là."},
  {text: "Le silence tombe. Brutal. Total. L'arène plonge dans le noir. Tu connais ce moment — la « Grande Pause », comme l'appellent les commentateurs. Un silence artificiellement prolongé, calibré pour maximiser l'impact émotionnel de ce qui suit. Tu respires lentement. Tu ne te laisses pas prendre. Pas cette fois."},
  {text: "Le faisceau doré perce l'obscurité. L'emblème de Morkar apparaît. Autour de toi, la foule retient son souffle dans une dévotion quasi religieuse. Tu regardes ce losange et tu vois autre chose : un système qui se maintient par le spectacle, qui achète la paix avec des jeux, qui efface la mémoire de ceux qui perdent. Et qui appelle ça de la générosité."},
  {text: "Le rugissement monte. La foule appelle Morkar comme on appelle un sauveur. Tu cries avec eux. Tu dois crier avec eux. Ta couverture dépend de chaque geste, chaque expression, chaque seconde de cette performance. Tu es un champion ordinaire. Un candidat lambda. Rien de plus."},
  {text: "Les silhouettes de Morkar apparaissent sur la scène. Tu connais leurs noms. Tu connais leurs crimes. Tu sais ce qu'ils ont fait aux mondes qui ont refusé de se soumettre, ce qu'ils font aux isolés éliminés, ce que cache le contrat que tu as signé. Et tu souris. Tu applaudis. Tu joues le rôle le plus important de ta vie."},
  {text: "La voix s'élève. Celle que tout l'univers connaît. Celle qui ouvrira le Tournoi comme elle l'a fait quarante-six fois avant. Tu l'écoutes, et derrière le silence respectueux que tu affiches, une seule pensée tourne en boucle : cette fois, ils ne contrôleront pas la fin de l'histoire.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Dissident faux-isolé ceremony paragraphs ── */
var IC_PARAGRAPHS_REBELLE_ISOLE = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Les projecteurs s'allument et tu recules d'un pas. Pas parce que la lumière te surprend — tu savais exactement quand elle allait frapper. Mais parce qu'un vrai isolé reculerait. Alors tu recules. Tu écarquilles les yeux. Tu ouvres la bouche. Le spectacle de ta vie vient de commencer, et il n'a rien à voir avec celui qui se déroule sur la scène."},
  {text: "L'arène se révèle dans toute son immensité. Tu la connais — tu as étudié les plans, les dimensions, les angles. Le réseau dissident a des archives que Morkar croit avoir détruites. Mais tu n'es pas censé la connaître. Pour tout le monde ici, tu es un habitant d'une planète coupée de tout, qui n'a jamais vu un hologramme, jamais entendu de musique synthétique, jamais rencontré une autre espèce. Alors tu regardes l'arène comme si elle était la chose la plus impossible que tu aies jamais vue. Et tu trembles. Juste assez."},
  {text: "La musique explose et tu sursautes — volontairement, une demi-seconde avant les vrais isolés autour de toi. Tu notes le décalage. Trop tôt. Tu devras être plus précis. L'Ouverture du Sablier résonne dans l'arène, et tu la connais note par note, mais ton visage doit dire le contraire. Ton visage doit dire : qu'est-ce que c'est que ce son ? D'où vient-il ? Pourquoi est-ce que ça me traverse le corps ? Tu joues la terreur émerveillée. Tu la joues bien."},
  {text: "Les hologrammes se déploient dans le ciel. Tu sais ce qu'ils racontent — la version officielle, la propagande dorée de Morkar. Mais un isolé ne sait pas. Un isolé verrait des formes de lumière impossibles, flottant dans le vide, et il ne comprendrait pas. Alors tu ne comprends pas. Tu lèves la tête, bouche ouverte, et tu laisses tes yeux suivre les constellations comme si tu voyais le ciel pour la première fois. À côté de toi, un vrai isolé fait exactement la même chose. Sauf que lui, ce n'est pas du théâtre."},
  {text: "Les artistes flottent dans leurs champs de gravité inversée. Tu sais comment ça fonctionne — technologie standard sur les mondes connectés. Mais tu dois réagir comme si c'était de la magie. Tu murmures quelque chose — un mot étouffé, un souffle d'incrédulité. Tu vérifies du coin de l'œil que personne ne t'observe de trop près. Personne ne regarde un isolé. C'est exactement pour ça que tu es ici."},
  {text: "L'hymne monte de la foule. Tu connais les paroles. Tu les as chantées pendant des années sur ta vraie planète, connectée au Réseau. Mais ici, maintenant, tu ne dois pas les connaître. Alors tu écoutes en silence, la mâchoire serrée, les yeux brillants — le portrait parfait de l'inconnu bouleversé par un chant qu'il ne comprend pas. Tu ne chantes pas. Tu ne fredonne pas. Tu restes muet, comme le ferait quelqu'un qui entend cette langue pour la première fois."},
  {text: "Le Sablier apparaît au-dessus de l'arène. Tu le reconnais — évidemment. Mais tu dois le reconnaître autrement. Pas comme le symbole du Réseau, pas comme le logo de Morkar. Tu dois le reconnaître comme le signe gravé sur l'objet que les « éclaireurs » t'ont remis quand ils sont venus te « découvrir » sur ta fausse planète isolée. L'objet que le réseau dissident a fabriqué pour toi. Tu le touches dans ta poche — il est toujours là, preuve de ton mensonge."},
  {text: "Les flammes traversent la scène. Les drones dessinent leurs fractales. Et pendant que tout le monde regarde le ciel, toi tu regardes le sol. Les patrouilles. Les caméras. Les zones d'accès. Tu cartographies mentalement chaque détail, parce que ton rôle ne se limite pas à observer — tu dois trouver un moyen d'accéder aux systèmes internes de Morkar. Et la meilleure couverture au monde, c'est celle d'un pauvre isolé perdu qui ne sait même pas ce qu'est un terminal."},
  {text: "Tu observes les autres candidats. Les champions connectés, sûrs d'eux, baignés dans la lumière de leurs sponsors. Les agents de Morkar — tu en as repéré au moins un, peut-être deux, à leur façon trop détendue de balayer la foule du regard. Et les vrais isolés. Ceux dont tu portes le masque. Tu les regardes et tu ressens quelque chose que tu n'avais pas prévu : de la culpabilité. Ils ne savent pas ce qui les attend. Et toi, tu utilises leur innocence comme camouflage."},
  {text: "Le silence tombe. Le noir absorbe tout. Tu connais ce moment par cœur — la Grande Pause. Tu sais exactement combien de secondes elle dure, tu sais ce qui vient après. Mais ton corps doit tressaillir quand la lumière reviendra. Tes mains doivent trembler. Ton souffle doit s'accélérer. Tu répètes mentalement ta réaction, comme un acteur avant l'entrée en scène."},
  {text: "Le faisceau doré frappe le centre de l'arène. L'emblème de Morkar. Autour de toi, les vrais isolés ne comprennent pas ce symbole — ils sentent juste la réaction de la foule, la peur, la vénération. Toi, tu sais exactement ce qu'il représente. Tu sais ce qu'il cache. Et tu affiches le même regard vide et terrifié que tes voisins, pendant que dans ta tête, tu revis chaque document classifié que le réseau t'a fait mémoriser."},
  {text: "Le rugissement de la foule monte. Tu ne cries pas. Un isolé ne crierait pas — il ne sait pas qui on appelle, il ne comprend pas pourquoi la foule hurle. Tu restes immobile, les yeux grands ouverts, submergé par un spectacle qui te dépasse. C'est le rôle. Le rôle parfait. Et la vérité, c'est que même en sachant tout ce que tu sais, l'énergie de cette foule te donne la chair de poule. Ce n'est pas du jeu. C'est réel."},
  {text: "Les silhouettes de Morkar apparaissent. Tu connais chaque visage. Tu connais chaque décision qu'ils ont prise, chaque monde qu'ils ont broyé, chaque mémoire qu'ils ont effacée. Le réseau t'a tout appris. Et maintenant tu es là, à quelques centaines de mètres d'eux, déguisé en personne qui ne sait même pas que ces gens existent. Le leurre parfait. L'arme qu'ils n'ont jamais vu venir."},
  {text: "La voix s'élève. Tu la connais. Tu l'as étudiée, analysée, haïe. Mais ton visage ne montre rien de tout ça. Ton visage montre l'émerveillement pur d'un être qui entend pour la première fois une voix portée par la technologie d'un autre monde. Tu joues ton rôle. Tu respires ton rôle. Et quelque part, très loin sous le masque, tu te fais une promesse : quand tout sera fini, c'est ta voix à toi que l'univers entendra.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Recrue Morkar ceremony paragraphs ── */
var IC_PARAGRAPHS_RECRUE = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Les projecteurs s'allument et le souffle te manque. Tu l'as vue mille fois sur les écrans, comme tout le monde sur ta planète. Tu connais chaque moment de cette cérémonie par cœur. Mais être là — vraiment là — c'est autre chose. Et toi, tu n'es pas juste un champion qui réalise son rêve d'enfant. Tu es quelque chose de plus, maintenant. Quelque chose que tu ne comprends pas encore tout à fait. Morkar t'a choisi. Pas seulement pour participer. Pour servir."},
  {text: "L'arène est immense. Plus immense que tout ce que les retransmissions laissaient deviner. Tu reconnais les gradins, les bannières, les délégations — comme n'importe quel citoyen connecté. Mais tout a une autre saveur depuis cette rencontre. Ce briefing, il y a quelques semaines à peine, dans une pièce sans fenêtre, avec un officier dont tu n'as jamais revu le visage. Il t'a dit que tu avais été remarqué. Que Morkar avait besoin de gens comme toi sur le terrain. Que le Tournoi n'était pas qu'une compétition. Tu n'as pas tout compris. Mais tu as dit oui."},
  {text: "La musique explose — l'Ouverture du Sablier, le thème que tout le Réseau connaît. Tu frissonnes, comme tout le monde. La puissance du son te traverse le corps. Tu es un fan, un vrai, et cette partie de toi est intacte. Mais il y a autre chose maintenant, une couche en dessous — une petite voix qui te rappelle que tu n'es plus un simple spectateur. Que tu as une mission. Même si, honnêtement, les contours de cette mission te semblent encore flous."},
  {text: "Les hologrammes se déploient dans le ciel. L'histoire d'Extelua — les âges de ténèbres, la fondation du Réseau, les renaissances. Tu connais cette histoire, tu l'as apprise à l'école comme tout le monde. Rien de nouveau. Mais tu te surprends à la regarder différemment. Est-ce qu'on t'a tout dit ? Est-ce qu'il y a des choses que Morkar sait et que le public ignore ? Tu ne sais pas. On ne t'a rien dit là-dessus. Tu es une recrue, pas un dirigeant. Tu regardes les lumières et tu te dis que pour l'instant, c'est beau. C'est suffisant."},
  {text: "Les artistes flottent dans les champs de gravité inversée. Le public est hypnotisé, et toi aussi — sincèrement. Tu n'es pas cynique. Tu crois au Tournoi. Tu crois en Morkar. C'est pour ça qu'ils t'ont approché, non ? Parce que tu crois. Parce que tu veux protéger ce que le Tournoi représente. Mais tu ne peux pas t'empêcher de balayer la foule du regard entre deux numéros. L'officier t'a dit de « rester attentif ». De « noter les comportements inhabituels ». Tu ne sais pas exactement ce que ça signifie, mais tu essaies."},
  {text: "L'hymne monte de la foule. Tu le chantes — tu connais chaque mot, comme des milliards d'êtres à travers le Réseau. Ta voix se mêle à la multitude, et tu sens les larmes monter. C'est ton moment. Celui que tu as rêvé toute ta vie. Mais pendant que tu chantes, tu penses à ce que l'officier t'a dit : « Les dissidents pourraient tenter de s'infiltrer. Soyez vigilant. » Tu ne sais même pas à quoi ressemble un dissident. Tu ne sais pas comment en repérer un. Tu fais de ton mieux."},
  {text: "Le Sablier holographique apparaît au-dessus de l'arène. Le symbole d'Extelua — celui que tu as porté toute ta vie. Tu lèves les yeux et tu ressens quelque chose de nouveau. Pas juste l'émerveillement d'un fan. Quelque chose de plus lourd. De la responsabilité, peut-être. On t'a dit que tu faisais partie de ceux qui protègent ce que ce sablier représente. Tu ne sais pas encore ce que ça implique concrètement. Mais tu le sens, là, dans ta poitrine, comme un poids discret à côté de l'excitation."},
  {text: "Les flammes traversent la scène. Les drones dessinent leurs fractales. Et toi, tu réfléchis. On t'a dit qu'il y avait peut-être un dissident parmi les candidats. Peut-être parmi les champions. Peut-être parmi les isolés. On ne t'a pas dit comment le trouver. On ne t'a pas donné de nom, pas de photo, pas de profil. Juste une consigne : « Observe. Écoute. Rapporte. » Tu te sens un peu perdu, honnêtement. Mais tu te dis que Morkar sait ce qu'il fait. Ils ne t'auraient pas choisi si tu n'étais pas capable."},
  {text: "Tu regardes les autres candidats. Les champions connectés — certains visages te sont familiers grâce au dossier préliminaire. Les isolés — des regards terrifiés, perdus dans un monde qu'ils ne comprennent pas. Tu les observes tous, en essayant de voir ce que l'officier verrait. Quelque chose de suspect. Un geste déplacé. Un regard trop calculé. Mais tout ce que tu vois, ce sont des gens — nerveux, excités, effrayés. Comme toi."},
  {text: "Le silence tombe. L'obscurité totale. Tu connais ce moment des retransmissions — la Grande Pause. Mais la vivre est vertigineux. Le noir est complet. Le silence est physique. Tu sens ton cœur battre dans tes oreilles. Et dans ce noir, tu te poses la question que tu repousses depuis le briefing : est-ce que tu es vraiment prêt pour ça ? La compétition, oui. Le rêve de champion, oui. Mais l'autre chose — la mission, le secret, la double vie — est-ce que tu es prêt ?"},
  {text: "Le faisceau doré perce l'obscurité. L'emblème de Morkar apparaît. Pour la foule, c'est le symbole du pouvoir, du prestige, de l'ordre universel. Pour toi, depuis quelques semaines, c'est aussi autre chose : l'organisation qui t'a recruté. Qui t'a fait confiance. Tu ne sais pas encore si cette confiance est un honneur ou un fardeau. Probablement les deux."},
  {text: "Le rugissement de la foule monte. Tu cries avec eux — sincèrement, du fond du cœur. Tu es un fan du Tournoi depuis l'enfance. Tu as grandi en rêvant d'être ici. Et tu y es. Champion de ta planète. Recrue de Morkar. Les deux à la fois. Tu ne sais pas encore comment ces deux rôles vont coexister. Mais pour l'instant, dans ce rugissement, dans cette lumière, tu te sens exactement là où tu dois être."},
  {text: "Les silhouettes du groupe Morkar apparaissent sur la scène. Tu connais leurs visages — comme tout le Réseau. Mais toi, tu sais que quelque part dans cette organisation, quelqu'un connaît ton nom autrement que comme champion. Quelqu'un sait ce que tu as accepté de faire. Ces gens sur la scène dirigent le Tournoi. Et toi, d'une manière que tu ne mesures pas encore, tu travailles pour eux maintenant."},
  {text: "La voix s'élève. Celle que tu as entendue cent fois sur les écrans de ta planète. Mais cette fois, tu ne l'écoutes pas comme un spectateur. Tu l'écoutes comme quelqu'un qui fait partie de la machine — un petit rouage, tout neuf, pas encore rodé, qui ne sait pas exactement où il s'emboîte. Mais qui tourne. Et qui écoute.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Vétéran Morkar ceremony paragraphs ── */
var IC_PARAGRAPHS_VETERAN = [
  {text: "CÉRÉMONIE D'OUVERTURE", cls: "ic-title"},
  {text: "Les projecteurs s'allument. Vingt-deux heures trente, séquence alpha — tu pourrais la lancer toi-même les yeux fermés. C'est ton septième Tournoi en coulisses. Tu connais le conducteur technique par cœur, chaque transition, chaque fondu, chaque silence calculé à la milliseconde. Tu as participé à la rédaction du protocole de sécurité de cette cérémonie. Et là, assis au milieu du public sous ta couverture de champion, tu regardes ta propre mise en scène de l'autre côté du rideau. C'est un exercice étrange. Comme relire un rapport que tu as rédigé."},
  {text: "L'arène se dévoile. Tu la connais mieux que quiconque dans cette foule — mieux que la plupart des gens qui y travaillent. Tu connais chaque sortie de secours, chaque poste de surveillance, chaque zone d'accès restreint. Le centre de commandement derrière la paroi nord — tu y as passé des nuits entières lors des éditions précédentes. Les coursives sous la scène — tu sais lesquelles mènent aux loges, lesquelles aux cellules d'interrogatoire que le public ne soupçonne pas. L'arène n'est pas un lieu de spectacle pour toi. C'est un dispositif opérationnel. Et ce soir, tu es au mauvais endroit exprès — dans le public, sans insigne, sans oreillette, déguisé en candidat ordinaire."},
  {text: "La musique explose — l'Ouverture du Sablier. Tu ne frissonnes plus. Pas depuis longtemps. Tu sais que la version diffusée contient des couches de modulation émotionnelle — c'est toi qui as validé les paramètres pour cette édition. Fréquences d'ancrage, résonance empathique calibrée pour une audience multi-espèces. De l'ingénierie de consentement, propre et efficace. Le public pleure de joie. Toi, tu écoutes les couches sous la musique et tu vérifies mentalement que les niveaux sont corrects."},
  {text: "Les hologrammes se déploient. L'histoire d'Extelua — la version officielle, évidemment. Tu connais l'autre. Celle des archives classifiées de Morkar, niveau d'accès échelon cinq. Les mondes qui ont été intégrés de force. Les négociations qui étaient des ultimatums. Les rébellions écrasées avant qu'elles ne deviennent des légendes. Tu as lu les rapports originaux. Certains, tu les as écrits. La lumière raconte une belle histoire. Tu sais que c'est une belle histoire. Tu sais aussi pourquoi elle doit rester belle."},
  {text: "Les artistes flottent dans les champs de gravité inversée. Tu remarques immédiatement ce que personne d'autre ne voit : le scintillement des boucliers de sécurité — fréquence légèrement décalée, probablement un recalibrage de dernière minute. Les micro-ajustements des champs gravitiques — un demi-degré trop à bâbord sur le troisième palier, l'opérateur est nouveau. Le ballet invisible des techniciens dans les coursives — tu comptes les silhouettes par habitude et tu notes qu'il en manque une au poste sept. Tu archiveras ça mentalement. Pour plus tard."},
  {text: "L'hymne monte de la foule. Tu ouvres la bouche. Tu fais semblant de chanter. Tes yeux travaillent. Balayage systématique, secteur par secteur, comme on te l'a enseigné il y a des années et comme tu l'as enseigné à d'autres depuis. Tu cherches les anomalies. Le visage qui ne chante pas. Le regard qui calcule au lieu de contempler. La main qui descend vers une poche au mauvais moment. Tu as repéré des dissidents infiltrés à trois cérémonies précédentes. Tu sais exactement ce que tu cherches."},
  {text: "Le Sablier holographique apparaît. Le symbole d'Extelua. Pour la foule, un emblème sacré. Pour toi, un logo. Celui de l'organisation à laquelle tu as consacré ta vie. Tu as porté ce symbole dans des endroits que le public ne peut pas imaginer — des salles de crise, des interrogatoires, des opérations de terrain sur des mondes qui n'apparaissent sur aucune carte officielle. Tu l'as porté avec fierté, avec fatigue, parfois avec dégoût. Mais toujours avec loyauté. Et ce soir, tu le portes invisiblement, sous ta couverture de champion."},
  {text: "Les flammes traversent la scène. Les drones dessinent leurs fractales. Tu penses au rapport de renseignement — pas celui du matin, celui que tu as compilé toi-même au cours des six derniers mois. Menace dissidente de niveau critique pour le Cycle 47. Infiltration confirmée — pas probable, confirmée. Tu as identifié trois vecteurs d'entrée possibles, deux cellules dormantes, un réseau de communication chiffré que tes équipes n'ont pas encore percé. Et quelque part dans cette arène, il y a au moins un agent ennemi. Tu le sais. Tu ne sais juste pas encore lequel."},
  {text: "Tu observes les autres candidats avec une précision clinique. Les champions connectés — tu as lu leurs dossiers complets, pas les résumés publics. Leurs faiblesses psychologiques, leurs liens familiaux, leurs dettes, leurs secrets. Les isolés — plus difficiles à évaluer, moins de données, mais tu connais les profils types de couverture dissidente. Un isolé trop calme. Un isolé qui comprend trop vite. Un isolé dont le regard ne trahit pas assez de peur. Tu classes mentalement chaque visage dans une catégorie de risque. C'est automatique. Tu ne sais plus faire autrement."},
  {text: "Le silence tombe. L'obscurité totale. La Grande Pause — onze secondes exactement. Tu ne comptes pas. Tu écoutes. Tes sens sont affûtés par des années d'opérations de terrain. Tu entends le froissement de tissu trois rangées derrière toi — probablement rien. Un souffle trop contrôlé à ta gauche — quelqu'un qui gère son stress, technique de respiration militaire. Tu archives. Le noir ne te fait pas peur. Tu as passé des nuits entières dans des endroits bien plus sombres que ça."},
  {text: "Le faisceau doré perce l'obscurité. L'emblème de Morkar. Pour la foule, le symbole du pouvoir. Pour toi, c'est chez toi. L'organisation qui t'a formé, qui t'a façonné, qui a fait de toi ce que tu es. Tu connais ses couloirs, ses codes, ses non-dits. Tu connais les noms qu'on ne prononce pas en public. Tu connais les opérations qu'on ne consigne pas dans les archives officielles. Tu es Morkar. Pas un employé, pas un agent — une extension de la volonté du groupe. Et ce soir, cette extension porte un masque de champion et surveille le troupeau de l'intérieur."},
  {text: "Le rugissement de la foule monte. Tu ne cries pas. Tu souris — un sourire contrôlé, calibré pour ne pas détonner. Tu as cessé d'être un fan il y a longtemps. Le Tournoi n'est pas un spectacle pour toi. C'est un dispositif de contrôle social d'une élégance remarquable — et tu le dis sans cynisme. Tu y crois. La paix par le spectacle. L'ordre par la compétition ritualisée. C'est efficace. C'est nécessaire. Et quelqu'un doit s'assurer que la machine continue de tourner. Ce quelqu'un, c'est toi."},
  {text: "Les silhouettes du groupe Morkar apparaissent sur la scène. Tu connais chacun d'entre eux personnellement. Leurs voix dans les briefings confidentiels. Leurs stratégies. Leurs désaccords internes que le public ne soupçonne pas. Tu as servi sous certains d'entre eux. D'autres te doivent des rapports que tu n'as jamais rendus publics. Le jeu de pouvoir à l'intérieur de Morkar est aussi complexe que le Tournoi lui-même. Mais ce soir, sur cette scène, ils sont unis. Et toi, tu es leur sentinelle invisible dans la foule."},
  {text: "La voix s'élève. Tu la connais bien — pas celle des écrans, celle des réunions à huis clos, celle qui donne les ordres que personne d'autre n'entend. Cette voix t'a envoyé sur des missions dont tu ne parleras jamais. Cette voix t'a demandé des choses que tu as faites sans poser de questions. Et ce soir, cette voix parle au monde entier, et le monde entier écoute avec émerveillement. Toi, tu écoutes avec autre chose. Pas de l'émerveillement. Pas du cynisme. De la vigilance. Celle d'un homme qui sait exactement comment le monde fonctionne, et qui a choisi de le maintenir en marche.", cls: "ic-final"},
  {text: "", cls: "ic-morkar-announce"}
];

/* ── Resolve ceremony paragraphs based on chosen scenario ── */
var IC_PARAGRAPHS = IC_PARAGRAPHS_DEFAULT;

var _icMuted = false;

function showIntroCrawl(onDone){
  // Pick scenario-specific ceremony paragraphs
  var sc = window._chosenScenario;
  var origin = window._scOriginType; // "connecte" or "isole"
  if(sc === "rebelle" && origin === "isole"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_REBELLE_ISOLE;
  } else if(sc === "rebelle" && origin === "connecte"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_REBELLE_CONNECTE;
  } else if(sc === "apprenti-morkar"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_RECRUE;
  } else if(sc === "veteran-morkar"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_VETERAN;
  } else if(origin === "isole"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_ISOLE;
  } else if(origin === "connecte"){
    IC_PARAGRAPHS = IC_PARAGRAPHS_CONNECTE;
  } else {
    IC_PARAGRAPHS = IC_PARAGRAPHS_DEFAULT;
  }

  var overlay = document.getElementById("intro-crawl");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

  // Start background video
  var video = document.getElementById("ic-bg-video");
  if(video){ video.currentTime = 0; video.play().catch(function(){}); }

  var audio = document.getElementById("ic-music");
  var nextBtn = document.getElementById("ic-next-btn");
  var skipBtn = document.getElementById("ic-skip-btn");
  var volBtn = document.getElementById("ic-volume-btn");
  var volOn = document.getElementById("ic-vol-on");
  var volOff = document.getElementById("ic-vol-off");
  var textZone = document.getElementById("ic-text-zone");

  var paraIdx = 0;
  var transitioning = false;

  // Start music with fade-in (crossfade from any playing music)
  if(audio){
    audio.currentTime = 0;
    _icMuted = false;
    var bgMusic = document.getElementById("bg-music");
    var scMusic = document.getElementById("extelua-music");
    var activeMusic = (scMusic && !scMusic.paused) ? scMusic
                    : (bgMusic && !bgMusic.paused) ? bgMusic
                    : null;
    if(activeMusic){
      audioCrossfade(activeMusic, audio, 0.5, 1200, activeMusic === bgMusic ? 0.4 : 0);
    } else {
      audio.volume = 0;
      audio.play().catch(function(){});
      audioFade(audio, 0.5, 1000);
    }
  }

  // Volume toggle
  if(volBtn) volBtn.onclick = function(){
    _icMuted = !_icMuted;
    if(audio) audio.muted = _icMuted;
    if(volOn) volOn.style.display = _icMuted ? "none" : "";
    if(volOff) volOff.style.display = _icMuted ? "" : "none";
  };

  // Show a paragraph
  function showParagraph(idx){
    if(!textZone) return;
    var data = IC_PARAGRAPHS[idx];
    textZone.innerHTML = "";

    // Morkar announcement screen at the end
    if(data.cls === "ic-morkar-announce"){
      var wrap = document.createElement("div");
      wrap.className = "ic-paragraph ic-morkar-announce";
      wrap.innerHTML =
        '<div class="ic-morkar-speaker">' +
          '<span class="ic-morkar-emblem">\u25C6</span>' +
          '<span class="ic-morkar-label">GROUPE MORKAR — DÉCLARATION D\'OUVERTURE</span>' +
        '</div>' +
        '<button class="ic-morkar-play-btn" id="ic-morkar-play">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"/></svg>' +
          '<span>Écouter la déclaration</span>' +
        '</button>' +
        '<div class="ic-morkar-speech">' +
          '<p>« Peuples d\'Extelua. Mondes connectés et mondes oubliés. Vous qui regardez depuis les confins de l\'univers connu, et vous qui êtes ici, debout parmi nous — ce soir, il n\'y a plus de frontières. »</p>' +
          '<p>« Le Sablier s\'est retourné. Comme il l\'a fait avant nous, comme il le fera après nous. Et avec lui, une promesse se renouvelle — celle que chaque être, quel que soit son monde, quelle que soit son histoire, mérite une chance de tout changer. »</p>' +
          '<p>« Vous êtes quarante à avoir répondu à l\'appel. Quarante âmes venues de mondes que tout sépare. Certains d\'entre vous sont des légendes. D\'autres sont des inconnus. Ici, cela n\'a aucune importance. »</p>' +
          '<p>« Ce qui vous attend dépassera tout ce que vous avez connu. Chaque épreuve vous révélera. Chaque choix vous définira. Et quand le dernier grain de sable tombera… un seul d\'entre vous aura le pouvoir de changer le destin de tout un monde. »</p>' +
          '<p>« Que le Sablier guide vos pas. Le Tournoi d\'Extelua… est officiellement ouvert. »</p>' +
        '</div>';
      textZone.appendChild(wrap);

      // Play Morkar announcement audio
      var playBtn = document.getElementById("ic-morkar-play");
      var morkarAudio = document.getElementById("ic-morkar-audio");
      if(playBtn && morkarAudio){
        playBtn.onclick = function(e){
          e.stopPropagation();
          if(morkarAudio.paused){
            morkarAudio.currentTime = 0;
            morkarAudio.volume = 0.7;
            morkarAudio.play().catch(function(){});
            playBtn.classList.add("playing");
            playBtn.querySelector("span").textContent = "Lecture en cours…";
          } else {
            morkarAudio.pause();
            playBtn.classList.remove("playing");
            playBtn.querySelector("span").textContent = "Écouter la déclaration";
          }
        };
        morkarAudio.onended = function(){
          playBtn.classList.remove("playing");
          playBtn.querySelector("span").textContent = "Réécouter";
        };
      }

      if(nextBtn) nextBtn.textContent = "Continuer \u25BA";
      return;
    }

    var p = document.createElement("div");
    p.className = "ic-paragraph" + (data.cls ? " " + data.cls : "");
    p.textContent = data.text;
    textZone.appendChild(p);

    // Update button text on the "Et toi…" paragraph (second to last)
    if(data.cls === "ic-final" && nextBtn){
      nextBtn.textContent = "Suivant \u25BC";
    }
  }

  // Go to next paragraph
  function nextParagraph(){
    if(transitioning) return;
    var currentP = textZone ? textZone.querySelector(".ic-paragraph") : null;

    if(paraIdx >= IC_PARAGRAPHS.length - 1){
      endIntro();
      return;
    }

    if(currentP){
      transitioning = true;
      currentP.classList.add("fading-out");
      setTimeout(function(){
        paraIdx++;
        showParagraph(paraIdx);
        transitioning = false;
      }, 500);
    } else {
      paraIdx++;
      showParagraph(paraIdx);
    }
  }

  var dismissed = false;
  function endIntro(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.style.display = "none";
      overlay.classList.remove("fading-out");
      if(textZone) textZone.innerHTML = "";
      // Reset button
      if(nextBtn) nextBtn.textContent = "Suivant \u25BC";
      onDone();
    }, 800);
  }

  // Wire buttons
  if(nextBtn) nextBtn.onclick = nextParagraph;
  if(skipBtn) skipBtn.onclick = endIntro;

  // Also allow tapping the text zone
  if(textZone) textZone.onclick = nextParagraph;

  // Show first paragraph
  showParagraph(0);
}

/* ══════════ INTRO MODAL (main menu — short lore overview) ══════════ */
function showIntroModal(parent){
  var existing = document.getElementById("intro-modal-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "intro-modal-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u29D6</span>' +
        '<span class="ic-modal-title">LE TOURNOI D\'EXTELUA</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<p class="ic-modal-intro">' +
          '« Le Sablier s\'est retourné. Comme il l\'a fait avant nous, ' +
          'comme il le fera après nous. »' +
        '</p>' +

        '<p>Quelque part dans l\'immensité d\'Extelua, un tournoi se prépare. ' +
          'Le plus grand événement que l\'univers connu ait jamais engendré. ' +
          'Quarante candidats venus de tous les horizons vont s\'affronter ' +
          'dans des épreuves qui testent le corps, l\'esprit et la volonté.</p>' +

        '<h3 class="ic-modal-section">LES CHAMPIONS</h3>' +
        '<p>Trente d\'entre eux sont les représentants officiels des planètes connectées ' +
          'au Réseau Universel. Élus, désignés ou tirés au sort selon les traditions de leur monde, ' +
          'ils arrivent avec leurs sponsors, leurs supporters et la pression de milliards de regards.</p>' +

        '<h3 class="ic-modal-section">LES ISOLÉS</h3>' +
        '<p>Dix places sont réservées aux planètes isolées — des mondes coupés du reste de l\'univers, ' +
          'qui n\'ont parfois jamais eu de contact avec l\'extérieur. Des individus au potentiel ' +
          'remarquable, arrachés à leur quotidien par une invitation qu\'ils ne comprennent pas encore.</p>' +

        '<h3 class="ic-modal-section">LE GROUPE MORKAR</h3>' +
        '<p>L\'organisation qui dirige le Tournoi depuis des décennies. Garant autoproclamé de la paix ' +
          'et de la transparence entre les mondes, Morkar contrôle l\'arbitrage, la retransmission ' +
          'et les règles du jeu. Tout passe par eux. Tout leur appartient.</p>' +

        '<h3 class="ic-modal-section">LES DISSIDENTS</h3>' +
        '<p>Des voix s\'élèvent dans l\'ombre. Certains anciens candidats murmurent que ' +
          'le Tournoi n\'est pas ce qu\'il prétend être. Que derrière le spectacle se cachent ' +
          'des vérités que Morkar préfère garder dans l\'obscurité. ' +
          'Personne ne sait exactement ce qu\'ils savent — ni ce qu\'ils préparent.</p>' +

        '<p class="ic-modal-closing">' +
          '« Que le Sablier guide vos pas. »' +
        '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="intro-modal-close">Fermer</button>' +
    '</div>';

  (parent || document.body).appendChild(overlay);
  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("intro-modal-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
  overlay.onclick = function(e){
    if(e.target === overlay){
      overlay.classList.remove("visible");
      setTimeout(function(){ overlay.remove(); }, 400);
    }
  };
}

/* ══════════ MORKAR PRESENTATION MODAL ══════════ */
function showMorkarPresentation(){
  var existing = document.getElementById("ic-modal-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "ic-modal-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u25C6</span>' +
        '<span class="ic-modal-title">GROUPE MORKAR — RETRANSMISSION OFFICIELLE</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<p class="ic-modal-intro">' +
          '« Peuples d\'Extelua, le moment est venu. Le Tournoi ouvre ses portes pour sa 47e édition. »' +
        '</p>' +

        '<h3 class="ic-modal-section">LE TOURNOI</h3>' +
        '<p>Créé il y a près d\'un siècle par le Conseil Fondateur, le Tournoi d\'Extelua est ' +
          'le plus grand événement compétitif de l\'univers connu. Pendant quinze lunes, quarante candidats ' +
          'venus de tous les horizons s\'affrontent dans des épreuves qui testent le corps, l\'esprit et la volonté.</p>' +
        '<p>Le groupe Morkar, garant de la transparence et de la paix entre les mondes, assure ' +
          'l\'organisation, la retransmission et l\'arbitrage du Tournoi depuis sa 12e édition.</p>' +

        '<h3 class="ic-modal-section">LES CANDIDATS — CHAMPIONS DES PLANÈTES CONNECTÉES</h3>' +
        '<p>Trente candidats sont désignés par les planètes membres du Réseau des Routes Sillonnées. ' +
          'Chaque monde connecté envoie son représentant — élu, tiré au sort ou désigné selon les coutumes locales. ' +
          'Ils arrivent avec leur histoire, leurs sponsors et leurs millions de supporters.</p>' +

        '<h3 class="ic-modal-section">LES CANDIDATS — ISOLÉS DES PLANÈTES COUPÉES DU RÉSEAU</h3>' +
        '<p>Dix places sont réservées aux planètes non connectées aux réseaux universels. ' +
          'Des mondes qui n\'ont parfois jamais eu de contact avec l\'extérieur. Morkar envoie des éclaireurs ' +
          'pour identifier et inviter des individus au potentiel remarquable.</p>' +
        '<p>C\'est la promesse fondatrice du Tournoi : offrir une chance égale à ceux que l\'univers a oubliés. ' +
          'Une main tendue vers l\'inconnu.</p>' +

        '<h3 class="ic-modal-section">LA RÉCOMPENSE</h3>' +
        '<p>Le vainqueur obtient pour sa planète d\'origine l\'intégration au Réseau Universel — ' +
          'accès aux Routes Sillonnées, siège au Conseil des Mondes, et les technologies qui en découlent. ' +
          'Un monde entier transformé par la victoire d\'un seul être.</p>' +

        '<h3 class="ic-modal-section">CLAUSES DU CONTRAT — ENGAGEMENTS DU CANDIDAT</h3>' +
        '<p class="ic-modal-footnote" style="margin-bottom:8px;font-style:normal">' +
          '<em>Extrait du Contrat de Participation au Tournoi d\'Extelua — Article IX, ' +
          'dit « Clause de Contrepartie »</em></p>' +
        '<p>La grandeur de la récompense exige un sacrifice à la mesure de son éclat. ' +
          'Nul monde ne saurait être élevé sans que celui qui l\'a porté n\'en paie le prix.</p>' +
        '<p><strong>Article IX-1 — En cas de victoire (Champion ou Isolé) :</strong><br>' +
          'La planète d\'origine du vainqueur obtient l\'intégration pleine et immédiate au Réseau Universel, ' +
          'avec tous les privilèges qui en découlent. En contrepartie, le vainqueur s\'engage à renoncer ' +
          'définitivement à toute identité publique. Il sera effacé des registres, coupé de tout contact ' +
          'avec les mondes extérieurs, et replacé dans l\'anonymat le plus total. Son nom ne sera plus ' +
          'prononcé. Son visage ne sera plus diffusé. Il vivra, mais comme un inconnu — ' +
          'y compris pour ceux qui l\'auront vu triompher.</p>' +
        '<p style="font-size:10px;color:var(--bone-dim);font-style:italic;margin-top:4px">' +
          'Le sacrifice d\'un seul être pour l\'avenir de tout un peuple : telle est la promesse, ' +
          'tel est le prix. Le vainqueur offre sa gloire en échange de celle de son monde.</p>' +
        '<p><strong>Article IX-2 — En cas d\'élimination :</strong><br>' +
          'Le candidat éliminé retourne sur sa planète d\'origine et reprend le cours de son existence. ' +
          'Aucune sanction, aucune conséquence. Le Tournoi considère que la participation elle-même ' +
          'est un honneur suffisant.</p>' +

        '<p class="ic-modal-closing">« Que le Sablier guide vos pas. Morkar veille. »</p>' +

        '<p class="ic-modal-footnote">' +
          'Note : Le groupe Morkar condamne fermement les actes de sabotage perpétrés ' +
          'par des éléments dissidents lors des précédentes éditions. Des mesures de sécurité ' +
          'renforcées ont été mises en place pour garantir le bon déroulement du Tournoi. ' +
          'Toute tentative de perturbation sera traitée avec la plus grande fermeté.' +
        '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="ic-modal-close">Fermer</button>' +
    '</div>';

  var crawl = document.getElementById("intro-crawl");
  (crawl || document.body).appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("ic-modal-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ══════════ JOURNAL ARTICLE MODAL ══════════ */
function showJournalArticle(){
  var existing = document.getElementById("ic-modal-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "ic-modal-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal ic-modal-journal">' +
      '<div class="ic-modal-header ic-journal-header">' +
        '<span class="ic-journal-name">L\'ÉCHO DES SILLONS</span>' +
        '<span class="ic-journal-edition">Édition spéciale — Cycle 47</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<h3 class="ic-journal-headline">TOURNOI D\'EXTELUA : CE QU\'ON NE VOUS DIT PAS</h3>' +

        '<p class="ic-journal-lead">' +
          'Alors que le groupe Morkar lance sa campagne de communication pour la 47e édition, ' +
          'notre rédaction revient sur les zones d\'ombre qui entourent le plus grand spectacle de l\'univers.' +
        '</p>' +

        '<h4 class="ic-journal-sub">Des candidats isolés vraiment « choisis au hasard » ?</h4>' +
        '<p>Morkar affirme que ses éclaireurs sélectionnent les candidats des planètes isolées ' +
          'sur la base de « leur potentiel et leur détermination ». Pourtant, sur les 20 dernières éditions, ' +
          'aucun candidat d\'une planète isolée n\'a jamais remporté le Tournoi. Pas un seul. ' +
          'La plupart sont éliminés avant la cinquième lune.</p>' +

        '<h4 class="ic-journal-sub">La récompense : un rêve accessible ?</h4>' +
        '<p>L\'intégration au Réseau Universel est présentée comme le prix ultime. ' +
          'Mais les archives du Conseil des Mondes — que notre rédaction a pu consulter — ' +
          'montrent que les conditions d\'intégration comportent des clauses que Morkar ne mentionne jamais ' +
          'dans ses retransmissions. Le détail de ces clauses reste classifié.</p>' +

        '<h4 class="ic-journal-sub">Ce qu\'on ne dit pas aux perdants</h4>' +
        '<p>Morkar assure que les candidats éliminés « retournent chez eux sans conséquence ». ' +
          'C\'est vrai — du moins pour les champions des planètes connectées, qui rentrent et reprennent leur vie publique. ' +
          'Mais pour les isolés des planètes coupées du Réseau, nos sources décrivent un protocole bien différent.</p>' +
        '<p>Selon un ancien technicien de Morkar ayant requis l\'anonymat, les isolés éliminés ' +
          'ne repartent pas avec leurs souvenirs. Avant d\'être renvoyés sur leur monde d\'origine, ' +
          'ils passeraient par ce que l\'organisation appelle en interne le « Protocole de Réinitialisation ». ' +
          'Une procédure de réécriture mémorielle. L\'isolé reçoit des souvenirs fabriqués — une année ' +
          'ordinaire, sans tournoi, sans voyage, sans Morkar. Comme si rien ne s\'était jamais passé.</p>' +
        '<p>La justification officieuse ? « Préserver l\'ordre établi. » Un individu issu d\'une planète isolée ' +
          'qui reviendrait chez lui avec la connaissance de l\'univers connecté, des Routes Sillonnées et des ' +
          'technologies interstellaires représenterait, selon Morkar, un « risque de déstabilisation culturelle ». ' +
          'Mieux vaut qu\'il oublie tout. Mieux vaut qu\'il n\'ait jamais su.</p>' +
        '<p style="font-style:italic;color:var(--bone-dim)">Notre rédaction n\'a pas été en mesure de vérifier ' +
          'ces allégations de manière indépendante. Le groupe Morkar n\'a pas répondu à nos demandes de commentaire.</p>' +

        '<h4 class="ic-journal-sub">La clause que Morkar voulait garder secrète</h4>' +
        '<p>Le contrat de participation au Tournoi comporte une clause de confidentialité absolue. ' +
          'Chaque candidat — champion comme isolé — s\'engage à ne jamais divulguer les termes exacts ' +
          'de son engagement envers Morkar. Le contenu du contrat est classifié, et toute fuite est passible ' +
          'de sanctions dont la nature n\'a jamais été précisée publiquement.</p>' +
        '<p>Mais Morkar a commis une erreur de conception. Les champions éliminés, contrairement aux isolés, ' +
          'rentrent chez eux avec tous leurs souvenirs. Ils perdent le Tournoi, certes — mais ils se souviennent ' +
          'de chaque ligne qu\'ils ont signée. Et certains ont parlé.</p>' +
        '<p>D\'après les témoignages recoupés de trois anciens champions issus de planètes connectées — ' +
          'recueillis sous couvert d\'anonymat sur des fréquences non régulées — le contrat contiendrait ' +
          'un article stipulant que le vainqueur du Tournoi doit renoncer à toute existence publique. ' +
          'Plus de nom, plus de visage, plus de contact avec les autres mondes. Une disparition organisée. ' +
          'Le champion victorieux offrirait l\'avenir à sa planète, mais perdrait le sien.</p>' +
        '<p>L\'un de nos témoins — un ancien favori du Cycle 39, éliminé en demi-finale — ' +
          'résume la situation en ces termes : <em>« On signe sans vraiment comprendre. Le contrat est rédigé ' +
          'pour impressionner, pas pour informer. Ce n\'est qu\'après l\'élimination, une fois rentré chez soi, ' +
          'qu\'on réalise ce qu\'on a failli accepter. Et ce que le vainqueur, lui, a réellement perdu. »</em></p>' +
        '<p style="font-style:italic;color:var(--bone-dim)">Morkar a qualifié ces déclarations de ' +
          '« fabrications malveillantes émanant d\'individus en quête de notoriété ». L\'organisation rappelle ' +
          'que la clause de confidentialité reste juridiquement contraignante et se réserve le droit de poursuivre ' +
          'tout contrevenant.</p>' +

        '<h4 class="ic-journal-sub">Les audiences au plus haut</h4>' +
        '<p>Avec 4,2 milliards de spectateurs lors de la finale du Cycle 46, le Tournoi ' +
          'reste de loin le programme le plus regardé de l\'univers connecté. Les revenus publicitaires ' +
          'du groupe Morkar ont augmenté de 340% depuis qu\'il a pris le contrôle de l\'organisation.</p>' +

        '<h4 class="ic-journal-sub">Les « éléments dissidents »</h4>' +
        '<p>Morkar mentionne régulièrement des « actes de sabotage » sans jamais nommer ' +
          'de groupe ni préciser la nature des incidents. Nos sources indiquent que certains anciens ' +
          'candidats auraient tenté de rendre publiques des informations sur le fonctionnement interne ' +
          'du Tournoi. Aucun d\'entre eux n\'a donné suite à nos demandes d\'interview.</p>' +

        '<p class="ic-journal-footer">' +
          'L\'Écho des Sillons — Indépendant depuis le Cycle 11. ' +
          'Diffusion restreinte aux secteurs non régulés.' +
        '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="ic-modal-close">Fermer</button>' +
    '</div>';

  // Append to visible parent (intro-crawl or lock-screen or body)
  var parent = document.getElementById("intro-crawl");
  if(!parent || parent.style.display === "none") parent = document.getElementById("lock-screen");
  if(!parent || parent.style.display === "none") parent = document.body;
  parent.appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("ic-modal-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ══════════ IDENTITY SCREEN (race → portrait) ══════════ */
function showIdentityScreen(onDone){
  var overlay = document.getElementById("identity-screen");
  if(!overlay){ onDone(); return; }
  overlay.style.display = "";

  var phaseRace = document.getElementById("id-phase-race");
  var phaseAvatar = document.getElementById("id-phase-avatar");
  var raceGrid = document.getElementById("id-race-grid");
  var ring = document.getElementById("id-avatar-ring");
  var preview = document.getElementById("id-avatar-preview");
  var label = document.getElementById("id-avatar-label");
  var fileInput = document.getElementById("id-file-input");
  var skipBtn = document.getElementById("id-skip-avatar");

  var avatarData = "";
  var BASE_BONUS_POOL = 100;
  var STAT_NAMES = {CRE:"Créativité",SAG:"Sagesse",CHA:"Charisme",FOR:"Force",AGI:"Agilité",PER:"Perception"};

  // ── Phase 1: Race grid ──
  if(phaseRace) phaseRace.style.display = "";
  if(phaseAvatar) phaseAvatar.style.display = "none";

  if(raceGrid){
    raceGrid.innerHTML = "";
    var races = getRaceObjects();

    races.forEach(function(race){
      var card = document.createElement("button");
      card.className = "id-race-card";
      card.innerHTML = '<span class="id-race-card-name">' + esc(race.name) + '</span>';
      card.onclick = function(e){
        e.stopPropagation();
        showRaceDetail(race);
      };
      raceGrid.appendChild(card);
    });
  }

  // ── Race detail modal ──
  function showRaceDetail(race){
    var existing = overlay.querySelector(".id-race-modal-backdrop");
    if(existing) existing.remove();

    var backdrop = document.createElement("div");
    backdrop.className = "id-race-modal-backdrop";

    var poolMod = race.bonusPoints || 0;
    var totalPool = BASE_BONUS_POOL + poolMod;

    var h = '<div class="id-race-modal">';
    h += '<div class="id-race-modal-title">' + esc(race.name) + '</div>';
    h += '<div class="id-race-modal-desc">' + esc(race.desc) + '</div>';

    // Stats preview
    h += '<div class="id-race-stats">';
    ["CRE","SAG","CHA","FOR","AGI","PER"].forEach(function(k){
      var base = 50;
      var bonus = (race.bonus && race.bonus[k]) || 0;
      var malus = (race.malus && race.malus[k]) || 0;
      var total = base + bonus + malus;
      var modStr = "";
      if(bonus > 0) modStr = '<span class="id-stat-bonus">+' + bonus + '</span>';
      if(malus < 0) modStr += '<span class="id-stat-malus">' + malus + '</span>';
      h += '<div class="id-stat-row">';
      h += '<span class="id-stat-label">' + STAT_NAMES[k] + '</span>';
      h += '<span class="id-stat-bar-wrap"><span class="id-stat-bar" style="width:' + total + '%"></span></span>';
      h += '<span class="id-stat-value">' + total + '</span>';
      h += modStr;
      h += '</div>';
    });
    h += '</div>';

    // Bonus points pool
    h += '<div class="id-race-pool">';
    if(poolMod > 0){
      h += 'Points bonus à répartir : <strong>' + totalPool + '</strong> <span class="id-stat-bonus">(+' + poolMod + ')</span>';
    } else if(poolMod < 0){
      h += 'Points bonus à répartir : <strong>' + totalPool + '</strong> <span class="id-stat-malus">(' + poolMod + ')</span>';
    } else {
      h += 'Points bonus à répartir : <strong>' + totalPool + '</strong>';
    }
    h += '</div>';

    h += '<div class="id-race-modal-actions">';
    h += '<button class="id-race-modal-back">Retour</button>';
    h += '<button class="id-race-modal-accept">Accepter</button>';
    h += '</div>';
    h += '</div>';

    backdrop.innerHTML = h;
    overlay.appendChild(backdrop);
    setTimeout(function(){ backdrop.classList.add("visible"); }, 20);

    backdrop.querySelector(".id-race-modal-back").onclick = function(){
      backdrop.classList.remove("visible");
      setTimeout(function(){ backdrop.remove(); }, 300);
    };

    backdrop.querySelector(".id-race-modal-accept").onclick = function(){
      // Save race + base stats
      var u = loadUser();
      u.race = race.name;
      ["CRE","SAG","CHA","FOR","AGI","PER"].forEach(function(k){
        var base = 50;
        var bonus = (race.bonus && race.bonus[k]) || 0;
        var malus = (race.malus && race.malus[k]) || 0;
        u["stat"+k] = base + bonus + malus;
      });
      saveUser(u);
      window._idRace = race.name;
      window._raceBonusPool = totalPool;

      backdrop.classList.remove("visible");
      setTimeout(function(){
        backdrop.remove();
        goToAvatarPhase();
      }, 300);
    };
  }

  // ── Phase 2: Avatar upload ──
  function goToAvatarPhase(){
    if(phaseRace) phaseRace.style.display = "none";
    if(phaseAvatar){ phaseAvatar.style.display = ""; phaseAvatar.style.animation = "scFadeIn .4s ease-out both"; }

    function openFilePicker(){ if(fileInput) fileInput.click(); }
    if(ring) ring.onclick = openFilePicker;
    if(label) label.onclick = openFilePicker;

    if(fileInput) fileInput.onchange = function(){
      var file = fileInput.files[0]; if(!file) return;
      var reader = new FileReader();
      reader.onload = function(e){
        avatarData = e.target.result;
        if(preview) preview.innerHTML = '<img src="'+avatarData+'">';
        setTimeout(function(){ finishIdentity(); }, 400);
      };
      reader.readAsDataURL(file);
    };

    if(skipBtn) skipBtn.onclick = function(){ finishIdentity(); };
  }

  function finishIdentity(){
    if(avatarData) saveAvatar(avatarData);
    window._idAvatarData = avatarData;

    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.style.display = "none";
      overlay.classList.remove("fading-out");
      // Reset for replay
      if(phaseRace) phaseRace.style.display = "";
      if(phaseAvatar) phaseAvatar.style.display = "none";
      if(raceGrid) raceGrid.innerHTML = "";
      if(preview) preview.innerHTML = '<span class="id-avatar-plus">+</span>';
      onDone();
    }, 800);
  }
}

/* ══════════ SCENARIO MUSIC MAP ══════════ */
var SC_MUSIC = {
  "champion":       "assets/music/champion.mp3",
  "lambda":         "assets/music/emissaire.mp3",
  "rebelle":        "assets/music/dissident.mp3",
  "apprenti-morkar":"assets/music/recrue.mp3",
  "veteran-morkar": "assets/music/veteran.mp3"
};

/* ══════════ SCENARIO LORE MODAL ══════════ */
function showScenarioLore(title, text){
  var existing = document.getElementById("sc-lore-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "sc-lore-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal sc-lore-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u25C9</span>' +
        '<span class="ic-modal-title">' + title.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<p>' + text + '</p>' +
      '</div>' +
      '<button class="ic-modal-close" id="sc-lore-close">Fermer</button>' +
    '</div>';

  var scenarioOverlay = document.getElementById("scenario-choice");
  (scenarioOverlay || document.body).appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  document.getElementById("sc-lore-close").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };
}

/* ── Scenario lore modal with Accept / Back buttons ── */
function showScenarioLoreChoice(title, text, onAccept){
  var existing = document.getElementById("sc-lore-overlay");
  if(existing) existing.remove();

  var overlay = document.createElement("div");
  overlay.id = "sc-lore-overlay";
  overlay.className = "ic-modal-overlay";

  overlay.innerHTML =
    '<div class="ic-modal sc-lore-modal">' +
      '<div class="ic-modal-header">' +
        '<span class="ic-modal-logo">\u25C9</span>' +
        '<span class="ic-modal-title">' + title.toUpperCase() + '</span>' +
      '</div>' +
      '<div class="ic-modal-body">' +
        '<p>' + text + '</p>' +
      '</div>' +
      '<div class="sc-lore-actions">' +
        '<button class="ic-modal-close sc-lore-back-btn">Retour</button>' +
        '<button class="ic-modal-close sc-lore-accept-btn">Accepter le r\u00f4le</button>' +
      '</div>' +
    '</div>';

  var scenarioOverlay = document.getElementById("scenario-choice");
  (scenarioOverlay || document.body).appendChild(overlay);

  setTimeout(function(){ overlay.classList.add("visible"); }, 20);

  overlay.querySelector(".sc-lore-back-btn").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){ overlay.remove(); }, 400);
  };

  overlay.querySelector(".sc-lore-accept-btn").onclick = function(){
    overlay.classList.remove("visible");
    setTimeout(function(){
      overlay.remove();
      if(onAccept) onAccept();
    }, 400);
  };
}

/* ══════════ TOURNAMENT CONTRACT ══════════ */
var CONTRACT_CONTENT = {
  connecte: {
    title: "Contrat de Participation — Candidat Connecté",
    paragraphs: [
      "Article I — Engagement. En signant ce contrat, le candidat issu d'une planète " +
      "connectée au Réseau Universel s'engage à participer au 47e Tournoi d'Extelua " +
      "organisé par le groupe Morkar. Le candidat reconnaît avoir été désigné par les " +
      "autorités compétentes de son monde d'origine et accepte de représenter sa planète " +
      "avec honneur et loyauté pendant toute la durée de la compétition.",
      "Article II — Droits et obligations. Le candidat bénéficie du soutien logistique " +
      "complet du groupe Morkar : transport via les Routes Sillonnées, hébergement dans " +
      "les quartiers réservés, accès aux centres d'entraînement pré-tournoi et assistance " +
      "médicale de niveau galactique. En contrepartie, le candidat s'engage à respecter " +
      "le règlement du Tournoi, à se soumettre aux décisions des arbitres désignés par " +
      "Morkar, et à ne divulguer aucune information confidentielle relative à l'organisation.",
      "Article III — Responsabilité. Le groupe Morkar décline toute responsabilité en cas " +
      "de blessure, de disparition ou de décès survenu pendant les épreuves. Le candidat " +
      "reconnaît que le Tournoi comporte des risques inhérents et renonce à toute poursuite " +
      "contre l'organisation. Les soins médicaux d'urgence seront néanmoins assurés dans la " +
      "mesure des moyens disponibles sur le lieu des épreuves.",
      "Article IV — Récompense. En cas de victoire, le candidat et sa planète d'origine " +
      "recevront la récompense promise : intégration complète au Réseau Universel, siège " +
      "permanent au Conseil des Mondes, et accès illimité aux technologies partagées. " +
      "Les modalités précises de l'intégration seront communiquées au vainqueur après la " +
      "cérémonie de clôture. Ce contrat est définitif et irrévocable dès sa signature."
    ]
  },
  isole: {
    title: "Contrat de Participation — Candidat Isolé",
    paragraphs: [
      "Article I — Sélection et consentement. Le candidat issu d'une planète non connectée " +
      "au Réseau Universel a été sélectionné par les éclaireurs du groupe Morkar selon des " +
      "critères d'aptitude physique, mentale et adaptative. En signant ce contrat, le candidat " +
      "confirme son consentement libre et éclairé à participer au 47e Tournoi d'Extelua, " +
      "malgré sa méconnaissance préalable de l'univers galactique et de ses institutions.",
      "Article II — Accompagnement spécial. En raison de son statut d'isolé, le candidat " +
      "bénéficiera d'un programme d'accompagnement renforcé. Un guide personnel lui sera " +
      "assigné pour l'aider à comprendre les technologies, les règles et les enjeux du " +
      "Tournoi. Le groupe Morkar fournira également un kit d'adaptation comprenant une " +
      "mini-pilule de compréhension linguistique (durée : 10 heures) et les équipements de base nécessaires à la " +
      "compétition.",
      "Article III — Responsabilité et risques. Le candidat reconnaît que sa participation " +
      "au Tournoi implique des risques importants, notamment en raison de son manque " +
      "d'expérience avec les technologies avancées utilisées pendant les épreuves. Le groupe " +
      "Morkar ne pourra être tenu responsable des conséquences physiques ou psychologiques " +
      "liées à l'exposition soudaine à des civilisations et des technologies inconnues. " +
      "Le candidat renonce à toute réclamation.",
      "Article IV — Récompense et retour. En cas de victoire, la planète d'origine du " +
      "candidat sera intégrée au Réseau Universel selon les termes standard. En cas " +
      "d'élimination, le candidat sera reconduit sur sa planète d'origine dans un délai " +
      "raisonnable. Le groupe Morkar se réserve le droit de modifier les conditions de " +
      "retour en fonction des circonstances opérationnelles. Ce contrat est définitif " +
      "et irrévocable dès sa signature."
    ]
  }
};

/* ── Contract preview page (portrait + name + scenario + contract icon) ── */
function showContractPreview(arena, persona, scenarioObj, type, onSigned){
  var preview = document.createElement("div");
  preview.className = "sc-contract-preview";

  // Use player data (avatar + race) if available, fallback to persona
  var playerUser = loadUser();
  var avatarSrc = playerUser.avatar || (persona && persona.avatar ? persona.avatar : "assets/settings.png");
  var playerLabel = playerUser.race || (persona && persona.name ? persona.name : "Candidat");

  var h = '<div class="scp-portrait">';
  h += '<img src="' + avatarSrc + '" alt="">';
  h += '</div>';
  h += '<div class="scp-name">' + esc(playerLabel) + '</div>';
  h += '<div class="scp-scenario">' + scenarioObj.name + '</div>';
  h += '<div class="scp-contract-icon" title="Ouvrir le contrat">&#128220;</div>';
  h += '<div class="scp-contract-hint">Contrat</div>';

  preview.innerHTML = h;
  arena.appendChild(preview);

  // Fade in
  setTimeout(function(){ preview.classList.add("visible"); }, 20);

  // Click contract icon → open contract modal
  preview.querySelector(".scp-contract-icon").onclick = function(){
    var isMorkar = (scenarioObj.scenario === "apprenti-morkar" || scenarioObj.scenario === "veteran-morkar");
    var isRebelle = (scenarioObj.scenario === "rebelle");
    showContractModal(type, onSigned, isMorkar, isRebelle);
  };
}

/* Generate alien gibberish from real text (preserving word structure) */
function toAlienText(text){
  var alien = "ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃᛈᛇᛉᛊᛏᛒᛖᛗᛚᛜᛞᛟᛠᛡᛢᛣᛤᛥᛦᛧᛨᛩᛪ";
  var result = "";
  for(var i = 0; i < text.length; i++){
    var ch = text[i];
    if(ch === " " || ch === "\n" || ch === "." || ch === "," || ch === "—" || ch === ":" || ch === "'"){
      result += ch;
    } else {
      result += alien[Math.floor(Math.random() * alien.length)];
    }
  }
  return result;
}

/* ── Pill confirmation dialog ── */
function showPillConfirmDialog(parentBackdrop, onConsume){
  var dialog = document.createElement("div");
  dialog.className = "pill-confirm-backdrop";
  dialog.innerHTML =
    '<div class="pill-confirm-dialog">' +
      '<div class="pill-confirm-icon">&#128138;</div>' +
      '<div class="pill-confirm-buttons">' +
        '<button class="pill-confirm-btn pill-confirm-yes">Consommer</button>' +
        '<button class="pill-confirm-btn pill-confirm-no">Ne pas consommer</button>' +
      '</div>' +
    '</div>';

  parentBackdrop.appendChild(dialog);
  setTimeout(function(){ dialog.classList.add("visible"); }, 20);

  dialog.querySelector(".pill-confirm-yes").onclick = function(){
    dialog.classList.remove("visible");
    setTimeout(function(){ dialog.remove(); }, 300);
    onConsume();
  };
  dialog.querySelector(".pill-confirm-no").onclick = function(){
    dialog.classList.remove("visible");
    setTimeout(function(){ dialog.remove(); }, 300);
  };
}

function showContractModal(type, onSigned, isMorkar, isRebelle){
  var contract = CONTRACT_CONTENT[type] || CONTRACT_CONTENT.isole;
  var screen = document.querySelector(".screen") || document.body;
  // Pill visible for all non-Morkar (champion, isolé, dissident)
  // Morkar gives the pill thinking they're regular candidates
  var needsPill = !isMorkar;
  // Runes only for true champions/isolés — dissidents secretly understand French
  var needsTranslation = !isMorkar && !isRebelle;

  var backdrop = document.createElement("div");
  backdrop.className = "contract-modal-backdrop";

  var h = '<div class="contract-modal">';
  h += '<div class="contract-header">' + contract.title + '</div>';

  // Pill icon for non-Morkar scenarios (champion, isolé, dissident)
  if(needsPill){
    h += '<div class="contract-pill-row">';
    h += '<div class="contract-pill" title="Mini-Pilule de compr\u00e9hension (10h)">&#128138;</div>';
    h += '<div class="contract-pill-hint">Mini-Pilule de compr\u00e9hension</div>';
    h += '</div>';
  }

  h += '<div class="contract-body">';
  for(var i = 0; i < contract.paragraphs.length; i++){
    if(needsTranslation){
      // Alien text initially, real text hidden
      h += '<p class="contract-para contract-para-alien" data-real="' +
        contract.paragraphs[i].replace(/"/g, '&quot;') + '">' +
        toAlienText(contract.paragraphs[i]) + '</p>';
    } else {
      h += '<p class="contract-para">' + contract.paragraphs[i] + '</p>';
    }
  }
  h += '</div>';
  h += '<div class="contract-signature">';
  h += '<div class="contract-sig-label">Signature du candidat</div>';
  h += '<div class="contract-sig-line"></div>';
  h += '<button class="contract-sign-btn" id="contract-sign-btn">Signer le contrat</button>';
  h += '</div>';
  h += '</div>';

  backdrop.innerHTML = h;
  screen.appendChild(backdrop);
  setTimeout(function(){ backdrop.classList.add("visible"); }, 20);

  // Track whether pill was consumed during this modal
  var pillConsumed = false;

  // Pill click → confirmation dialog before consuming
  if(needsPill){
    var pill = backdrop.querySelector(".contract-pill");
    if(pill) pill.onclick = function(){
      showPillConfirmDialog(backdrop, function onConsume(){
        pillConsumed = true;
        pill.classList.add("consumed");

        if(needsTranslation){
          // Reveal paragraphs one by one with a cascade effect
          var paras = backdrop.querySelectorAll(".contract-para-alien");
          paras.forEach(function(p, idx){
            setTimeout(function(){
              p.classList.add("revealing");
              setTimeout(function(){
                p.textContent = p.getAttribute("data-real");
                p.classList.remove("contract-para-alien", "revealing");
                p.classList.add("contract-para-revealed");
              }, 400);
            }, idx * 350);
          });
        }
      });
    };
  }

  document.getElementById("contract-sign-btn").onclick = function(){
    // Mark as signed
    window._contractSigned = true;
    window._contractType = type;
    // Pill in inventory only if NOT consumed during contract signing
    // Morkar scenarios: pillConsumed stays false → pill available in inventory for later use
    window._pillConsumed = pillConsumed;

    // Animate signature
    var sigLine = backdrop.querySelector(".contract-sig-line");
    if(sigLine) sigLine.classList.add("signed");
    var signBtn = document.getElementById("contract-sign-btn");
    if(signBtn){
      signBtn.textContent = "Signé \u2714";
      signBtn.disabled = true;
      signBtn.classList.add("signed");
    }

    setTimeout(function(){
      backdrop.classList.remove("visible");
      setTimeout(function(){
        backdrop.remove();
        if(onSigned) onSigned();
      }, 400);
    }, 800);
  };
}

/* ══════════ SCENARIO CHOICE (2-step: type → sub-scenario) ══════════ */
function showScenarioChoice(onChosen){
  var overlay = document.getElementById("scenario-choice");
  if(!overlay){ onChosen("lambda"); return; }
  overlay.style.display = "";

  var step1 = document.getElementById("sc-step1");
  var step2 = document.getElementById("sc-step2");
  var step2Title = document.getElementById("sc-step2-title");
  var arena = document.getElementById("sc-arena");

  // Track sub-state within step 2 for context-aware back navigation
  var step2State = "circles"; // "circles" | "contract" | "guide"
  var currentType = null;     // "connecte" | "isole" — remembers which type was picked
  var guide = document.getElementById("sc-guide");
  var guideLabel = document.getElementById("sc-guide-label");
  var guideImg = document.getElementById("sc-guide-img");

  // Set guide avatar
  var persona = getGuidePersona();
  if(persona && persona.avatar && guideImg){
    guideImg.innerHTML = '<img src="' + persona.avatar + '" alt="">';
  }

  // Show step 1, hide step 2
  if(step1) step1.style.display = "";
  if(step2) step2.style.display = "none";

  // Sub-scenario definitions per type
  var SUB_CHAMPION = [
    {scenario:"champion", name:"Champion", lore:
      "Tu es le représentant officiel de ta planète connectée au Réseau Universel. Choisi par ton peuple — élu, " +
      "tiré au sort ou désigné selon les traditions de ton monde — tu portes les espoirs de milliards d'êtres. " +
      "Tu crois au système mis en place par le groupe Morkar. Le Tournoi est pour toi une institution juste, " +
      "un symbole de méritocratie universelle où chaque civilisation peut prouver sa valeur. Tu as grandi en " +
      "regardant les retransmissions, en admirant les anciens champions, et aujourd'hui c'est ton tour de " +
      "marcher sous les projecteurs. Tu sais que des milliards de spectateurs suivront chacun de tes pas, " +
      "chacune de tes décisions. La pression est immense, mais la gloire qui attend le vainqueur l'est encore " +
      "plus. Tu te bats pour la récompense promise : l'intégration totale de ton monde au Réseau, un siège " +
      "au Conseil des Mondes, et l'accès aux technologies qui transformeront la vie de ton peuple pour toujours."},
    {scenario:"rebelle", name:"Dissident", lore:
      "Tu fais partie d'un groupe secret qui ne croit pas au système de Morkar. Derrière la façade de paix " +
      "et de justice universelle, tu as vu — ou on t'a montré — ce que personne ne devrait voir. Les promesses " +
      "creuses, les candidats des planètes isolées qui ne gagnent jamais, les clauses cachées de la récompense, " +
      "les anciens participants qui disparaissent quand ils parlent trop. Tu t'es infiltré dans le Tournoi en " +
      "tant que champion officiel de ta planète connectée, mais ta véritable mission est ailleurs. Tu dois " +
      "rassembler des preuves, établir des contacts avec d'autres dissidents potentiels, et surtout survivre " +
      "assez longtemps pour que la vérité éclate. Le réseau de résistance compte sur toi. Chaque geste que " +
      "tu feras sera scruté par les caméras de Morkar — il faudra jouer le jeu parfaitement, sourire devant " +
      "les écrans, tout en œuvrant dans l'ombre. Un faux pas et tu rejoindras la liste de ceux dont on " +
      "n'entend plus jamais parler."},
    {scenario:"apprenti-morkar", name:"Recrue Morkar", lore:
      "Tu viens d'être recruté par le groupe Morkar. Comme les autres champions, tu représentes une planète " +
      "connectée au Réseau, mais tu as accepté une mission supplémentaire : servir les intérêts de l'organisation " +
      "qui dirige le Tournoi depuis des décennies. En plus de te battre pour gagner et obtenir la récompense " +
      "pour ton monde, tu as reçu un briefing confidentiel. Morkar soupçonne que des éléments dissidents " +
      "pourraient tenter de s'infiltrer dans cette édition, comme ils l'ont fait lors de tournois précédents. " +
      "Ta mission secondaire est de les débusquer. Observer, écouter, repérer les comportements suspects, " +
      "les conversations à voix basse, les alliances qui n'ont pas de sens stratégique. Tu es nouveau dans " +
      "ce rôle et tu ne connais pas encore tous les rouages de Morkar, mais on t'a promis que si tu réussis " +
      "à identifier un dissident, la récompense sera assurée pour ton monde — que tu gagnes le Tournoi ou non. " +
      "Une double chance que peu de candidats possèdent."},
    {scenario:"veteran-morkar", name:"Vétéran Morkar", lore:
      "Tu fais partie du groupe Morkar depuis des années. Tu connais ses secrets, ses méthodes, ses véritables " +
      "objectifs. Tu as déjà participé à des éditions précédentes — pas en tant que simple candidat, mais en " +
      "tant qu'agent de l'organisation. Cette fois encore, tu es là pour surveiller. Le Tournoi est un " +
      "spectacle, certes, mais c'est aussi un terrain de chasse. Des dissidents ont tenté par le passé de " +
      "saboter l'événement, de révéler au public des informations que Morkar préfère garder dans l'ombre. " +
      "Certains ont été neutralisés. D'autres ont disparu avant qu'on puisse les atteindre. Ton expérience " +
      "te donne un avantage considérable : tu sais lire les gens, détecter les mensonges, repérer les " +
      "infiltrés. Tu participes au Tournoi pour t'amuser, bien sûr — les épreuves restent un défi plaisant — " +
      "mais ta priorité est ailleurs. Tu es les yeux et les oreilles de Morkar sur le terrain. Et cette " +
      "année, les rapports de renseignement suggèrent que la menace dissidente est plus forte que jamais."}
  ];
  var SUB_ISOLE = [
    {scenario:"lambda", name:"Isolé", lore:
      "Tu viens d'une planète qui n'a jamais été connectée au Réseau Universel. Ton monde vit en autarcie " +
      "depuis toujours — pas de Routes Sillonnées, pas de communication avec les autres civilisations, pas " +
      "de technologie venue d'ailleurs. Tu ne savais même pas que d'autres mondes habités existaient jusqu'au " +
      "jour où les éclaireurs de Morkar sont arrivés. Ils t'ont choisi — toi, parmi tous les habitants de ta " +
      "planète — pour participer à un événement dont tu ignores tout. Le Tournoi d'Extelua. Tu ne connais " +
      "pas Morkar, tu ne connais pas les règles du jeu galactique, tu ne sais pas qui sont tes adversaires " +
      "ni pourquoi des milliards d'êtres te regarderont à travers des écrans. Tu es complètement indépendant " +
      "du système. Tout ce que tu sais, c'est qu'on t'a promis que si tu gagnes, ton monde entier sera " +
      "transformé. L'accès au Réseau, aux technologies, à un avenir que ton peuple n'aurait jamais pu " +
      "imaginer. Tu pars de rien, sans sponsor, sans supporters, sans connaissance des intrigues politiques " +
      "qui entourent le Tournoi. Mais c'est peut-être là ta plus grande force."},
    {scenario:"rebelle", name:"Dissident", lore:
      "Tu fais partie d'un groupe secret qui ne croit pas au système de Morkar. Mais contrairement aux " +
      "dissidents qui s'infiltrent parmi les champions des planètes connectées, toi tu as choisi une " +
      "couverture encore plus profonde. Tu as fait semblant de te retrouver sur une planète isolée, coupée " +
      "du Réseau, pour être sélectionné comme isolé — un candidat lambda que personne ne soupçonnera. " +
      "Après tout, comment un habitant d'un monde primitif pourrait-il être un agent de la résistance ? " +
      "C'est le leurre parfait. Morkar surveille de près les champions connectés, car c'est là que les " +
      "dissidents se sont infiltrés par le passé. Personne ne pense à vérifier les isolés des planètes " +
      "coupées du Réseau — ces pauvres inconnus arrachés à leur quotidien. Ton déguisement est ta meilleure arme. " +
      "Tu devras jouer le rôle de l'innocent qui découvre l'univers, poser les questions naïves, feindre " +
      "l'émerveillement face aux technologies. Pendant ce temps, tu rassembleras des preuves, tu contacteras " +
      "d'éventuels alliés, et tu attendras le bon moment pour frapper. Un faux isolé parmi les vrais, " +
      "invisible aux yeux de ceux qui cherchent — c'est la stratégie la plus audacieuse que la résistance " +
      "ait jamais tentée."}
  ];

  /* ── STEP 1: pick type (click) ── */
  var btnConnecte = document.getElementById("sc-pick-connecte");
  var btnIsole = document.getElementById("sc-pick-isole");

  function goToStep2(type){
    var subs = (type === "connecte") ? SUB_CHAMPION : SUB_ISOLE;
    window._scOriginType = type; // "connecte" or "isole"
    currentType = type;
    step2State = "circles";

    // Ensure back button is visible on the circles screen
    var _backBtn = document.getElementById("sc-back-btn");
    if(_backBtn) _backBtn.style.display = "";

    // Set title
    if(step2Title){
      step2Title.textContent = (type === "connecte")
        ? "Quel connecté es-tu ?"
        : "Quel isolé es-tu ?";
    }

    // Subtitle reference
    var subtitle = step2 ? step2.querySelector(".sc-subtitle") : null;
    if(subtitle) subtitle.textContent = "Choisis ton scénario";

    // Inject scenario circles into arena (clickable, NOT drag targets)
    arena.querySelectorAll(".sc-circle").forEach(function(c){ c.remove(); });
    arena.querySelectorAll(".sc-circle-label").forEach(function(c){ c.remove(); });

    var positions;
    if(subs.length === 4){
      positions = [
        {left:"25%", top:"20%"},
        {left:"75%", top:"20%"},
        {left:"25%", top:"55%"},
        {left:"75%", top:"55%"}
      ];
    } else {
      positions = [
        {left:"30%", top:"35%"},
        {left:"70%", top:"35%"}
      ];
    }

    // Hide guide during scenario selection phase
    guide.style.display = "none";

    subs.forEach(function(s, i){
      // Scenario circle (clickable to select)
      var div = document.createElement("div");
      div.className = "sc-circle sc-circle-clickable";
      div.setAttribute("data-scenario", s.scenario);
      div.style.left = positions[i].left;
      div.style.top = positions[i].top;
      arena.appendChild(div);

      // Label below circle
      var label = document.createElement("div");
      label.className = "sc-circle-label";
      label.style.left = positions[i].left;
      label.style.top = positions[i].top;
      label.innerHTML = '<span class="sc-circle-label-text">' + s.name + '</span>';
      arena.appendChild(label);

      // Click circle → show scenario lore modal with accept/back buttons
      div.onclick = (function(sc){
        return function(){
          showScenarioLoreChoice(sc.name, sc.lore, function onAccept(){
            // Accepted → go to planet selection, then contract
            var scenario = sc.scenario;
            window._chosenScenario = scenario;

            // Remove all scenario circles and labels
            arena.querySelectorAll(".sc-circle").forEach(function(c){ c.remove(); });
            arena.querySelectorAll(".sc-circle-label").forEach(function(c){ c.remove(); });

            // Hide back button
            if(backBtn) backBtn.style.display = "none";

            // ── PLANET SELECTION ──
            step2State = "planet";
            if(step2Title) step2Title.textContent = "De quelle planète viens-tu ?";
            if(subtitle) subtitle.textContent = "Choisis ton monde d'origine";

            var planetZone = document.createElement("div");
            planetZone.className = "sc-planet-zone";
            planetZone.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;justify-content:center;padding:12px 8px;max-height:55vh;overflow-y:auto;animation:ccFadeUp .4s ease both";

            var univers = getTournamentUnivers();
            univers.forEach(function(w){
              var btn = document.createElement("button");
              btn.className = "sc-planet-btn";
              btn.setAttribute("data-wid", w.id);
              btn.innerHTML = '<span class="sc-planet-name">' + esc(w.name) + '</span>';
              btn.onclick = function(e){
                e.stopPropagation();
                // Highlight selected
                planetZone.querySelectorAll(".sc-planet-btn").forEach(function(b){
                  b.classList.remove("selected");
                  b.style.opacity = "0.4";
                });
                btn.classList.add("selected");
                btn.style.opacity = "1";

                // Save world
                var u = loadUser();
                u.worldName = w.name;
                saveUser(u);
                window._chosenWorld = w;

                setTimeout(function(){
                  planetZone.style.animation = "ccFadeOut .3s ease both";
                  setTimeout(function(){
                    planetZone.remove();

                    // ── CONTRACT PHASE ──
                    step2State = "contract";
                    if(step2Title) step2Title.textContent = sc.name;
                    if(subtitle) subtitle.textContent = "";

                    showContractPreview(arena, persona, sc, type, function(){
                      // Contract signed → show ATOM quotidien + name dialog
                      step2State = "quotidien";
                      arena.querySelectorAll(".sc-contract-preview").forEach(function(c){ c.remove(); });

                      // ── ATOM QUOTIDIEN + NAME DIALOG ──
                      if(step2Title) step2Title.textContent = "A.T.O.M.";
                      if(subtitle) subtitle.textContent = "";

                      var atomZone = document.createElement("div");
                      atomZone.className = "sc-atom-zone";
                      atomZone.style.cssText = "display:flex;flex-direction:column;align-items:center;gap:12px;padding:12px 8px;animation:ccFadeUp .4s ease both;width:100%";

                      // ATOM portrait
                      var guideP = getGuidePersona();
                      var atomPortrait = document.createElement("div");
                      atomPortrait.style.cssText = "width:60px;height:60px;border-radius:50%;border:2px solid rgba(201,160,74,.3);overflow:hidden;margin-bottom:4px";
                      if(guideP && guideP.avatar) atomPortrait.innerHTML = '<img src="'+esc(guideP.avatar)+'" style="width:100%;height:100%;object-fit:cover">';
                      atomZone.appendChild(atomPortrait);

                      // ATOM dialog text
                      var atomText = document.createElement("div");
                      atomText.style.cssText = "font-family:var(--font-heading,Poppins,sans-serif);font-size:12px;color:var(--bone-dim);text-align:center;line-height:1.5;max-width:300px";
                      atomText.innerHTML = "Avant la cérémonie, j'ai besoin de savoir… <span style='color:var(--gold-light)'>Quel est ton quotidien</span> sur ta planète ?";
                      atomZone.appendChild(atomText);

                      // Quotidien list (grouped by classe)
                      var quotidiens = getTournamentQuotidiens();
                      var classes = {};
                      quotidiens.forEach(function(q){
                        if(!classes[q.classe]) classes[q.classe] = [];
                        classes[q.classe].push(q);
                      });

                      var qList = document.createElement("div");
                      qList.style.cssText = "width:100%;max-height:35vh;overflow-y:auto;display:flex;flex-wrap:wrap;gap:6px;justify-content:center;padding:4px 0";
                      qList.className = "sc-quotidien-list";

                      quotidiens.forEach(function(q){
                        var qBtn = document.createElement("button");
                        qBtn.className = "sc-quotidien-btn";
                        qBtn.setAttribute("data-qid", q.id);
                        qBtn.innerHTML = '<span class="sc-q-name">' + esc(q.name) + '</span><span class="sc-q-classe">' + esc(q.classe) + '</span>';
                        qBtn.onclick = function(ev){
                          ev.stopPropagation();
                          qList.querySelectorAll(".sc-quotidien-btn").forEach(function(b){
                            b.classList.remove("selected");
                            b.style.opacity = "0.4";
                          });
                          qBtn.classList.add("selected");
                          qBtn.style.opacity = "1";
                          window._chosenQuotidien = q;

                          // Show name input
                          var nameRow = atomZone.querySelector(".sc-atom-name-row");
                          if(nameRow) nameRow.style.display = "flex";
                        };
                        qList.appendChild(qBtn);
                      });
                      atomZone.appendChild(qList);

                      // Name input row (hidden until quotidien selected)
                      var nameRow = document.createElement("div");
                      nameRow.className = "sc-atom-name-row";
                      nameRow.style.cssText = "display:none;flex-direction:column;align-items:center;gap:8px;width:100%;animation:ccFadeUp .3s ease both";

                      var nameLabel = document.createElement("div");
                      nameLabel.style.cssText = "font-family:var(--font-heading,Poppins,sans-serif);font-size:12px;color:var(--bone-dim);text-align:center";
                      nameLabel.innerHTML = "Et quel <span style='color:var(--gold-light)'>nom</span> portes-tu ?";
                      nameRow.appendChild(nameLabel);

                      var nameInput = document.createElement("input");
                      nameInput.type = "text";
                      nameInput.className = "id-name-input";
                      nameInput.placeholder = "Ton nom de voyageur\u2026";
                      nameInput.maxLength = 24;
                      nameInput.autocomplete = "off";
                      nameInput.style.cssText = "width:80%;max-width:280px;padding:14px 18px;background:rgba(14,10,6,.9);border:1px solid rgba(168,132,42,.2);border-radius:12px;color:var(--gold-light);font-family:var(--font-heading,Poppins,sans-serif);font-size:14px;text-align:center;outline:none;transition:border-color .2s";
                      nameRow.appendChild(nameInput);

                      var nameConfirm = document.createElement("button");
                      nameConfirm.textContent = "Continuer";
                      nameConfirm.disabled = true;
                      nameConfirm.style.cssText = "padding:12px 36px;background:rgba(168,132,42,.06);border:1px solid rgba(168,132,42,.3);border-radius:24px;color:var(--gold-light);font-family:var(--font-heading,Poppins,sans-serif);font-size:12px;letter-spacing:1px;cursor:pointer;transition:all .2s";
                      nameInput.addEventListener("input", function(){
                        nameConfirm.disabled = nameInput.value.trim().length < 2;
                        nameConfirm.style.opacity = nameConfirm.disabled ? "0.4" : "1";
                      });
                      nameConfirm.onclick = function(ev){
                        ev.stopPropagation();
                        if(nameInput.value.trim().length < 2) return;

                        // Save quotidien + name
                        var u = loadUser();
                        u.name = nameInput.value.trim();
                        u.className = window._chosenQuotidien ? window._chosenQuotidien.name : "";
                        // Apply quotidien stats
                        if(window._chosenQuotidien && window._chosenQuotidien.variants && window._chosenQuotidien.variants[0]){
                          var stats = window._chosenQuotidien.variants[0];
                          u.statCRE = stats.CRE || 50;
                          u.statSAG = stats.SAG || 50;
                          u.statCHA = stats.CHA || 50;
                          u.statFOR = stats.FOR || 50;
                          u.statAGI = stats.AGI || 50;
                          u.statPER = stats.PER || 50;
                        }
                        saveUser(u);
                        window._idName = u.name;

                        // Fade out ATOM zone → go to guide placement
                        atomZone.style.animation = "ccFadeOut .3s ease both";
                        setTimeout(function(){
                          atomZone.remove();

                          // ── GUIDE PLACEMENT ──
                          step2State = "guide";
                          if(step2Title) step2Title.textContent = "Place ton guide";
                          if(subtitle) subtitle.textContent = "Déplace le guide vers le cercle";

                          var target = document.createElement("div");
                          target.className = "sc-circle";
                          target.setAttribute("data-scenario", scenario);
                          target.style.left = "50%";
                          target.style.top = "35%";
                          arena.appendChild(target);

                          guide.style.display = "";
                          guide.style.left = "50%";
                          guide.style.top = "82%";
                          guide.classList.remove("sc-guide-awake");
                          if(guideLabel) guideLabel.textContent = "Endormi";

                          initGuideDrag(scenario);
                        }, 300);
                      };
                      nameRow.appendChild(nameConfirm);
                      atomZone.appendChild(nameRow);

                      arena.appendChild(atomZone);
                    });
                  }, 300);
                }, 400);
              };
              planetZone.appendChild(btn);
            });
            arena.appendChild(planetZone);
          });
        };
      })(s);
    });

    // Transition from step 1
    if(step1){
      step1.classList.add("fading-out");
      setTimeout(function(){
        step1.style.display = "none";
        step1.classList.remove("fading-out");
        if(step2) step2.style.display = "";
      }, 500);
    }
  }

  // Back button — context-aware navigation
  var backBtn = document.getElementById("sc-back-btn");
  function cleanupArena(){
    arena.querySelectorAll(".sc-circle").forEach(function(c){ c.remove(); });
    arena.querySelectorAll(".sc-circle-label").forEach(function(c){ c.remove(); });
    arena.querySelectorAll(".sc-contract-preview").forEach(function(c){ c.remove(); });
    arena.querySelectorAll(".sc-planet-zone").forEach(function(c){ c.remove(); });
    arena.querySelectorAll(".sc-atom-zone").forEach(function(c){ c.remove(); });
    guide.style.display = "";
    if(window._scDragCleanup) window._scDragCleanup();
  }
  function goBackToStep1(){
    cleanupArena();
    guide.style.display = "none";
    step2State = "circles";
    currentType = null;

    if(step2){
      step2.classList.add("fading-out");
      setTimeout(function(){
        step2.style.display = "none";
        step2.classList.remove("fading-out");
        if(step1) step1.style.display = "";
      }, 500);
    }
  }
  if(backBtn) backBtn.onclick = function(){
    // From circles → go back to step 1
    goBackToStep1();
  };

  if(btnConnecte) btnConnecte.onclick = function(){ goToStep2("connecte"); };
  if(btnIsole) btnIsole.onclick = function(){ goToStep2("isole"); };

  /* ── Guide drag to single circle (after contract signed) ── */
  function initGuideDrag(scenario){
    var circles = arena.querySelectorAll(".sc-circle");
    var SNAP = 55;
    var isDrag = false, offX = 0, offY = 0;
    var chosen = false;

    function gxy(e){
      if(e.clientX != null) return {x: e.clientX, y: e.clientY};
      var t = (e.touches && e.touches[0]) || (e.changedTouches && e.changedTouches[0]);
      return t ? {x: t.clientX, y: t.clientY} : {x: 0, y: 0};
    }

    function guideCenter(){
      var r = guide.getBoundingClientRect();
      return {x: r.left + r.width / 2, y: r.top + r.height / 2};
    }

    function nearestCircle(){
      var gc = guideCenter();
      var best = null, bestDist = Infinity;
      circles.forEach(function(c){
        var r = c.getBoundingClientRect();
        var cx = r.left + r.width / 2, cy = r.top + r.height / 2;
        var d = Math.hypot(gc.x - cx, gc.y - cy);
        if(d < bestDist){ bestDist = d; best = c; }
      });
      return (best && bestDist < SNAP) ? best : null;
    }

    function clearHighlights(){
      circles.forEach(function(c){ c.classList.remove("sc-circle-hover"); });
    }

    function onStart(e){
      if(chosen) return;
      e.preventDefault(); e.stopPropagation();
      isDrag = true;
      guide.classList.add("dragging");
      if(guideLabel) guideLabel.textContent = "Réveillé !";
      var p = gxy(e);
      var r = guide.getBoundingClientRect();
      offX = (r.left + r.width / 2) - p.x;
      offY = (r.top + r.height / 2) - p.y;
    }

    function onMove(e){
      if(!isDrag) return;
      e.preventDefault();
      var p = gxy(e);
      var ar = arena.getBoundingClientRect();
      var nx = p.x + offX - ar.left;
      var ny = p.y + offY - ar.top;
      guide.style.left = (nx / ar.width * 100) + "%";
      guide.style.top = (ny / ar.height * 100) + "%";

      clearHighlights();
      var hit = nearestCircle();
      if(hit) hit.classList.add("sc-circle-hover");
    }

    function cleanup(){
      guide.removeEventListener("pointerdown", onStart);
      guide.removeEventListener("touchstart", onStartTouch);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("touchmove", onMove);
      document.removeEventListener("pointerup", onEnd);
      document.removeEventListener("touchend", onEnd);
    }

    function startScenarioMusic(sc){
      var src = SC_MUSIC[sc] || SC_MUSIC["champion"];
      var extAudio = document.getElementById("extelua-music");
      var extSrc = document.getElementById("extelua-music-src");
      if(!extAudio) return;
      if(extSrc) extSrc.src = src;
      extAudio.load();
      extAudio.currentTime = 0;
      extAudio.volume = 0;
      extAudio.play().catch(function(){});
      audioFade(extAudio, 0.4, 2000);
    }

    function onEnd(){
      if(!isDrag) return;
      isDrag = false;
      guide.classList.remove("dragging");

      clearHighlights();
      var hit = nearestCircle();

      if(hit){
        chosen = true;

        // Snap guide into circle
        var ar = arena.getBoundingClientRect();
        var cr = hit.getBoundingClientRect();
        var cx = (cr.left + cr.width / 2 - ar.left) / ar.width * 100;
        var cy = (cr.top + cr.height / 2 - ar.top) / ar.height * 100;
        guide.style.left = cx + "%";
        guide.style.top = cy + "%";
        guide.classList.add("sc-guide-awake");
        hit.classList.add("sc-circle-chosen");
        if(guideLabel) guideLabel.textContent = persona ? persona.name : "Prêt";

        // Start scenario music
        startScenarioMusic(scenario);

        // Fade out ic-music if still playing
        var icAudio = document.getElementById("ic-music");
        if(icAudio && !icAudio.paused){
          audioFade(icAudio, 0, 1200, function(){ icAudio.pause(); icAudio.volume = 0.5; });
        }

        // Fade out bg-music if still playing (new game flow)
        var bgMusic = document.getElementById("bg-music");
        if(bgMusic && !bgMusic.paused){
          audioFade(bgMusic, 0, 1200, function(){ bgMusic.pause(); bgMusic.volume = 0.4; });
        }

        // Transition out after a beat
        setTimeout(function(){
          overlay.classList.add("fading-out");
          setTimeout(function(){
            overlay.style.display = "none";
            overlay.classList.remove("fading-out");
            guide.classList.remove("sc-guide-awake");
            hit.classList.remove("sc-circle-chosen");
            cleanup();
            onChosen(scenario);
          }, 800);
        }, 1200);
      } else {
        // Snap back
        if(guideLabel) guideLabel.textContent = "Endormi";
        guide.style.left = "50%";
        guide.style.top = "82%";
      }
    }

    function onStartTouch(e){ onStart(e); }

    guide.addEventListener("pointerdown", onStart, {passive: false});
    guide.addEventListener("touchstart", onStartTouch, {passive: false});
    document.addEventListener("pointermove", onMove, {passive: false});
    document.addEventListener("touchmove", onMove, {passive: false});
    document.addEventListener("pointerup", onEnd);
    document.addEventListener("touchend", onEnd);

    // Expose cleanup for back button
    window._scDragCleanup = cleanup;
  }
}

/* ══════════ LIGHTWEIGHT NARRATION (no video, no music) ══════════ */
function showNarration(paragraphs, onDone){
  var screen = document.querySelector(".screen");
  if(!screen){ onDone(); return; }

  var overlay = document.createElement("div");
  overlay.className = "intro-crawl-overlay narration-only";
  overlay.innerHTML =
    '<div class="ic-vignette"></div>' +
    '<div class="ic-text-zone"></div>' +
    '<button class="ic-next-btn">Suivant \u25BC</button>' +
    '<button class="ic-skip-btn">Passer \u203A</button>';
  screen.appendChild(overlay);

  var textZone = overlay.querySelector(".ic-text-zone");
  var nextBtn = overlay.querySelector(".ic-next-btn");
  var skipBtn = overlay.querySelector(".ic-skip-btn");
  var paraIdx = 0;
  var transitioning = false;

  function showParagraph(idx){
    if(!textZone) return;
    textZone.innerHTML = "";
    var data = paragraphs[idx];
    var p = document.createElement("div");
    p.className = "ic-paragraph" + (data.cls ? " " + data.cls : "");
    p.textContent = data.text;
    textZone.appendChild(p);
  }

  function nextParagraph(){
    if(transitioning) return;
    if(paraIdx >= paragraphs.length - 1){ endNarration(); return; }
    var currentP = textZone.querySelector(".ic-paragraph");
    if(currentP){
      transitioning = true;
      currentP.classList.add("fading-out");
      setTimeout(function(){
        paraIdx++;
        showParagraph(paraIdx);
        transitioning = false;
      }, 500);
    } else {
      paraIdx++;
      showParagraph(paraIdx);
    }
  }

  var dismissed = false;
  function endNarration(){
    if(dismissed) return;
    dismissed = true;
    overlay.classList.add("fading-out");
    setTimeout(function(){
      overlay.remove();
      onDone();
    }, 800);
  }

  nextBtn.onclick = nextParagraph;
  skipBtn.onclick = endNarration;
  if(textZone) textZone.onclick = nextParagraph;

  showParagraph(0);
}

/* Full intro sequence
   mode "new" : preIntro1 → identity → preIntro2 → scenario → ceremony (crawl)
   mode "participation" : crawl → scenario → done */
function startIntroSequence(onNewVoyage, mode){
  var isNew = (mode !== "participation");
  if(isNew){
    // 1) Short narration (no video/music, bg-music continues)
    showNarration(PRE_IDENTITY_PARAGRAPHS, function(){
      // 2) Identity (profile + name)
      showIdentityScreen(function(){
        // 3) Pre-scenario narration
        showNarration(PRE_SCENARIO_PARAGRAPHS, function(){
          // 4) Scenario choice
          showScenarioChoice(function(){
            // 5) Ceremony with video + music + paragraphs
            showIntroCrawl(function(){ onNewVoyage(); });
          });
        });
      });
    });
  } else {
    showIntroCrawl(function(){
      showScenarioChoice(function(){ onNewVoyage(); });
    });
  }
}
