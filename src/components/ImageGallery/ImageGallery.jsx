import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import Loader from 'react-js-loader';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import { imagesAPI } from '../../services/images-api';

import styles from './ImageGallery.module.css';
import styled from 'styled-components';

const Styles = styled.div`
  .selector1 {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(158, 154, 154, 0.7);
    z-index: 1200;
  }
  .selector2 {
    max-width: calc(100vw - 48px);
    max-height: calc(100vh - 24px);
  }
  .selector3 {
    margin-top: 150px;
    font-size: 20px;
    color: darkblue;
  }
`;

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};
function ImageGallery({
  queryName,
  onImageClick,
  listHeight,
  setListOffsetHeight,
  setPageNumber,
  page,
})
{
  const [imagesByQuery, setImagesByQuery] = useState([]);
  // eslint-disable-next-line
  const [errorMessage, setErrorMessage] = useState(null);
  const [status, setStatus] = useState(Status.IDLE);
  const [btnVisibility, setBtnVisibility] = useState('visible');

  useEffect(() => {
    if (!queryName) return;
    let pageNumber = page;
    setStatus(Status.PENDING);
    setBtnVisibility('visible');
    imagesAPI
      .getImages(queryName, pageNumber)
      .then(({ data: { hits } }) => {
        hits.length < 12 && setBtnVisibility('hidden'); //imagesPerPage
        if (hits.length > 0) {
          setImagesByQuery(hits);
          setStatus(Status.RESOLVED);
          pageNumber += 1;
          setPageNumber(pageNumber);
        } else setStatus(Status.REJECTED);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
  }, // eslint-disable-next-line
    [queryName]);

  useEffect(() => {
    if (!imagesByQuery) return;
    window.scrollTo({
      top: listHeight,
      behavior: 'smooth',
    });
  }, [imagesByQuery, listHeight]);

  const LoadMoreBtnClick = () => {
    let pageNumber = page;
    setListOffsetHeight();
    setStatus(Status.PENDING);
    imagesAPI
      .getImages(queryName, pageNumber)
      .then(({ data: { hits } }) => {
        hits.length < 12 && setBtnVisibility('hidden'); //imagesPerPage
        setImagesByQuery(prev => [...prev, ...hits]);
        setStatus(Status.RESOLVED);
        pageNumber += 1;
        setPageNumber(pageNumber);
      })
      .catch(error => {
        setStatus(Status.REJECTED);
        setErrorMessage(error);
      });
  };

  const handleImageClick = (alt, largeImgURL) => {
    onImageClick(alt, largeImgURL);
  };

  if (status === Status.IDLE) {
    return <h1>Please, Enter your query!!!</h1>;
  }

  if (status === Status.RESOLVED || status === Status.PENDING) {
    return (
      <>
        <ul className={styles.ImageGallery} id="galleryList">
          {imagesByQuery.map(({ webformatURL, largeImageURL, tags, id }) => (
            <ImageGalleryItem
              imgSrc={webformatURL}
              tags={tags}
              modalImageURL={largeImageURL}
              key={id}
              handleImageClick={handleImageClick}
            />
          ))}
        </ul>
        {status === Status.PENDING ? (
          createPortal(
            <Styles>
              <div className="selector1">
                <div className="selector2">
                  <Loader
                    type={'spinner-circle'}
                    bgColor={'#3f51b5'}
                    title={''}
                    color={'#2a2a2a'}
                    size={300}
                  />
                  <p className="selector3">
                    Loading...{page} page of {queryName}
                  </p>
                </div>
              </div>
            </Styles>,
            document.getElementById('modalRoot'),
          )
        ) : (
          <Button
            handleBtnClick={LoadMoreBtnClick}
            btnVisibility={btnVisibility}
          />
        )}
      </>
    );
  }
  if (status === Status.REJECTED) {
    return (
      <p style={{ color: '#0d2de0' }}>
        <span
          style={{
            fontSize: 16,
            textDecorationLine: 'line-through',
            color: 'red',
            display: 'block',
          }}
        >
          {queryName}
        </span>
        hasn't find. Try another query again
      </p>
    );
  }
}

ImageGallery.propTypes = {
  queryName: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
  listHeight: PropTypes.number,
  setListOffsetHeight: PropTypes.func.isRequired,
  setPageNumber: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};

export default ImageGallery;
