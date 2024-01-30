import React from 'react';
import { Typography, TextField, Select, Grid } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/system';
import IconButton from '@mui/material/IconButton';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentNeutralRoundedIcon from '@mui/icons-material/SentimentNeutralRounded';

const MainContainer = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '63vh',
    padding: '15px'
});
const DialogContent = styled('div')({
    maxWidth: '100vw',
    overflow: 'auto',
    overflowX: 'hidden',
    '@media (max-width: 768px)': {
        width: '80%',
        padding: '5px',
    },
});

const GenerateButton = styled('button')({
    marginTop: '10px',
    backgroundColor: '#2c3a84',
    padding: '10px 25px',
    color: 'white',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: '16px',
    borderRadius: '12px',
    '&:hover': {
        background: 'black',
        color: 'white',
    },
    '@media (max-width: 768px)': {
        fontSize: '10px',
    },
});

const ActivityInput = ({ onSave, onCancel }) => {
    const isMobile = window.innerWidth <= 768;
    const [activity, setActivity] = React.useState('');
    const [highestLevel, setHighestLevel] = React.useState('');
    const [outcome, setOutcome] = React.useState('');
    const [activityType, setActivityType] = React.useState('');
    const [enjoyment, setEnjoyment] = React.useState('');
    const [allFieldsFilled, setAllFieldsFilled] = React.useState(false);
    const [saveClicked, setSaveClicked] = React.useState(false);

    const handleActivityChange = (event) => {
        setActivity(event.target.value);
    };

    const handleHighestLevelChange = (event) => {
        setHighestLevel(event.target.value);
    };

    const handleOutcomeChange = (event) => {
        setOutcome(event.target.value);
    };

    const handleActivityTypeChange = (event) => {
        setActivityType(event.target.value);
    };

    const handleEnjoymentChange = (value) => {
        setEnjoyment(value);
    };

    React.useEffect(() => {
        const isFilled = activity && highestLevel && outcome && activityType && enjoyment;
        setAllFieldsFilled(isFilled);
    }, [activity, highestLevel, outcome, activityType, enjoyment]);

    return (
        <MainContainer>
            <DialogContent>
                <Typography style={{
                    fontSize: '20px',
                    borderBottom: '2px solid #D8D0D0',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 600,
                }}>Add Activity</Typography>
                <Grid container spacing={2} style={{ paddingTop: 20 }}>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Activity<span style={{ color: 'red', marginLeft: '4px' }}>*
                            </span> (Basketball, Cricket, Olympiad, etc.)</Typography>
                        <TextField
                            variant="outlined"
                            fullWidth
                            value={activity}
                            onChange={handleActivityChange}
                            style={{ fontFamily: 'Poppins, sans-serif' }}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Activity Type<span style={{ color: 'red', marginLeft: '4px' }}>*
                            </span></Typography>
                        <Select
                            value={activityType}
                            onChange={handleActivityTypeChange}
                            fullWidth
                            sx={{ borderRadius: '12px', fontFamily: 'Poppins, sans-serif' }}
                        >
                            <MenuItem value="Team">Team</MenuItem>
                            <MenuItem value="Individual">Individual</MenuItem>
                            <MenuItem value="Both">Both</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>Highest Level of Participation*<span style={{ color: 'red', marginLeft: '4px' }}>*
                            </span></Typography>
                        <Select
                            value={highestLevel}
                            onChange={handleHighestLevelChange}
                            fullWidth
                            sx={{ borderRadius: '12px', fontFamily: 'Poppins, sans-serif' }}
                        >
                            <MenuItem value={1} >International</MenuItem>
                            <MenuItem value={0.8}>National</MenuItem>
                            <MenuItem value={0.6}>State</MenuItem>
                            <MenuItem value={0.4}>District</MenuItem>
                            <MenuItem value={0.2}>City/School</MenuItem>
                        </Select>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <Typography style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontWeight: 500,
                            fontSize: '14px'
                        }}>How was your overall performance?<span style={{ color: 'red', marginLeft: '4px' }}>*
                            </span></Typography>
                        <Select
                            value={outcome}
                            onChange={handleOutcomeChange}
                            fullWidth
                            sx={{ borderRadius: '12px', fontFamily: 'Poppins, sans-serif' }}
                        >
                            <MenuItem value={1}>Well above average</MenuItem>
                            <MenuItem value={0.8}>Above average</MenuItem>
                            <MenuItem value={0.6}>Average</MenuItem>
                            <MenuItem value={0.4}>Below Average</MenuItem>
                            <MenuItem value={0.2}>NA</MenuItem>
                        </Select>
                    </Grid>
                </Grid>
                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <Typography style={{
                        padding: '15px',
                        fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px'
                    }}>Was this activity enjoyable for you? <span style={{ color: 'red' }}>*
                        </span></Typography>
                    <div style={{ border: '1px solid black', padding: isMobile ? '13px' : '15px', borderRadius: '12px', width: isMobile ? '92' : '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <IconButton
                            aria-label="Yes"
                            onClick={() => handleEnjoymentChange(1)}
                            color={enjoyment === 1 ? 'primary' : 'default'}
                        >
                            <InsertEmoticonIcon fontSize={isMobile ? 'medium' : 'large'} />
                            <Typography style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: isMobile ? '11px' : '16px',
                            }}>Positive</Typography>
                        </IconButton>
                        <IconButton
                            aria-label="neutral"
                            onClick={() => handleEnjoymentChange(0.5)}
                            color={enjoyment === 0.5 ? 'primary' : 'default'}
                        >
                            <SentimentNeutralRoundedIcon fontSize={isMobile ? 'medium' : 'large'} />
                            <Typography style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: isMobile ? '11px' : '16px',
                            }}>Neutral</Typography>
                        </IconButton>
                        <IconButton
                            aria-label="No"
                            onClick={() => handleEnjoymentChange(0.1)}
                            color={enjoyment === 0.1 ? 'primary' : 'default'}
                        >
                            <SentimentVeryDissatisfiedIcon fontSize={isMobile ? 'medium' : 'large'} />
                            <Typography style={{
                                fontFamily: 'Poppins, sans-serif',
                                fontWeight: 500,
                                fontSize: isMobile ? '11px' : '16px',
                            }}>Negative</Typography>
                        </IconButton>
                    </div>
                </div>
                {saveClicked && !allFieldsFilled && (
                    <Typography variant="caption" color="error" style={{
                        marginTop: '10px', fontFamily: 'Poppins, sans-serif',
                        fontWeight: 500,
                        fontSize: '16px'
                    }}>
                        Please fill in all required fields.
                    </Typography>
                )}
                <div style={{
                    display: 'flex', justifyContent: 'space-between'
                }}>
                    <GenerateButton onClick={onCancel}>Cancel</GenerateButton>
                    <GenerateButton
                        onClick={() => {
                            setSaveClicked(true);
                            if (allFieldsFilled) {
                                onSave({ activity, highestLevel, outcome, activityType, enjoyment });
                            }
                        }}
                    >
                        Save
                    </GenerateButton>
                </div>
            </DialogContent>
        </MainContainer>
    );
}

export default ActivityInput;