import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Http from '../Http';
import './CategoryWise.css'; // Import the CSS file

const HomeCategory = ({ categoryName }) => {
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get(`${Http}/admin-dashboard`, {
          params: { limit: 80 },
        });

        const newsData = response.data;
        const formsArray = Array.isArray(newsData.forms) ? newsData.forms : [];
        const deshCategoryForms = formsArray.filter(form => form.category === categoryName);

        setForms(deshCategoryForms.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error("Error Fetching Data:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchForms();
  }, [categoryName]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const removeImageTags = (html) => {
    return html.replace(/<img[^>]*>/g, '');
  };

  const truncateText = (text, wordLimit) => {
    const words = text.split(' ');
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(' ') + '...';
    }
    return text;
  };

  const handleCarouselClick = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div className='home-category-area CategoryWise-Container'>
      <div className="row">
        <h1>
          <a href="./minister-spake" className="category-link">
            <span>{categoryName}</span>
            <i className="bi bi-chevron-right">আরও</i>
          </a>
        </h1>

        <div className="col-md-3">
          <ul className="section-item">
            {forms.slice(1, 4).map((form) => (
              <motion.li
                key={form._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a className="row item-link" onClick={() => handleCarouselClick(form._id)}>
                  <span className="col-md-4 pe-0">
                    <img alt="card img" className="card-img" src={form.picture} />
                  </span>
                  <span className="col-md-8">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(form.title) }}></p>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>


        <div className="col-md-6">
          <div className="lead-item">
            <a className="row item-link" onClick={() => handleCarouselClick(forms[0]._id)}>
              <div className="col-md-5 text">
                <p className="pt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(forms[0].title) }}></p>
                {/* <p className="mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateText(removeImageTags(forms[0].content), 30)) }}></p> */}
              </div>
              <div className="col-md-7 pe-0">
                <img alt="card img" className="card-img" src={forms[0].picture} />
              </div>
            </a>
          </div>
        </div>


        <div className="col-md-3">
          <ul className="section-item">
            {forms.slice(4, 7).map((form) => (
              <motion.li
                key={form._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a className="row item-link" onClick={() => handleCarouselClick(form._id)}>
                  <span className="col-md-4 pe-0">
                    <img alt="card img" className="card-img" src={form.picture} />
                  </span>
                  <span className="col-md-8">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(form.title) }}></p>
                  </span>
                </a>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeCategory;
