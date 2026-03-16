import { useState, useEffect } from 'react';

const JOURS = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'];
const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];

export default function Header() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    function update() {
      const n = new Date();
      setTime(
        String(n.getHours()).padStart(2, '0') + ':' +
        String(n.getMinutes()).padStart(2, '0') + ':' +
        String(n.getSeconds()).padStart(2, '0')
      );
      setDate(JOURS[n.getDay()] + ' ' + n.getDate() + ' ' + MOIS[n.getMonth()] + ' ' + n.getFullYear());
    }
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="app-header">
      <svg className="app-bar-bg" viewBox="0 0 400 50" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 H400 V50 H250 C244,50 241,47 236,40 L208,15 C204,10 196,10 192,15 L164,40 C159,47 156,50 150,50 H0 Z" fill="#0d0b08"/>
        <path d="M0,50 H150 C156,50 159,47 164,40 L192,15 C196,10 204,10 208,15 L236,40 C241,47 244,50 250,50 H400" fill="none" stroke="#8a6d2b" strokeWidth="1" strokeLinejoin="round" style={{filter:'drop-shadow(0 0 3px rgba(201,160,74,.15))'}}/>
      </svg>
      <div className="app-bar-content">
        <div className="header-left">
          <div className="header-clock">
            <div className="header-date">{date}</div>
            <div className="header-time">{time}</div>
          </div>
        </div>
        <div className="header-right" />
      </div>
    </div>
  );
}
