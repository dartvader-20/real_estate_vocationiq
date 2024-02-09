import React, { useEffect, useState } from 'react'
import FullPageLoader from '../FullPageLoader/FullPageLoader';
import { styled } from '@mui/system';
import { useLocation } from "react-router-dom";
import { auth, db } from '../../firebase';
import NavBar from './NavBar';
import { onAuthStateChanged } from 'firebase/auth';
import { getUserData, getUserDetails } from '../HomePage/userManagement';
import DetailsDashboard from './DetailsDashboard';
import { ref, get, onValue, off } from 'firebase/database'
import DashboardWelcome from './DashboardWelcome';

const MainContainer = styled('div')({
    height: "100vh",
    display: 'flex',
    width: '100%',
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
    '@media (max-width: 768px)': {
        width: '50%',
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
    justifyContent: 'center',
    '@media (max-width: 768px)': {
        width: '100%',
    },
});

let dates = []
const DashboardComponent = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = React.useState(true);
    const [user, setUser] = React.useState(null);
    const currentRoute = location.pathname;
    const [data, setData] = useState([]);
    const routePaths = [
        '/dashboard',
        '/userdetails',
        '/quetionairepart1',
        '/report',
    ];
    const activePageIndex = routePaths.indexOf(currentRoute);
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
            setUser(getUserDetails);
            getData();
        });
        return () => {
            unsubscribe();
        };
    }, []);
    React.useEffect(() => {
        const loadingTimer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(loadingTimer);
    }, []);

    useEffect(() => {
        if (user && user.uid) {
            const userUid = user.uid;
            const dateRef = ref(db, `users/${userUid}/dateArray`);

            const fetchUserData = () => {
                onValue(dateRef, (snapshot) => {
                    const dataFromDb = snapshot.val();
                    if (dataFromDb) {
                        const dataArray = Object.entries(dataFromDb).map(([timestamp, yo]) => ({
                            timestamp,
                            yo,
                        }));
                        setData(dataArray);
                    }
                });
            };

            fetchUserData();
            return () => {
                off(dateRef);
            };
        }
    }, [user]);

    let name
    if (getUserData) {
        name = getUserData.name
    }

    const getData = async () => {
        if (getUserData) {
            const userUid = auth.currentUser.uid;
            const dateRef = ref(db, `users/${userUid}/dateArray`);
            const snapshot = await get(dateRef);
            dates = snapshot.val();
            console.log(dates)
        }
    }
    return (
        <MainContainer>
            {isLoading && <FullPageLoader />}
            <FirstHalf>
                <NavBar activePage={activePageIndex} user={getUserDetails} />
            </FirstHalf>
            <ContentHalf>
                {dates ? <DetailsDashboard name={name} data={data} /> : <DashboardWelcome />}
            </ContentHalf>
        </MainContainer>
    )
}

export default DashboardComponent;