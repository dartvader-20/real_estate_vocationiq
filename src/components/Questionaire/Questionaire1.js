import React from 'react'
import { styled } from '@mui/system';
import {
    Box,
    Typography,
    RadioGroup,
    FormControlLabel,
    Radio
} from '@mui/material';

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
    width: '70vw'
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
});

let sumArrayWithSkills, percentage;
const skills = [
    "Communication",
    "Interpersonal Skills",
    "Problem solving",
    "Negotiation",
    "Attention to detail",
    "Time Management",
    "Adaptability",
    "Independence",
];

const Questionaire1 = ({ data = {}, setData, handlePrevious, handleNextClick, validationError, questions }) => {
    const handleRatingChange = (question, value) => {
        setData((prevRatings) => ({
            ...prevRatings,
            [question]: value,
        }));
    };
    const calculateSumArray = (arr) => {
        const result = [];
        for (let i = 0; i < arr.length; i += 2) {
            const firstValue = parseInt(arr[i], 10) || 0;
            const secondValue = parseInt(arr[i + 1], 10) || 0;
            result.push((firstValue + secondValue) / 10);
        }
        return result;
    };
    const sumArray = calculateSumArray(Object.values(data));
    const sum = sumArray.reduce((acc, current) => acc + current, 0);
    percentage = (sum / 8) * 100;
    sumArrayWithSkills = sumArray.reduce((acc, value, index) => {
        const skill = skills[index];
        acc[skill] = value * 100;
        return acc;
    }, {});
    console.log("sumArrayWithSkills", sumArrayWithSkills, "percentage", percentage)
    return (
        <MainContainer>
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '100%' }}>
                <Typography style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px'
                }}>
                    Which of the following do you strongly agree or disagree with? Choose 5 if you strongly agree and 1 if you strongly disagree.
                </Typography>
            </div>
            <UserDet>
                {questions.map((question, index) => (
                    <Box key={index} mb={2} sx={{ width: '50vw', border: "1px solid black", padding: 2, borderRadius: "16px" }}>
                        <Typography style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: '16px',
                            fontWeight: 600,
                        }}>
                            {index + 1}. {question}
                        </Typography>
                        <RadioGroup
                            name={`rating-${index}`}
                            style={{ display: 'flex', flexDirection: 'row' }}
                            value={data[question] || ''}
                            onChange={(event) =>
                                handleRatingChange(question, event.target.value)
                            }
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                {[1, 2, 3, 4, 5].map((value) => (
                                    <FormControlLabel
                                        key={value}
                                        value={value.toString()}
                                        control={<Radio />}
                                        label={value.toString()}
                                    />
                                ))}
                            </div>
                        </RadioGroup>
                    </Box>
                ))}
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
            </UserDet>
        </MainContainer >
    )
}

export { percentage, sumArrayWithSkills }
export default Questionaire1;