import * as actionTypes from './actionTypes';
import axios from 'axios';
import * as constants from'../../constants';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId      
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

// Automatically log user out after 3600s
export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {  
            dispatch(logout());
        }, expirationTime * 1000);
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
            // Store the token and expriration date 
            localStorage.setItem('token', response.data.idToken);
            const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
            localStorage.setItem('expirationDate',expirationDate);
            localStorage.setItem('userId', response.data.localId);
            dispatch(authSuccess(response.data.idToken, response.data.localId));
            dispatch(checkAuthTimeout(response.data.expiresIn));
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail(err.response.data.error));
        });
    };
};

// Action to change the redirect path dynamically 
export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
       const token = localStorage.getItem('token');
       if (!token) {
           dispatch(logout());
        } else {
           const expirationDate = new Date(localStorage.getItem('expirationDate'));
           if (expirationDate <= new Date()) {
               dispatch(logout());
           } else {
               const userId = localStorage.getItem('userId');
               dispatch(authSuccess(token, userId));
               // Get the difference in s 
               dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime())/1000));
           }
        }
    }
}