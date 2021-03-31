import { useState } from 'react';

export default function LogStorage() {

    // Getting of token from Javascript memory
    const getLog = () => {
        const logString = localStorage.getItem('isLog');
        const logData = JSON.parse(logString);
        return logData;
    };

    const [isLog, setLog] = useState(getLog());

    // Saving of token into Javascript memory for persistence
    const saveLog = isLog => {
        localStorage.setItem('isLog', JSON.stringify(isLog));
        setLog(isLog);
    };

    return {
        setLog: saveLog,
        isLog,
    }
}