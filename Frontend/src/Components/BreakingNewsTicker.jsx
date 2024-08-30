import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import './BreakingNewsTicker.css';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Http from '../Http';

const BreakingNewsTicker = () => {
  const [newsItems, setNewsItems] = useState([]);
  const tickerRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNewsItems = async () => {
      try {
        const response = await axios.get(`${Http}/admin-dashboard`);
        const newsData = response.data;

        // Extract forms from the response
        const formsArray = Array.isArray(newsData.forms) ? newsData.forms : [];

        // Filter and set breaking news items
        const breakingNews = formsArray
          .filter(form => form.isBreaking || form.category === "আজকের শিরোনাম")
          .map(item => ({ _id: item._id, title: item.title }));

        setNewsItems(breakingNews);

      } catch (error) {
        console.error('Error fetching news items:', error.message);
      }
    };

    fetchNewsItems();
  }, []);

  useEffect(() => {
    const updateTickerAnimation = () => {
      const ticker = tickerRef.current;
      if (ticker) {
        const tickerWidth = ticker.scrollWidth;
        const containerWidth = ticker.parentElement.offsetWidth;
        const animationDuration = (tickerWidth + containerWidth) / 40; // Speed adjustment

        ticker.style.animationDuration = `${animationDuration}s`;
      }
    };

    updateTickerAnimation();

    const handleResize = () => {
      updateTickerAnimation();
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [newsItems]);

  const handleCarouselClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className="ticker-container">
      <div className="ticker-label">শিরোনাম :</div>
      <div className="ticker-wrapper">
        <motion.div 
          className="ticker"
          ref={tickerRef}
          animate={{ x: ['100%', '-200%'] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
        >
          {newsItems.map((item) => (
            <span 
              className="ticker-item" 
              key={item._id}
              onClick={() => handleCarouselClick(item._id)}
            >
              {item.title}&nbsp;&nbsp;
              <span className="separator">||</span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default BreakingNewsTicker;
