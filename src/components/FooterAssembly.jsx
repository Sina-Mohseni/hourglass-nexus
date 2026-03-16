import { useState, useRef, useCallback, useEffect } from 'react';
import { useGame } from '../hooks/useGame';

const NAV_ITEMS = [
  { id: 'accueil', icon: '🏠', label: 'Accueil' },
  { id: 'user', icon: '👤', label: 'Profil' },
  { id: 'worldmap', icon: '🌍', label: 'Carte' },
];

export default function FooterAssembly() {
  const { currentPage, navigateTo, user, panelOpen, setPanelOpen, panelContent, setPanelContent } = useGame();
  const [panelHeight, setPanelHeight] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const [snapping, setSnapping] = useState(false);
  const assemblyRef = useRef(null);
  const maxPanel = typeof window !== 'undefined' ? window.innerHeight * 0.6 : 400;

  const openPanel = useCallback(() => {
    setPanelOpen(true);
    setPanelHeight(maxPanel);
    setSnapping(true);
    setTranslateY(0);
    setTimeout(() => setSnapping(false), 450);
  }, [maxPanel, setPanelOpen]);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
    setPanelHeight(0);
    setTranslateY(0);
    setPanelContent(null);
  }, [setPanelOpen, setPanelContent]);

  // Diamond drag to open/close panel
  const dragRef = useRef({ startY: 0, startTranslateY: 0, active: false });

  const onDiamondDown = useCallback((clientY) => {
    dragRef.current = { startY: clientY, startTranslateY: translateY, active: true };
  }, [translateY]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragRef.current.active) return;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;
      const delta = clientY - dragRef.current.startY;
      const newT = Math.min(0, Math.max(-maxPanel, dragRef.current.startTranslateY + delta));
      setTranslateY(newT);
    };
    const onUp = () => {
      if (!dragRef.current.active) return;
      dragRef.current.active = false;
      // Snap: if dragged more than 30% of maxPanel, open
      if (Math.abs(translateY) > maxPanel * 0.3) {
        openPanel();
      } else {
        closePanel();
      }
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [translateY, maxPanel, openPanel, closePanel]);

  const handleDiamondClick = () => {
    if (panelOpen) closePanel();
    else openPanel();
  };

  const effectiveTranslateY = panelOpen ? -panelHeight : translateY;

  return (
    <div
      ref={assemblyRef}
      className={`footer-assembly ${snapping ? 'snapping' : ''}`}
      style={{ transform: `translateY(${effectiveTranslateY}px)` }}
    >
      {/* Diamond */}
      <div
        className="footer-diamond"
        onClick={handleDiamondClick}
        onMouseDown={(e) => { e.preventDefault(); onDiamondDown(e.clientY); }}
        onTouchStart={(e) => { onDiamondDown(e.touches[0].clientY); }}
      >
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="dg1" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2a1f14"/>
              <stop offset="40%" stopColor="#1a1210"/>
              <stop offset="70%" stopColor="#0d0908"/>
              <stop offset="100%" stopColor="#1a1210"/>
            </linearGradient>
            <linearGradient id="dg-hl" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="rgba(232,201,106,.5)"/>
              <stop offset="100%" stopColor="rgba(90,74,46,0)"/>
            </linearGradient>
            <linearGradient id="dg-sh" x1="1" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor="rgba(0,0,0,.5)"/>
              <stop offset="100%" stopColor="rgba(90,74,46,0)"/>
            </linearGradient>
          </defs>
          <path d="M50,7 C55,7 58,10 88,44 C92,48 92,52 88,56 L58,88 C55,92 52,93 50,93 C48,93 45,92 42,88 L12,56 C8,52 8,48 12,44 L42,12 C45,8 48,7 50,7 Z" fill="none" stroke="#1a1008" strokeWidth="5"/>
          <path d="M50,7 C55,7 58,10 88,44 C92,48 92,52 88,56 L58,88 C55,92 52,93 50,93 C48,93 45,92 42,88 L12,56 C8,52 8,48 12,44 L42,12 C45,8 48,7 50,7 Z" fill="url(#dg1)" stroke="#8a6d2b" strokeWidth="2.5"/>
          <path d="M50,7 C55,7 58,10 88,44 C92,48 92,50 90,50" fill="none" stroke="url(#dg-hl)" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M88,56 L58,88 C55,92 52,93 50,93 C48,93 45,92 42,88 L12,56" fill="none" stroke="url(#dg-sh)" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
        <div className="diamond-img-overlay">
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <div className="diamond-emoji">⟐</div>
          )}
        </div>
      </div>

      {/* Footer bar */}
      <div className="app-footer">
        <svg className="app-bar-bg" viewBox="0 0 400 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,0 H150 C156,0 159,3 164,10 L192,35 C196,40 204,40 208,35 L236,10 C241,3 244,0 250,0 H400 V50 H0 Z" fill="#0d0b08"/>
          <path d="M0,0 H150 C156,0 159,3 164,10 L192,35 C196,40 204,40 208,35 L236,10 C241,3 244,0 250,0 H400" fill="none" stroke="#8a6d2b" strokeWidth="1" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 3px rgba(201,160,74,.15))'}}/>
        </svg>
        <div className="app-bar-content" style={{ alignItems: 'flex-end', paddingBottom: 6 }}>
          <div className="footer-left">
            <span className="footer-title">NEXUS</span>
          </div>
          <div className="footer-right">
            {NAV_ITEMS.map(item => (
              <button
                key={item.id}
                onClick={() => navigateTo(item.id)}
                style={{
                  background: currentPage === item.id
                    ? 'linear-gradient(145deg, var(--blood), var(--blood-bright))'
                    : 'linear-gradient(145deg, var(--stone), var(--dark-stone))',
                  border: currentPage === item.id ? '1px solid var(--gold)' : 'var(--border-gold)',
                  borderRadius: 'var(--radius)',
                  width: 36, height: 36,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', fontSize: 16, transition: 'all .25s',
                  boxShadow: currentPage === item.id ? '0 0 16px rgba(139,26,26,.5), var(--shadow-glow-gold)' : 'none'
                }}
                title={item.label}
              >
                {item.icon}
              </button>
            ))}
            <span className="footer-level">Niv. {user.level}</span>
          </div>
        </div>
      </div>

      {/* Panel */}
      <div className="footer-panel" style={{ height: panelOpen ? panelHeight : Math.abs(translateY) }}>
        <div className="footer-panel-inner">
          {panelOpen && (
            <button className="fp-close-btn" onClick={closePanel}>✕</button>
          )}
          {panelContent || (
            <div style={{ textAlign: 'center', color: 'var(--bone-dim)', padding: '30px 0', fontFamily: 'var(--font-ui)', fontSize: 12 }}>
              Glissez le losange vers le haut pour ouvrir le panneau
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
