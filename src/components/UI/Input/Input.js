import React from 'react' 
import classes from './Input.module.css'

const input = (props) => {
    // A warpper component for different input types
    let inputElement = null;
    switch (props.inuttype) {
        case ('input'):
            // pass normal attributes through props
            inputElement = <input className={classes.inputElement}{...props}/>
            break;
        case ('textarea'):
            inputElement = <textarea {...props}/>
            break;
        default:
            inputElement = <input {...props}/>
    }
     
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
};
export default input;