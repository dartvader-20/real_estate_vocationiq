import React, { useState } from 'react'
import { styled } from '@mui/system';
import {
    Box,
    Typography,
    FormControlLabel,
    Radio,
    RadioGroup,
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

const answersStorage1 = {};
const questionnaireData = [
    {
        question: "What are the primary responsibilities of an architect/designer within a firm?",
        options: [
            "Conceptualizing and designing structures",
            "Project management and client communication",
            "Site analysis and feasibility studies",
            "All of the above",
        ],
    },
    {
        question: "Which software proficiency is essential for architectural design?",
        options: [
            "AutoCAD",
            "Revit",
            "SketchUp",
            "All of the above",
        ],
    },
    {
        question: "What factor(s) significantly influence(s) sustainable design practices?",
        options: [
            "Material selection and energy efficiency",
            "Project budget and timeline",
            "Client preferences",
            "Government regulations"
        ],
    },
    {
        question: "Which architectural style is characterized by minimalism, clean lines, and open spaces?",
        options: [
            "Modernist",
            "Postmodernist",
            "Brutalist",
            "Contemporary"
        ],
    },
    {
        question: "What principle defines the \"Golden Ratio\" in architectural design?",
        options: [
            "1:1",
            "1:1.618",
            "2:3",
            "3:4"
        ],
    },
    {
        question: "Which historical architect is known for the design of Falling water?",
        options: [
            "Frank Gehry",
            "Le Corbusier",
            "Zaha Hadid",
            "Frank Lloyd Wright"
        ],
    },
    {
        question: "Which element(s) are crucial for creating a successful public space?",
        options: [
            "Aesthetic enhancement",
            "Structural integrity",
            "Environmental impact",
            "All of the above",
        ],
    },
    {
        question: "What's the importance of the design process in architecture?",
        options: [
            "It ensures client satisfaction",
            "It facilitates problem-solving and innovation",
            "It helps meet project deadlines",
            "It has no significant impact on the final outcome",
        ],
    },
];

const questionnaireData1 = [
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
        question: "Which areas do you feel most confident about in your engineering discipline?",
        options: [
            "Theoretical concepts",
            "Practical applications",
            "Both theoretical and practical aspects equally"
        ],
    },
    {
        question: "How often do you employ critical thinking and analysis in your academic projects?",
        options: [
            " Always, it's a core part of my approach",
            "Sometimes, depending on the project",
            "Rarely, it's not a significant consideration"
        ],
    },
    {
        question: "Which learning method do you fi nd most effective in grasping engineering concepts?",
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
        question: "How do you view adaptability in handling unforeseen challenges in a work environment?",
        options: [
            "Essential for success adaptability is key",
            "Helpful, but not a critical skill",
            "Not necessary following established procedures is sufficient",
        ],
    },
    {
        question: "How proactive are you in seeking professional development opportunities beyond the curriculum?",
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
    {
        question: "When considering a potential employer, what matters most to you?",
        options: [
            "Salary and benefits",
            "Collaborative work culture",
            "Opportunities for skill development",
            "Location and city of placement",
        ],
    },
    {
        question: "How do you prioritize work-life balance in a professional setting?",
        options: [
            "It's crucial for overall well-being",
            "It's secondary to career advancement",
            "It's not a major concern",
            "It depends on project deadlines"
        ],
    },
    {
        question: "What salary range do you expect for an entry-level position in architecture/design?",
        options: [
            "Below industry standard",
            "Industry standard",
            "Above industry standard",
            "Not sure/No preference"
        ],
    },
];

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
    "Employer Preference",
    "Professional setting",
    "Salary Expectation"
];

const correctAnswers = [
    "All of the above",
    "All of the above",
    "Material selection and energy efficiency",
    "Modernist",
    "1:1.618",
    "Frank Lloyd Wright",
    "All of the above",
    "It facilitates problem-solving and innovation",
];

let techKnowledgeScore, academicKnowledgeScore, designKnowledgeScore;

const Questionaire4 = () => {
    const navigate = useNavigate();
    const isMobile = window.innerWidth <= 768;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [answers, setAnswers] = useState(Array(questionnaireData.length).fill(''));
    const [answers1, setAnswers1] = useState(Array(questionnaireData1.length).fill(''));
    const routePaths = [
        '/userdetails',
        '/dashboard',
        '/quetionaire1',
    ];
    const activePageIndex = routePaths.indexOf('/dashboard');
    const calculateSectionScore = (start, end, markCorrect) => {
        let sectionScore = 0;
        for (let i = start; i <= end; i++) {
            if (markCorrect || answers[i] === correctAnswers[i]) {
                sectionScore++;
            }
        }
        const totalQuestions = end - start + 1;
        const percentage = (sectionScore / totalQuestions) * 100;
        return percentage.toFixed(2);
    };
    const handleNextPage = () => {
        const nextQuestion = questionnaireData1[currentQuestionIndex + 1];

        const questionKey = keyMapping[currentQuestionIndex];
        const nextQuestionKey = nextQuestion ? keyMapping[currentQuestionIndex + 1] : null;

        const currentAnswer = answers1[currentQuestionIndex];
        const nextAnswer = answers1[currentQuestionIndex + 1];

        answersStorage1[questionKey] = currentAnswer;
        if (nextQuestionKey !== null) {
            answersStorage1[nextQuestionKey] = nextAnswer;
        }
        if (currentQuestionIndex + 2 < questionnaireData1.length) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 2);
        } else {
            techKnowledgeScore = calculateSectionScore(0, 2);
            academicKnowledgeScore = calculateSectionScore(3, 5);
            designKnowledgeScore = calculateSectionScore(6, 7);
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

    const handleRadioChange1 = (event, questionIndex) => {
        setAnswers1((prevAnswers) => {
            const newAnswers = [...prevAnswers];
            newAnswers[questionIndex] = event.target.value;
            return newAnswers;
        });
    };

    const renderQuestion = (question, questionIndex) => (
        <div key={questionIndex}>
            {question && (
                <>
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
                </>
            )}
        </div>
    );

    const renderQuestion1 = (question, questionIndex) => (
        <div key={questionIndex}>
            {question && (
                <>
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
                        value={answers1[questionIndex]}
                        onChange={(event) => handleRadioChange1(event, questionIndex)}
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
                </>
            )}
        </div>
    );
    console.log("fk nf", answersStorage1)
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
                        {[currentQuestionIndex, currentQuestionIndex + 1].map((index) => (
                            <React.Fragment key={index}>
                                {renderQuestion(questionnaireData[index], index)}
                                {renderQuestion1(questionnaireData1[index], index)}
                            </React.Fragment>
                        ))}
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

export { techKnowledgeScore, designKnowledgeScore, academicKnowledgeScore, answersStorage1 }
export default Questionaire4;