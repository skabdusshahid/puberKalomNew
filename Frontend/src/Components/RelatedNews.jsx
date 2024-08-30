import React, { useEffect, useState, useRef } from 'react';
import { Col, Row, Card } from 'react-bootstrap';
import { formatDistanceToNow } from 'date-fns';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Http from '../Http';

const RelatedNews = ({ category }) => {
    const [topNews, setTopNews] = useState([]);

    const observerRef = useRef(null);

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchForms = async () => {
            try {
                // Fetch all forms data without filtering
                const response = await axios.get(`${Http}/admin-dashboard`, {
                    params: {
                        limit: 50,
                    }
                });

                const newsData = response.data;

                const formsArray = Array.isArray(newsData.forms) ? newsData.forms : [];

                const deshCategoryForms = formsArray.filter(form => form.category === category);


                setTopNews(deshCategoryForms.slice(0, 6));
                setLoading(false);
            } catch (error) {
                console.error("Error Fetching Data:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchForms();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const getPictureUrl = (picturePath) => {
        if (!picturePath) return null;
        return picturePath.startsWith('http') ? picturePath : `${Http}${picturePath}`;
    };

    const handleCarouselClick = (id) => {
        navigate(`/news/${id}`); // Navigate to the detailed view page
    };

    return (
        <div>
            <Col xl={12} lg={6} md={6} sm={12} >
                <h4 style={{ marginTop: "10px", textAlign: 'center', backgroundColor: "#343a40", color: "white", padding: "10px", borderRadius: "8px" }}>
                    আনুষঙ্গিক খবর
                </h4>
            </Col>

            <div className="item-box-light-md-less30" style={{ maxHeight: "670px", overflow: "auto", scrollbarWidth: "none", msOverflowStyle: "none" }}>
                <style>
                    {`
          .item-box-light-md-less30::-webkit-scrollbar {
            width: 0px;
            height: 0px;
          }
          .news-card {
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            cursor: pointer;
          }
          .news-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
          }
          .news-card img {
            border-top-left-radius: 8px;
            border-bottom-left-radius: 8px;
          }
          .news-card-title {
            font-size: 1.1rem;
            font-weight: bold;
            color: #333;
            margin-bottom: 0.5rem;
          }
          .news-card-date {
            font-size: 0.85rem;
            color: #777;
          }
        `}
                </style>
                <Row>


                    {topNews.map((item, index) => (
                        <Col key={index} xl={12} lg={6} md={6} sm={12}>
                            <Card className="news-card" style={{ marginTop: "10px", display: 'flex', flexDirection: 'row' }} onClick={() => handleCarouselClick(item._id)}>
                                <Card.Img variant="top" src={getPictureUrl(item.picture)} style={{ height: "100px", width: "150px" }} />
                                <Card.Body style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "10px" }}>
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

                    <div ref={observerRef} style={{ height: "20px" }}></div>
                </Row>
            </div>
        </div>
    );
};

export default RelatedNews;
