import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DOMPurify from 'dompurify';
import Http from '../Http';

const HomeCategoryArea = styled.div`
  padding: 20px;

  h1 {
    margin-bottom: 20px;
    font-size: 24px;
    font-weight: bold;
    color: #333;

    a {
      text-decoration: none;
      color: inherit;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: linear-gradient(to bottom, #f2f2f2 0%, #f2f2f2 50%, #eeeeee 51%, #eeeeee 100%);
      border-radius: 5px;
      padding: 12px 20px;
      transition: background 0.3s ease;

      &:hover {
        background: linear-gradient(to bottom, #eeeeee 0%, #eeeeee 50%, #f2f2f2 51%, #f2f2f2 100%);
      }

      i {
        background: linear-gradient(to bottom, #f2555b 0%, #ed1c24 100%);
        color: #fff;
        padding: 10px;
        border-radius: 5px;
        font-size: 16px;
      }
    }
  }
`;

const SectionItem = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;

  li {
    margin-bottom: 20px;

    a {
      display: flex;
      text-decoration: none;
      color: #333;
      transition: transform 0.3s ease;
      
      &:hover {
        transform: scale(1.02);
      }

      img {
        width: 100%;
        height: 80px;
        object-fit: cover;
        border-radius: 5px;
      }

      p {
        padding-left: 10px;
        margin: 0;
        font-size: 16px;
        display: flex;
        align-items: center;
        line-height: 1.5;
      }
    }
  }
`;

const LeadItem = styled.div`
  display: flex;
  background: #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 20px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }

  a {
    display: flex;
    text-decoration: none;
    color: #333;
  }

  .text {
    padding: 20px;
    font-size: 16px;
    line-height: 1.6;
    flex: 1;
  }
`;

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
    <HomeCategoryArea style={{margin:"0 55px"}}>
      <div className="row home-category-area">
        <h1>
          <a href="./minister-spake" style={{ textDecoration: "none" }}>
            <span>{categoryName}</span>
            <i className="bi bi-chevron-right">আরও</i>
          </a>
        </h1>

        <div className="col-md-3">
          <SectionItem>
            {forms.slice(1, 4).map((form, index) => (
              <motion.li
                key={form._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a className="row" onClick={() => handleCarouselClick(form._id)}>
                  <span className="col-md-4 pe-0">
                    <img alt="card img" className="card-img" src={form.picture} />
                  </span>
                  <span className="col-md-8">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(form.title) }}></p>
                  </span>
                </a>
              </motion.li>
            ))}
          </SectionItem>
        </div>

        <div className="col-md-6">
          <LeadItem>
            <a className="row" onClick={() => handleCarouselClick(forms[0]._id)}>
              <div className="col-md-5 text">
                <p className="pt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(forms[0].title) }}></p>
                <p className="mt-2" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateText(removeImageTags(forms[0].content), 30)) }}></p>
              </div>
              <div className="col-md-7 pe-0">
                <img alt="card img" className="card-img" src={forms[0].picture} />
              </div>
            </a>
          </LeadItem>
        </div>

        <div className="col-md-3">
          <SectionItem>
            {forms.slice(4, 7).map((form, index) => (
              <motion.li
                key={form._id}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <a className="row" onClick={() => handleCarouselClick(form._id)}>
                  <span className="col-md-4 pe-0">
                    <img alt="card img" className="card-img" src={form.picture} />
                  </span>
                  <span className="col-md-8">
                    <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(form.title) }}></p>
                  </span>
                </a>
              </motion.li>
            ))}
          </SectionItem>
        </div>
      </div>
    </HomeCategoryArea>
  );
};

export default HomeCategory;
