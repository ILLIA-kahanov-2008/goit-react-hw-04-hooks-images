import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

function ImageGalleryItem({ imgSrc, tags, modalImageURL, handleImageClick }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={imgSrc}
        alt={tags}
        onClick={() => handleImageClick(tags, modalImageURL)}
        className={styles.ImageGalleryItemIMG}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  modalImageURL: PropTypes.string.isRequired,
  handleImageClick: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
