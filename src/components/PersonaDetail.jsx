import { useGame } from '../hooks/useGame';

const STAT_COLORS = {
  CRE: '#9b59b6', SAG: '#5dade2', CHA: '#e8a838', FOR: '#e74c3c', AGI: '#27ae60'
};

const DIFF_COLORS = {
  'Commun': '#64748b',
  'Peu commun': '#22c55e',
  'Rare': '#3b82f6',
  'Épique': '#a855f7',
  'Légendaire': '#f59e0b'
};

export default function PersonaDetail() {
  const { selectedPersona, setSelectedPersona, clans } = useGame();
  if (!selectedPersona) return null;

  const p = selectedPersona;
  const clan = clans.find(c => c.id === p.clan);
  const initials = p.name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  const diffColor = DIFF_COLORS[p.difficulty] || '#64748b';

  return (
    <div className="persona-detail-overlay" onClick={(e) => { if (e.target === e.currentTarget) setSelectedPersona(null); }}>
      <div className="persona-detail-card">
        {/* Header */}
        <div className="pd-header">
          <div
            className="pd-avatar"
            style={{
              background: `linear-gradient(135deg, ${p.color}40, ${p.color}15)`,
              color: p.color,
              borderColor: p.color
            }}
          >
            {p.avatar ? <img src={p.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : initials}
          </div>
          <div className="pd-info">
            <div className="pd-name">{p.name}</div>
            <div className="pd-title">{p.title}</div>
            {clan && (
              <div className="pd-clan-tag" style={{ color: clan.color }}>
                <span>{clan.icon}</span> {clan.name}
              </div>
            )}
          </div>
        </div>

        {/* Difficulty & Element */}
        <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
          <span className="pd-difficulty" style={{ background: `${diffColor}20`, color: diffColor, border: `1px solid ${diffColor}30` }}>
            {p.difficulty}
          </span>
          <span className="pd-difficulty" style={{ background: `${p.color}20`, color: p.color, border: `1px solid ${p.color}30` }}>
            {p.element}
          </span>
        </div>

        {/* Bio */}
        <div className="pd-bio">« {p.bio} »</div>

        {/* Quote */}
        <div className="pd-quote">❝ {p.quote} ❞</div>

        {/* Stats */}
        <div className="section-title" style={{ padding: '0 0 6px', fontSize: 11 }}>Attributs</div>
        <div className="pd-stats">
          {Object.entries(p.stats).map(([key, val]) => (
            <div key={key} className="pd-stat-bar">
              <span className="pd-stat-label">{key}</span>
              <div className="pd-stat-track">
                <div
                  className="pd-stat-fill"
                  style={{ width: val + '%', background: `linear-gradient(90deg, ${STAT_COLORS[key]}, ${STAT_COLORS[key]}88)` }}
                />
              </div>
              <span className="pd-stat-val">{val}</span>
            </div>
          ))}
        </div>

        {/* Traits */}
        <div className="pd-traits">
          {p.traits.map((t, i) => (
            <span key={i} className="pd-trait">{t}</span>
          ))}
        </div>

        <button className="pd-close" onClick={() => setSelectedPersona(null)}>Fermer</button>
      </div>
    </div>
  );
}
