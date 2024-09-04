import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import Http from '../Http';
import LatestNews from '../Components/LatestNews';

import './TopNews.style.css';

const TopNews = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const response = await axios.get(`${Http}/admin-dashboard`);
      const newsData = response.data;
      setCarouselItems(newsData.forms);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getPictureUrl = (picturePath) => {
    if (!picturePath) return null;
    return picturePath.startsWith('http') ? picturePath : `${Http}${picturePath}`;
  };

  const handleCarouselClick = (id) => {
    navigate(`/news/${id}`); // Navigate to the detailed view page
  };

  return (
    <section className="section-space-bottom">
      <Container className='TopNews-Container'>
        <Row>
          <Col xl={8} lg={12} style={{ marginTop: '10px' }}>
            <Carousel>
              {loading ? (
                Array.from({ length: 3 }).map((_, index) => (
                  <Carousel.Item key={index}>
                    <Skeleton height={450} />
                    <Carousel.Caption className='CStransparent-background'>
                      <Skeleton count={3} />
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
              ) : (
                carouselItems.map((item, index) => (
                  <Carousel.Item key={index} onClick={() => handleCarouselClick(item._id)}>
                    <img src={getPictureUrl(item.picture)} alt="slider" className="d-block w-100" style={{ maxHeight: "450px" }} />
                    <Carousel.Caption className='CStransparent-background'>
                      <div className="text-left pl-3">
                        <h3 dangerouslySetInnerHTML={{ __html: `${item.title}` }}></h3>
                      </div>
                    </Carousel.Caption>
                  </Carousel.Item>
                ))
              )}
            </Carousel>
          </Col>
          <Col xl={4} lg={12}>
            <div className="item-box-light-md-less30">
              <LatestNews />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TopNews;
