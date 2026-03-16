import { useGame } from '../hooks/useGame';

export default function Modal() {
  const { modalContent, setModalContent } = useGame();
  if (!modalContent) return null;

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) setModalContent(null); }}>
      <div className="modal-box">
        <button className="modal-close" onClick={() => setModalContent(null)}>✕</button>
        <div className="modal-content">
          {typeof modalContent === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: modalContent }} />
          ) : modalContent}
        </div>
      </div>
    </div>
  );
}
