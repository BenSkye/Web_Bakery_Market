import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, message, Spin, Button } from 'antd';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { verifyEmail } from '../../services/authenService'; // Assuming this handles API request

const { Title, Text } = Typography;

const VerifyEmail: React.FC = () => {
    const [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true); // State for loading
    const [verified, setVerified] = useState<boolean | null>(null); // State for verification result
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();

    // Capture the token from the URL and verify it
    useEffect(() => {
        const token = searchParams.get('token');
        console.log('Verification token:', token);

        // Guard clause for no token
        if (!token) {
            setVerified(false);
            messageApi.error('No verification token provided.');
            setLoading(false);
            return;
        }

        const verifyUserEmail = async () => {
            try {
                const response = await verifyEmail(token);
                console.log('Verify email response:', response);


                if (response && response.status === 200) {
                    setVerified(true);
                    messageApi.success('Your email has been successfully verified.');
                }
            } catch (error) {
                console.error('Error verifying email:', error);
                setVerified(false);
                messageApi.error('Failed to verify email. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        verifyUserEmail();
    }, [searchParams]);

    const handleNavigateLogin = () => {
        navigate('/login'); // Navigate to login page
    };

    return (
        <Row justify="center" align="middle" style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {contextHolder}
            <Col xs={24} sm={16} md={12} lg={8}>
                <div style={{
                    padding: '24px',
                    background: '#fff',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
                    textAlign: 'center'
                }}>
                    <Title level={2}>Email Verification</Title>

                    {loading ? (
                        <Spin size="large" />
                    ) : (
                        <>
                            {verified ? (
                                <>
                                    <Text>Your email has been successfully verified!</Text>
                                    <Button
                                        type="primary"
                                        style={{ marginTop: '16px' }}
                                        onClick={handleNavigateLogin}
                                    >
                                        Go to Login
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Text type="danger">Email verification failed. The token might be invalid or expired.</Text>
                                    <Button
                                        type="default"
                                        style={{ marginTop: '16px' }}
                                        onClick={() => navigate('/resend-verification')}
                                    >
                                        Resend Verification Email
                                    </Button>
                                </>
                            )}
                        </>
                    )}
                </div>
            </Col>
        </Row>
    );
};

export default VerifyEmail;
