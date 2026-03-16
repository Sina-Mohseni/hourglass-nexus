import { useState, useRef, useCallback, useEffect } from 'react';
import { useGame } from '../hooks/useGame';

export default function LockScreen() {
  const { guide, unlock } = useGame();
  const [guidePos, setGuidePos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [awakened, setAwakened] = useState(false);
  const [label, setLabel] = useState('Endormi');
  const containerRef = useRef(null);
  const holeRef = useRef(null);
  const guideRef = useRef(null);
  const offsetRef = useRef({ x: 0, y: 0 });
  const particles = useRef(Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 4
  })));

  useEffect(() => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setGuidePos({
      x: 60 + Math.random() * (rect.width - 120),
      y: 80 + Math.random() * (rect.height - 200)
    });
  }, []);

  const getHoleCenter = useCallback(() => {
    if (!holeRef.current || !containerRef.current) return { x: 0, y: 0 };
    const hr = holeRef.current.getBoundingClientRect();
    const cr = containerRef.current.getBoundingClientRect();
    return { x: hr.left + hr.width / 2 - cr.left, y: hr.top + hr.height / 2 - cr.top };
  }, []);

  const isAligned = useCallback((pos) => {
    const hc = getHoleCenter();
    return Math.hypot(pos.x - hc.x, pos.y - hc.y) <= 50;
  }, [getHoleCenter]);

  const handleStart = useCallback((clientX, clientY) => {
    if (awakened) return;
    const cr = containerRef.current.getBoundingClientRect();
    offsetRef.current = {
      x: guidePos.x - (clientX - cr.left),
      y: guidePos.y - (clientY - cr.top)
    };
    setDragging(true);
    setLabel('Réveillé !');
  }, [guidePos, awakened]);

  const handleMove = useCallback((clientX, clientY) => {
    if (!dragging || awakened) return;
    const cr = containerRef.current.getBoundingClientRect();
    const x = Math.max(35, Math.min(cr.width - 35, clientX - cr.left + offsetRef.current.x));
    const y = Math.max(35, Math.min(cr.height - 35, clientY - cr.top + offsetRef.current.y));
    setGuidePos({ x, y });
  }, [dragging, awakened]);

  const handleEnd = useCallback(() => {
    if (!dragging || awakened) return;
    setDragging(false);
    const pos = guidePos;
    if (isAligned(pos)) {
      setAwakened(true);
      setLabel('Éveillé');
      const hc = getHoleCenter();
      setGuidePos(hc);
      setTimeout(() => unlock(), 1200);
    } else {
      setLabel('Endormi');
    }
  }, [dragging, awakened, guidePos, isAligned, getHoleCenter, unlock]);

  useEffect(() => {
    const onMove = (e) => {
      const t = e.touches ? e.touches[0] : e;
      handleMove(t.clientX, t.clientY);
    };
    const onEnd = () => handleEnd();
    if (dragging) {
      window.addEventListener('mousemove', onMove);
      window.addEventListener('mouseup', onEnd);
      window.addEventListener('touchmove', onMove, { passive: false });
      window.addEventListener('touchend', onEnd);
    }
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onEnd);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [dragging, handleMove, handleEnd]);

  return (
    <div className="lock-screen" ref={containerRef}>
      <div className="lock-particles">
        {particles.current.map(p => (
          <div key={p.id} className="lock-particle" style={{
            left: p.left + '%', top: p.top + '%',
            animationDelay: p.delay + 's', animationDuration: p.duration + 's'
          }} />
        ))}
      </div>
      <div className="lock-content" style={{ opacity: awakened ? 0 : 1 }}>
        <h2 className="lock-title">HOURGLASS NEXUS</h2>
        <p className="lock-hint">Réveillez le guide et placez-le dans le portail</p>
      </div>
      <div className="lock-logo-fixed" style={{ opacity: awakened ? 0 : 1 }}>
        <img src="/assets/ealogo.png" alt="" className="lock-logo-img" />
      </div>
      <div className="hole" ref={holeRef}>
        <div className="hole-rune" />
      </div>
      <div
        ref={guideRef}
        className={`lock-guide-drag ${dragging ? 'dragging' : ''} ${awakened ? 'awakened' : ''}`}
        style={{ left: guidePos.x + 'px', top: guidePos.y + 'px', transform: 'translate(-50%,-50%)' }}
        onMouseDown={(e) => { e.preventDefault(); handleStart(e.clientX, e.clientY); }}
        onTouchStart={(e) => { e.preventDefault(); const t = e.touches[0]; handleStart(t.clientX, t.clientY); }}
      >
        <img src={guide.avatar} alt="" className="lock-guide-img" />
        <span className="lock-guide-label">{label}</span>
      </div>
    </div>
  );
}
