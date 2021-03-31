import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faEnvelope} from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import env from 'react-dotenv';
import { useHistory } from "react-router-dom";

import './LoginForm.css';

const userLogin = async (credentials) => {
    // Returning both response status and payload
    let response = {
        status: null,
        payload: null
    };

    // Fetching token from the API endpoint
    await fetch(`${env.API_URL}/login`, {
        method: 'POST',
        mode: 'cors',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(credentials)
    }).then(async res => {
        response.status = res.status;
        response.payload = await res.text()
    });

    return response;
}

export default function LoginForm({setToken}) {
    // Initial details for the user
    const [details, setDetails] = useState({ email: "", password: ""});
    const history = useHistory();

    // Adding a submit handler to send the user details to the API
    const handleSubmit = async e => {
        e.preventDefault();
        const token = await userLogin({
          email: details.email,
          password: details.password
        });

        // Only setToken if response returns status 200
        if (token.status === 200) {
            setToken(token.payload);
            history.push('/devices');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-inner">
                <center><h2>Login</h2></center>
                {/* { !hasError ? "" : `<p>${errorMessage}</p>`} */}
                <div className="form-group">
                    <div className="input-group">
                        <FontAwesomeIcon icon={faEnvelope} className="icons"/>
                        <input type="email" name="email" id="email" placeholder="Email Address" onChange={e => setDetails({...details, email: e.target.value})} value={details.email}/>
                    </div>
                </div>
                <div className="form-group">
                    <div className="input-group">
                    <FontAwesomeIcon icon={faKey} className="icons"/>
                    <input type="password" name="password" id="password" placeholder="Password" onChange={e => setDetails({...details, password: e.target.value})} value={details.password}/>
                    </div>
                </div>
                <center><input type="submit" value="Login"/></center>
            </div>
        </form>
    )
}

LoginForm.propTypes = {
    setToken: PropTypes.func.isRequired,
};
