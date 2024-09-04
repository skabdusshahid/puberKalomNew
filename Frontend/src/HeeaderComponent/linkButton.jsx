import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// import { Button } from 'react-bootstrap/lib/InputGroup';

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
  const navigate = useNavigate();

  return (
    <div className="col-md-4 d-flex align-items-center justify-content-end gap-2">
      {links.map((link, index) => (
        <LinkButton key={index} url={link.url} title={link.title} />
      ))}
       <button style={{maxWidth:'50px',maxHeight:"25px", fontSize:"12px", display:"flex", alignItems:"center", justifyContent:"center"}} onClick={()=> navigate("/adminlogin")}>Admin</button>
    </div>
  );
};

export default LinkButtons;
