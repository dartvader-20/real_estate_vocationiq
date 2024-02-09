import React, { useEffect } from "react";
import { styled } from '@mui/system';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Box,
    Paper
} from '@mui/material';
import { getUserDetails } from '../HomePage/userManagement';
import NavBar from "../Navbar/NavBar";
import EmailAvatar from "../HomePage/EmailAvatar";
import { matchPercentages } from "../Questionaire/Questionaire2";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { auth, db } from "../../firebase";
import { get, set, ref } from 'firebase/database';
import { targetJobs } from "../UserDetails/UserDetails";
import { sumArrayWithSkills } from "../Questionaire/Questionaire1";
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { techKnowledgeScore, academicKnowledgeScore, designKnowledgeScore, answersStorage1 } from "../Questionaire/Questionaire4";
import { isBArch } from "../UserDetails/UserDetails";
import { answersStorage } from "../Questionaire/Questionaire3";

let time;

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
    marginTop: '10px',
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

const coursesMap = {
    "Junior Project engineer": "Building Information Modeling, Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Civil 3D, RCC Manual, Vastu Consultancy",
    "Site supervisor": "Building Information Modeling, Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Civil 3D, RCC Manual, Vastu Consultancy",
    "Junior designer": "Building Information Modeling, Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Civil Engineer": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), QS estimation & Billing, Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Primavera scheduler": "Building Information Modeling, Primvera P6 Building Constrution, Primavera Metro, Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying and GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Junior Procurement manager": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), QS estimation & Billing, Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Stores manager": "Soft skills, Product Knowledge and Orientation",
    "Civil estimation & design": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Interior estimation & design": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), QS estimation & Billing, Building Information Modeling, Construction Management, Tendering, Surveying & GIS, Civil 3D, Vastu Consultancy",
    "Structural engineer": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), QS estimation & Billing, Building Information Modeling, Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Electrical engineer": "AC Design Level, HVAC Drafting",
    "Site engineer": "Building Information Modeling, Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Civil quantity surveyor": "Property Valuation Advanced, Property Valuation Basic, Building Estimation BBS Combo (Buildings), QS estimation & Billing, Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Site foreman": "Construction Management, Tendering, Civil 3D, RCC Manual, Vastu Consultancy",
    "React native developer": "JavaScript and ES6, React and Redux,React Native Fundamentals, Navigation in React Native, API Integration",
    "Piping / plumbing designer": "Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, Vastu Consultancy",
    "Electrical designer": "AC Design Level, HVAC Drafting",
    "Safety officer": "Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Junior Architect": "Building Estimation BBS Combo (Buildings), Tendering, Surveying & GIS, Civil 3D, Vastu Consultancy",
    "Interior architect": "Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, Vastu Consultancy",
    "Civil drafter": "Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Interior drafter": "Building Estimation BBS Combo (Buildings), Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
    "Field officer": "Construction Management, Tendering, Surveying & GIS, Civil 3D, RCC Manual, Vastu Consultancy",
};

const GeneratePdf = async (data) => {
    const addResponsesToArray = async (userUid) => {
        const dateRef = ref(db, `users/${userUid}/dateArray`);
        const snapshot = await get(dateRef);
        const existingDates = snapshot.val() || {};

        const newTimestamp = new Date().toString();
        const dateObject = new Date(newTimestamp);
        const formattedDate = dateObject.toISOString().split('T')[0];
        existingDates[newTimestamp] = data;
        time = formattedDate
        set(dateRef, existingDates);
    }
    const doc = new jsPDF();
    const userUid = auth.currentUser.uid;
    const studentDetailsRef = ref(db, `users/${userUid}/studentDetails`);
    const snapshot = await get(studentDetailsRef);
    const studentDetails = snapshot.val();
    await addResponsesToArray(userUid);
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
    doc.setFont('times', 'bold');
    doc.setFontSize(28);
    doc.text("Vocation", 85, 20)
    doc.setTextColor(255, 0, 0)
    doc.text("IQ", 122.5, 20)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16);
    doc.text("VocationIQ Strength Analyzer - Strength Assessment Report", 30, 35)
    if (studentDetails && studentDetails.name) {
        const studentName = studentDetails.name;
        doc.text(`Name: ${studentName}`, 10, 50);
    } else {
        doc.text("Name: N/A", 10, 50);
    }
    doc.text(`Date: ${time}`, 10, 60);
    doc.text("Target Jobs:", 10, 70)
    for (let i = 0; i < targetJobs.length; i++) {
        doc.setFontSize(14);
        doc.text(`${i + 1}. ${targetJobs[i]}`, 42.5, 70 + (i * 10))
    }
    doc.setFontSize(12);
    doc.text("© VocationIQ Technologies Private Limited", 10, 290)
    doc.addPage()
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("Vocation", 160, 13)
    doc.setTextColor(255, 0, 0)
    doc.text("IQ", 188, 13)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16);
    doc.text("Results", 10, 18);
    doc.setFontSize(12);
    doc.setFont("times", "normal");
    const content = `
    Congratulations on completing your self-evaluation!
    Here are the results. 
    `
    doc.text(content, 10, 25)
    doc.setFont('times', 'bold');
    doc.text("Technical Assessment Results:", 10, 45)
    if (isBArch) {
        const columns = ["Knowledge", "Score"];
        const rows = []
        rows.push(["Technical Knowledge", `${techKnowledgeScore}%`])
        rows.push(["Academic Knowledge", `${academicKnowledgeScore}%`])
        rows.push(["Design Knowledge", `${designKnowledgeScore}%`])
        autoTable(doc, {
            head: [columns],
            body: rows,
            startY: 170,
            theme: "grid",
            headStyles: { textColor: "#ffffff", lineColor: "#808080", lineWidth: 0.3, fontSize: 13, },
            styles: { textColor: [0, 0, 1], lineColor: "#808080", lineWidth: 0.3, fontSize: 9, },
            columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } },
        });
        doc.setFont('times', 'bold');
        doc.text("Knowledge Results:", 10, 165)
        const column = ['Category', 'Response'];
        console.log("dcdcd", answersStorage1)
        let dataa = Object.keys(answersStorage1).map(function (key) {
            return [key, answersStorage1[key]];
        });
        autoTable(doc, {
            head: [column],
            body: dataa,
            startY: 50,
            theme: "grid",
            headStyles: { textColor: "#ffffff", lineColor: "#808080", lineWidth: 0.3, fontSize: 13, },
            styles: { textColor: [0, 0, 1], lineColor: "#808080", lineWidth: 0.3, fontSize: 9, },
            columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } },
        });
    }
    else {
        const column = ['Category', 'Response'];
        let dataaa = Object.keys(answersStorage).map(function (key) {
            return [key, answersStorage[key]];
        });
        autoTable(doc, {
            head: [column],
            body: dataaa,
            startY: 50,
            theme: "grid",
            headStyles: { textColor: "#ffffff", lineColor: "#808080", lineWidth: 0.3, fontSize: 13, },
            styles: { textColor: [0, 0, 1], lineColor: "#808080", lineWidth: 0.3, fontSize: 9, },
            columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' } },
        });
    }
    doc.setFontSize(12);
    doc.text("© VocationIQ Technologies Private Limited", 10, 290)
    doc.addPage()
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("Vocation", 160, 13)
    doc.setTextColor(255, 0, 0)
    doc.text("IQ", 188, 13)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16);
    doc.text(`Soft Skill Report:  `, 10, 15)
    doc.setFont("times", "bold");
    doc.setFontSize(12);
    const categories = [
        { name: 'People skills', skills: ['Communication', 'Interpersonal Skills', 'Negotiation'] },
        { name: 'Critical Thinking & Reasoning', skills: ['Problem solving', 'Attention to detail', 'Independence'] },
        { name: 'Versatility', skills: ['Independence', 'Adaptability', 'Negotiation'] },
        { name: 'Productivity', skills: ['Time Management', 'Independence', 'Problem solving'] },
        { name: 'Planning & organizing', skills: ['Time Management', 'Attention to detail', 'Problem solving'] },
        { name: 'Team Work', skills: ['Communication', 'Problem solving', 'Interpersonal Skills'] },
    ];

    const skillsHeader = ['Soft Skill', 'Percentage'];
    const skillsRows = categories.map(category => {
        const categoryPercentage = category.skills.reduce((acc, skill) => acc + sumArrayWithSkills[skill], 0) / 3;
        return [category.name, `${categoryPercentage.toFixed(2)}%`];
    });

    autoTable(doc, {
        head: [skillsHeader],
        body: skillsRows,
        startY: 20,
        theme: "grid",
        headStyles: { textColor: "#ffffff", lineColor: "#808080", lineWidth: 0.3, fontSize: 13, },
        styles: { textColor: [0, 0, 1], lineColor: "#808080", lineWidth: 0.3, fontSize: 9, },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 'auto' } },
    });
    doc.setFont('times', 'bold');
    doc.text("(Synergy) People Skills:", 10, 80)
    doc.setFont("times", "normal");
    const content1 = `
    score indicates the ability to effectively communicate, showcase interpersonal skills, and negotiate. It signifies
    the combined effect of these abilities working together, resulting in a more powerful and effective impact in 
    various personal and professional interactions, fostering understanding, collaboration, and successful 
    outcomes.
    `
    doc.text(content1, 10, 82.5)
    doc.setFont('times', 'bold');
    doc.text("(Precision) Critical Thinking & Reasoning:", 10, 110)
    doc.setFont("times", "normal");
    const content2 = `
    score indicates ability to holistically approach any given task, to take up problem-solving with meticulous 
    attention to detail and the ability to work independently. It denotes a focused and accurate execution of 
    responsibilities, ensuring thoroughness, reliability, and effective resolution of challenges with a keen eye 
    for specifics.
    `
    doc.text(content2, 10, 112.5)
    doc.setFont('times', 'bold');
    doc.text("(Flexibility) Versatility:", 10, 145)
    doc.setFont("times", "normal");
    const content3 = `
    score indicates multifaceted approach to challenges. It encompasses independence by self-reliantly navigating 
    diverse situations, adaptability in adjusting to changing environments, and negotiation skills in effectively
    engaging with others. This combination fosters a dynamic and resourceful ability to thrive in various contexts.
    `
    doc.text(content3, 10, 147.5)
    doc.setFont('times', 'bold');
    doc.text("(Efficiency) Productivity:", 10, 175)
    doc.setFont("times", "normal");
    const content4 = `
    score represents the individual’s ability to optimize resource allocation, proactively taking initiative to address 
    challenges, and systematically solving problems. This combination ensures streamlined processes, timely
    execution, and a proactive approach to achieving goals with optimal use of time and resources.
    `
    doc.text(content4, 10, 177.5)
    doc.setFont('times', 'bold');
    doc.text("(Resourcefulness) Planning & Organization:", 10, 205)
    doc.setFont("times", "normal");
    const content5 = `
    score encapsulates the adept utilization of time, adaptability, and problem-solving skills. It signifies the ability 
    to efficiently manage time, swiftly adapt to changing circumstances, and creatively solve problems. A 
    resourceful individual navigates challenges adeptly, ensuring optimal outcomes in diverse situations.
    `
    doc.text(content5, 10, 207.5)
    doc.setFont('times', 'bold');
    doc.text("(Collaboration)Team work:", 10, 235)
    doc.setFont("times", "normal");
    const content6 = `
    score indicates one ability to effectively engage within the team to collectively address challenges, fostering 
    open communication channels, and leveraging diverse strengths. Collaborative efforts enhance problem-solving
    by tapping into a collective pool of ideas, insights, and expertise.
    `
    doc.text(content6, 10, 237.5)
    doc.setFontSize(12);
    doc.text("© VocationIQ Technologies Private Limited", 10, 290)
    doc.addPage()
    doc.rect(5, 5, doc.internal.pageSize.width - 10, doc.internal.pageSize.height - 10, 'S');
    doc.setFont("times", "bold");
    doc.setFontSize(20);
    doc.text("Vocation", 160, 13)
    doc.setTextColor(255, 0, 0)
    doc.text("IQ", 188, 13)
    doc.setTextColor(0, 0, 0)
    doc.setFontSize(16);
    doc.text("Report", 10, 15);
    const columns = ["Target Jobs", "Courses", "Percentage"];
    const rows = data.map(item => [item.targetJob, item.courses, `${item.percentage}%`]);
    autoTable(doc, {
        head: [columns],
        body: rows,
        startY: 18,
        theme: "grid",
        headStyles: { textColor: "#ffffff", lineColor: "#808080", lineWidth: 0.3, fontSize: 9.5, },
        styles: { textColor: [0, 0, 1], lineColor: "#808080", lineWidth: 0.3, fontSize: 8, },
        columnStyles: { 0: { cellWidth: 'auto' }, 1: { cellWidth: 'auto' }, 2: { cellWidth: 'auto' } },
    });
    doc.setFontSize(12);
    doc.text("© VocationIQ Technologies Private Limited", 10, 290)
    doc.save("SWOT analysis report.pdf");
}

const Computation = () => {
    const [sortedMatchData, setSortedMatchData] = React.useState([]);
    const isMobile = window.innerWidth <= 768;
    const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
    useEffect(() => {
        const sortedMatchData = Object.entries(matchPercentages)
            .sort(([, a], [, b]) => b - a)
            .map(([targetJob, percentage]) => ({
                targetJob,
                courses: coursesMap[targetJob],
                percentage: percentage.toFixed(2),
            }));

        setSortedMatchData(sortedMatchData);
    }, []);
    const handleGeneratePdf = async () => {
        GeneratePdf(sortedMatchData);
    };
    const routePaths = [
        '/userdetails',
        '/dashboard',
        '/quetionaire1',
    ];
    const activePageIndex = routePaths.indexOf('/quetionaire1');
    const sortedMatchPercentages = Object.entries(matchPercentages)
        .sort(([, a], [, b]) => b - a)
        .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
        }, {});
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
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: '92%' }}>
                    <Typography
                        color='black'
                        style={{
                            fontFamily: 'Poppins, sans-serif',
                            fontSize: isMobile ? '12px' : '20px',
                            fontWeight: 600,
                            marginTop: '7%',
                            marginLeft: isMobile ? 0 : '8px'
                        }}
                    >
                        Congratulations! You have completed the assessment
                    </Typography>
                    <EmailAvatar />
                </div>
                <div style={{ display: "flex", alignItems: 'center', justifyContent: 'space-between', width: isMobile ? '80%' : '92%', flexDirection: 'column' }}>
                    <Box sx={{ border: '2px solid black', borderRadius: '16px', padding: 5 }}>
                        <TableContainer component={Paper} style={{ borderRadius: "12px", marginTop: isMobile ? "5px" : '20px', fontFamily: 'Poppins, sans-serif' }}>
                            <Table>
                                <TableHead style={{ background: '#2c3a84' }}>
                                    <TableRow>
                                        <TableCell style={{
                                            color: 'white',
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 500,
                                            fontSize: isMobile ? '12px' : '15px',
                                            border: '1px solid white'
                                        }}>Target Job</TableCell>
                                        <TableCell style={{
                                            color: 'white',
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 500,
                                            fontSize: isMobile ? '12px' : '15px',
                                            border: '1px solid white'
                                        }}>Courses</TableCell>
                                        <TableCell style={{
                                            color: 'white',
                                            fontFamily: 'Poppins, sans-serif',
                                            fontWeight: 500,
                                            fontSize: isMobile ? '12px' : '15px',
                                            border: '1px solid white'
                                        }}>Percentage</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {Object.entries(sortedMatchPercentages).map(([targetJob, percentage]) => (
                                        <TableRow key={targetJob} style={{ background: '#2C3A841A', fontFamily: 'Poppins, sans-serif' }}>
                                            <TableCell style={{ border: '1px solid white', fontSize: isMobile ? '12px' : '15px', }}>{targetJob}</TableCell>
                                            <TableCell style={{ border: '1px solid white', fontSize: isMobile ? '10px' : '15px', }}>{coursesMap[targetJob]}</TableCell>
                                            <TableCell style={{ border: '1px solid white', fontSize: isMobile ? '12px' : '15px', }}>{percentage.toFixed(2)}%</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Box>
                    <GenerateButton2 onClick={handleGeneratePdf}>Download Detailed Report</GenerateButton2>
                </div>
            </ContentHalf>
        </MainContainer>
    )
}

export default Computation;