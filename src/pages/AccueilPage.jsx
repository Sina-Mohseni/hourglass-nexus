import { useGame } from '../hooks/useGame';

export default function AccueilPage() {
  const { guide, user, clans, navigateTo, setClanMapOpen } = useGame();
  const playerClan = clans.find(c => c.id === user.clan);

  return (
    <>
      <div className="welcome-hero">
        <div className="logo-container">
          <img src="/assets/ealogo.png" alt="HN" />
          <div className="logo-ring" />
        </div>
        <h1 className="welcome-title">HOURGLASS <span className="accent">NEXUS</span></h1>
        <p className="welcome-subtitle">Histoires · Jeux · Épreuves</p>
      </div>

      <div className="story-card">
        <div className="story-card-title">✦ Bienvenue dans le Sanctuaire</div>
        <p>Il existe un lieu entre les mondes, un carrefour où les <span className="sa">récits</span> prennent vie et où les <span className="sc">jeux</span> deviennent des épreuves légendaires.</p>
        <p>Ce lieu, c'est le <span className="sg">Nexus</span> — forgé dans les profondeurs de Kael-Norath, gardé par les âmes anciennes.</p>
      </div>

      {/* Guide */}
      {guide && (
        <div className="accueil-guide">
          <div className="accueil-guide-header">
            <img className="ag-avatar" src={guide.avatar} alt="" />
            <div className="ag-info">
              <div className="ag-name">{guide.name}</div>
              <div className="ag-title">{guide.title}</div>
            </div>
          </div>
          <div className="ag-bio">{guide.bio}</div>
        </div>
      )}

      {/* Player clan card */}
      {playerClan && (
        <div
          className="accueil-guide"
          style={{ cursor: 'pointer', borderColor: `${playerClan.color}30` }}
          onClick={() => setClanMapOpen(true)}
        >
          <div className="accueil-guide-header">
            <div style={{ fontSize: 28, flexShrink: 0 }}>{playerClan.icon}</div>
            <div className="ag-info">
              <div className="ag-name" style={{ color: playerClan.color }}>{playerClan.name}</div>
              <div className="ag-title">Votre clan · {playerClan.element}</div>
            </div>
          </div>
          <div className="ag-bio">« {playerClan.motto} »</div>
          <div style={{ fontSize: 10, color: 'var(--gold-dark)', marginTop: 6, textAlign: 'right' }}>
            Voir la carte des clans ›
          </div>
        </div>
      )}

      {/* Quick nav */}
      <div className="section-title" style={{ padding: '8px 0' }}>Navigation rapide</div>
      <div className="nav-grid">
        <div className="nav-card" onClick={() => navigateTo('user')}>
          <span className="nav-card-icon">👤</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Mon Profil</div>
            <div className="nav-card-desc">Fiche et statistiques</div>
          </div>
        </div>
        <div className="nav-card" onClick={() => setClanMapOpen(true)}>
          <span className="nav-card-icon">⚔️</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Carte des Clans</div>
            <div className="nav-card-desc">325 adeptes · 13 clans</div>
          </div>
        </div>
        <div className="nav-card" onClick={() => navigateTo('worldmap')}>
          <span className="nav-card-icon">🌍</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Carte du Monde</div>
            <div className="nav-card-desc">Extelua</div>
          </div>
        </div>
        <div className="nav-card" onClick={() => setClanMapOpen(true)}>
          <span className="nav-card-icon">🔮</span>
          <div className="nav-card-info">
            <div className="nav-card-name">Personas</div>
            <div className="nav-card-desc">324 personnages</div>
          </div>
        </div>
      </div>
    </>
  );
}
