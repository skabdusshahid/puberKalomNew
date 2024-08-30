import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Carousel, Card, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { formatDistanceToNow } from 'date-fns';

import './TopNews.style.css'
import { useNavigate } from 'react-router-dom';
import LatestNews from '../Components/LatestNews';

import Http from '../Http';





const TopNews = () => {

  const [carouselItems, setCarouselItems] = useState([]);
  const [topNews, setTopNews] = useState([]);

  const navigate = useNavigate();

  


  const fetchData = async () => {
    try {
      const response = await axios.get(`${Http}/admin-dashboard`);
      const newsData = response.data;

      console.log('news data', newsData.forms);

      setCarouselItems(newsData.forms);

    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchTopNews = async () => {
    try {
      // Calculate the date range from today to four days ago
      const today = new Date();
      const fourDaysAgo = new Date();
      fourDaysAgo.setDate(today.getDate() - 4);

      const startDate = fourDaysAgo.toISOString().split('T')[0]; // Four days ago
      const endDate = today.toISOString().split('T')[0]; // Today

      let allNews = []; // Array to hold all news items
      const totalPages = 2; // Define the total number of pages you want to fetch

      // Loop through each page and fetch the data
      for (let page = 1; page <= totalPages; page++) {
        const response = await axios.get(`${Http}/admin-dashboard`, {
          params: {
            startDate: startDate,
            endDate: endDate,
            limit: 10,
            page: page,
          },
        });

        const newsData = response.data;

        // Accumulate news items from each page
        allNews = [...allNews, ...newsData.forms];
      }

      console.log('All news data:', allNews);

      // Set the accumulated news data to state
      setTopNews(allNews);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {

    fetchData();
    fetchTopNews();
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
              {carouselItems && carouselItems?.map((item, index) => {
                return <Carousel.Item key={index} onClick={() => handleCarouselClick(item._id)} >
                  {/* {item.picture} */}
                  <img src={getPictureUrl(item.picture)} alt="slider" className="d-block w-100" style={{ maxHeight: "450px" }} />
                  <Carousel.Caption className='CStransparent-background'>
                    <div className="text-left pl-3">
                      {/* <div className="topic-box-sm color-cinnabar mb-2">{item.category}</div> */}
                      <div className="post-date-light">
                        <ul className="list-unstyled">
                          {/* <li><span>by</span> <a href="single-news-1.html">{item.reporterName}</a></li> */}
                          {/* <li><span><i className="fa fa-calendar" aria-hidden="true"></i></span> {new Date(item.date).toLocaleDateString()}</li> */}
                        </ul>
                      </div>
                      <h3 dangerouslySetInnerHTML={{ __html: `${item.title}` }}></h3>

                    </div>
                  </Carousel.Caption>
                </Carousel.Item>
              })}
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
}



export default TopNews;
