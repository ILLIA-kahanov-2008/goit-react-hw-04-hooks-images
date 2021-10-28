import React from 'react';
import PropTypes from 'prop-types';
import styles from './Button.module.css'

Button.propTypes = {
  handleBtnClick: PropTypes.func.isRequired,
  btnVisibility: PropTypes.string.isRequired
};

function Button({ handleBtnClick, btnVisibility }) {
  return (
    <button
      className={styles.Button}
            type="button"
            onClick={handleBtnClick}
            style={{visibility: btnVisibility}}
          >
            Load More
          </button>
  );
}

export default Button;

