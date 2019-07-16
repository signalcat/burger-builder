import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as constants from'../../constants';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData      
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key='+ constants.authKey;
        if (!isSignup) {
            url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key='+constants.authKey;
        }
        axios.post(url, authData)
        .then(response => {
            console.log(response);
            dispatch(authSuccess(response.data));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err));
        });
    };
};

