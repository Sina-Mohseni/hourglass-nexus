import { useState, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { asset } from '../utils/asset';

const INTRO = [
  "Bienvenue, voyageur. Je suis <span class='hl'>A.T.O.M.</span>, l'Architecte Temporel des Origines Mécaniques.",
  "Tu te trouves aux portes du <span class='hl'>Nexus</span> — un carrefour entre les mondes, forgé dans les abysses de <span class='hlr'>Kael-Norath</span>.",
  "Ici, les <span class='hlr'>récits</span> prennent forme et les <span class='hlc'>jeux</span> deviennent des épreuves légendaires."
];
const CREATION = [
  "Très bien. Un nouveau chemin s'ouvre devant toi…",
  "Mais avant d'aller plus loin, j'ai besoin de savoir <span class='hl'>qui</span> tu es.",
  "Choisis un <span class='hl'>portrait</span> qui te représente — ou reste dans l'ombre."
];
const NAME_DIALOG = "Bien. Maintenant, dis-moi… quel <span class='hl'>nom</span> portes-tu ?";
const CLAN_DIALOG = "Chaque voyageur appartient à un <span class='hl'>clan</span>. Lequel rejoindras-tu ?";
const FAREWELL_TPL = "Bienvenue dans le Nexus, <span class='hl'>%NAME%</span> du <span class='hlc'>%CLAN%</span>. Ton voyage commence <span class='hl'>maintenant</span>.";

export default function CharCreate() {
  const { guide, clans, completeCharCreation } = useGame();
  const [phase, setPhase] = useState('intro'); // intro|choice|creation|avatar|name|clan|farewell
  const [dialogIdx, setDialogIdx] = useState(0);
  const [dialogText, setDialogText] = useState(INTRO[0]);
  const [showTapHint, setShowTapHint] = useState(true);
  const [avatarData, setAvatarData] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedClan, setSelectedClan] = useState('');
  const fileRef = useRef(null);

  function showDialog(html) { setDialogText(html); }

  function advance() {
    if (phase === 'intro') {
      const next = dialogIdx + 1;
      if (next < INTRO.length) {
        setDialogIdx(next);
        showDialog(INTRO[next]);
      } else {
        setPhase('choice');
        showDialog("Que souhaites-tu faire ?");
        setShowTapHint(false);
      }
    } else if (phase === 'creation') {
      const next = dialogIdx + 1;
      if (next < CREATION.length) {
        setDialogIdx(next);
        showDialog(CREATION[next]);
      } else {
        setPhase('avatar');
        showDialog("Choisis un <span class='hl'>portrait</span> ou passe cette étape.");
        setShowTapHint(false);
      }
    }
  }

  function startNew() {
    setPhase('creation');
    setDialogIdx(0);
    showDialog(CREATION[0]);
    setShowTapHint(true);
  }

  function handleFileChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setAvatarData(ev.target.result);
    };
    reader.readAsDataURL(file);
  }

  function confirmAvatar() {
    setPhase('name');
    showDialog(NAME_DIALOG);
    setShowTapHint(false);
  }

  function skipAvatar() {
    setAvatarData('');
    setPhase('name');
    showDialog(NAME_DIALOG);
    setShowTapHint(false);
  }

  function confirmName() {
    if (!playerName.trim()) return;
    setPhase('clan');
    showDialog(CLAN_DIALOG);
  }

  function confirmClan() {
    if (!selectedClan) return;
    const clan = clans.find(c => c.id === selectedClan);
    const text = FAREWELL_TPL
      .replace('%NAME%', playerName.trim())
      .replace('%CLAN%', clan?.name || selectedClan);
    setPhase('farewell');
    showDialog(text);
    setShowTapHint(true);
  }

  function finishCreation() {
    completeCharCreation({
      name: playerName.trim(),
      avatar: avatarData,
      clan: selectedClan
    });
  }

  function handleZoneClick(e) {
    if (e.target.closest('input, button, .cc-avatar-ring, .cc-clan-card')) return;
    if (phase === 'intro' || phase === 'creation') advance();
    if (phase === 'farewell') finishCreation();
  }

  return (
    <div className="charcreate-screen">
      <div className="cc-bg" />
      <div className="cc-vignette" />
      <div className="cc-guide-portrait">
        {guide.avatar && <img src={asset(guide.avatar)} alt="" />}
      </div>
      <div className="cc-guide-title">{guide.name}</div>

      <div className="cc-dialog-zone" onClick={handleZoneClick}>
        <div className="cc-dialog-frame">
          <div className="cc-dialog-text" dangerouslySetInnerHTML={{ __html: dialogText }} />
        </div>

        {showTapHint && phase !== 'choice' && (
          <div className="cc-tap-hint">
            <span className="cc-tap-arrow">▼</span> Touche pour continuer
          </div>
        )}

        {/* Choice: New / Resume */}
        {phase === 'choice' && (
          <div className="cc-choice-zone">
            <button className="cc-choice-btn" onClick={startNew}>
              <span className="cc-choice-icon">✦</span>
              <span>Nouveau Voyage</span>
            </button>
            <button className="cc-choice-btn" disabled>
              <span className="cc-choice-icon">↻</span>
              <span>Reprendre le Voyage</span>
            </button>
          </div>
        )}

        {/* Avatar */}
        {phase === 'avatar' && (
          <div className="cc-avatar-zone">
            <div className="cc-avatar-ring" onClick={() => fileRef.current?.click()}>
              <div className="cc-avatar-preview">
                {avatarData ? <img src={avatarData} alt="" /> : <span className="cc-avatar-plus">＋</span>}
              </div>
            </div>
            <div className="cc-avatar-label">Choisir un portrait</div>
            <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleFileChange} />
            <div style={{ display: 'flex', gap: 10 }}>
              {avatarData && (
                <button className="cc-confirm-btn" onClick={confirmAvatar}>Valider</button>
              )}
              <button className="cc-skip-btn" onClick={skipAvatar}>Passer</button>
            </div>
          </div>
        )}

        {/* Name */}
        {phase === 'name' && (
          <div className="cc-name-zone">
            <input
              type="text"
              className="cc-name-input"
              placeholder="Ton nom de voyageur…"
              maxLength={24}
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              autoFocus
            />
            <button
              className="cc-confirm-btn"
              disabled={!playerName.trim()}
              onClick={confirmName}
            >
              Valider
            </button>
          </div>
        )}

        {/* Clan selection */}
        {phase === 'clan' && (
          <>
            <div className="cc-clan-zone">
              {clans.map(clan => (
                <div
                  key={clan.id}
                  className={`cc-clan-card ${selectedClan === clan.id ? 'selected' : ''}`}
                  onClick={() => setSelectedClan(clan.id)}
                  style={selectedClan === clan.id ? { borderColor: clan.color, boxShadow: `0 0 12px ${clan.color}40` } : {}}
                >
                  <span className="cc-clan-icon">{clan.icon}</span>
                  <div className="cc-clan-info">
                    <div className="cc-clan-name" style={selectedClan === clan.id ? { color: clan.color } : {}}>{clan.name}</div>
                    <div className="cc-clan-element">{clan.element}</div>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="cc-confirm-btn"
              style={{ marginTop: 12, width: '100%' }}
              disabled={!selectedClan}
              onClick={confirmClan}
            >
              Rejoindre ce clan
            </button>
          </>
        )}
      </div>

      <img src={asset('/assets/ealogo.png')} alt="" className="cc-watermark" />
    </div>
  );
}
