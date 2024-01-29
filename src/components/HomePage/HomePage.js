import React from "react";
import { styled } from '@mui/system';
import { useNavigate } from "react-router-dom";
import { TextField, Typography } from "@mui/material";
import imageUrl from "../images/image";
import InputLabel from '@mui/material/InputLabel';
import { auth, db } from "../../firebase";
import EmailIcon from '@mui/icons-material/Email';
import Input from '@mui/material/Input';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import FullPageLoader from "../FullPageLoader/FullPageLoader";
import { ref, get } from 'firebase/database';
import { setUserData, setUserDetails, setUserPresent } from "./userManagement";
import { signInWithEmailAndPassword } from "firebase/auth";

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
});
const ImageHalf = styled('div')({
    flex: 1,
    background: `url(${imageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
});
const ContentHalf = styled('div')({
    flex: 1,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: 'black',
    justifyContent: 'center',
    textAlign: 'start',
});
const GenerateButton = styled('button')({
    marginTop: '15px',
    backgroundColor: '#2c3a84',
    padding: '10px 26px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    color: 'white',
    height: '50px',
    borderRadius: '10px',
    fontSize: '16px',
    "&:hover": {
        background: 'black',
        color: 'white'
    },
});
const GeneratePaleButton = styled('button')({
    marginTop: '15px',
    backgroundColor: '#2c3a84',
    opacity: '0.1',
    padding: '10px 26px',
    fontFamily: 'Poppins, sans-serif',
    color: 'white',
    height: '50px',
    fontWeight: 500,
    borderRadius: '10px',
    fontSize: '16px',
});

let emailavatar;

const HomePage = () => {
    const navigate = useNavigate();
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorSama, setError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);
    const [agree, setAgree] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);

    const onSubmit = async (e) => {
        e.preventDefault()

        await signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                setIsLoading(true);
                const user = userCredential.user;
                setUserDetails(user);
                checkUserAvailable(user)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log("err", error)
                setError("Invalid User/ password")
                setTimeout(() => {
                    setError(null);
                }, 3000);
                console.log(errorCode, errorMessage, error);
            });
    }

    const checkUserAvailable = async (authUser) => {
        if (authUser) {
            const userUid = authUser.uid;
            const studentDetailsRef = ref(db, `users/${userUid}/studentDetails`);

            try {
                const snapshot = await get(studentDetailsRef);
                if (snapshot.exists()) {
                    setUserPresent(true);
                    setUserData(snapshot.val());
                    navigate("/dashboard")
                } else {
                    setUserPresent(false);
                    navigate("/dashboard")
                }
            } catch (error) {
                console.error('Error checking student details data:', error);
            }
        }
    }
    const handleCheckBox = () => {
        setAgree(!agree);
    }
    if (email != null) {
        emailavatar = email;
    }
    return (
        <MainContainer>
            {isLoading && <FullPageLoader />}
            <ImageHalf>
            </ImageHalf>
            <ContentHalf>
                <Typography variant="h4" component="h2"
                    style={{
                        fontFamily: 'Poppins, sans-serif', fontSize: '40px',
                        padding: '20px', fontWeight: 'bold'
                    }}>
                    Vocation<span style={{ color: 'red' }}>IQ</span>
                </Typography>
                <Typography variant='h5' style={{ textDecoration: 'underline', textDecorationColor: 'GrayText', fontFamily: 'Poppins, sans-serif' }}>LogIn</Typography>
                {errorSama && <Typography variant="danger">{errorSama}</Typography>}
                <FormControl sx={{ m: 1, }} variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Email
                    </InputLabel>
                    <Input
                        id="input-with-icon-adornment"
                        color="secondary"
                        size='medium'
                        label="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={{ width: 300 }}
                        startAdornment={
                            <EmailIcon position="start" style={{ padding: '5px' }}>
                                <AccountCircle />
                            </EmailIcon>
                        }
                    />
                </FormControl>
                <FormControl sx={{ m: 1 }} variant="standard">
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        variant='standard'
                        label="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ width: '300px', height: '50px' }}
                        size='medium'
                        required
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            ),
                        }}
                    />
                </FormControl>
                <div style={{ display: 'flex', flexDirection: 'row', paddingTop: '10px' }}>
                    <TextField type='checkbox' value={agree} onChange={handleCheckBox} />
                    <Typography style={{ paddingLeft: '9px', fontFamily: 'Poppins, sans-serif', fontSize: '16px' }}> I accept the <span onClick={() => navigate('/privacypolicy')}
                        style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit', }}>Privacy Policy</span> and the<br /><span onClick={() => navigate('/termsofservice')}
                            style={{ cursor: 'pointer', textDecoration: 'underline', color: 'inherit', }} > Terms of Service</span></Typography>
                </div>
                {
                    !agree ? <GeneratePaleButton disabled={!agree} >Log In</GeneratePaleButton> : <GenerateButton onClick={onSubmit}>Log In</GenerateButton>

                }
            </ContentHalf>
        </MainContainer >

    );
}

export { emailavatar };
export default HomePage;