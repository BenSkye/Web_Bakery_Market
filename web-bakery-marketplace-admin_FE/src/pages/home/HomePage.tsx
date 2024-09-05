// /pages/Home.tsx
import React, { useState, useRef, useEffect } from "react";
import { Link } from 'react-router-dom';
import { Carousel, Card, Button, Row, Col, Rate } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import Map from "../../utils/mapbox/Map";
import banner1 from "../../assets/_99ba4fdc-95a0-4dd8-8bb0-d8942d8ab671.jpg";
import banner2 from "../../assets/pexels-marinautrabo-1729808.jpg";
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
import About from './AboutUs';
import "../../styles/homeStyles/home.css";



const HomePage: React.FC = () => {
  const [bakeries, setBakeries] = useState<Bakery[]>([]);
  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBakeries = async () => {
      try {
        setLoading(true);
        const data = await getBakeries();
        setBakeries(data);
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
  };

  const overlayContainerStyle: React.CSSProperties = {
    position: "absolute",
    top: "10%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    textAlign: "center",
    zIndex: 1,
  };

  const sloganStyle: React.CSSProperties = {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: "10px 20px",
    borderRadius: "5px",
    fontSize: "24px",
    fontFamily: "monospace",
    fontWeight: "bold",
    fontStyle: "italic", // Italicize the text
  };

  const cardStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    left: "18%",
    transform: "translate(-50%, -215%)",
    zIndex: 2,
    width: "500px",
    height: "300px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    background:
      "linear-gradient(to left, rgba(253, 222, 222, 0.5), rgba(253, 222, 222, 0.7))",
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

  const workshopBannerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "300px",
    width: "100%",
    borderRadius: "10px",
    overflow: "hidden",
    position: "relative",
    marginBottom: "20px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
  };

  const workshopImageStyle: React.CSSProperties = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    zIndex: 1,
  };

  const workshopInfoStyle: React.CSSProperties = {
    position: "relative",
    zIndex: 2,
    color: "white",
    textAlign: "center",
    padding: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: "10px",
  };

  const introductionContainerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "1rem",
    borderRadius: "10px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#f9f9f9",
  };

  const introductionTextStyle: React.CSSProperties = {
    flex: 9,
    padding: "2rem",
    textAlign: "justify",
    fontSize: 18,
    fontFamily: "revert-layer",
    lineHeight: 1.8,
  };

  const introductionImageStyle: React.CSSProperties = {
    flex: 3,
    height: 250,
    borderRadius: "10px",
  };

  return (
    <div style={homeContainerStyle}>
    </div>

  );
};

export default HomePage;
