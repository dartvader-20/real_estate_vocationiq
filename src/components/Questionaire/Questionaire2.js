import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import { Typography, Checkbox, FormControlLabel, Box } from '@mui/material';
import { useNavigate, } from "react-router-dom";
import NavBar from '../Navbar/NavBar';
import { getUserDetails } from '../HomePage/userManagement';
import EmailAvatar from '../HomePage/EmailAvatar';
import { isBArch, targetJobs, requiredSkillsForTargetJobs } from '../UserDetails/UserDetails';
import { percentage } from './Questionaire1';
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

let tempresponses = []
let selectedreponses

const respon = [
    'I have efficiently handled money matters and managed budgets.',
    'I have managed projects in schools and colleges and efficiently concluded them.',
    'I enjoyed doing activities that need physical movement/ desk job.',
    'I found it hard to tolerate any unfair activities or cheating.',
    'I have created unique, captivating and innovative designs.',
    'I have ensured that all the materials and requirements for an activity are provided and fulfilled.',
    'I have followed the rules and regulations as mentioned by my school and colleges.',
    'I have handled numbers and analysed data effectively.',
    'I have comfortably interacted with sellers or shop keepers to get the right price or product.',
    'I have ensured that we always had enough stocks stored to complete the activity.',
    'I have efficiently kept track of things we need to buy and know exactly where to buy them from.',
    'I have efficiently taken down notes during class or activity and have maintained a document of all these things.',
    'I have kept up with market trends and observed patterns and implemented them.',
    'I have effectively created designs to suit a specific space or for a client.',
    'I have estimated the worth of a product effectively and made the purchase.',
    'I have got down to the root cause and found an effective solution, if and when there was a problem.',
    'I have created impressive presentations of my designs and shown it to my supervisors.',
    'I have taken extreme care about the quality of my project work or any submission.',
    'I have maintained very good relationships with my teachers or project guide.'
]

const responseKeys = [
    'Budget Management',
    'Project Management & Completion',
    'Physical Stamina',
    'Ethics',
    'Creativity & Design',
    'Site logistics & Material Management',
    'Safety Rules & Regulations',
    'Data Analysis',
    'Client & Vendor Management',
    'Inventory management & Stock checking',
    'Sourcing & Purchase order management',
    'Documentation & reporting',
    'Market research',
    'Spatial Analysis/ Space planning',
    'Cost estimation & Contract drafting',
    'Problem inspection & detection',
    'Presentation skills',
    'Quality control',
    'People management'
];

const targetJobOptions = [
    "Junior Project engineer",
    "Site supervisor",
    "Junior designer",
    "Civil Engineer",
    "Primavera scheduler",
    "Junior Procurement manager",
    "Stores manager",
    "Civil estimation & design",
    "Interior estimation & design",
    "Structural engineer",
    "Electrical engineer",
    "Site engineer",
    "Civil quantity surveyor",
    "Site foreman",
    "React native developer",
    "Piping / plumbing designer",
    "Electrical designer",
    "Safety officer",
    "Junior Architect",
    "Interior architect",
    "Civil drafter",
    "Interior drafter",
    "Field officer",
];
let matchPercentage, matchedSkills;
let matchPercentages = {};
const Questionaire2 = () => {
    const navigate = useNavigate();
    const [selectedRespon, setSelectedRespon] = React.useState([]);
    const isMobile = window.innerWidth <= 768;
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const [responsesBinary, setResponsesBinary] = useState(Array(respon.length).fill(0));
    useEffect(() => {
        setResponsesBinary(selectedRespon.reduce((acc, label) => {
            acc[responseKeys[respon.indexOf(label)]] = true;
            return acc;
        }, {}));
    }, [selectedRespon]);

    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 5;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const handleButtonClick = (name, index) => {
        if (selectedRespon.includes(name)) {
            setSelectedRespon(selectedRespon.filter((item) => item !== name));
        } else {
            setSelectedRespon([...selectedRespon, name]);
        }
    };

    const isButtonActive = (name) => selectedRespon.includes(name);
    const matchedIndices = selectedRespon.map(item => respon.indexOf(item)).filter(index => index !== -1);
    tempresponses = matchedIndices
    selectedreponses = responsesBinary
    const calculateSkillMatches = () => {
        const requiredSkillsForSelectedJobs = targetJobs.flatMap((job) => requiredSkillsForTargetJobs[job]);
        const matchingSkills = Object.entries(responsesBinary).filter(([key, value]) => requiredSkillsForSelectedJobs.includes(key) && value === 1);
        const percentageMatch = (matchingSkills.length / requiredSkillsForSelectedJobs.length) * 100;
        console.log('Percentage of skill matches:', percentageMatch);
    };
    const routePaths = [
        '/dashboard',
        '/userdetails',
        '/quetionairepart1',
        '/report',
    ];
    const activePageIndex = routePaths.indexOf('/userdetails',);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(respon.length / itemsPerPage) - 1) {
            setCurrentPage(currentPage + 1);
        }
        if (currentPage === 3) {
            targetJobOptions.forEach((targetJob) => {
                const requiredSkills = requiredSkillsForTargetJobs[targetJob];
                matchedSkills = requiredSkills.reduce((count, skill) => {
                    return count + (responsesBinary[skill] ? 1 : 0);
                }, 0);

                matchPercentage = (matchedSkills / requiredSkills.length) * 100;
                matchPercentages[targetJob] = (matchPercentage + percentage) / 2;
                console.log("matchPercentages", matchPercentages, "matchPercentage", matchPercentage)
            });
            if (isBArch === true) {
                navigate('/questionaire4')
            }
            else {
                navigate('/questionaire3')
            }
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
        if (currentPage === 0) {
            navigate('/landingpage')
        }
    };
    calculateSkillMatches()

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
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '92%' }}>
                    <Typography
                        color="black"
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: isMobile ? '12px' : '20px',
                            fontWeight: 600,
                            marginTop: '7%',
                            marginLeft: '8px',
                        }}
                    >
                        In the context of your activities and professional experience, please select all that apply
                    </Typography>
                    <EmailAvatar />
                </div>
                <div style={{ padding: isMobile ? 10 : '15px', width: '90%', color: 'black', border: '2px solid #D8D0D0', borderRadius: '12px', height: isMobile ? "75vh" : '40%' }}>
                    {respon.slice(startIndex, endIndex).map((label, index) => (
                        <Box sx={{ border: '1px solid white', height: '20%' }} key={label}>
                            <FormControlLabel
                                label={label}
                                style={{ fontFamily: 'Poppins, sans-serif' }}
                                control={
                                    <Checkbox
                                        sx={{ '& .MuiSvgIcon-root': { fontSize: isMobile ? '18px' : '35px', } }}
                                        onClick={() => handleButtonClick(label, index + startIndex)}
                                        checked={isButtonActive(label)}
                                    />
                                }
                            />
                        </Box>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '100%', marginTop: 15 }}>
                        <GenerateButton2 onClick={handlePrevPage}>Previous</GenerateButton2>
                        <GenerateButton2 onClick={handleNextPage}>Next</GenerateButton2>
                    </div>
                </div>
            </ContentHalf>
        </MainContainer>
    )
}

export { tempresponses, selectedreponses, matchPercentages }
export default Questionaire2;