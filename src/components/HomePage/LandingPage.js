import React, { useState } from 'react'
import NavBar from '../Navbar/NavBar';
import { styled } from '@mui/system';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { getUserDetails } from './userManagement';
import { Typography, Box } from '@mui/material';
import { useNavigate } from "react-router-dom";
import image6URL from '../images/image6';
import EmailAvatar from './EmailAvatar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
    flexDirection: 'row',
});
const MobileNavButton = styled(IconButton)({
    display: 'none',
    '@media (max-width: 768px)': {
        display: 'block',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
    },
});

const FirstHalf = styled('div')({
    width: '20%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRight: '2.5px solid #D8D0D0',
    borderBottom: '2.5px solid #D8D0D0',
    background: '#fafafa',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    '@media (max-width: 768px)': {
        width: '40%',
        borderRight: '2.5px solid #D8D0D0',
        borderBottom: '2.5px solid #D8D0D0',
    },
});
const ContentHalf = styled('div')({
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto'
});
const GenerateButton = styled('button')({
    marginTop: '20px',
    backgroundColor: '#2c3a84',
    padding: '10px 26px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    borderRadius: '10px',
    '&:hover': {
        background: 'black',
        color: 'white',
    },
    '@media (max-width: 768px)': {
        width: 'auto',
        fontSize: '12px',
    },
});

const LandingPage = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const isMobile = window.innerWidth <= 768;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const routePaths = [
        '/dashboard',
        '/userdetails',
        '/quetionairepart1',
        '/report',
    ];
    React.useEffect(() => {

        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimer);
    }, []);
    const activePageIndex = routePaths.indexOf('/userdetails',);
    const handleNextClick = async () => {
        navigate('/questionaire2');
    }
    const handlePreviousClick = async () => {
        navigate('/userdetails');
    }
    return (
        <MainContainer>
            {isLoading && <FullPageLoader />}
            {isMobile && (
                <MobileNavButton onClick={() => setIsMobileNavOpen(true)}>
                    <MenuIcon />
                </MobileNavButton>
            )}
            {isMobile ? (
                <Drawer anchor="left" open={isMobileNavOpen} onClose={() => setIsMobileNavOpen(false)}>
                    <NavBar activePage={activePageIndex} user={getUserDetails} />
                </Drawer>
            ) : (
                <FirstHalf>
                    <NavBar activePage={activePageIndex} user={getUserDetails} />
                </FirstHalf>
            )}
            <ContentHalf>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row-reverse', padding: '10px', width: '90%' }}>
                    <EmailAvatar />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', width: '91%' }}>
                    <Typography color='black' style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: isMobile ? '12px' : '20px',
                    }}>
                        Self-Evaluation
                    </Typography>
                </div>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '15px',
                    border: '1px solid #D8D0D0',
                    borderRadius: '12px',
                    width: '90%',
                }} >
                    <Typography style={{
                        fontSize: isMobile ? '12px' : '14px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                    }}
                    >You are about to start a series of questions that aim to reveal your performance across 16 management dimensions. This distinctive evaluation captures your past activities, uncovering strengths and weaknesses, guiding your journey of self-discovery and growth. Your honest self-assessment is crucial. Embracing strengths and recognizing areas for improvement opens the door to a world of promise, unlocking your full potential in the competitive business arena.</Typography>
                    <div style={{ height: '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img src={image6URL} alt='activityLogo' style={{ height: '80%' }} />
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                        <GenerateButton
                            onClick={handlePreviousClick}
                        >
                            Previous
                        </GenerateButton>
                        <GenerateButton
                            onClick={handleNextClick}
                        >
                            Let's Start
                        </GenerateButton>
                    </div>
                </Box>
            </ContentHalf>
        </MainContainer>
    )
}

export default LandingPage;