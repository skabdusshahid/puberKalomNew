// import React from 'react';
// import './CategoryComponent.css'; // Make sure to add custom styles here

// const CategoryComponent = () => {
//   return (
//     <div className="home-category-area">
//       <div className="container">
//         <div className="row">

//           <div className="col-12 d-flex justify-content-between align-items-center mb-3">
//             <h1 className="category-title">
//               <a href="minister-spake.html">
//                 রাজনীতি
//               </a>
//             </h1>
//             <a href="minister-spake.html" className="more-link">
//               আরও <i className="bi bi-chevron-right"></i>
//             </a>
//           </div>

//           {/* Left Column */}
//           <div className="col-md-3">
//             <ul className="section-list">
//               <li>
//                 <a href="minister-spake/2024/08/18/1019662.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/214620_bangladesh_pratidin_mamunul-haq-pic8f2f.jpg?v=1724048523"
//                     alt="বৈষম্যমুক্ত সমাজ গড়বো: মামুনুল হক"
//                   />
//                   <p className="section-text">বৈষম্যমুক্ত সমাজ গড়বো: মামুনুল হক</p>
//                 </a>
//               </li>
//               <li>
//                 <a href="minister-spake/2024/08/18/1019643.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/201938_bangladesh_pratidin_ishrak8f2f.jpg?v=1724048523"
//                     alt="আমার বক্তব্য বিকৃত করে প্রচার করা হয়েছে: ইশরাক"
//                   />
//                   <p className="section-text">আমার বক্তব্য বিকৃত করে প্রচার করা হয়েছে: ইশরাক</p>
//                 </a>
//               </li>
//               <li>
//                 <a href="minister-spake/2024/08/18/1019588.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/160343_bangladesh_pratidin_saleh8f2f.jpg?v=1724048523"
//                     alt="বিজয় নস্যাৎ করতে দেশ-বিদেশে ষড়যন্ত্র চলছে : এমরান সালেহ প্রিন্স"
//                   />
//                   <p className="section-text">বিজয় নস্যাৎ করতে দেশ-বিদেশে ষড়যন্ত্র চলছে : এমরান সালেহ প্রিন্স</p>
//                 </a>
//               </li>
//             </ul>
//           </div>

//           {/* Middle Column */}
//           <div className="col-md-6">
//             <div className="lead-item">
//               <a href="minister-spake/2024/08/19/1019855.html" className="d-flex">
//                 <div className="text-content pe-3">
//                   <h2>ঢাকায় নিযুক্ত ইইউ’র ভারপ্রাপ্ত রাষ্ট্রদূতের সঙ্গে বৈঠকে ফখরুল</h2>
//                   <p>ঢাকায় নিযুক্ত ইইউ&rsquo;র ভারপ্রাপ্ত&#8230;</p>
//                 </div>
//                 <img
//                   className="lead-img"
//                   src="assets/news_images/2024/08/19/112634_bangladesh_pratidin_Fakhrul8f2f.jpg?v=1724048523"
//                   alt="ঢাকায় নিযুক্ত ইইউ’র ভারপ্রাপ্ত রাষ্ট্রদূতের সঙ্গে বৈঠকে ফখরুল"
//                 />
//               </a>
//             </div>
//           </div>

//           {/* Right Column */}
//           <div className="col-md-3">
//             <ul className="section-list">
//               <li>
//                 <a href="minister-spake/2024/08/18/1019581.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/152501_bangladesh_pratidin_newsss_pic8f2f.jpg?v=1724048523"
//                     alt="সাবেক ডিএমপি কমিশনার আছাদের অবৈধ সম্পদ বাজেয়াপ্ত ও গুম-খুনের বিচারের দাবি এনডিপির"
//                   />
//                   <p className="section-text">সাবেক ডিএমপি কমিশনার আছাদের অবৈধ সম্পদ বাজেয়াপ্ত ও গুম-খুনের বিচারের দাবি এনডিপির</p>
//                 </a>
//               </li>
//               <li>
//                 <a href="minister-spake/2024/08/18/1019557.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/133148_bangladesh_pratidin_Untitled-28f2f.jpg?v=1724048523"
//                     alt="ছাত্রদলের খুলনা জেলা ও মহানগর শাখা কমিটি বিলুপ্ত"
//                   />
//                   <p className="section-text">ছাত্রদলের খুলনা জেলা ও মহানগর শাখা কমিটি বিলুপ্ত</p>
//                 </a>
//               </li>
//               <li>
//                 <a href="minister-spake/2024/08/18/1019551.html" className="section-item">
//                   <img
//                     className="section-img"
//                     src="assets/news_images/2024/08/18/thumbnails/130731_bangladesh_pratidin_4548f2f.jpg?v=1724048523"
//                     alt="'ছাত্র-জনতার রক্তের বিনিময়ে পাওয়া অর্জনকে নস্যাৎ হতে দেওয়া যাবে না'"
//                   />
//                   <p className="section-text">ছাত্র-জনতার রক্তের বিনিময়ে পাওয়া অর্জনকে নস্যাৎ হতে দেওয়া যাবে না'</p>
//                 </a>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CategoryComponent;

// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import styled from 'styled-components';
// import DOMPurify from 'dompurify';

// const PostNewsArea = styled.section`
//   padding: 100px 0;
//   margin-bottom: 70px;
// `;

// const Container = styled.div`
//   max-width: 1140px;
//   margin: 0 auto;
//   padding: 0 15px;
// `;

// const Row = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
// `;

// const PostDetailsContent = styled.div`
//   margin-bottom: 100px;
//   max-width: 100%;
// `;

// const SidebarArea = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const Widget = styled.div`
//   margin-bottom: 30px;
// `;

// const NewsletterForm = styled.form`
//   display: flex;
//   flex-direction: column;
// `;

// const NewsletterInput = styled.input`
//   padding: 10px;
//   margin-bottom: 10px;
//   border: 1px solid #ddd;
//   border-radius: 4px;
// `;

// const NewsletterButton = styled.button`
//   padding: 10px;
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   border-radius: 4px;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;

// const BlogPost = styled.div`
//   display: flex;
//   align-items: center;
//   margin-bottom: 30px;
// `;

// const BlogThumbnail = styled.div`
//   margin-right: 15px;

//   img {
//     width: 100px;
//     height: 70px;
//     object-fit: cover;
//   }
// `;

// const BlogContent = styled.div`
//   .post-date {
//     display: block;
//     color: #888;
//     margin-bottom: 5px;
//   }

//   .post-title {
//     color: #333;
//     text-decoration: none;
//     font-size: 16px;
//     font-weight: bold;

//     &:hover {
//       text-decoration: underline;
//     }
//   }

//   .post-author {
//     display: block;
//     color: #555;
//     margin-top: 5px;
//   }
// `;

// const CategoryComponent = () => {
//   const { id } = useParams(); // Get the ID from the URL
//   const [newsDetail, setNewsDetail] = useState(null);

//   useEffect(() => {
//     const fetchNewsDetail = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/admin-dashboard/66c3017f8a9afa518ea21fa2`);
//         const newsData = response.data;
//         console.log(newsData);

//         // Remove <img /> tags from the content
//         newsData.content = removeImgTags(newsData.content);

//         setNewsDetail(newsData);
//       } catch (error) {
//         console.error('Error fetching news detail:', error);
//       }
//     };

//     fetchNewsDetail();
//   }, [id]);

//   // Function to remove <img /> tags
//   const removeImgTags = (html) => {
//     const imgTagRegex = /<img[^>]*>/g;
//     return html.replace(imgTagRegex, '');
//   };

//   if (!newsDetail) return <div>Loading...</div>;

//   return (
//     <PostNewsArea>
//       <Container>
//         <Row>
//           {/* Post Details Content Area */}
//           <div className="col-12 col-lg-8" style={{backgroundColor:"#ccc"}}>
//             <PostDetailsContent >
//               <h2>{newsDetail.title}</h2>
//               <br /> <br />
//               <img className="mb-30" style={{width:'650px'}} src={getPictureUrl(newsDetail.picture)} alt={newsDetail.title} />
//             <br />  <br /> 
//               <h6 className="mb-30" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsDetail.content) }} />

//             </PostDetailsContent>
//           </div>

//           {/* Sidebar Widget */}
//           <div className="col-12 col-sm-9 col-md-6 col-lg-4">
//             <SidebarArea>
//               {/* Newsletter Widget */}
//               <Widget>
//                 <h4>Subscribe to our newsletter</h4>
//                 <NewsletterForm action="#" method="post">
//                   <NewsletterInput type="email" name="nl-email" id="nlemail" placeholder="Your E-mail" />
//                   <NewsletterButton type="submit">Subscribe</NewsletterButton>
//                 </NewsletterForm>
//                 <p className="mt-30">
//                   Nullam lacinia ex eleifend orci porttitor, suscipit interdum augue condimentum. Etiam pretium turpis eget nibh . volutpat lobortis.
//                 </p>
//               </Widget>

//               {/* Add Widget */}
//               <Widget>
//                 <a href="#">
//                   <img src="img/bg-img/add3.png" alt="Advertisement" />
//                 </a>
//               </Widget>

//               {/* Latest News Widget */}
//               <Widget>
//                 <h4>Latest News</h4>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/16.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Nearly a quarter have no emergency savings</a>
//                   </BlogContent>
//                 </BlogPost>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/17.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Nearly a quarter have no emergency savings</a>
//                   </BlogContent>
//                 </BlogPost>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/18.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Top bitcoin exchange says over $30 million stolen</a>
//                   </BlogContent>
//                 </BlogPost>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/19.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Top bitcoin exchange says over $30 million stolen</a>
//                   </BlogContent>
//                 </BlogPost>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/20.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Dow falls 287 points as trade war fears escalate</a>
//                   </BlogContent>
//                 </BlogPost>
//               </Widget>

//               {/* Additional News */}
//               <Widget>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/14.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Elon Musk: Tesla worker admitted to sabotage</a>
//                     <a href="#" className="post-author">By Michael Smith</a>
//                   </BlogContent>
//                 </BlogPost>
//                 <BlogPost>
//                   <BlogThumbnail>
//                     <a href="#"><img src="img/bg-img/15.jpg" alt="News Thumbnail" /></a>
//                   </BlogThumbnail>
//                   <BlogContent>
//                     <span className="post-date">June 20, 2018</span>
//                     <a href="#" className="post-title">Rachel Smith breaks down while discussing border crisis</a>
//                     <a href="#" className="post-author">By Michael Smith</a>
//                   </BlogContent>
//                 </BlogPost>
//               </Widget>
//             </SidebarArea>
//           </div>
//         </Row>
//       </Container>
//     </PostNewsArea>
//   );
// };

// const getPictureUrl = (picturePath) => {
//   if (!picturePath) return null;
//   return picturePath.startsWith('http') ? picturePath : `http://localhost:5000${picturePath}`;
// };

// export default CategoryComponent;





import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import EditFormModal from '../Modal/EditFormModal';
import ViewFormModal from '../Modal/ViewFormModal';
import '../AdminPanel/AdminComponent/AdminView.style.css';
import Http from '../Http';

const CategoryComponent = () => {
  const [forms, setForms] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [expandedContentId, setExpandedContentId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [currentForm, setCurrentForm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateFilter, setDateFilter] = useState('');

  useEffect(() => {
    fetchForms(page);
  }, [page, dateFilter]);

  const fetchForms = async (page) => {
    setIsLoading(true);
    setError(null);
    try {
      const url = new URL(`${Http}/admin-dashboard`);
      url.searchParams.append('page', page);
      url.searchParams.append('category', 'Country'); // Filter for "Country" category
      if (dateFilter) {
        url.searchParams.append('date', dateFilter);
      }

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setForms(data.forms);
      setTotalPages(data.totalPages);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (form) => {
    setCurrentForm(form);
    setIsEditModalOpen(true);
  };

  const handleView = (form) => {
    setCurrentForm(form);
    setIsViewModalOpen(true);
  };

  const handleDelete = async (formId) => {
    try {
      const response = await fetch(`${Http}/admin-dashboard/${formId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchForms(page);
      } else {
        throw new Error('Error deleting form');
      }
    } catch (error) {
      alert(`Error deleting form: ${error.message}`);
    }
  };

  const toggleContent = (id) => {
    setExpandedContentId(expandedContentId === id ? null : id);
  };

  const truncateContent = (content) => {
    const strippedContent = content.replace(/<[^>]+>/g, '');
    return strippedContent.length > 88
      ? strippedContent.substring(0, strippedContent.indexOf(' ', 88)) + '...'
      : strippedContent;
  };

  const handleUpdate = (updatedForm) => {
    setForms(forms.map((form) => (form._id === updatedForm._id ? updatedForm : form)));
    setIsEditModalOpen(false);
  };

  const closeEditModal = () => setIsEditModalOpen(false);

  const closeViewModal = () => setIsViewModalOpen(false);

  const handleIsBreakingToggle = async (form) => {
    const updatedIsBreaking = !form.isBreaking;
    const updatedForm = { ...form, isBreaking: updatedIsBreaking };

    try {
      const response = await fetch(`${Http}/admin-dashboard/${form._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedForm),
      });

      if (response.ok) {
        setForms(forms.map(f => f._id === form._id ? { ...f, isBreaking: updatedIsBreaking } : f));
      } else {
        throw new Error('Error updating form');
      }
    } catch (error) {
      alert(`Error updating form: ${error.message}`);
    }
  };

  const getPictureUrl = (picturePath) => {
    if (!picturePath) return null;
    return picturePath.startsWith('http') ? picturePath : `${Http}${picturePath}`;
  };

  const handleDateFilterChange = (e) => {
    setDateFilter(e.target.value);
  };

  return (
    <div className="admin-dashboard-view">
      <h1>Country Category View</h1>

      <div className="filter-container">
        <label>Filter by Date:</label>
        <input
          type="date"
          value={dateFilter}
          onChange={handleDateFilterChange}
        />
      </div>

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="error">Error: {error}</p>
      ) : forms.length === 0 ? (
        <p>No forms submitted yet.</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Content</th>
                <th>Picture</th>
                <th>Tags</th>
                <th>Reporter Details</th>
                <th>Actions</th>
                <th>Is Breaking</th>
              </tr>
            </thead>
            <tbody>
              {forms.map((form) => (
                <tr key={form._id}>
                  <td>{form.title}</td>
                  <td>
                    <div>
                      {form.category}
                      {form.subcategory && (
                        <div style={{ marginLeft: '10px', fontSize: '0.9em', color: '#666' }}>
                          <em>{form.subcategory}</em>
                        </div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div>
                      {expandedContentId === form._id ? (
                        <div>
                          <div dangerouslySetInnerHTML={{ __html: form.content }} />
                          <span
                            onClick={() => toggleContent(form._id)}
                            className="content-toggle"
                          >
                            {' '}See Less
                          </span>
                        </div>
                      ) : (
                        <span>
                          <span dangerouslySetInnerHTML={{ __html: truncateContent(form.content) }} />
                          {form.content.replace(/<[^>]+>/g, '').length > 88 && (
                            <span
                              onClick={() => toggleContent(form._id)}
                              className="content-toggle"
                            >
                              {' '}See More
                            </span>
                          )}
                        </span>
                      )}
                    </div>
                  </td>
                  <td>
                    {form.picture ? (
                      <img
                      src={getPictureUrl(form.picture)}
                      alt="Uploaded"
                      className="picture-preview"
                    />
                    ): (
                      'No picture'
                    )}
                  </td>
                  <td>{form.tags.join(', ')}</td>
                  <td>
                    <div>
                      <strong>Reporter:</strong> {form.reporterName}<br />
                      <strong>Location:</strong> {form.location}<br />
                      <strong>Date:</strong> {new Date(form.date).toLocaleString()}
                    </div>
                  </td>
                  <td>
                    <div className="button-group">
                      <button className="icon-button view-button" onClick={() => handleView(form)}>
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                      <button className="icon-button edit-button" onClick={() => handleEdit(form)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="icon-button delete-button" onClick={() => handleDelete(form._id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </td>
                  <td>
                    <div className="form-group" style={{ display: "inline-flex" }}>
                      <label className="switch">
                        <input
                          type="checkbox"
                          checked={form.isBreaking}
                          onChange={() => handleIsBreakingToggle(form)}
                        />
                        <span className="slider round"></span>
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
              className="pagination-button"
            >
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
              className="pagination-button"
            >
              Next
            </button>
          </div>
        </>
      )}

      {currentForm && (
        <EditFormModal
          isOpen={isEditModalOpen}
          onRequestClose={closeEditModal}
          form={currentForm}
          onUpdate={handleUpdate}
        />
      )}

      {currentForm && (
        <ViewFormModal
          isOpen={isViewModalOpen}
          onRequestClose={closeViewModal}
          form={currentForm}
        />
      )}
    </div>
  );
};

export default CategoryComponent;
