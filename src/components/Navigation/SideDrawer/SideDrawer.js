import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.module.css';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    // Conditionally attach different css classes to add animation sliding 
    let combinedClasses = [classes.SideDrawer, classes.Close];
    if (props.open) {
        combinedClasses = [classes.SideDrawer, classes.Open];
    }
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={combinedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo></Logo>
                </div>
                <nav>
                    <NavigationItems isAuthenticated = {props.isAuth}>
                    </NavigationItems>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer; 