import React, { useState } from 'react';
import env from 'react-dotenv';
import { useHistory } from 'react-router-dom';

import useInterval from './DevicePolling';
import useToken from '../App/useToken';
import './devices.css';

export default function Devices() {
    // Adding an initial count of devices of zero
    const [dev, setDevices] = useState({ count: 0, devices: []});
    const { clearToken, token } = useToken();
    const history = useHistory();

    console.log('Token', token);


    // TODO: Fix logout routing
    const LogOut = () => {
        clearToken();
        history.push('/');
    }

    const notify = async () => {
        await fetch(`${env.API_URL}/notify`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: {
                name: 'John Mark Marquez',
                email: 'jhnmrkmrqz@gmail.com',
                repoUrl: '',
                message: "Hello there! I'm JM. You can call me Jay Dawg if there's already a JM in your life! Awesome coding test by the way! I enjoyed doing it!"
            }

        });
    }

    useInterval(async () => {
        console.log('Polling for devices');
        await fetch(`${env.API_URL}/devices`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            }
        }).then(async res => {
            const responseBody = await res.json();
            const devices = responseBody.devices;
            setDevices({count: devices.length, devices});
        });
    }, 5000);

    const devicesArray = dev.devices;

    return (
        <div className="body">
            <div className="devices-body">
                <div className="device-count">
                    <h1>{dev.count}</h1>
                    <p>DEVICES<br/>ONLINE</p>
                </div>
                { /* Mapping device array so that we don't get identical keys when creating the circles*/}
                {devicesArray.map( i => (
                <div className="circle-container">
                    <div key={(i.id)} className="circles"><p>{i.id}</p></div>
                </div>))}
            </div>
            <div className="footer">
                <div className="footer-body">
                    <button id="notify">Notify</button>
                    <button id="logOut" onClick={LogOut}>Logout</button>
                </div>
            </div>
        </div>
    )
}
