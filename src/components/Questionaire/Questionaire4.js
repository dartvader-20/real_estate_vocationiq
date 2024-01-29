import React, { useState } from 'react'
import { styled } from '@mui/system';
import {
    Box,
    Typography,
    FormControlLabel,
    FormControl,
    Radio,
    Checkbox
} from '@mui/material';
import { useNavigate, } from "react-router-dom";
import { getUserDetails } from '../HomePage/userManagement';
import NavBar from '../Navbar/NavBar';
import EmailAvatar from '../HomePage/EmailAvatar';

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
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
});

const questionnaireData = [
    {
        question: "What are the primary responsibilities of an architect/designer within a firm?",
        options: [
            "Conceptualizing and designing structures",
            "Project management and client communication",
            "Site analysis and feasibility studies",
            "All of the above",
        ],
        type: 'radio',
    },
    {
        question: "Which software proficiency is essential for architectural design?",
        options: [
            "AutoCAD",
            "Revit",
            "SketchUp",
            "All of the above",
        ],
        type: 'radio',
    },
    {
        question: "What factor(s) significantly influence(s) sustainable design practices?",
        options: [
            "Material selection and energy efficiency",
            "Project budget and timeline",
            "Client preferences",
            "Government regulations"
        ],
        type: 'radio',
    },
    {
        question: "What principle defines the \"Golden Ratio\" in architectural design?",
        options: [
            "1:1",
            "1:1.618",
            "2:3",
            "3:4"
        ],
        type: 'radio',
    },
    {
        question: "Which historical architect is known for the design of Falling water?",
        options: [
            "Frank Gehry",
            "Le Corbusier",
            "Zaha Hadid",
            "Frank Lloyd Wright"
        ],
        type: 'radio',
    },
    {
        question: "Design Knowledge: Which element(s) are crucial for creating a successful public space?",
        options: [
            "Aesthetic enhancement",
            "Structural integrity",
            "Environmental impact",
            "All of the above",
        ],
        type: 'radio',
    },
    {
        question: "What's the importance of the design process in architecture?",
        options: [
            "It ensures client satisfaction",
            "It facilitates problem-solving and innovation",
            "It helps meet project deadlines",
            "It has no significant impact on the final outcome",
        ],
        type: 'radio',
    },
    {
        question: "Work Atmosphere and Expectations: When considering a potential employer, what matters most to you?",
        options: [
            "Salary and benefits",
            "Collaborative work culture",
            "Opportunities for skill development",
            "Location and city of placement",
        ],
        type: 'radio',
    },
    {
        question: "How do you prioritize work-life balance in a professional setting?",
        options: [
            "It's crucial for overall well-being",
            "It's secondary to career advancement",
            "It's not a major concern",
            "It depends on project deadlines"
        ],
        type: 'radio',
    },
    {
        question: "What salary range do you expect for an entry-level position in architecture/design?",
        options: [
            "Below industry standard",
            "Industry standard",
            "Above industry standard",
            "Not sure/No preference"
        ],
        type: 'radio',
    },
];

const Questionaire4 = () => {
    const navigate = useNavigate();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questionnaireData.length).fill(''));
    const routePaths = [
        '/userdetails',
        '/dashboard',
        '/quetionaire1',
    ];
    const activePageIndex = routePaths.indexOf('/dashboard');
    const handleNextPage = () => {
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

    const handleCheckboxChange = (event, questionIndex) => {
        setAnswers((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = event.target.checked
                ? questionnaireData[questionIndex].options[event.target.value]
                : '';
            return newAnswers;
        });
    };

    const renderQuestion = (question, questionIndex) => (
        <div key={questionIndex}>
            <Typography color='black'
                style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontSize: '20px',
                    fontWeight: 600,
                    marginLeft: '8px'
                }}>
                {question.question}
            </Typography>
            <FormControl>
                {question.options.map((option, index) =>
                    question.type === 'checkbox' ? (
                        <FormControlLabel
                            key={index}
                            control={
                                <Checkbox
                                    checked={
                                        answers[questionIndex] &&
                                        answers[questionIndex].includes(option)
                                    }
                                    onChange={(event) => handleCheckboxChange(event, questionIndex)}
                                    value={index}
                                />
                            }
                            label={option}
                        />
                    ) : (
                        <FormControlLabel
                            key={index}
                            value={option}
                            control={<Radio />}
                            label={option}
                            onChange={(event) => handleRadioChange(event, questionIndex)}
                        />
                    )
                )}
            </FormControl>
        </div>
    );

    return (
        <MainContainer>
            <Half2>
                <NavBar activePage={activePageIndex} user={getUserDetails} />
            </Half2>
            <ContentHalf>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '92%' }}>
                    <Typography
                        color='black'
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '20px',
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

export default Questionaire4;