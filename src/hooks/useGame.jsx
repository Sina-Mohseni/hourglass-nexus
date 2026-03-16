import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { storage } from '../hooks/storage';
import personasData from '../data/personas.json';

const GameContext = createContext(null);

const DEFAULT_USER = {
  name: '', avatar: '', title: 'Voyageur', level: 1, xp: 0, coins: 250,
  clan: '', cardColor: '#c9a04a',
  statCRE: 50, statSAG: 50, statCHA: 50, statFOR: 50, statAGI: 50,
  quote: 'Chaque porte ouverte est un pas vers l\'inconnu.',
  gameDay: 1, gameHour: 8
};

export function GameProvider({ children }) {
  const [phase, setPhase] = useState(() => {
    if (storage.get('charCreated') === '1') {
      return storage.get('unlocked') === '1' ? 'app' : 'lock';
    }
    return 'lock';
  });

  const [user, setUser] = useState(() => {
    const saved = storage.getJSON('user');
    return saved ? { ...DEFAULT_USER, ...saved } : { ...DEFAULT_USER };
  });

  const [currentPage, setCurrentPage] = useState('accueil');
  const [panelContent, setPanelContent] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [clanMapOpen, setClanMapOpen] = useState(false);
  const [selectedPersona, setSelectedPersona] = useState(null);

  const guide = personasData.guide;
  const clans = personasData.clans;
  const personas = personasData.personas;

  const saveUser = useCallback((updates) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      storage.setJSON('user', next);
      return next;
    });
  }, []);

  const completeCharCreation = useCallback((userData) => {
    const newUser = { ...DEFAULT_USER, ...userData };
    setUser(newUser);
    storage.setJSON('user', newUser);
    storage.set('charCreated', '1');
    setPhase('app');
  }, []);

  const resetCharacter = useCallback(() => {
    storage.clear();
    setUser({ ...DEFAULT_USER });
    setPhase('lock');
    setCurrentPage('accueil');
    setPanelContent(null);
    setPanelOpen(false);
  }, []);

  const unlock = useCallback(() => {
    storage.set('unlocked', '1');
    if (storage.get('charCreated') === '1') {
      setPhase('app');
    } else {
      setPhase('charCreate');
    }
  }, []);

  const navigateTo = useCallback((page) => {
    setCurrentPage(page);
    setPanelOpen(false);
    setPanelContent(null);
  }, []);

  const getPersonasByClan = useCallback((clanId) => {
    return personas.filter(p => p.clan === clanId);
  }, [personas]);

  const getPlayerClanPersonas = useCallback(() => {
    if (!user.clan) return [];
    return personas.filter(p => p.clan === user.clan);
  }, [personas, user.clan]);

  const value = {
    phase, setPhase, user, saveUser, completeCharCreation, resetCharacter, unlock,
    currentPage, navigateTo,
    panelContent, setPanelContent, panelOpen, setPanelOpen,
    modalContent, setModalContent,
    clanMapOpen, setClanMapOpen,
    selectedPersona, setSelectedPersona,
    guide, clans, personas, getPersonasByClan, getPlayerClanPersonas,
    CARD_COLORS: [
      { id: '#c9a04a', name: 'Or' }, { id: '#8b1a1a', name: 'Sang' },
      { id: '#2e5ea6', name: 'Mana' }, { id: '#27ae60', name: 'Poison' },
      { id: '#9b59b6', name: 'Arcane' }, { id: '#e74c3c', name: 'Feu' },
      { id: '#5dade2', name: 'Givre' }, { id: '#64748b', name: 'Acier' }
    ]
  };

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGame() {
  const ctx = useContext(GameContext);
  if (!ctx) throw new Error('useGame must be used within GameProvider');
  return ctx;
}
