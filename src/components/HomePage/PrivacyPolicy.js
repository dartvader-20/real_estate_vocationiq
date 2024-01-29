import React from 'react'
import { Typography } from "@mui/material";

const PrivacyPolicy = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'column', justifyContent: 'center', padding: '10px', }} >
            <Typography style={{
                fontFamily: 'Poppins, sans-serif',
                padding: '10px',
                fontWeight: 600,
                fontSize: '30px',
                marginBottom: '15px'
            }} >
                Vocation<span style={{ color: 'red' }}>IQ</span>
            </Typography>
            <div style={{ width: '80%' }}>
                <Typography style={{
                    fontSize: '14px',
                    fontFamily: 'Poppins, sans-serif',
                    fontWeight: 500,
                }}
                ><span style={{ fontWeight: 'bold' }}>Privacy Policy</span>< br /><br />
                    1. Introduction<br />
                    Welcome to VocationIQ Strength Analyzer™ (“Platform”) created by VocationIQ Technologies Private
                    Limited (“VocationIQ”). This Privacy Policy outlines how we collect, use, disclose, and protect the
                    personal information you provide to us through the Platform. By accessing or using the Platform, you
                    consent to the practices described in this Privacy Policy.
                    During the course of the User’s usage of the Platform, VocationIQ may collect the following personal
                    and non-personal information. The information may be collected from the Users as part of the voluntary
                    registration process as well as during online survey or interaction on the Platform, as may be required
                    from time to time.<br /><br />
                    2. Information we collect from the Users<br />
                    The Platform shall / may collect the following information from the Users.
                    <ul>
                        <li>Personal Information</li>
                        <ul>
                            <li>Name</li>
                            <li>Phone number</li>
                            <li>Gender</li>
                            <li>Date of Birth / Age</li>
                            <li>Email address</li>
                            <li>Educational background</li>
                            <li>Professional experience</li>
                            <li>Extra-curricular activities</li>
                            <li>Internet Protocol Address; and </li>
                            <li>Sensitive personal data such as Passwords</li>
                            <li>Any other relevant information provided voluntarily</li>
                            <li>Another Policy</li>
                        </ul>
                        <li>Non-personal information</li>
                        <ul>
                            <li>Details of internet or telecom service provider</li>
                            <li>Location</li>
                            <li>Type of internet browser being used; and</li>
                            <li>Such other information that may be required to access and operate the Platform.</li>
                        </ul>
                    </ul>
                    In addition to the above, the duration of use of the Platform by the User may also be logged and stored
                    by the Platform.<br />
                    Except for the password needed by the User to access the Platform, VocationIQ does not collect any
                    “Sensitive Personal Data or Information”, as defined under the Information Technology (Reasonable
                    Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011 (hereinafter
                    referred to as “IT Rules, 2011”).<br /><br />
                    3. How We Use Your Information<br />
                    We use the collected information for the following purposes:
                    <ul>
                        <li>To provide access to and use of the Platform’s features and services.</li>
                        <li>To conduct strength assessments and provide related analysis.</li>
                        <li>To communicate with users regarding their assessments, results, and recommendations.</li>
                        <li>To improve the Platform’s functionality, user experience, and customer service.</li>
                        <li>To personalize user experience by tailoring content and recommendations.</li>
                        <li>To send promotional and informational content, subject to user preferences.</li>
                        <li>To comply with legal obligations and enforce our terms of use.</li>
                    </ul><br /><br />
                    4. Data Sharing and Disclosure<br />
                    We may share your personal information under the following circumstances:
                    <ul>
                        <li>With service providers and vendors who assist in Tool operations.</li>
                        <li>With educational institutions, employers, or other parties you authorize to receive your assessment results.</li>
                        <li>With legal and regulatory authorities as required by law or to protect our rights and interests.</li>
                        <li>In connection with a merger, acquisition, or sale of all or a portion of our assets, subject to confidentiality measures.</li>
                    </ul><br /><br />
                    5. Security<br />
                    We implement technical and organizational measures to safeguard your personal information. However,
                    no method of transmission or storage is completely secure. We cannot guarantee the absolute security
                    of your information.<br /><br />
                    6. International Transfer<br />
                    Your information may be processed in, or transferred to, other countries outside of India.<br /><br />
                    7. Children's Privacy<br />
                    The Platform is not intended for individuals under the age of 13. We do not knowingly collect personal
                    information from children under 13. If you believe we have collected such information, please contact
                    us immediately.<br /><br />
                    8. Updates to this Privacy Policy<br />
                    We may update this Privacy Policy from time to time. We will notify you of significant changes by
                    posting a prominent notice on the Tool or by sending you an email.<br /><br />
                    9. Contact Us<br />
                    If you have any questions or concerns about this Privacy Policy, please contact us at
                    sindhu@pursuitr.com<br />
                    This Privacy Policy is governed by and construed under the laws of India.<br />
                    By using the Platform, you acknowledge that you have read and understood this Privacy Policy and
                    consent to the collection and use of your personal information as described herein.<br /><br />
                </Typography>
            </div>
        </div >
    )
}

export default PrivacyPolicy;