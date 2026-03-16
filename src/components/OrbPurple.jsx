import { useGame } from '../hooks/useGame';

export default function OrbPurple() {
  const { setClanMapOpen } = useGame();

  return (
    <div className="orb-wrap orb-purple-fixed">
      <button className="orb-btn" onClick={() => setClanMapOpen(true)} title="Carte des Clans">
        <div className="orb-glass">
          <div className="orb-liquid-container">
            <div className="liq-layer liq-base liq-purple-base" />
            <div className="liq-layer liq-wave liq-purple-wave1" />
            <div className="liq-layer liq-wave liq-purple-wave2" />
            <div className="liq-purple-caustics" />
            <div className="liq-bubbles liq-bubbles-purple">
              <span className="bubble bb1"/><span className="bubble bb2"/>
              <span className="bubble bb3"/><span className="bubble bb4"/>
              <span className="bubble bb5"/><span className="bubble bb6"/>
            </div>
          </div>
          <div className="orb-meniscus orb-meniscus-purple" />
          <div className="orb-shine" />
        </div>
        <span className="orb-label">Clans</span>
      </button>
    </div>
  );
}
