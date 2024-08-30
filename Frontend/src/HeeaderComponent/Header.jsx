
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import SearchComponent from './SearchComponent';
import SocialIcons from './SocialIcons';
import DateDisplay from './DateDisplay';
import Logo from './Logo';
import LinkButtons from './linkButton';
import Navbar from './Navbar';

import './Header.css'
import BreakingNewsTicker from "../Components/BreakingNewsTicker";
import { useEffect, useState } from "react";
import axios from "axios";

function Header() {

 // const [newsItems, setNewsItems] = useState([]);
  

  

  // useEffect(() => {
  //   // Fetch news items from the backend
  //   const fetchNewsItems = async () => {
  //     try {
  //       // const totalPages = 4; 
  //       // const limit = 10; 
  //       // let allForms = [];
  
  //       // for (let page = 1; page <= totalPages; page++) {
  //         const response = await axios.get(`http://localhost:5000/admin-dashboard`);
  //         const newsData = response.data;
          
  //         // Extract forms from the response
  //         const formsArray = Array.isArray(newsData.forms)
  //           ? newsData.forms
  //           : [];

  //        console.log("FormArrAY:",formsArray);

  //          //formsArray.map(item=>console.log("title: ",item.category));
         
  
  //         // Append the forms from this page to the allForms array
  //        // allForms = [...allForms, ...formsArray];
  //     // }
  
  //       // Process the allForms array
  //       // const breakingNews= formsArray
  //       //   .filter(form => form.isBreaking || form.category === "আজকের শিরোনাম")
  //       //   .map(form => form.title);


  //       // setNewsItems(breakingNews);

  //       const breakingNews= formsArray
  //         .filter(form => form.isBreaking || form.category === "আজকের শিরোনাম")
  //         .map(item=>setNewsItems())
  
  //          console.log("Abdus--", newsItems);
           

       
  
  //     } catch (error) {
  //       console.error('Error fetching news items:', error.message);
  //     }
  //   };
  
  //   fetchNewsItems();
  // }, []);
  return (
    <>
      <section style={{ backgroundColor: 'white' }} >
        <div className="headerContainer">
          <header style={{ backgroundImage: "none", backgroundColor: 'white' }}>
            <div className="row py-1 border-bottom">
              <SearchComponent />
              <SocialIcons />
            </div>
            <div className="row py-3">
              <div className="col-md-4 d-flex align-items-center">
                <DateDisplay
                  className="d-flex align-items-center"
                  labelClassName="col-form-label"
                />
              </div>
              <Logo />
              <LinkButtons />
            </div>

          </header>
          <div className="row">
            <div className="col">
              <Navbar />
            </div>
          </div>
          <BreakingNewsTicker   />
        </div>
      </section>
    </>
  );
}

export default Header

