import { useState, useMemo } from 'react';
import { useGame } from '../hooks/useGame';

export default function ClanMap() {
  const { clans, personas, user, setClanMapOpen, setSelectedPersona } = useGame();
  const [openClans, setOpenClans] = useState(() => {
    // Player's clan open by default
    const set = new Set();
    if (user.clan) set.add(user.clan);
    return set;
  });
  const [search, setSearch] = useState('');

  const toggleClan = (clanId) => {
    setOpenClans(prev => {
      const next = new Set(prev);
      if (next.has(clanId)) next.delete(clanId);
      else next.add(clanId);
      return next;
    });
  };

  const filteredPersonas = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return personas.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.role.toLowerCase().includes(q) ||
      p.element.toLowerCase().includes(q)
    );
  }, [search, personas]);

  // Sort clans: player's clan first
  const sortedClans = useMemo(() => {
    return [...clans].sort((a, b) => {
      if (a.id === user.clan) return -1;
      if (b.id === user.clan) return 1;
      return 0;
    });
  }, [clans, user.clan]);

  const getInitials = (name) => {
    const parts = name.split(' ');
    return parts.map(p => p[0]).join('').substring(0, 2).toUpperCase();
  };

  const renderPersonaCard = (persona) => {
    const isPlayer = false; // personas don't include player
    return (
      <div
        key={persona.id}
        className={`persona-mini-card ${isPlayer ? 'is-player' : ''}`}
        onClick={() => setSelectedPersona(persona)}
      >
        <div
          className="persona-mini-avatar"
          style={{ background: `linear-gradient(135deg, ${persona.color}40, ${persona.color}15)`, color: persona.color }}
        >
          {getInitials(persona.name)}
        </div>
        <div className="persona-mini-info">
          <div className="persona-mini-name">{persona.name}</div>
          <div className="persona-mini-role">{persona.role}</div>
        </div>
      </div>
    );
  };

  return (
    <div className="clan-map-overlay">
      <div className="clan-map-header">
        <div className="clan-map-title">⚔ CARTE DES CLANS</div>
        <button className="clan-map-close" onClick={() => setClanMapOpen(false)}>✕</button>
      </div>

      {/* Search */}
      <div style={{ padding: '8px 12px' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Rechercher un persona..."
          style={{
            width: '100%', padding: '8px 12px',
            background: 'rgba(42,35,24,.8)',
            border: '1px solid rgba(201,160,74,.2)',
            borderRadius: 8, color: 'var(--bone)',
            fontFamily: 'var(--font-body)', fontSize: 12,
            outline: 'none'
          }}
        />
      </div>

      <div className="clan-map-body">
        {/* Search results */}
        {filteredPersonas && (
          <div style={{ marginBottom: 16 }}>
            <div className="section-title" style={{ padding: '0 0 8px' }}>
              {filteredPersonas.length} résultat{filteredPersonas.length !== 1 ? 's' : ''}
            </div>
            <div className="clan-members">
              {filteredPersonas.slice(0, 50).map(renderPersonaCard)}
            </div>
          </div>
        )}

        {/* Player card */}
        {!filteredPersonas && user.name && (
          <div style={{ marginBottom: 12 }}>
            <div className="persona-mini-card is-player" style={{ borderColor: 'var(--gold)', padding: 12 }}>
              <div className="persona-mini-avatar" style={{
                background: user.avatar ? 'transparent' : `linear-gradient(135deg, ${user.cardColor}40, ${user.cardColor}15)`,
                color: user.cardColor, width: 40, height: 40, fontSize: 16, overflow: 'hidden',
                border: `2px solid ${user.cardColor}`
              }}>
                {user.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : getInitials(user.name)}
              </div>
              <div className="persona-mini-info">
                <div className="persona-mini-name" style={{ fontSize: 12, color: 'var(--gold-light)' }}>
                  {user.name} <span style={{ fontSize: 9, color: 'var(--gold-dark)' }}>— VOUS</span>
                </div>
                <div className="persona-mini-role">
                  {user.title} · {clans.find(c => c.id === user.clan)?.name || 'Sans clan'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Clan sections */}
        {!filteredPersonas && sortedClans.map(clan => {
          const members = personas.filter(p => p.clan === clan.id);
          const isOpen = openClans.has(clan.id);
          const isPlayerClan = clan.id === user.clan;

          return (
            <div key={clan.id} className="clan-section">
              <div
                className={`clan-section-header ${isOpen ? 'open' : ''} ${isPlayerClan ? 'player-clan' : ''}`}
                onClick={() => toggleClan(clan.id)}
                style={isPlayerClan ? { borderColor: `${clan.color}50` } : {}}
              >
                <span className="clan-section-icon">{clan.icon}</span>
                <div className="clan-section-info">
                  <div className="clan-section-name" style={{ color: clan.color }}>
                    {clan.name}
                    {isPlayerClan && <span style={{ fontSize: 9, color: 'var(--gold-light)', marginLeft: 6 }}>★ Votre clan</span>}
                  </div>
                  <div className="clan-section-desc">{clan.desc}</div>
                  <div className="clan-section-motto">« {clan.motto} »</div>
                </div>
                <div className="clan-section-count">
                  <span>{members.length + (isPlayerClan ? 1 : 0)}</span>
                  <span className="clan-section-arrow">›</span>
                </div>
              </div>
              {isOpen && (
                <div className="clan-members">
                  {/* Show player in their clan */}
                  {isPlayerClan && user.name && (
                    <div className="persona-mini-card is-player">
                      <div className="persona-mini-avatar" style={{
                        background: user.avatar ? 'transparent' : `linear-gradient(135deg, ${clan.color}40, ${clan.color}15)`,
                        color: clan.color, overflow: 'hidden',
                        border: `1px solid ${clan.color}`
                      }}>
                        {user.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /> : getInitials(user.name)}
                      </div>
                      <div className="persona-mini-info">
                        <div className="persona-mini-name" style={{ color: 'var(--gold-light)' }}>{user.name}</div>
                        <div className="persona-mini-role">{user.title} · Vous</div>
                      </div>
                    </div>
                  )}
                  {members.map(renderPersonaCard)}
                </div>
              )}
            </div>
          );
        })}

        {/* Summary */}
        {!filteredPersonas && (
          <div style={{
            textAlign: 'center', padding: '16px 0 60px',
            fontFamily: 'var(--font-ui)', fontSize: 10,
            color: 'var(--bone-dim)', letterSpacing: 1
          }}>
            {clans.length} clans · {personas.length + 1} adeptes
          </div>
        )}
      </div>
    </div>
  );
}
