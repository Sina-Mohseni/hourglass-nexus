export default function OrbHealth() {
  return (
    <div className="orb-wrap orb-left-fixed">
      <button className="orb-btn" style={{ pointerEvents: 'auto' }}>
        <div className="orb-glass">
          <div className="orb-liquid-container">
            <div className="liq-layer liq-base liq-red-base" />
            <div className="liq-layer liq-wave liq-red-wave1" />
            <div className="liq-layer liq-wave liq-red-wave2" />
            <div className="liq-layer liq-wave liq-red-wave3" />
            <div className="liq-red-caustics" />
            <div className="liq-bubbles liq-bubbles-potion">
              <span className="bubble b1"/><span className="bubble b2"/>
              <span className="bubble b3"/><span className="bubble b4"/>
              <span className="bubble b5"/><span className="bubble b6"/>
              <span className="bubble bp1"/><span className="bubble bp2"/>
              <span className="bubble bp3"/><span className="bubble bp4"/>
              <span className="bubble bp5"/><span className="bubble bp6"/>
            </div>
          </div>
          <div className="orb-meniscus orb-meniscus-red" />
          <div className="orb-shine" />
          <div className="orb-shine2" />
        </div>
        <span className="orb-label">Vitalité</span>
      </button>
    </div>
  );
}
