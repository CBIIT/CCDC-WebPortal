import React from 'react';
import './ExportButton.css';

const ExportButton = () => {
  return (
    <>
      <a href="#" role="button" className="buttonStyle">
        <span className="spanText">
          <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-arrow-from-bottom fa-w-12 fa-lg">
            <path fill="currentColor" d="M360 480H24c-13.3 0-24-10.7-24-24v-24c0-13.3 10.7-24 24-24h336c13.3 0 24 10.7 24 24v24c0 13.3-10.7 24-24 24zM90.4 216.5l65.6-65.6V360c0 13.3 10.7 24 24 24h24c13.3 0 24-10.7 24-24V150.9l65.6 65.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L209 30.1c-9.4-9.4-24.6-9.4-33.9 0L39.5 165.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0z" className="" />
          </svg>
          &nbsp;&nbsp;export
        </span>
      </a>
    </>
  );
};

export default ExportButton;