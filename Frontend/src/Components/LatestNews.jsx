import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './LatestNews.style.css'
import Http from '../Http';

const LatestNews = () => {
  const [topNews, setTopNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const observerRef = useRef(null);

  const navigate = useNavigate();

  const fetchTopNews = async (page) => {
    try {
      const today = new Date();
      const fourDaysAgo = new Date();
      fourDaysAgo.setDate(today.getDate() - 4);

      const startDate = fourDaysAgo.toISOString().split('T')[0];
      const endDate = today.toISOString().split('T')[0];

      const response = await axios.get(`${Http}/admin-dashboard`, {
        params: {
          startDate: startDate,
          endDate: endDate,
          limit: 10,
          page: page,
        },
      });

      setTopNews((prevNews) => [...prevNews, ...response.data.forms]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchTopNews(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setCurrentPage((prevPage) => prevPage + 1);
        }
      },
      {
        root: null,
        rootMargin: '20px',
        threshold: 1.0,
      }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, []);

  const getPictureUrl = (picturePath) => {
    if (!picturePath) return null;
    return picturePath.startsWith('http') ? picturePath : `${Http}${picturePath}`;
  };

  const handleCarouselClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <Col xl={12} lg={6} md={6} sm={12}>
        <h4 className="latest-news-header">
          সর্বশেষ খবর
        </h4>
      </Col>
      <div className="item-box-light-md-less30">
        <Row>
          {topNews.map((item, index) => (
            <Col key={index} xl={12} lg={6} md={6} sm={12}>
              <Card className="news-card" onClick={() => handleCarouselClick(item._id)}>
                <Card.Img variant="top" src={getPictureUrl(item.picture)} className="news-card-img" />
                <Card.Body className="news-card-body">
                  <Card.Title className="news-card-title">
                    {item.title.length > 70 ? `${item.title.substring(0, 70)}...` : item.title}
                  </Card.Title>
                  <span className="news-card-date">
                    {formatDistanceToNow(new Date(item.date), { addSuffix: true })}
                    &nbsp; ||&nbsp; {item.category}
                  </span>
                </Card.Body>
              </Card>
            </Col>
          ))}
          <div ref={observerRef} style={{ height: '20px' }}></div>
        </Row>
      </div>
    </div>
  );
};

export default LatestNews;
