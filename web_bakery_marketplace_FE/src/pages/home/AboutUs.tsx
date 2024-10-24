// /pages/AboutUs.tsx
import React from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import imgIntro from "../../assets/pexels-jill-wellington-1638660-433527.jpg";

const About: React.FC = () => {
    const aboutContainerStyle: React.CSSProperties = {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2rem",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
        backgroundColor: "#fefefe",
        animation: "fadeIn 1s ease-in-out",
        fontFamily: "'Roboto', sans-serif", // Ensure consistent font-family
    };

    const aboutTextStyle: React.CSSProperties = {
        flex: 9,
        padding: "1rem",
        textAlign: "justify",
        fontSize: 18,
        fontFamily: "'Roboto', sans-serif", // Add font-family explicitly here
        lineHeight: 1.8,
        color: "#333",
    };

    const aboutImageStyle: React.CSSProperties = {
        flex: 3,
        height: 250,
        borderRadius: "10px",
    };

    return (
        <div style={aboutContainerStyle}>
            <div style={aboutTextStyle}>
                <h2>Giới thiệu về chúng tôi</h2>
                <p>
                    Chúng tôi tự hào mang đến cho bạn những chiếc bánh ngọt ngon
                    nhất, được làm từ những nguyên liệu tinh túy nhất và tình yêu
                    thương dành cho nghề làm bánh.
                </p>
                <Link to="/about">
                    <Button type="primary">Tìm hiểu thêm</Button>
                </Link>
            </div>
            <img
                src={imgIntro}
                alt="Introduction"
                style={aboutImageStyle}
            />
        </div>
    );
};

export default About;
