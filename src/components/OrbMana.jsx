import { useGame } from '../hooks/useGame';

export default function OrbMana() {
  const { navigateTo } = useGame();

  return (
    <div className="orb-wrap orb-right-fixed">
      <button className="orb-btn" onClick={() => navigateTo('worldmap')}>
        <div className="orb-glass">
          <div className="orb-liquid-container">
            <div className="liq-layer liq-base liq-blue-base" />
            <div className="liq-layer liq-wave liq-blue-wave1" />
            <div className="liq-layer liq-wave liq-blue-wave2" />
            <div className="liq-layer liq-wave liq-blue-wave3" />
            <div className="liq-blue-caustics" />
            <div className="liq-bubbles liq-bubbles-mana">
              <span className="bubble bb1"/><span className="bubble bb2"/>
              <span className="bubble bb3"/><span className="bubble bb4"/>
              <span className="bubble bb5"/><span className="bubble bb6"/>
              <span className="bubble bm1"/><span className="bubble bm2"/>
              <span className="bubble bm3"/><span className="bubble bm4"/>
              <span className="bubble bm5"/><span className="bubble bm6"/>
            </div>
          </div>
          <div className="orb-meniscus orb-meniscus-blue" />
          <div className="orb-shine" />
          <div className="orb-shine2" />
        </div>
        <span className="orb-label">Extelua</span>
      </button>
    </div>
  );
}
