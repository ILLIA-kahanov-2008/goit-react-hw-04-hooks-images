import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './Modal.module.css';
import PropTypes from 'prop-types';

export default function Modal({
  onClose,
  altImageName,
  imageURL,
  resetAppOptions,
}) {

  useEffect(() => {
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  });

  const handleEscape = e => {
    if (e.code === 'Escape') {
      onClose();
      resetAppOptions();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
      resetAppOptions();
    }
  };
  
  return createPortal(
    <div className={styles.Overlay} onClick={handleBackdropClick}>
      <div className={styles.Modal}>
        <img src={imageURL} alt={altImageName} />
      </div>
    </div>,
    document.getElementById('modalRoot'),
  );
}

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  altImageName: PropTypes.string.isRequired,
  imageURL: PropTypes.string.isRequired,
  resetAppOptions: PropTypes.func.isRequired,
};

// export default Modal;
