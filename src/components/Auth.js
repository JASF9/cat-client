import React from 'react';
import '../App.css';

export default function Login(props){
    require("dotenv").config();
    const REACT_APP_AUTH_URL = process.env.REACT_APP_AUTH_URL;

    return(
      <div className='auth-container'>
        <h1>Authentication</h1>
        <img src='/githubicon.svg' alt='' width='150px'/>
        <a href={REACT_APP_AUTH_URL} style={{marginBottom:'20px'}}>
          <button className='auth-button'>Register with Github</button>
        </a>
        
    </div>
  );
}