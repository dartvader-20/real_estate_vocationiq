import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from '@mui/material';
import { IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';


const highestLevelLabels = {
    1: 'International',
    0.8: 'National',
    0.6: 'State',
    0.4: 'District',
    0.2: 'City/School',
};

const outcomeLabels = {
    1: 'Well above average',
    0.8: 'Above average',
    0.6: 'Average',
    0.4: 'Below Average',
    0.2: 'NA',
};

const enjoymentLabels = {
    1: 'Yes',
    0.5: 'neutral',
    0.1: 'No',
};

const TableActivityComponent = ({ data, onDelete }) => {
    const isMobile = window.innerWidth <= 768;
    return (
        <div>
            <TableContainer component={Paper} style={{
                borderRadius: "12px", marginTop: '20px', fontFamily: 'Poppins, sans-serif'
            }}>
                <Table>
                    <TableHead style={{ background: '#2c3a84' }}>
                        <TableRow>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                Activity
                            </TableCell>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                Highest Level
                            </TableCell>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                Outcome
                            </TableCell>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                Activity Type
                            </TableCell>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                Enjoyment
                            </TableCell>
                            <TableCell
                                style={{
                                    color: 'white',
                                    fontFamily: 'Poppins, sans-serif',
                                    fontWeight: 500,
                                    fontSize: isMobile ? '10px' : '15px',
                                    border: '1px solid white'
                                }}
                            >
                                {' '}
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((activity, index) => (
                            <TableRow key={index} style={{ background: '#2C3A841A', fontFamily: 'Poppins, sans-serif' }}>
                                <TableCell style={{ border: '1px solid white', maxWidth: isMobile ? "100%" : "100%" }}>{activity.activity}</TableCell>
                                <TableCell style={{ border: '1px solid white' }}>{highestLevelLabels[activity.highestLevel]}</TableCell>
                                <TableCell style={{ border: '1px solid white' }}>{outcomeLabels[activity.outcome]}</TableCell>
                                <TableCell style={{ border: '1px solid white' }}>{activity.activityType}</TableCell>
                                <TableCell style={{ border: '1px solid white' }}>{enjoymentLabels[activity.enjoyment]}</TableCell>
                                <TableCell style={{ border: '1px solid white' }}>
                                    <IconButton aria-label="remove" onClick={() => onDelete(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>

    )
}

export default TableActivityComponent;