import React, { useEffect, useState } from 'react';
import SplashPage from './SplashPage'
import HomePage from '../../pages/home/HomePage';

const IntroPage = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000); // Show splash for 3 seconds

        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? <SplashPage /> : <HomePage/>}
        </div>
    );
};

export default IntroPage;