import { useState, useEffect } from 'react';
import HomeLayout from '../Layout/HomeLayout';
import BreakingNewsTicker from '../Components/BreakingNewsTicker';
import axios from 'axios';
import TopNews from './TopNews';

 import FeedComponent from '../FeedComponent';
import DeshCategory from '../Components/DeshCategory';
import RelatedNews from '../Components/RelatedNews';
import CategoryWise from '../Components/CategoryWise'

const Home = () => {
  // const [newsItems, setNewsItems] = useState([]);


  // useEffect(() => {
  //   // Fetch news items from the backend with a limit
  //   const fetchNewsItems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/admin-dashboard', {
        
  //       });
  //       const newsData = response.data.map(item => item.title); // Extract titles for the ticker

  //       setNewsItems(newsData);
  //     } catch (error) {
  //       console.error('Error fetching news items:', error.message);
  //     }
  //   };

  //   fetchNewsItems();
  // }, []); // No need for newsItems in dependency array

  // useEffect(() => {
  //   // Fetch news items from the backend
  //   const fetchNewsItems = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:5000/admin-dashboard');
  //       const newsData = response.data;
        
  //       console.log("News Data:", newsData);
  //       const formsArray = Array.isArray(newsData)
  //         ? newsData
  //         : newsData.forms || []; // Adjust this depending on where the forms array is located
  
  //       // Process the forms array
  //       const breakingNewsTitles = formsArray
  //         .filter(form => form.isBreaking || form.category==="আজকের শিরোনাম")
  //         .map(form => form.title);
  
  //       setNewsItems(breakingNewsTitles);
  //       console.log("Breaking News Titles:", breakingNewsTitles);
  
  //     } catch (error) {
  //       console.error('Error fetching news items:', error.message);
  //     }
  //   };
  
  //   fetchNewsItems();
  // }, []);

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

         
  
  //         // Append the forms from this page to the allForms array
  //        // allForms = [...allForms, ...formsArray];
  //     // }
  
  //       // Process the allForms array
  //       const breakingNewsTitles = formsArray
  //         .filter(form => form.isBreaking || form.category === "আজকের শিরোনাম")
  //         .map(form => form.title);
  
  //       setNewsItems(breakingNewsTitles);
  //       console.log("Breaking News Titles:", breakingNewsTitles);
  
  //     } catch (error) {
  //       console.error('Error fetching news items:', error.message);
  //     }
  //   };
  
  //   fetchNewsItems();
  // }, []);
  
  
  

  return (
    <HomeLayout>
      {/* <BreakingNewsTicker newsItems={newsItems} /> */}

      
      <TopNews />
       <DeshCategory categoryName=" দেশ " />
       <CategoryWise categoryName=" মহানগর " />
       
       <DeshCategory categoryName=" রাজ্য " />

       <DeshCategory categoryName=" মহানগর " /> 


      <FeedComponent />
    </HomeLayout>
  );
};

export default Home;
