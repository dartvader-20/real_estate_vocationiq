import React from 'react'
import { Typography } from "@mui/material";

const TermsOfService = () => {
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
                ><span style={{ fontWeight: 'bold' }}>Terms of Use</span>< br /><br />
                    These Terms of Use (&quot;Terms&quot;) govern your access to and use of VocationIQ Strength Analyzer TM (the
                    &quot;Platform&quot;). By using the Platform, you agree to comply with these Terms. If you do not agree with these
                    Terms, please do not use the Platform.<br />
                    1. Acceptance of Terms<br />
                    By accessing or using the Platform, you acknowledge that you have read, understood, and agree to be
                    bound by these Terms. If you are using the Platform on behalf of an organization or entity, you
                    represent and warrant that you have the authority to bind such organization or entity to these Terms.<br /><br />
                    2. Description of the Platform<br />
                    The Platform is designed to provide strengths assessment and related services to help users identify and
                    leverage their strengths.<br /><br />
                    3. User Registration<br />
                    To access certain features of the Platform, you may be required to register for an account. You agree to
                    provide accurate, current, and complete information during the registration process and to update such
                    information to keep it accurate, current, and complete. You are responsible for maintaining the
                    confidentiality of your account credentials and for all activities that occur under your account.<br /><br />
                    4. Use of the Platform<br />
                    You agree to use the Platform in accordance with all applicable laws and regulations and for its intended
                    purpose. You will not:
                    <ul>
                        <li>Use the Platform for any unlawful or prohibited purpose.</li>
                        <li>NUse the Platform to distribute, post, or transmit any material that is unlawful, obscene,
                            defamatory, offensive, or harmful.</li>
                        <li>Attempt to gain unauthorized access to the Platform or its related systems.</li>
                        <li>Interfere with the proper functioning of the Platform.</li>
                    </ul><br /><br />
                    5. Intellectual Property<br />
                    All content, trademarks, and intellectual property on the Platform are the property of VocationIQ
                    Technologies Private Limited (“VocationIQ”). You may not use, reproduce, or distribute any content
                    from the Platform without the prior written consent of VocationIQ Technologies Private Limited.<br /><br />
                    6. Disclaimer of Warranties<br />
                    The Platform is provided &quot;as is&quot; and without warranties of any kind, either express or implied.
                    VocationIQ makes no warranties or representations regarding the accuracy, completeness, or reliability
                    of the information provided through the Platform.<br /><br />
                    7. Limitation of Liability<br />
                    To the fullest extent permitted by law, VocationIQ shall not be liable for any direct, indirect, incidental,
                    consequential, or punitive damages arising out of or in connection with your use of the Platform.<br /><br />
                    8. Termination<br />
                    VocationIQ may terminate or suspend your access to the Platform at any time, with or without cause,
                    and with or without notice.<br /><br />
                    9. Changes to Terms<br />
                    VocationIQ reserves the right to update or modify these Terms at any time. You are responsible for
                    regularly reviewing these Terms, and your continued use of the Platform after any changes constitutes
                    acceptance of those changes.<br /><br />
                    10. Governing Law<br />
                    These Terms shall be governed by and construed in accordance with the laws of India.<br /><br />
                    11. Contact Information<br />
                    If you have any questions or concerns about these Terms, please contact us at sindhu@pursuitr.com
                    By using the Platform, you acknowledge that you have read, understood, and agree to these Terms. If
                    you do not agree with these Terms, please do not use the Platform.<br /><br />
                </Typography>
            </div>
        </div>
    )
}

export default TermsOfService;