import { useState, useRef } from 'react';
import { useGame } from '../hooks/useGame';
import { asset } from '../utils/asset';

const STAT_COLORS = { CRE: '#9b59b6', SAG: '#5dade2', CHA: '#e8a838', FOR: '#e74c3c', AGI: '#27ae60' };

export default function UserPage() {
  const { user, saveUser, clans, guide, resetCharacter, CARD_COLORS, setModalContent, setClanMapOpen } = useGame();
  const [editName, setEditName] = useState(user.name);
  const [editTitle, setEditTitle] = useState(user.title);
  const [editQuote, setEditQuote] = useState(user.quote);
  const [editColor, setEditColor] = useState(user.cardColor);
  const [saved, setSaved] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const fileRef = useRef(null);

  const playerClan = clans.find(c => c.id === user.clan);
  const col = editColor || user.cardColor;

  function handleSave() {
    saveUser({ name: editName, title: editTitle, quote: editQuote, cardColor: editColor });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  function handleAvatarChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => saveUser({ avatar: ev.target.result });
    reader.readAsDataURL(file);
  }

  function doReset() {
    setShowConfirm(false);
    resetCharacter();
  }

  const stats = [
    { key: 'CRE', val: user.statCRE }, { key: 'SAG', val: user.statSAG },
    { key: 'CHA', val: user.statCHA }, { key: 'FOR', val: user.statFOR },
    { key: 'AGI', val: user.statAGI }
  ];

  return (
    <>
      {/* Guide banner */}
      {guide && (
        <div className="accueil-guide" style={{ margin: '0 0 8px' }}>
          <div className="accueil-guide-header">
            <img className="ag-avatar" src={asset(guide.avatar)} alt="" />
            <div className="ag-info">
              <div className="ag-name">{guide.name}</div>
              <div className="ag-title">{guide.title}</div>
            </div>
          </div>
        </div>
      )}

      {/* Profile header */}
      <div className="user-profile-header" style={{ borderColor: `${col}20` }}>
        <div
          className="uph-portrait"
          style={{ borderColor: col, cursor: 'pointer' }}
          onClick={() => fileRef.current?.click()}
        >
          {user.avatar ? <img src={user.avatar} alt="" /> : <div className="uph-empty">👤</div>}
        </div>
        <input ref={fileRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAvatarChange} />
        <div className="uph-name" style={{ color: col }}>{user.name || 'Voyageur'}</div>
        <div className="uph-title">Niv. {user.level} · {user.title}</div>
        {playerClan && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4, marginTop: 4 }}>
            <span>{playerClan.icon}</span>
            <span style={{ fontSize: 11, color: playerClan.color, fontWeight: 600 }}>{playerClan.name}</span>
          </div>
        )}
      </div>

      {/* Quote */}
      {user.quote && (
        <div style={{
          textAlign: 'center', fontSize: 11, color: 'var(--gold-dark)', fontStyle: 'italic',
          padding: '6px 0 10px', borderBottom: '1px solid rgba(201,160,74,.1)', marginBottom: 10
        }}>
          « {user.quote} »
        </div>
      )}

      {/* Stats grid */}
      <div className="prof-stats-grid">
        <div className="prof-stat-cell">
          <div className="prof-stat-val">Niv. {user.level}</div>
          <div className="prof-stat-lbl">Niveau</div>
        </div>
        <div className="prof-stat-cell">
          <div className="prof-stat-val">🪙 {user.coins}</div>
          <div className="prof-stat-lbl">Sablons</div>
        </div>
        <div className="prof-stat-cell">
          <div className="prof-stat-val">Jour {user.gameDay}</div>
          <div className="prof-stat-lbl">Cycle</div>
        </div>
      </div>

      {/* Attributes */}
      <div className="section-title" style={{ padding: '6px 0 4px' }}>Attributs</div>
      {stats.map(s => (
        <div key={s.key} className="dr-stat-bar">
          <span className="dr-stat-label">{s.key}</span>
          <div className="dr-stat-track">
            <div className="dr-stat-fill" style={{ width: s.val + '%', background: `linear-gradient(90deg, ${STAT_COLORS[s.key]}, ${STAT_COLORS[s.key]}88)` }} />
          </div>
          <span className="dr-stat-val">{s.val}</span>
        </div>
      ))}

      {/* Edit form */}
      <div className="section-title" style={{ padding: '12px 0 6px' }}>Modifier le profil</div>
      <div style={{ display: 'grid', gap: 8 }}>
        <div>
          <label style={{ fontSize: 10, color: 'var(--bone-dim)', display: 'block', marginBottom: 3 }}>Nom</label>
          <input
            type="text" value={editName} onChange={(e) => setEditName(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', background: 'rgba(42,35,24,.8)', border: '1px solid rgba(201,160,74,.2)', borderRadius: 6, color: 'var(--bone)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 10, color: 'var(--bone-dim)', display: 'block', marginBottom: 3 }}>Titre</label>
          <input
            type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', background: 'rgba(42,35,24,.8)', border: '1px solid rgba(201,160,74,.2)', borderRadius: 6, color: 'var(--bone)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 10, color: 'var(--bone-dim)', display: 'block', marginBottom: 3 }}>Citation</label>
          <input
            type="text" value={editQuote} onChange={(e) => setEditQuote(e.target.value)}
            style={{ width: '100%', padding: '8px 12px', background: 'rgba(42,35,24,.8)', border: '1px solid rgba(201,160,74,.2)', borderRadius: 6, color: 'var(--bone)', fontFamily: 'var(--font-body)', fontSize: 13, outline: 'none' }}
          />
        </div>
        <div>
          <label style={{ fontSize: 10, color: 'var(--bone-dim)', display: 'block', marginBottom: 3 }}>Couleur de carte</label>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            {CARD_COLORS.map(c => (
              <div
                key={c.id}
                onClick={() => setEditColor(c.id)}
                style={{
                  width: 28, height: 28, borderRadius: 6, background: c.id, cursor: 'pointer',
                  border: editColor === c.id ? '2px solid var(--bone)' : '2px solid transparent',
                  boxShadow: editColor === c.id ? `0 0 8px ${c.id}60` : 'none'
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>
      </div>
      <button
        onClick={handleSave}
        style={{
          width: '100%', padding: 10, marginTop: 10,
          background: 'linear-gradient(145deg, var(--gold-dark), var(--gold))',
          border: 'none', borderRadius: 8, color: 'var(--shadow)',
          fontFamily: 'var(--font-heading)', fontSize: 12, fontWeight: 700,
          cursor: 'pointer', letterSpacing: 1
        }}
      >
        {saved ? '✔ Sauvegardé !' : '✔ Sauvegarder'}
      </button>

      {/* Quick nav */}
      <div className="nav-grid" style={{ marginTop: 16 }}>
        <div className="nav-card" onClick={() => setClanMapOpen(true)}>
          <span className="nav-card-icon">⚔️</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Mon Clan</div>
            <div className="nav-card-desc">{playerClan?.name || 'Aucun'}</div>
          </div>
        </div>
        <div className="nav-card" onClick={() => setClanMapOpen(true)}>
          <span className="nav-card-icon">👥</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Tous les Personas</div>
            <div className="nav-card-desc">324 adeptes</div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={() => setShowConfirm(true)}
        style={{
          width: '100%', padding: 10, marginTop: 20,
          background: 'transparent', border: '1px solid rgba(139,26,26,.3)',
          borderRadius: 8, color: 'var(--blood-bright)',
          fontFamily: 'var(--font-ui)', fontSize: 11, cursor: 'pointer'
        }}
      >
        ⚠ Réinitialiser le personnage
      </button>

      {/* Confirm reset */}
      {showConfirm && (
        <div className="confirm-overlay" style={{ display: 'flex' }}>
          <div className="confirm-box">
            <p className="confirm-text">Êtes-vous sûr ? Toute progression sera perdue.</p>
            <div className="confirm-actions">
              <button className="confirm-btn confirm-yes" onClick={doReset}>Confirmer</button>
              <button className="confirm-btn confirm-no" onClick={() => setShowConfirm(false)}>Annuler</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
