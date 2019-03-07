import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';

const toolbar = (props) => (
    <head className={classes.Toolbar}>
        <div>MENU</div>
        <Logo></Logo>
        <nav>
            ...
        </nav>
    </head>
);

export default toolbar;