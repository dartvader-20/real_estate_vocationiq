import React from 'react'
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import image2URL from '../images/image2';
import { useNavigate } from "react-router-dom";
import { styled } from '@mui/system';
import EmailAvatar from '../HomePage/EmailAvatar';

const GenerateButton = styled('button')({
    marginTop: '16px',
    backgroundColor: '#2c3a84',
    padding: '10px 26px',
    border: '1px solid #2c3a84',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    borderRadius: '12px',
    fontSize: '16px',
    '&:hover': {
        background: 'black',
        color: 'white',
    },
    '@media (max-width: 768px)': {
        width: 'auto',
        textAlign: 'center',
        fontSize: '12px',
        marginTop: 5
    },
});

const DashboardWelcome = () => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 768;
    return (
        <div style={{ width: '75vw', height: '100vh', overflowX: isMobile ? 'auto' : 'none' }}>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', padding: 10 }}>
                <Typography style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                    fontSize: isMobile ? '12px' : '20px',
                    marginTop: 10
                }}>
                    Your journey of self discovery begins here
                </Typography>
                <EmailAvatar />
            </div>
            <Box sx={{
                background: '#9CE6F2',
                padding: '10px',
                height: '25vh',
                borderRadius: '12px',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-around',
                marginTop: '3%'
            }}
            >
                <div>
                    <Typography style={{
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: isMobile ? '12px' : '16px',
                        color: '#2C3A84',
                        padding: '10px'
                    }}>
                        Unlock your Potential: Take the Test and Discover your Strengths!
                    </Typography>
                    <GenerateButton onClick={() => { navigate("/userdetails"); }}>Start Assessment</GenerateButton>
                </div>
                <img src={image2URL} alt='dashboard' style={{ width: '25%', height: isMobile ? '50%' : '150%' }} />
            </Box>
            <Typography style={{
                fontFamily: 'Poppins, sans-serif',
                fontWeight: 550,
                fontSize: isMobile ? 10 : '14px',
                marginTop: isMobile ? '20px' : '40px',
            }}>
                Hi there!<br />
                <br />
                Understanding your inherent strengths and talents is crucial for shaping a fulfilling professional life and successful future. The VocationIQ Strength
                Analyzer is designed to uncover your strengths and align them with potential goals and career paths.<br />
                <br />
                We begin with inputting academic details and work details, followed by diverse extracurricular activities whether it is sports, clubs, performing arts,
                projects, Olympiads, internships or volunteer work - each enriching your skill set along the way.<br />
                <br />
                This experience empowers introspection and self-awareness enabling pursuit of opportunities aligned with your proficiencies and interests, thereby
                becoming a guiding compass for your successful professional journey.<br />
                <br />
                Embrace this exploration—it unveils your potential!
            </Typography>
        </div>
    )
}

export default DashboardWelcome;