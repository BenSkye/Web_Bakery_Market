// /pages/Home.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Carousel, Card, Button, Row, Col } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import Map from "../../utils/mapbox/Map";
import banner1 from "../../assets/_394e20f4-1a3d-47ea-aea9-b3dfb2e1bbc6.jpg";
import {
  LeftOutlined,
  RightOutlined,
  BulbOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import imgIntro from "../../assets/pexels-jill-wellington-1638660-433527.jpg";
import { getBakeries, Bakery } from "../../services/bakeriesService";
import { getWorkshops, Workshop } from "../../services/workshopsService";
import SpinLoading from "../../components/loading/SpinLoading";
import StoreCard from '../../components/card/CardStore';
import WorkShopCard from '../../components/card/CardWorkshop';
import About from './AboutUs';
import TryCake3D from '../3D/Try3D';

const HomePage: React.FC = () => {
  const [bakeries, setBakeries] = useState<Bakery[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBakeries = async () => {
      try {
        setLoading(true);
        const data = await getBakeries();
        setBakeries(data.metadata);
      } catch (error) {
        console.error("Failed to fetch bakeries:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBakeries();
  }, []);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        setLoading(true);
        const data = await getWorkshops();
        setWorkshops(data);
      } catch (error) {
        console.error("Failed to fetch workshops:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []);

  const homeContainerStyle: React.CSSProperties = {
    textAlign: "center",
    position: "relative",
  };

  const bannerCarouselStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
    overflow: "hidden",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.4)",
  };

  const bannerImageStyle: React.CSSProperties = {
    width: "100%",
    height: "500px",
    objectFit: "cover",
    filter: "brightness(70%)",
  };

  const overlayContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    zIndex: 1,
  };

  const sloganStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "20px",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontStyle: "italic",
    color: "#fff", // Enhance text contrast
    textShadow: "2px 2px 5px rgba(0, 0, 0, 0.5)",
  };

  // Spring animation for the text
  const springPropsH1 = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { tension: 200, friction: 15 },
    delay: 200, // Delay for the h1
  });

  const springPropsH4 = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { tension: 200, friction: 15 },
    delay: 400, // Delay for the h4
  });

  const springPropsContainer = useSpring({
    from: { opacity: 0, transform: "translate3d(0,-40px,0)" },
    to: { opacity: 1, transform: "translate3d(0,0px,0)" },
    config: { tension: 200, friction: 15 },
    delay: 400, // Delay for the container
  });

  const buttonStyle: React.CSSProperties = {
    marginTop: "20px",
    backgroundColor: "#ff6347", // Bright and bold color
    border: "none",
    borderRadius: "8px",
    boxShadow: "0px 4px 6px rgba(0,0,0,0.2)",
    transition: "background-color 0.3s ease",
  };

  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  const introductionContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#fefefe",
    marginTop: "2rem",
    animation: "fadeIn 1s ease-in-out",
  };

  return (
    <div style={homeContainerStyle}>
      <Row gutter={[32, 32]} align="middle">
        <Col xs={24} md={12}>
          <Card style={{ background: 'none', border: 'none' }}>
            <TryCake3D />
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <animated.div style={{ ...overlayContainerStyle }}>
            <div style={sloganStyle}>
              <animated.h1 style={springPropsH1}>TỰ DO SÁNG TẠO</animated.h1>
              <animated.h4 style={springPropsH4}>
                Thiết kế chiếc bánh của bạn
              </animated.h4>
            </div>
            <Link to="/listStoreAcceptDesign">
              <Button
                type="primary"
                size="large"
                className="button-hover"
                style={buttonStyle}
              >
                Bắt tay vào làm
              </Button>
            </Link>
          </animated.div>
          <Carousel autoplay style={bannerCarouselStyle}>
            <div>
              <img src={banner1} alt="Banner 1" style={bannerImageStyle} />
            </div>
            <div>
              <img src={banner1} alt="Banner 2" style={bannerImageStyle} />
            </div>
            <div>
              <img src={banner1} alt="Banner 3" style={bannerImageStyle} />
            </div>
          </Carousel>
        </Col>
      </Row>

      {/* Bakeries Section */}
      <Col style={{ marginTop: "4rem" }}>
        <animated.h1
          style={{
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
            ...springPropsContainer,
          }}
        >
          Cửa hàng tại
          <span style={{ color: "red", marginLeft: "8px" }}>Hồ Chí Minh</span>
          <IoStorefrontOutline style={{ marginLeft: "8px" }} />
        </animated.h1>
        <Row gutter={[16, 16]} justify="center">
          <div className="scroll-container" ref={scrollRef}>
            {loading ? (
              <SpinLoading />
            ) : (
              bakeries?.map((bakery, index) => (
                <div key={index} className="card-wrapper">
                  <StoreCard key={index} bakery={bakery} />
                </div>
              ))
            )}
          </div>
          <Button className="scroll-button left" onClick={scrollLeft}>
            <LeftOutlined />
          </Button>
          <Button className="scroll-button right" onClick={scrollRight}>
            <RightOutlined />
          </Button>
        </Row>
      </Col>

      {/* Workshop Section */}
      <Col style={{ marginTop: "2rem" }}>
        <animated.h1
          style={{
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
            ...springPropsContainer,
          }}
        >
          Hội thảo
          <BulbOutlined style={{ marginLeft: "8px" }} />
        </animated.h1>
        <Row gutter={[16, 16]}>
          {loading ? (
            <SpinLoading />
          ) : (
            workshops.map((workshop, index) => (
              <Col key={index} xs={24} sm={12} md={8}>
                <WorkShopCard key={index} workshop={workshop} />
              </Col>
            ))
          )}
        </Row>
      </Col>

      {/* Introduction Section */}
      <Col style={{ marginTop: "4rem" }}>
        <About />
      </Col>

      {/* Map Section */}
      <Col style={{ marginTop: "4rem" }}>
        <animated.h1
          style={{
            textAlign: "start",
            display: "flex",
            alignItems: "center",
            marginBottom: "0.5rem",
            ...springPropsContainer,
          }}
        >
          Địa điểm các cửa hàng
          <ClockCircleOutlined style={{ marginLeft: "8px" }} />
        </animated.h1>
        <Map address={''} />
      </Col>
    </div>
  );
};

export default HomePage;
