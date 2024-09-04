import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';
import './DeshCategory.css';
import { useNavigate } from 'react-router-dom';
import Http from '../Http';

const DeshCategory = ({ categoryName }) => {
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

        setForms(deshCategoryForms.slice(0, 4));
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
    <div id="services" className="DeshServices-container">
      <section className="services-section">
        <div className="section-header">
          <h2 className="section-title">{categoryName}</h2>
          <div className="section-divider"></div>
        </div>

        <div className="DeshCards-container">
          {forms.length > 0 ? (
            forms.map(form => (
              <div key={form._id} className="card" onClick={() => handleCarouselClick(form._id)}>
                <img alt="card img" className="NewsCard-img" src={form.picture} />
                <div className="DeshCard-content">
                  <h2 className="card-title" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(form.title) }}></h2>
                  <p className="card-text"
                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(truncateText(removeImageTags(form.content), 30)) }}
                  ></p>
                </div>
              </div>
            ))
          ) : (
            <p>No data available for the দেশ category.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default DeshCategory;
