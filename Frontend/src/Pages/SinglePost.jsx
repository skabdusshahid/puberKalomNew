// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const SinglePost = () => {
//   const { slug } = useParams();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPost = async () => {
//       const encodedSlug = encodeURIComponent(slug); // Encode the slug
//       console.log(`Fetching post with slug: ${encodedSlug}`);
//       try {
//         const response = await axios.get(`http://localhost:5000/admin-dashboard/${encodedSlug}`);
//         if (response.status === 200) {
//           console.log('Post data:', response.data);
//           setPost(response.data);
//         } else {
//           console.error('Unexpected response status:', response.status);
//           setError('Unexpected response status');
//         }
//       } catch (err) {
//         console.error('Error fetching post:', err.message);
//         setError('Error fetching post');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPost();
//   }, [slug]);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div>
//       {post ? (
//         <div>
//           <h1>{post.title || 'No Title'}</h1>
//           <p><strong>Category:</strong> {post.category || 'N/A'}</p>
//           <p><strong>Reporter Name:</strong> {post.reporterName || 'N/A'}</p>
//           <p><strong>Date:</strong> {post.date ? new Date(post.date).toLocaleDateString() : 'N/A'}</p>
//           <p><strong>Location:</strong> {post.location || 'N/A'}</p>
//           {post.picture && <img src={post.picture} alt={post.title} />}
//           <p>{post.content || 'No content available'}</p>
//           <p><strong>Tags:</strong> {post.tags && post.tags.length > 0 ? post.tags.join(', ') : 'No tags'}</p>
//         </div>
//       ) : (
//         <p>Post not found</p>
//       )}
//     </div>
//   );
// };

// export default SinglePost;
