import React from "react";
import "../CSS/advertisement.css";

export default function Advertisement() {
  return (
    <div>
      <div id='app'>
        <div className='title'>
          <div className='title-inner'>
            <div className='cafe'>
              <div className='cafe-inner'>Free Shipping</div>
            </div>
            <div className='mozart'>
              <div className='mozart-inner'>& Return</div>
            </div>
          </div>
        </div>

        <div className='image silder-h'>
          <img
            src='https://i.pinimg.com/564x/68/21/57/682157a24caaec636566aa352966628e.jpg'
            alt=''
          />
        </div>
      </div>
    </div>
  );
}
