import React from 'react';
// dynamically solve the path by webpack 
import burgerLogo from '../../assets/images/burger-logo.png'; 
import classes from './Logo.module.css';

const logo = (props) => (
    <div className={classes.Logo}>
        <img src={burgerLogo} alt="MyBurger"></img>
    </div>
); 

export default logo;