import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import './LoadingToRedirect.css'; // Import the CSS file for styling

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => {
                if (currentCount === 1) {
                    clearInterval(interval);
                    setRedirect(true);
                }
                return currentCount - 1;
            });
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    if (redirect) {
        return <Navigate to="/" />;
    }
    
    return (
        <div className="loading-container">
            <div className="loader-wrapper">
                <LoaderCircle className="loading-icon" />
            </div>
            <h2>No Permission</h2>
            <p>Redirecting in {count} seconds...</p>
        </div>
    );
};

export default LoadingToRedirect;
