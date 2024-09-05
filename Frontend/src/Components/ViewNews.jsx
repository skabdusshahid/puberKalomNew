import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DOMPurify from 'dompurify';
import LatestNews from './LatestNews';
import { FaFacebook, FaWhatsapp, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';
import './ViewNews.style.css';
// import HomeLayoutAlternative from '../Layout/HomeLayoutAlternative';
import RelatedNews from './RelatedNews';
import Http from '../Http';

function CategoryComponent() {
  const { id } = useParams();
  const [newsDetail, setNewsDetail] = useState(null);

  useEffect(() => {
    const fetchNewsDetail = async () => {
      try {
        const response = await axios.get(`${Http}/admin-dashboard/${id}`);
        const newsData = response.data;
        newsData.content = removeImgTags(newsData.content);
        setNewsDetail(newsData);
      } catch (error) {
        console.error('Error fetching news detail:', error);
      }
    };

    fetchNewsDetail();
  }, [id]);

  const removeImgTags = (html) => {
    const imgTagRegex = /<img[^>]*>/g;
    return html.replace(imgTagRegex, '');
  };

  if (!newsDetail) return <div>Loading...</div>;

  const newsDate = new Date(newsDetail.date);

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const formattedDate = newsDate.toLocaleDateString('bn-BD', options);

  return (
   
      <motion.div 
        className='ViewNews'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="singleNews"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="date">
            <p><FaCalendarAlt /> {formattedDate}</p>
            <div className="share">
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <FaFacebook 
                  onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')} 
                />
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.1 }} 
                whileTap={{ scale: 0.9 }}
              >
                <FaWhatsapp 
                  onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(window.location.href)}`, '_blank')} 
                />
              </motion.div>
            </div>
          </div>

          <div className="titleNews">
            <h2 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsDetail.title) }}></h2>
          </div>

          <motion.div 
            className="picture"
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <img src={getPictureUrl(newsDetail.picture)} alt={newsDetail.title} />
          </motion.div>

          <motion.div 
            className="content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h4 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsDetail.content) }} />
            <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(`Reporter Name: ${newsDetail.reporterName}`) }} /> 
          </motion.div>
        </motion.div>

        <motion.div 
          className="latestNews"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LatestNews />
          <br /> <br />
          <RelatedNews category={newsDetail.category} />
        </motion.div>
      </motion.div>
  );
}

const getPictureUrl = (picturePath) => {
  if (!picturePath) return null;
  return picturePath.startsWith('http') ? picturePath : `http://localhost:5000${picturePath}`;
};

export default CategoryComponent;
