
// import Header from '../HeeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './HomeLayout.style.css'
import HeaderAlternative from '../HeeaderComponent/HeaderAlternative';

const HomeLayoutAlternative = ({ children }) => {
  return (
    <div className="layout">
      {/* Header */}
      <header>
        <HeaderAlternative />
      </header>

      {/* Main Content */}
      <main className="content" style={{paddingTop:"8px"}}>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayoutAlternative;
