import React, { useReducer, useEffect,useState } from "react";
import authReducer from './authReducer.js';
import { setCurrentUser } from './currentUser.js';
import AuthGlobal from './authGlobal.js'
import jwt_decode from "jwt-decode";

const Auth = props => {
    const [stateUser, dispatch] = useReducer(authReducer, {
        isAuthenticated: null,
        user: {}
    });
    console.log(stateUser);
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
      console.log("entra aqui")
        if (sessionStorage.token) {
            const decoded = sessionStorage.token ? sessionStorage.token : "";
            console.log("entra en useEffect auth",sessionStorage.jwt);
            dispatch(setCurrentUser(jwt_decode(decoded)));
        }
        setShowChild(true);
    }, []);

    if (!showChild) {
        return null;
    } else {
        return (
            <AuthGlobal.Provider
                value={{
                    stateUser,
                    dispatch
                }}
            >
                {props.children}
            </AuthGlobal.Provider>
        );
    }
};

export default Auth;
