import React from 'react';
import './styles.css';

const Error = (props) => {
  return (
    <div id='error-wrapper' className={props.display}>
      {props.children}
      <button id='error-close-button' onClick={props.errorClose}>
        close
      </button>
    </div>
  );
};

export default Error;
