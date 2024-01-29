import React from 'react'
import Avatar from '@mui/material/Avatar';
import { styled } from '@mui/system';
import { emailavatar } from './HomePage';

const StyledAvatar = styled(Avatar)(({ theme }) => ({
    width: 48,
    height: 48,
    backgroundColor: "#0074d9",
    color: "#fff",
    fontSize: 24,
    fontWeight: 'bold',
}));

const EmailAvatar = () => {
    const firstLetter = emailavatar ? emailavatar.charAt(0).toUpperCase() : '';
    return (
        <StyledAvatar>{firstLetter}</StyledAvatar>
    )
}

export default EmailAvatar