import React, { useState } from 'react'
import { styled } from '@mui/system';
import {
    Box,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup
} from '@mui/material';
import { useNavigate, } from "react-router-dom";
import { getUserDetails } from '../HomePage/userManagement';
import NavBar from '../Navbar/NavBar';
import EmailAvatar from '../HomePage/EmailAvatar';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
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

const Half2 = styled('div')({
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
    marginTop: '15px',
    overflowY: 'auto'
});
const GenerateButton2 = styled('button')({
    backgroundColor: '#2c3a84',
    padding: '10px 26px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    marginTop: '10px',
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

const questionnaireData = [
    {
        question: "Which of the following is true?",
        options: [
            "Theoretical concepts lack real-world applications.",
            "Practical applications require modifications to theoretical concepts.",
            "Theoretical concepts are directly applicable without modifications.",
        ],
    },
    {
        question: "Project Experience: How do you perceive the importance of practical project experience in complementing theoretical learning?",
        options: [
            "Essential for better understanding concepts.",
            "Not crucial theory suffices.",
            "Enhances skills but doesn't significantly impact learning.",
        ],
    },
    {
        question: "Understanding of Industry Practices.",
        options: [
            "Extremely familiar and updated",
            "Moderately familiar with some updates",
            "Not very familiar or updated"
        ],
    },
    {
        question: "Academic Knowledge: Which areas do you feel most confident about in your engineering discipline?",
        options: [
            "Theoretical concepts",
            "Practical applications",
            "Both theoretical and practical aspects equally"
        ],
    },
    {
        question: "Problem-solving and Analytical Skills: How often do you employ critical thinking and analysis in your academic projects?",
        options: [
            " Always, it's a core part of my approach",
            "Sometimes, depending on the project",
            "Rarely, it's not a significant consideration"
        ],
    },
    {
        question: "Learning Methodology: Which learning method do you fi nd most effective in grasping engineering concepts?",
        options: [
            "Self-study and research",
            "Classroom lectures and discussions",
            "Practical applications and hands-on experience",
        ],
    },
    {
        question: "How important do you believe teamwork and collaboration are in achieving successful engineering projects?",
        options: [
            "Crucial projects thrive on collaboration",
            "Somewhat important individual efforts suffice",
            "Not necessary individual efforts are sufficient"
        ],
    },
    {
        question: "Adaptability and Initiative: How do you view adaptability in handling unforeseen challenges in a work environment?",
        options: [
            "Essential for success adaptability is key",
            "Helpful, but not a critical skill",
            "Not necessary following established procedures is sufficient",
        ],
    },
    {
        question: "Professional Development: How proactive are you in seeking professional development opportunities beyond the curriculum?",
        options: [
            "Actively seek and pursue such opportunities",
            "Occasionally explore if time permits",
            "Rarely seek additional development beyond academics"
        ],
    },
    {
        question: "How interested are you in upskilling or further education beyond your current coursework to enhance your industry readiness?",
        options: [
            "Highly interested actively seek opportunities",
            "Moderately interested open to possibilities",
            "Not interested current knowledge suffices"
        ],
    },
];

const answersStorage = {};

const keyMapping = [
    "Application of concepts",
    "Project Experience",
    "Understanding of Industry Practices",
    "Academic knowledge",
    "Problem-solving and Analytical Skills",
    "Learning Methodology",
    "Teamwork and Collaboration",
    "Adaptability and Initiative",
    "Professional Development",
    "Upskilling Needs",
];

const Questionaire3 = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const isMobile = window.innerWidth <= 768;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [answers, setAnswers] = useState(Array(questionnaireData.length).fill(''));
    const routePaths = [
        '/userdetails',
        '/dashboard',
        '/quetionaire1',
    ];
    const activePageIndex = routePaths.indexOf('/dashboard');
    const handleNextPage = () => {
        const nextQuestion = questionnaireData[currentQuestionIndex + 1];

        const questionKey = keyMapping[currentQuestionIndex];
        const nextQuestionKey = nextQuestion ? keyMapping[currentQuestionIndex + 1] : null;

        const currentAnswer = answers[currentQuestionIndex];
        const nextAnswer = answers[currentQuestionIndex + 1];

        answersStorage[questionKey] = currentAnswer;
        answersStorage[nextQuestionKey] = nextAnswer;

        if (currentQuestionIndex + 2 < questionnaireData.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
        } else {
            navigate('/computation');
        }
    };

    const handlePrevPage = () => {
        if (currentQuestionIndex >= 2) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 2);
        } else if (currentQuestionIndex === 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
        } else {
            navigate('/questionaire2');
        }
    };

    const handleRadioChange = (event, questionIndex) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = event.target.value;
            return newAnswers;
        });
    };

    const renderQuestion = (question, questionIndex) => (
        <div key={questionIndex}>
            <Typography color='black'
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: isMobile ? '12px' : '20px',
                    fontWeight: 600,
                    marginLeft: '8px'
                }}>
                {question.question}
            </Typography>
            <RadioGroup
                value={answers[questionIndex]}
                onChange={(event) => handleRadioChange(event, questionIndex)}
            >
                {question.options.map((option, index) => (
                    <FormControlLabel
                        key={index}
                        value={option}
                        control={<Radio />}
                        label={<Typography
                            style={{ fontSize: isMobile ? '12px' : 'inherit', fontFamily: 'Poppins, sans-serif', }}
                        >
                            {option}
                        </Typography>}
                    />
                ))}
            </RadioGroup>
        </div>
    );

    return (
        <MainContainer>
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
                <Half2>
                    <NavBar activePage={activePageIndex} user={getUserDetails} />
                </Half2>
            )}
            <ContentHalf>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '92%' }}>
                    <Typography
                        color='black'
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: isMobile ? '12px' : '20px',
                            fontWeight: 600,
                            marginTop: '7%',
                            marginLeft: '8px'
                        }}
                    >
                        Technical Knowledge Assessment
                    </Typography>
                    <EmailAvatar />
                </div>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '92%', flexDirection: 'column' }}>
                    <Box sx={{ border: '2px solid black', borderRadius: '16px', padding: 5 }}>
                        {renderQuestion(questionnaireData[currentQuestionIndex], currentQuestionIndex)}
                        {currentQuestionIndex + 1 < questionnaireData.length &&
                            renderQuestion(questionnaireData[currentQuestionIndex + 1], currentQuestionIndex + 1)}
                    </Box>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '90%', marginTop: 15 }}>
                    <GenerateButton2 onClick={handlePrevPage} >Previous</GenerateButton2>
                    <GenerateButton2 onClick={handleNextPage} >Next</GenerateButton2>
                </div>
            </ContentHalf>
        </MainContainer >
    )
}

export { answersStorage }
export default Questionaire3;