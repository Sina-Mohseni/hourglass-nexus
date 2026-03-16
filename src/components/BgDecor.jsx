import { useState, useEffect } from 'react';

export default function BgDecor() {
  const [isDay, setIsDay] = useState(true);

  useEffect(() => {
    function update() {
      const h = new Date().getHours();
      setIsDay(h >= 7 && h < 21);
    }
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      <div className={`bg-decor bg-decor-jour ${isDay ? 'active' : ''}`} />
      <div className={`bg-decor bg-decor-nuit ${!isDay ? 'active' : ''}`} />
    </>
  );
}
