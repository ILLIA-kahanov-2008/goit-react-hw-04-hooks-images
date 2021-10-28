import { useState } from 'react';
import SearchBar from '../SearchBar/SearchBar';
import ImageGallery from '../ImageGallery/ImageGallery';

import Modal from '../Modal/Modal';

import './App.css';

function App () {
  const [queryName, setQueryName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [galleryListHeight, setGalleryListHeight] = useState(0);
  const [modalImageURL, setModalImageURL] = useState('');
  const [altImageName, setAltImageName] = useState('');

 const onFormSubmit = (queryName, pageNumber) => {
   setQueryName(queryName);
   setPageNumber(pageNumber);
   setGalleryListHeight(0);
  };

  const pageNumberSet = pageNumber => setPageNumber(pageNumber);  

  const setListOffsetHeight = () => setGalleryListHeight(document.getElementById('galleryList').offsetHeight);

  const onImageClick = (altModalImageName, modalImageURL) => {
    setModalImageURL(modalImageURL);
    setAltImageName(altModalImageName);
    toggleModal();
  };

  const toggleModal = () => setShowModal(!showModal);

  const resetModalOptionsInState = () => setModalImageURL('');
  ;

    return (
      <div className="App">
        <SearchBar onSubmit={onFormSubmit} />
        <ImageGallery
          queryName={queryName}
          onImageClick={onImageClick}
          listHeight={galleryListHeight}
          setListOffsetHeight={setListOffsetHeight}
          setPageNumber={pageNumberSet}
          page={pageNumber}
        />
        {showModal && (
          <Modal
            onClose={toggleModal}
            altImageName={altImageName}
            imageURL={modalImageURL}
            resetAppOptions={resetModalOptionsInState}
          />
        )}
      </div>
    );
  }

export default App;