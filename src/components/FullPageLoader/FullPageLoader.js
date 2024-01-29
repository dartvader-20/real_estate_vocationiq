import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const FullPageLoader = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                width: '100vw',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                zIndex: 1000,
            }}
        >
            <CircularProgress color="primary" />
        </div>
    );
};

export default FullPageLoader;