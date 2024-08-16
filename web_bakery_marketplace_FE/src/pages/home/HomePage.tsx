// /pages/Home.tsx
import React, { useState, useRef, useEffect } from "react";
import { Carousel, Card, Button, Row, Col, Rate } from "antd";
import { IoStorefrontOutline } from "react-icons/io5";
import { useSpring, animated } from "@react-spring/web";
import Map from "../../utils/mapbox/Map";
import banner1 from "../../assets/pexels-valeriya-827516.jpg";
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
      <div>
        <animated.div style={{ ...overlayContainerStyle }}>
          <div style={sloganStyle}>
            <animated.h1 style={springPropsH1}>TỰ DO SÁNG TẠO</animated.h1>
            <animated.h4 style={springPropsH4}>
              Thiết kế chiếc bánh của bạn, chia sẽ yêu thương
            </animated.h4>
          </div>

          <Button
            type="primary"
            size="large"
            className="button-hover"
            style={buttonStyle}
          >
            Thử ngay
          </Button>
        </animated.div>
        <Carousel autoplay style={bannerCarouselStyle}>
          <div>
            <img src={banner2} alt="Banner 1" style={bannerImageStyle} />
          </div>
          <div>
            <img src={banner1} alt="Banner 2" style={bannerImageStyle} />
          </div>
          <div>
            <img src={banner1} alt="Banner 3" style={bannerImageStyle} />
          </div>
        </Carousel>
        <Card style={cardStyle}>
          <Map address="Hồ Chí Minh" />
        </Card>
      </div>
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
          Cửa hàng tại{" "}
          <span style={{ color: "red", marginLeft: "8px" }}>Hồ Chí Minh</span>
          <IoStorefrontOutline style={{ marginLeft: "8px" }} />
        </animated.h1>
        <Row gutter={[16, 16]} justify="center">
          <div className="scroll-container" ref={scrollRef}>
            {loading ? (
              <SpinLoading />
            ) : (
              bakeries.map((bakery, index) => (
                <div key={index} className="card-wrapper">
                  <Card
                    className="card-hover"
                    bordered={false}
                    style={{ boxShadow: "0 2px 8px rgba(0, 0, 0, 0.3)" }}
                    cover={
                      <img
                        alt={bakery.name}
                        src={bakery.image}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                    }
                  >
                    <h3 style={{ textAlign: "start" }}>{bakery.name}</h3>
                    <p style={{ textAlign: "start" }}>{bakery.address}</p>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: "10px",
                      }}
                    >
                      <Rate disabled value={bakery.rating} />
                      <span style={{ marginLeft: "8px" }}>{bakery.rating}</span>
                    </div>
                    <Button type="primary" className="button-hover">
                      Ghé tiệm
                    </Button>
                  </Card>
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
          Workshop đang diễn ra
          <BulbOutlined style={{ marginLeft: "8px" }} />
        </animated.h1>
        <Row gutter={[16, 16]} justify="center">
          {loading ? (
            <SpinLoading />
          ) : (
            workshops.map((workshop, index) => (
              <Col span={8} key={index}>
                <div style={workshopBannerStyle} className="card-hover">
                  <img
                    src={workshop.image}
                    alt={workshop.title}
                    style={workshopImageStyle}
                  />
                  <div style={workshopInfoStyle}>
                    <h2>{workshop.title}</h2>
                    <p>{workshop.description}</p>
                    <p>
                      <strong>Date:</strong>{" "}
                      {new Date(workshop.date).toLocaleDateString()}
                    </p>
                    <Button type="primary" className="button-hover">
                      Đăng ký tham gia
                    </Button>
                  </div>
                </div>
              </Col>
            ))
          )}
        </Row>
      </Col>

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
          Giới thiệu về chúng tôi
          <ClockCircleOutlined style={{ marginLeft: "8px" }} />
        </animated.h1>
        <div style={introductionContainerStyle}>
          <div style={introductionTextStyle}>
            <p>
              Chào mừng bạn đến với trang web của chúng tôi! Được khởi nguồn từ
              niềm đam mê với nghệ thuật bánh ngọt, chúng tôi tin rằng mỗi chiếc
              bánh sinh nhật không chỉ là một món ăn mà còn là một tác phẩm nghệ
              thuật chứa đựng tình cảm và sáng tạo. Tại đây, bạn có thể tự tay
              thiết kế những chiếc bánh sinh nhật độc đáo, từ việc chọn màu sắc,
              hương vị đến trang trí, tạo nên những chiếc bánh mang dấu ấn cá
              nhân. Hợp tác với các tiệm bánh uy tín, chúng tôi mang đến cho bạn
              sự đa dạng và chất lượng. Hãy cùng chúng tôi biến mỗi chiếc bánh
              thành một kiệt tác và một kỷ niệm đáng nhớ!
            </p>
          </div>
          <img src={imgIntro} alt="" style={introductionImageStyle} />
        </div>
      </Col>
    </div>
  );
};

export default HomePage;
