import React from 'react'
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import { signOut } from 'firebase/auth';

const GenerateButton = styled('button')({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '15px',
    borderRadius: '0px 10px 10px 0px',
    fontWeight: 500,
    fontFamily: 'Poppins, sans-serif',
    width: '85%',
    borderColor: 'transparent',
    fontSize: '16px',
    color: '#7A879B',
    '&.ChangeButton': {
        backgroundColor: '#2C3A84',
        color: 'white',
    },
});

const GenerateButton2 = styled('button')({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '15px',
    borderRadius: '0px 10px 10px 0px',
    fontWeight: 500,
    fontFamily: 'Poppins, sans-serif',
    width: '85%',
    borderColor: 'transparent',
    fontSize: '16px',
    color: '#7A879B',
    transition: 'background-color 0.3s, color 0.3s',

    '&:hover': {
        backgroundColor: '#2C3A84',
        color: 'white',
    },

    '&.ChangeButton': {
        backgroundColor: '#2C3A84',
        color: 'white',
    },
});

const NavBar = ({ activePage, user }) => {
    const navigate = useNavigate();
    const [isButtonClicked, setIsButtonClicked] = React.useState(0);
    const handleButtonClick = (index) => {
        if (index === 4) {
            signOut(auth)
            setIsButtonClicked(index);
            navigate('/')
            return;
        }
    };

    const navigationButtons = [
        { icon: <DashboardIcon />, text: 'Dashboard' },
        { icon: <AssessmentIcon />, text: 'Assessment' },
        { icon: <ArticleIcon />, text: 'Report' },
    ];

    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
            <div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Typography style={{
                        fontFamily: 'Poppins, sans-serif',
                        padding: '10px',
                        fontWeight: 600,
                        fontSize: '40px',
                    }} >
                        Vocation<span style={{ color: 'red' }}>IQ</span>
                    </Typography>
                </div>
                {navigationButtons.map((button, index) => (
                    <GenerateButton
                        className={activePage === index ? 'ChangeButton' : ''}
                        onClick={() => handleButtonClick(index)}
                    >
                        {button.icon}
                        <Typography style={{
                            marginLeft: '5px', fontFamily: 'Poppins, sans-serif',
                            fontWeight: 600,
                            fontSize: '20px',
                        }}>
                            {button.text}
                        </Typography>
                    </GenerateButton>
                ))}
            </div>
            <div>
                <GenerateButton2
                    className={isButtonClicked === 4 ? 'ChangeButton' : ''}
                    onClick={() => handleButtonClick(4)}
                >
                    <LogoutIcon />
                    <Typography style={{
                        marginLeft: '5px', fontFamily: 'Poppins, sans-serif',
                        fontWeight: 600,
                        fontSize: '20px',
                    }}>
                        Logout
                    </Typography>
                </GenerateButton2>
            </div>
        </div>
    )
}

export default NavBar;