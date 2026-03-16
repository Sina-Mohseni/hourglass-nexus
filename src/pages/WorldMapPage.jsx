import { useGame } from '../hooks/useGame';

export default function WorldMapPage() {
  const { clans, user, setClanMapOpen } = useGame();
  const playerClan = clans.find(c => c.id === user.clan);

  // Place clans on a virtual map layout
  const clanPositions = [
    { x: 20, y: 15 }, { x: 50, y: 10 }, { x: 80, y: 15 },
    { x: 10, y: 35 }, { x: 40, y: 30 }, { x: 65, y: 30 }, { x: 90, y: 35 },
    { x: 15, y: 55 }, { x: 45, y: 50 }, { x: 75, y: 55 },
    { x: 25, y: 75 }, { x: 55, y: 72 }, { x: 80, y: 75 }
  ];

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Title */}
      <div style={{ textAlign: 'center', padding: '8px 0' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 14, color: 'var(--gold-light)', letterSpacing: 2 }}>
          🌍 EXTELUA
        </div>
        <div style={{ fontSize: 10, color: 'var(--bone-dim)', marginTop: 2 }}>
          Carte du monde — Territoires des clans
        </div>
      </div>

      {/* Map */}
      <div style={{
        flex: 1, position: 'relative', margin: '8px',
        background: 'linear-gradient(145deg, rgba(26,22,16,.8), rgba(13,11,8,.9))',
        border: '1px solid rgba(201,160,74,.15)',
        borderRadius: 12, overflow: 'hidden',
        backgroundImage: 'url(/assets/worldmap.png)',
        backgroundSize: 'cover', backgroundPosition: 'center'
      }}>
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, rgba(10,8,6,.5) 0%, rgba(10,8,6,.85) 100%)'
        }} />

        {/* Clan dots */}
        {clans.map((clan, i) => {
          const pos = clanPositions[i] || { x: 50, y: 50 };
          const isPlayerClan = clan.id === user.clan;
          return (
            <div
              key={clan.id}
              onClick={() => setClanMapOpen(true)}
              style={{
                position: 'absolute',
                left: pos.x + '%', top: pos.y + '%',
                transform: 'translate(-50%,-50%)',
                cursor: 'pointer',
                zIndex: isPlayerClan ? 10 : 5,
                textAlign: 'center',
                transition: 'transform .2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.15)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'}
            >
              {/* Glow for player clan */}
              {isPlayerClan && (
                <div style={{
                  position: 'absolute', inset: -12, borderRadius: '50%',
                  background: `radial-gradient(circle, ${clan.color}30, transparent 70%)`,
                  animation: 'shineBreath 3s ease-in-out infinite'
                }} />
              )}
              <div style={{
                width: isPlayerClan ? 42 : 34, height: isPlayerClan ? 42 : 34,
                borderRadius: '50%',
                background: `radial-gradient(circle at 40% 35%, ${clan.color}60, ${clan.color}20)`,
                border: `2px solid ${clan.color}${isPlayerClan ? '' : '80'}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isPlayerClan ? 18 : 14,
                boxShadow: isPlayerClan
                  ? `0 0 16px ${clan.color}60, 0 0 30px ${clan.color}20`
                  : `0 0 8px ${clan.color}30`,
                position: 'relative'
              }}>
                {clan.icon}
              </div>
              <div style={{
                fontSize: isPlayerClan ? 9 : 8,
                color: isPlayerClan ? clan.color : 'var(--bone-dim)',
                marginTop: 3,
                fontFamily: 'var(--font-ui)',
                letterSpacing: .5,
                textShadow: '0 1px 4px rgba(0,0,0,.9)',
                whiteSpace: 'nowrap',
                fontWeight: isPlayerClan ? 600 : 400
              }}>
                {clan.name.replace('La ', '').replace('Le ', '').replace("L'", '')}
                {isPlayerClan && ' ★'}
              </div>
            </div>
          );
        })}

        {/* Player indicator */}
        {playerClan && (
          <div style={{
            position: 'absolute', bottom: 12, left: '50%', transform: 'translateX(-50%)',
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'rgba(13,11,8,.85)', padding: '6px 12px',
            border: `1px solid ${playerClan.color}30`, borderRadius: 20
          }}>
            <div style={{
              width: 24, height: 24, borderRadius: '50%', overflow: 'hidden',
              border: `1px solid ${playerClan.color}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 12
            }}>
              {user.avatar ? <img src={user.avatar} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '👤'}
            </div>
            <span style={{ fontSize: 10, color: 'var(--bone)', fontFamily: 'var(--font-ui)' }}>
              {user.name} · {playerClan.icon} {playerClan.name}
            </span>
          </div>
        )}
      </div>

      {/* Info bar */}
      <div style={{
        display: 'flex', gap: 8, padding: '8px 12px', justifyContent: 'center', flexWrap: 'wrap'
      }}>
        <div style={{
          fontSize: 10, color: 'var(--bone-dim)', fontFamily: 'var(--font-ui)',
          background: 'rgba(42,35,24,.6)', padding: '4px 10px', borderRadius: 10,
          border: '1px solid rgba(255,255,255,.05)'
        }}>
          {clans.length} clans · 325 adeptes
        </div>
        <div
          onClick={() => setClanMapOpen(true)}
          style={{
            fontSize: 10, color: 'var(--purple-bright)', fontFamily: 'var(--font-ui)',
            background: 'rgba(139,92,246,.1)', padding: '4px 10px', borderRadius: 10,
            border: '1px solid rgba(139,92,246,.2)', cursor: 'pointer'
          }}
        >
          🔮 Ouvrir la carte des clans
        </div>
      </div>
    </div>
  );
}
