import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// Import axios for making HTTP requests
import axios from 'axios';

const LinkButton = ({ url, title }) => {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-light" type="button">
      {title}
    </a>
  );
};

LinkButton.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

const LinkButtons = () => {
  const [links] = useState([
    { url: 'https://epaper.puberkalom.com/', title: 'ই-পেপার' },
    { url: 'https://www.bd-pratidin.com/en/', title: 'English' },
  ]);
  const [translated, setTranslated] = useState(false);
  const navigate = useNavigate();

  const handleTranslate = async () => {
    try {
      // Call your backend service to handle translation
      const response = await axios.post('http://localhost:5000/api/translate', { 
        text: links.map(link => link.title).join(' '),
        targetLanguage: translated ? 'bn' : 'en' 
      });
      const translatedText = response.data.translatedText;

      // Update the link titles with the translated text
      setLinks(links.map((link, index) => ({
        ...link,
        title: translatedText.split(' ')[index] || link.title,
      })));
      setTranslated(!translated);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  return (
    <div className="col-md-4 d-flex align-items-center justify-content-end gap-2">
      <button
        style={{ maxWidth: '50px', maxHeight: '25px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={() => navigate("/adminlogin")}
      >
        Admin
      </button>

      <button
        style={{ maxWidth: '100px', maxHeight: '25px', fontSize: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        onClick={handleTranslate}
      >
        {translated ? 'Translate to English' : 'Translate to Bengali'}
      </button>

      {links.map((link, index) => (
        <LinkButton key={index} url={link.url} title={link.title} />
      ))}
    </div>
  );
};

export default LinkButtons;
