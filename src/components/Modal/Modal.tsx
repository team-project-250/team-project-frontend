import React from 'react';
import './Modal.scss';

type Props = {
  children: React.ReactNode;
  onClose: () => void;
};

export const Modal: React.FC<Props> = ({ children, onClose }) => {
  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal" onClick={handleOverlayClick}>
      <div className="modal__content">
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
          aria-label="Закрити"
        >
          <span className="icon icon--close"></span>
        </button>

        {children}
      </div>
    </div>
  );
};
