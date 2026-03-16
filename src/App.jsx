import { useGame } from './hooks/useGame';
import LockScreen from './components/LockScreen';
import CharCreate from './components/CharCreate';
import Header from './components/Header';
import FooterAssembly from './components/FooterAssembly';
import OrbHealth from './components/OrbHealth';
import OrbMana from './components/OrbMana';
import OrbPurple from './components/OrbPurple';
import AccueilPage from './pages/AccueilPage';
import UserPage from './pages/UserPage';
import WorldMapPage from './pages/WorldMapPage';
import ClanMap from './components/ClanMap';
import PersonaDetail from './components/PersonaDetail';
import Modal from './components/Modal';
import BgDecor from './components/BgDecor';
import { asset } from './utils/asset';

export default function App() {
  const { phase, currentPage, clanMapOpen, selectedPersona, modalContent } = useGame();

  if (phase === 'lock') return <LockScreen />;
  if (phase === 'charCreate') return <CharCreate />;

  const showApp = phase === 'app';

  return (
    <>
      <BgDecor />
      <div className="sanctuary">
        <div className="screen">
          <Header />
          <div className="content-area">
            <div className={`page ${currentPage === 'accueil' ? 'active' : ''}`}>
              <AccueilPage />
            </div>
            <div className={`page ${currentPage === 'user' ? 'active' : ''}`}>
              <UserPage />
            </div>
            <div className={`page ${currentPage === 'worldmap' ? 'active' : ''}`}>
              <WorldMapPage />
            </div>
          </div>
          <FooterAssembly />
        </div>
      </div>

      {/* Corner images */}
      <div className="accueil-corner visible">
        <img src={asset('/assets/accueil.png')} alt="" className="accueil-corner-img" />
      </div>
      <div className="bgmap-corner visible">
        <img src={asset('/assets/bgmap.png')} alt="" className="bgmap-corner-img" />
      </div>
      <div className="bgprofil-corner visible">
        <img src={asset('/assets/bgprofil.png')} alt="" className="bgprofil-frame-img" />
      </div>

      {/* Orbs */}
      <OrbHealth />
      <OrbMana />
      <OrbPurple />

      {/* Overlays */}
      {clanMapOpen && <ClanMap />}
      {selectedPersona && <PersonaDetail />}
      {modalContent && <Modal />}
    </>
  );
}
