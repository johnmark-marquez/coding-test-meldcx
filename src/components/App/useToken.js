import { useState } from 'react';

export default function useToken() {

    // Getting of token from Javascript memory
    const getToken = () => {
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);
        return userToken;
    };

    const [token, setToken] = useState(getToken());

    // Saving of token into Javascript memory for persistence
    const saveToken = userToken => {
        localStorage.setItem('token', JSON.stringify(userToken));
        setToken(userToken);
    };

    // Clearing of token for logout
    const clearToken = () => {
        localStorage.clear();
    };

    return {
        setToken: saveToken,
        token,
        clearToken
    }
}