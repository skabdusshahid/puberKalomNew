
import Header from '../HeeaderComponent/Header';
import Footer from '../FooterComponent/Footer';
import './HomeLayout.style.css'

const HomeLayout = ({ children }) => {
  return (
    <div className="layout">
      {/* Header */}
      <header>
        <Header />
      </header>

      {/* Main Content */}
      <main className="content" style={{paddingTop:"0"}}>
        {children}
      </main>

      {/* Footer */}
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default HomeLayout;
