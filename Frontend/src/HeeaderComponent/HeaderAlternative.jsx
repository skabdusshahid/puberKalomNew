
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

// import SearchComponent from './SearchComponent';
// import SocialIcons from './SocialIcons';
import DateDisplay from './DateDisplay';
import Logo from './Logo';
// import LinkButtons from './linkButton';
import Navbar from './Navbar';

import './Header.css'
import BreakingNewsTicker from "../Components/BreakingNewsTicker";

function HeaderAlternative() {
  return (
    <>
      <section style={{ backgroundColor: 'white' }} >
        <div className="headerContainer">
          <header style={{ backgroundImage: "none", backgroundColor: 'white' }}>
            
            <div className="row py-3">
              <div className="col-md-4 d-flex align-items-center">
                <DateDisplay
                  className="d-flex align-items-center"
                  labelClassName="col-form-label"
                />
              </div>
              <Logo />
              
            </div>

          </header>
          <div className="row">
            <div className="col">
              <Navbar />
            </div>           
          </div>
          <BreakingNewsTicker />
        </div>
      </section>
    </>
  );
}

export default HeaderAlternative

