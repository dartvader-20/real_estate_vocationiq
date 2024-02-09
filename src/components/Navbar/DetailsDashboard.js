import React from 'react'
import { styled } from '@mui/system';
import { Typography, Box, Dialog, DialogTitle, DialogContent } from '@mui/material';
import { useNavigate } from "react-router-dom";
import EmailAvatar from '../HomePage/EmailAvatar';

const ContentHalf = styled('div')({
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
    width: '80vw'
});

const GenerateButton = styled('button')({
    backgroundColor: '#2c3a84',
    padding: '10px 30px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    borderRadius: '10px',
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

const DetailsDashboard = ({ name, data }) => {
    const isMobile = window.innerWidth <= 768;
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [selectedItemYo, setSelectedItemYo] = React.useState(null);
    const navigate = useNavigate();
    const handleDialogOpen = (yo) => {
        setSelectedItemYo(yo);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setSelectedItemYo(null);
        setDialogOpen(false);
    };

    const calculateQuartiles = (questionsArray) => {
        const sortedQuestions = [...questionsArray].sort((a, b) => b.score - a.score);
        const quartileSize = Math.floor(sortedQuestions.length / 4);

        const quartiles = {
            "Strength": sortedQuestions.slice(0, quartileSize),
            "Opportunities": sortedQuestions.slice(quartileSize, quartileSize * 2),
            "Work in Progress": sortedQuestions.slice(quartileSize * 2, quartileSize * 3),
            "Ignored": sortedQuestions.slice(quartileSize * 3),
        };

        return quartiles;
    };

    const quartiles = selectedItemYo ? calculateQuartiles(selectedItemYo) : null;

    return (
        <ContentHalf>
            <div style={{ display: "flex", alignItems: 'center', justifyContent: 'flex-end', width: '90%', padding: '10px' }}>
                <EmailAvatar />
            </div>
            {data.map((item, index) => (
                <div key={index} style={{ padding: '15px' }}>
                    <Box sx={{
                        display:
                            'flex', flexDirection: 'row',
                        justifyContent: 'space-between',
                        padding: '15px',
                        alignItems: 'center',
                        borderRadius: '12px',
                        background: '#9CE6F2',
                    }}>
                        <div style={{ padding: '15px' }}>
                            <Typography style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? '12px' : '16px', fontWeight: 600 }}>Test Taken:</Typography>
                        </div>
                        <div style={{ padding: '15px' }}>
                            <Typography style={{ fontFamily: 'Poppins, sans-serif', fontSize: isMobile ? '12px' : '16px', fontWeight: 600 }}>{item.timestamp}</Typography>
                        </div>
                        <GenerateButton
                            onClick={() => handleDialogOpen(item.yo)}
                        >
                            View Result
                        </GenerateButton>
                    </Box>
                </div >
            ))}
            <Dialog open={dialogOpen} onClose={handleDialogClose} >
                <DialogTitle variant='h4' style={{ fontFamily: 'Poppins, sans-serif' }}><b>Your Result</b></DialogTitle>
                <DialogContent>
                    {quartiles ? (
                        Object.entries(quartiles).map(([quartile, questions], index) => (
                            <div key={index} >
                                <Typography variant="h5"><b>{quartile}</b></Typography>
                                {questions.map((item, questionIndex) => (
                                    <div key={questionIndex}>
                                        <Typography style={{
                                            fontFamily: 'Poppins, sans-serif',
                                            fontSize: '12px'
                                        }}>Rank {questionIndex + 1}: {item.questions}</Typography>
                                    </div>
                                ))}
                            </div>
                        ))
                    ) : (
                        <Typography>No result selected.</Typography>
                    )}
                </DialogContent>
            </Dialog>
            <GenerateButton onClick={() => { navigate("/userdetails"); }}>Take Assessment</GenerateButton>
        </ContentHalf >
    )
}

export default DetailsDashboard;