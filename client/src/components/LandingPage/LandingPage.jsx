import React from 'react';
import { Link } from 'react-router-dom';
import fondo from '../../img/pokemon-unite.jpg'
import logo from '../../img/ash.png';
import './LandingPage.css'

const LandingPage = () => {
    return (
        <div>
            <div>
                <img src={fondo} alt="fondo-landing" className='fondo'/>
            </div>
            <div className='logo-p'>
                <img src={logo} alt="logo" />
            </div>
            <div>
                <button className='button_home'><Link to="/home">Lets Go to Pokemon App!</Link></button>
            </div>
        </div>
    )
};

export default LandingPage;