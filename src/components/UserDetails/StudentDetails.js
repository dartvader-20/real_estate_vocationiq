import React from 'react';
import { styled } from '@mui/system';
import { TextField, Typography, Select, Grid, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';

const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'white',
    justifyContent: 'center',
    padding: 5
});
const UserDet = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10px',
    width: '80%',
    border: '2px solid #D8D0D0',
    borderRadius: '12px',
});
const GenerateButton = styled('button')({
    backgroundColor: '#2c3a84',
    padding: '10px 26px',
    color: 'white',
    marginTop: "7px",
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    borderRadius: '10px',
    '&:hover': {
        background: 'black',
        color: 'white',
    },
});

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
    "Other"
];


const StudentDetails = ({ data, setData, handleNextClick, selectedTargetJobs, setSelectedTargetJobs, validationError }) => {

    const handleNameChange = (event) => {
        setData((prevData) => ({ ...prevData, name: event.target.value }));
    };

    const handleEmailChange = (event) => {
        setData((prevData) => ({ ...prevData, email: event.target.value }));
    };

    const handleNumberChange = (event) => {
        setData((prevData) => ({ ...prevData, number: event.target.value }));
    };

    const handleLocationChange = (event) => {
        setData((prevData) => ({ ...prevData, location: event.target.value }));
    };

    const handleCollegeChange = (event) => {
        setData((prevData) => ({ ...prevData, college: event.target.value }));
    };

    const handleEducationChange = (event) => {
        setData((prevData) => ({ ...prevData, education: event.target.value }));
    };

    const handleGenderChange = (event) => {
        setData((prevData) => ({ ...prevData, gender: event.target.value }));
    };

    const handleTargetJobChange = (index) => (event) => {
        const value = event.target.value;
        if (value === "Other") {
            setSelectedTargetJobs((prevSelectedJobs) => {
                const newSelectedJobs = [...prevSelectedJobs];
                newSelectedJobs[index] = value;
                return newSelectedJobs;
            });
        } else {
            setSelectedTargetJobs((prevSelectedJobs) => {
                const newSelectedJobs = [...prevSelectedJobs];
                newSelectedJobs[index] = value;
                return newSelectedJobs;
            });
        }
    };

    const getAvailableOptions = (index) => {
        return targetJobOptions.filter((option) => !selectedTargetJobs.includes(option) || selectedTargetJobs[index] === option);
    };

    return (
        <MainContainer>
            <div style={{ display: 'flex', alignItems: 'flex-start', width: '81%' }}>
                <Typography color='black' style={{
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                    fontSize: '20px'
                }}>
                    About you
                </Typography>
            </div>
            <UserDet>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left' style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Full Name<span style={{ color: 'red', marginLeft: '4px' }}>*
                            </span>
                        </Typography>
                        <TextField
                            name="name"
                            value={data.name}
                            onChange={handleNameChange}
                            fullWidth
                            margin="normal"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left'
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px'
                            }}>Email Address<span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                        </Typography>
                        <TextField
                            name="email"
                            type='email'
                            value={data.email}
                            onChange={handleEmailChange}
                            fullWidth
                            margin="normal"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left'
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px'
                            }}>Location <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                        </Typography>
                        <TextField
                            name="location"
                            value={data.location}
                            onChange={handleLocationChange}
                            fullWidth
                            margin="normal"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left' style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Phone Number<span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                        </Typography>
                        <TextField
                            name="number"
                            type='tel'
                            value={data.number}
                            onChange={handleNumberChange}
                            margin="normal"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel id="demo-row-radio-buttons-group-label" style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px',
                                color: 'black'
                            }}>Gender<span style={{ color: 'red', marginLeft: '4px' }}>*</span></FormLabel>
                            <RadioGroup
                                row
                                aria-labelledby="demo-row-radio-buttons-group-label"
                                name="row-radio-buttons-group"
                                value={data.gender}
                                onChange={handleGenderChange}
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                }}
                            >
                                <FormControlLabel value="female" control={<Radio />} label="Female" style={{ color: 'black', fontSize: '14px', fontWeight: 500 }} />
                                <FormControlLabel value="male" control={<Radio />} label="Male" style={{ color: 'black', fontSize: '14px', fontWeight: 500 }} />
                                <FormControlLabel value="other" control={<Radio />} label="Other" style={{ color: 'black', fontSize: '14px', fontWeight: 500 }} />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left'
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px'
                            }}>College <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                        </Typography>
                        <TextField
                            name="college"
                            value={data.college}
                            onChange={handleCollegeChange}
                            fullWidth
                            margin="normal"
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography color='black' align='left' style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Education<span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                        </Typography>
                        <Select
                            value={data.education}
                            onChange={handleEducationChange}
                            fullWidth
                            style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: '14px'
                            }}
                        >
                            <MenuItem value={"B.E Civil Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>B.E Civil Engineering</MenuItem>
                            <MenuItem value={"B.E Mechanical Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>B.E Mechanical Engineering</MenuItem>
                            <MenuItem value={"Diploma in Electrical and Electronic Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>Diploma in Electrical and Electronic Engineering</MenuItem>
                            <MenuItem value={"Diploma in Electronics and Instrumentation Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>Diploma in Electronics and Instrumentation Engineering</MenuItem>
                            <MenuItem value={"Diploma in Electronics and Communication Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>Diploma in Electronics and Communication Engineering</MenuItem>
                            <MenuItem value={"Diploma in Immigration and Customs Enforcement"} style={{ fontFamily: 'Poppins, sans-serif' }}>Diploma in Immigration and Customs Enforcement</MenuItem>
                            <MenuItem value={"B.E Electrical Engineering"} style={{ fontFamily: 'Poppins, sans-serif' }}>B.E Electrical Engineering</MenuItem>
                            <MenuItem value={"B Arch"} style={{ fontFamily: 'Poppins, sans-serif' }}>B Arch</MenuItem>
                            <MenuItem value={"Other"} style={{ fontFamily: 'Poppins, sans-serif' }}>Other</MenuItem>
                        </Select>
                    </Grid>
                    {[0, 1, 2].map((index) => (
                        <Grid item xs={12} sm={6} key={index}>
                            <Typography color='black' align='left'
                                style={{
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: '14px'
                                }}>
                                {`What are your top 3 Target Roles (Target Job ${index + 1})`} <span style={{ color: 'red', marginLeft: '4px' }}>*</span>
                            </Typography>
                            {selectedTargetJobs[index] === "Other" ? (
                                <TextField
                                    value={data.otherTargetJob || ""}
                                    onChange={(event) => setData((prevData) => ({ ...prevData, otherTargetJob: event.target.value }))}
                                    fullWidth
                                    margin="normal"
                                    style={{ fontFamily: 'Poppins, sans-serif' }}
                                    required
                                />
                            ) : (
                                <Select
                                    value={selectedTargetJobs[index] || ""}
                                    onChange={handleTargetJobChange(index)}
                                    fullWidth
                                >
                                    {getAvailableOptions(index).map((option) => (
                                        <MenuItem key={option} value={option}>
                                            <Typography>
                                                {option}
                                            </Typography>
                                        </MenuItem>
                                    ))}
                                </Select>
                            )}
                        </Grid>
                    ))}
                </Grid>
                {validationError && <p style={{ color: 'red', marginTop: '10px', textAlign: 'center' }}>{validationError}</p>}
                <GenerateButton
                    onClick={handleNextClick}
                >
                    Next
                </GenerateButton>
            </UserDet>
        </MainContainer>
    );
}

export default StudentDetails;