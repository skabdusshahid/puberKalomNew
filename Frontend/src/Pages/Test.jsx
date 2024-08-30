// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const Test = () => {
//   const [forms, setForms] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   useEffect(() => {
//     fetchForms(currentPage);
//   }, [currentPage]);

//   const fetchForms = async () => {
//     try {
//       const response = await axios.get(`/admin-dashboard`);
//       const newsData = response.data;
//       const formsArray = Array.isArray(newsData.forms)
//             ? newsData.forms
//             : [];
//       setForms(formsArray);
//       console.log(forms);
      
//       setTotalPages(response.data.totalPages);
//     } catch (error) {
//       console.error('Error fetching forms:', error);
//     }
//   };

//   const handlePageChange = (page) => {
//     setCurrentPage(page);
//   };

//   return (
//     <div>
//       <h1>Admin Dashboard</h1>
//       <ul>
//         {forms && forms.map((form, index) => (
//           <li key={index}>
//             <p><strong>Date:</strong> {new Date(form.date).toLocaleDateString()}</p>
//             <p><strong>Reporter Name:</strong> {form.reporterName}</p>
//             <p><strong>Location:</strong> {form.location}</p>
//             {/* Add more fields as necessary */}
//           </li>
//         ))}
//       </ul>
//       <div>
//         {Array.from({ length: totalPages }, (_, i) => (
//           <button key={i + 1} onClick={() => handlePageChange(i + 1)} disabled={currentPage === i + 1}>
//             {i + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Test;
