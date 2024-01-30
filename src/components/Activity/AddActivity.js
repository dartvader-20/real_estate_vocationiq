import React from 'react'
import { styled } from '@mui/system';
import ActivityInput from './ActivityInput';
import { Typography, Dialog } from '@mui/material';
import TableActivityComponent from './TableActivityComponent';
import image3URL from '../images/image3';

const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 10
});
const UserDet = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    border: '1px solid #D8D0D0',
    borderRadius: '12px',
    width: '70vw',
    '@media (max-width: 768px)': {
        width: '100%',
        padding: '5px',
    },
});
const GenerateButton = styled('button')({
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

let activitiesDATA = 0;
let activityLevel, activityEnjoy, activityOutcome;

const AddActivity = ({ data, setData, handlePrevious, handleNextClick, validationError }) => {
    const [showDialog, setShowDialog] = React.useState(false);
    const isMobile = window.innerWidth <= 768;
    const handleAddButtonClick = () => {
        setShowDialog(true);
    };

    const handleActivityDelete = (index) => {
        const newData = [...data];
        newData.splice(index, 1);
        setData(newData);
    };

    const handleActivitySave = (activity) => {
        setData(prevActivities => [...prevActivities, activity]);
        setShowDialog(false);
    };

    const handleActivityCancel = () => {
        setShowDialog(false);
    };

    activityLevel = data.map(obj => obj.highestLevel);
    activityEnjoy = data.map(obj => obj.enjoyment);
    activityOutcome = data.map(obj => obj.outcome);
    activitiesDATA = data.map(obj => obj.activity);

    return (
        <MainContainer>
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Typography color='black' style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: isMobile ? '13px' : '20px',
                }}>
                    Extra Curricular Activities, Projects, and other Interests
                </Typography>
            </div>
            <UserDet>
                {data.length === 0 && (<div>
                    <Typography style={{
                        fontSize: isMobile ? '10px' : '14px', fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                    }}
                        color='black'>Experiences gained through extracurricular activities play a pivotal role in shaping your personal and professional growth,
                        contributing to a broader skill set, enhanced social interactions, and self-knowledg </Typography>
                    <p>

                    </p>
                    <Typography
                        style={{
                            fontSize: isMobile ? '10px' : '14px', fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                        }}>
                        Please include all extracurricular activities in which you have participated, encompassing clubs, sports, artistic pursuits,
                        volunteering, or any other forms of engagement beyond your academic studies.
                    </Typography>
                    <div style={{ height: isMobile ? "250px" : '350px', display: 'flex', alignItems: 'center', justifyContent: 'center', }}>
                        <img src={image3URL} alt='activityLogo' style={{ height: '80%' }} />
                    </div>
                </div>)
                }
                {data.length > 0 && (
                    <TableActivityComponent data={data} onDelete={handleActivityDelete} />
                )}
                <GenerateButton onClick={handleAddButtonClick} style={{ marginTop: isMobile ? 5 : '10px' }}>
                    Add Activity
                </GenerateButton>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <GenerateButton
                        onClick={handlePrevious}
                    >
                        Previous
                    </GenerateButton>
                    {validationError && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{validationError}</p>}
                    <GenerateButton
                        onClick={handleNextClick}
                    >
                        Next
                    </GenerateButton>
                </div>
                <Dialog open={showDialog} onClose={() => setShowDialog(false)} PaperProps={{
                    style: {
                        minWidth: '58%', position: 'absolute',
                        top: '45%',
                        left: isMobile ? '50%' : '58%',
                        transform: 'translate(-50%, -50%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }}>
                    <ActivityInput onSave={handleActivitySave} onCancel={handleActivityCancel} />
                </Dialog>
            </UserDet>
        </MainContainer>
    )
}

export { activitiesDATA, activityLevel, activityEnjoy, activityOutcome };
export default AddActivity;