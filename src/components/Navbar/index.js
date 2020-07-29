import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Modal } from 'react-bootstrap';
import { loadResults } from '../../loadResults';
import Error from '../Error';

import './styles.css';

const Navbar = (props) => {
  let history = useHistory();
  const [destCity, setDestCity] = useState('');
  const [arriveDate, setArriveDate] = useState('');
  const [numberNights, setNumberNights] = useState('');
  const [sortBy, setSortBy] = useState('recommended');
  const [showModal, setShowModal] = useState(false);
  const [errorShow, setErrorShow] = useState('hide');
  const [errorText, setErrorText] = useState('');
  const [showFullNavbar, setShowFullNavbar] = useState(true);

  // Search form submission
  const handleSubmit = async () => {
    setShowModal(true);

    if (arriveDate < new Date().toJSON().slice(0, 10)) {
      displayError('Invalid date.', 'date');
      return;
    }

    if (numberNights > 10) {
      displayError('Too many nights.', 'nights');
      return;
    }

    try {
      let hotelList = await loadResults({
        destCity,
        arriveDate,
        numberNights,
        sortBy,
      });

      history.push({
        pathname: '/results',
        state: { hotelList },
      });
    } catch (err) {
      displayError(err.msg, 'location');
    }
    setShowModal(false);
  };

  const displayError = (message, category) => {
    setShowModal(false);
    setErrorText(message);
    setErrorShow(category);
  };

  return (
    <>
      <div
        id='navbar-wrapper'
        style={{ background: props.navbarMaximized && 'rgba(35, 65, 75, 0.9)' }}
      >
        <Link id='navbar-title' to='/'>
          my concierge
        </Link>
        <div
          id='navbar-form'
          style={{ display: !props.navbarMaximized && 'none' }}
        >
          <input
            className={`navbar-inputs ${
              errorShow === 'location' && 'error-text'
            }`}
            type='text'
            placeholder='city'
            value={errorShow === 'location' ? errorText : destCity}
            onChange={(e) => setDestCity(e.target.value)}
            onClick={() => {
              if (errorShow === 'location') {
                setDestCity('');
                setErrorShow('hide');
              }
            }}
          />
          <input
            className={`navbar-inputs ${errorShow === 'date' && 'error-text'}`}
            type='text'
            placeholder='arrival date (yyyy-mm-dd)'
            onChange={(e) => setArriveDate(e.target.value)}
            value={errorShow === 'date' ? errorText : arriveDate}
            onClick={() => {
              if (errorShow === 'date') {
                setArriveDate('');
                setErrorShow('hide');
              }
            }}
          />
          <input
            className={`navbar-inputs ${
              errorShow === 'nights' && 'error-text'
            }`}
            type='number'
            placeholder='nights'
            value={errorShow === 'nights' ? errorText : numberNights}
            onChange={(e) => setNumberNights(e.target.value)}
            onClick={() => {
              if (errorShow === 'nights') {
                setNumberNights('');
                setErrorShow('hide');
              }
            }}
          />
          <select
            name='sort-by'
            id='sort-dropdown'
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value={null}>sort by...</option>
            <option value='price'>recommended</option>
            <option value='popularity'>popularity</option>
            <option value='price'>price</option>
          </select>
          <button
            type='submit'
            id='navbar-submit-button'
            onClick={handleSubmit}
          >
            go
          </button>
        </div>
        <button
          className='open-full-navbar'
          onClick={props.switchNavbar}
          style={{ display: !props.minimizeButtonShow && 'none' }}
        >
          {props.navbarMaximized ? '↑' : '↓'}
        </button>
      </div>
      <Modal show={showModal}>
        <Modal.Header>
          <Modal.Title>Please wait while we load your results...</Modal.Title>
        </Modal.Header>
      </Modal>
      {/* <Error display={errorShow} errorClose={() => setErrorShow('hide')}>
        {errorText}
      </Error> */}
    </>
  );
};

export default Navbar;
