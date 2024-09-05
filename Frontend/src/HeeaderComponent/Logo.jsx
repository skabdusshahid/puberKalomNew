import { Link } from 'react-router-dom';

const Logo = () => {
  return (
    <div className="col-md-4 text-center">
      <Link to="/">
        <img
          className="img-fluid"
          src="https://www.puberkalom.com/upload/images/logo/puber-kalom.png"
          alt="Puber Kalom Logo"
          style={{ width: "250px", border:"white" }}
        />
      </Link>
    </div>
  );
};

export default Logo;
