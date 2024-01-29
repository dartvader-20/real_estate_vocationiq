import React, { useState, useEffect } from 'react'
import { styled } from '@mui/system';
import { useNavigate, useLocation } from "react-router-dom";
import NavBar from '../Navbar/NavBar';
import StudentDetails from './StudentDetails';
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { auth, db } from '../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { set, ref, get } from 'firebase/database';
import { getUserData, getUserDetails } from '../HomePage/userManagement';
import AddActivity from '../Activity/AddActivity';
import EmailAvatar from '../HomePage/EmailAvatar';
import Questionaire1 from '../Questionaire/Questionaire1';

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
    flexDirection: 'row',
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
});
const ContentHalf = styled('div')({
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    overflowY: 'auto',
});

let isBArch = false;
const questions = [
    'I am good at verbal and written communication with clients, team members and others.',
    'I convey the information clearly and concisely.',
    'I build and maintain positive relationships with teachers, professors and guide.',
    'I have the ability to work well with people from diverse backgrounds.',
    'I have the necessary skills to address challenges and solve them.',
    'I make winning decisions on the spot.',
    'I am very persuasive and good at negotiating with my friends or family to get the desired outcome.',
    'I am good at resolving any conflicts that might arise within the family and friend’s circle.',
    'I am thorough in observing and recording details.',
    'I always check my work before submission and double check math formula or any number involved in the work.',
    'I efficiently manage time and resources to finish my work on time.',
    'I prioritize my tasks to ensure that I complete my work.',
    'I am flexible to adapt to changing situations.',
    'I am open to new ideas and approaches.',
    'I am motivated to finish tasks given to me.',
    'I am capable to taking decisions to ensure the work is done as required.',
];

const requiredSkillsForTargetJobs = {
    "Junior Project engineer": ["Budget Management", "Project Management & Completion", "Documentation & reporting", "Problem inspection & detection", "Quality control"],
    "Site supervisor": ["Project Management & Completion", "Site logistics & Material Management", "Safety Rules & Regulations", "Problem inspection & detection", "Quality control"],
    "Junior designer": ["Project Management & Completion", "Creativity & Design", "Market research", "Spatial Analysis/ Space planning", "Presentation skills"],
    "Civil Engineer": ["Project Management & Completion", "Safety Rules & Regulations", "Documentation & reporting", "Cost estimation & Contract drafting", "Quality control"],
    "Primavera scheduler": ["Budget Management", "Project Management & Completion", "Safety Rules & Regulations", "Data Analysis", "People management"],
    "Junior Procurement manager": ["Client & Vendor Management", "Inventory management & Stock checking", "Sourcing & Purchase order management", "Documentation & reporting", "Cost estimation & Contract drafting"],
    "Stores manager": ["Client & Vendor Management", "Inventory management & Stock checking", "Sourcing & Purchase order management", "Documentation & reporting", "Cost estimation & Contract drafting"],
    "Civil estimation & design": ["Creativity & Design", "Client & Vendor Management", "Documentation & reporting", "Market research", "Cost estimation & Contract drafting",],
    "Interior estimation & design": ["Project Management & Completion", "Creativity & Design", "Spatial Analysis/ Space planning", "Cost estimation & Contract drafting", "Presentation skills"],
    "Structural engineer": ["Project Management & Completion", "Safety Rules & Regulations", "Documentation & reporting", "Cost estimation & Contract drafting", "Quality control"],
    "Electrical engineer": ["Project Management & Completion", "Creativity & Design", "Safety Rules & Regulations", "Problem inspection & detection", "Quality control"],
    "Site engineer": ["Project Management & Completion", "Safety Rules & Regulations", "Documentation & reporting", "Quality control", "People management"],
    "Civil quantity surveyor": ["Budget Management", "Project Management & Completion", "Inventory management & Stock checking", "Documentation & reporting", "Cost estimation & Contract drafting"],
    "Site foreman": ["Project Management & Completion", "Ethics", "Safety Rules & Regulations", "Inventory management & Stock checking", "People management"],
    "React native developer": ["Project Management & Completion", "Data Analysis", "Problem inspection & detection", "Quality control", "People management"],
    "Piping / plumbing designer": ["Project Management & Completion", "Safety Rules & Regulations", "Documentation & reporting", "Problem inspection & detection", "Quality control"],
    "Electrical designer": ["Project Management & Completion", "Creativity & Design", "Safety Rules & Regulations", "Problem inspection & detection", "Quality control"],
    "Safety officer": ["Ethics", "Safety Rules & Regulations", "Documentation & reporting", "Problem inspection & detection", "People management"],
    "Junior Architect": ["Creativity & Design", "Safety Rules & Regulations", "Documentation & reporting", "Problem inspection & detection", "Presentation skills"],
    "Interior architect": ["Project Management & Completion", "Creativity & Design", "Documentation & reporting", "Spatial Analysis/ Space planning", "Presentation skills"],
    "Civil drafter": ["Project Management & Completion", "Safety Rules & Regulations", "Documentation & reporting", "Quality control", "People management"],
    "Interior drafter": ["Project Management & Completion", "Creativity & Design", "Safety Rules & Regulations", "Documentation & reporting", "Presentation skills"],
    "Field officer": ["Project Management & Completion", "Ethics", "Safety Rules & Regulations", "Documentation & reporting", "People management"],
};

let targetJobs = []

const UserDetails = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = React.useState(0);
    const location = useLocation();
    const currentRoute = location.pathname;
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTargetJobs, setSelectedTargetJobs] = useState([]);
    const [studentDetailsData, setStudentDetailsData] = React.useState({
        name: '',
        email: '',
        number: '',
        location: '',
        education: '',
        gender: '',
        college: ''
    });
    const [user, setUser] = useState(null);
    const [activityData, setActivityData] = React.useState([]);
    const [ratings, setRatings] = useState({});
    const [validationError, setValidationError] = React.useState(null);

    // const handleTabChange = (event, newValue) => {
    //     setActiveTab(newValue);
    // };

    React.useEffect(() => {

        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimer);
    }, []);

    const handleNext = () => {
        setActiveTab((prevTab) => prevTab + 1);
    };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async () => {
            setUser(getUserDetails);
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(getUserDetails);

            if (authUser) {
                try {
                    const userUid = authUser.uid;
                    const studentDetailsRef = ref(db, `users/${userUid}/studentDetails`);
                    const snapshot = await get(studentDetailsRef);
                    const studentDetailsFromDb = snapshot.val();

                    const activityDetailsRef = ref(db, `users/${userUid}/activityDetails`);
                    const snapshot2 = await get(activityDetailsRef);
                    const activityDetailsFromDb = snapshot2.val();

                    const questionaire1Ref = ref(db, `users/${userUid}/questionaire1`);
                    const snapshot3 = await get(questionaire1Ref);
                    const questionaire1FromDb = snapshot3.val();


                    if (studentDetailsFromDb) {
                        setStudentDetailsData(studentDetailsFromDb);
                    }
                    if (activityDetailsFromDb) {
                        setActivityData(activityDetailsFromDb)
                    }
                    if (questionaire1FromDb) {
                        setActivityData(questionaire1FromDb)
                    }
                } catch (error) {
                    console.error('Error fetching student details from the database:', error);
                }
            }
        });

        return () => {
            unsubscribe();
        };
    }, []);

    const handleNextClick = async () => {
        let emptyFields = [];

        switch (activeTab) {
            case 0:
                emptyFields = ['name', 'email', 'number', 'education', 'location', 'college', 'gender']
                    .filter(field => !studentDetailsData[field]);
                if (selectedTargetJobs.length < 3) {
                    emptyFields.push("Traget Jobs");
                }
                break;
            case 1:
                const missingRatings = questions.filter(question => !ratings[question]);
                if (missingRatings.length > 0) {
                    emptyFields.push("QuestionAire");
                }
                break;
            case 2:
                if (ratings.length === 0) {
                    emptyFields.push("Question page");
                }
                if (['name', 'email', 'number', 'education', 'location', 'college', 'gender']
                    .some(field => !studentDetailsData[field])) {
                    emptyFields.push("student details");
                }
                if (selectedTargetJobs.length < 3) {
                    emptyFields.push("Traget Jobs");
                }
                if (activityData.length === 0) {
                    emptyFields.push("Activity Page");
                }
                break;
            default:
                break;
        }
        if (emptyFields.length > 0) {
            const missingFields = emptyFields.join(', ');
            setValidationError(`Please fill out all fields in ${missingFields}.`);
            setTimeout(() => {
                setValidationError(null);
            }, 3000);
        } else {

            setValidationError(null);
            if (activeTab === 2) {
                try {
                    const userUid = user.uid;
                    const studentDetailsRef = ref(db, `users/${userUid}/studentDetails`);
                    const activityDetailsRef = ref(db, `users/${userUid}/activityDetails`);
                    await set(studentDetailsRef, studentDetailsData);
                    await set(activityDetailsRef, activityData);
                    navigate('/landingpage');
                } catch (error) {
                    console.error('Error writing student details to the database:', error);
                }
                navigate('/landingpage');
            } else {
                handleNext();
            }
        }
    };

    const handlePrevious = () => {
        setActiveTab((prevTab) => prevTab - 1);
    };

    const routePaths = [
        '/dashboard',
        '/userdetails',
        '/quetionairepart1',
        '/report',
    ];
    const activePageIndex = routePaths.indexOf(currentRoute);
    const renderTabContent = () => {
        switch (activeTab) {
            case 0:
                return getUserDetails ? (
                    <StudentDetails
                        data={studentDetailsData}
                        setData={setStudentDetailsData}
                        userData={getUserData}
                        userDetails={getUserDetails}
                        handleNextClick={handleNextClick}
                        selectedTargetJobs={selectedTargetJobs}
                        setSelectedTargetJobs={setSelectedTargetJobs}
                        validationError={validationError}
                    />
                ) : (
                    <StudentDetails data={studentDetailsData}
                        setData={setStudentDetailsData}
                        userData={getUserData}
                        handleNextClick={handleNextClick}
                        selectedTargetJobs={selectedTargetJobs}
                        setSelectedTargetJobs={setSelectedTargetJobs}
                        validationError={validationError} />
                );
            case 1:
                return <Questionaire1 data={ratings} setData={setRatings} handlePrevious={handlePrevious} handleNextClick={handleNextClick} validationError={validationError} questions={questions} />;
            case 2:
                return <AddActivity data={activityData} setData={setActivityData} handlePrevious={handlePrevious} handleNextClick={handleNextClick} validationError={validationError} />;
            default:
                return null;
        }
    };

    if (studentDetailsData.education === "B Arch") {
        isBArch = true;
    }
    targetJobs = selectedTargetJobs;
    return (
        <MainContainer>
            {isLoading && <FullPageLoader />}
            <FirstHalf >
                <NavBar activePage={activePageIndex} user={getUserDetails} />
            </FirstHalf>
            <ContentHalf>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexDirection: 'row-reverse', padding: '10px', width: '90%' }}>
                    <EmailAvatar />
                </div>
                {renderTabContent()}
            </ContentHalf>
        </MainContainer>
    )
}

export default UserDetails;
export { isBArch, targetJobs, requiredSkillsForTargetJobs };