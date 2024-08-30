// import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AdminPanel/AdminComponent/AuthContext';
import ProtectedRoute from './AdminPanel/ProtectedRoute';
import AdminLogin from './AdminPanel/AdminComponent/AdminLogin';
import AdminDashboard from './AdminPanel/AdminComponent/AdminDashboard';
import AdminDashboardView from './AdminPanel/AdminComponent/AdminDashboardView';

import AdminLayout from './Layout/AdminLayout'; // Import the layout component
import './App.css'

import ViewCategory from './AdminPanel/AdminComponent/ViewCategory';
import Modal from 'react-modal';
Modal.setAppElement('#root');

import Home from './Pages/Home';
import ViewNews from './Components/ViewNews';
import CategoryComponent from './Components/CategoryComponent';
// import SinglePost from './Pages/SinglePost';
import PageDetails from './Components/PageDetails';
import ReporterAdd from './AdminPanel/AdminComponent/ReporterAdd';
import ViewPages from './AdminPanel/AdminComponent/ViewPages';
import CategoryWiseView from './AdminPanel/AdminComponent/CategoryWiseView';
import MasterLogin from './AdminPanel/AdminComponent/MasterLogin';
import MasterProtectRoute from './AdminPanel/AdminComponent/MasterProtectRoute';
import ReporterDashboard from './AdminPanel/AdminComponent/ReporterDashboard';
// import CategoryPostsPage from './AdminPanel/Category/CategoryPage';
import CategoryPosts from './AdminPanel/Category/CategoryPosts';
import MenuList from './AdminPanel/AdminComponent/MenuList';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ReporterList from './AdminPanel/AdminComponent/ReporterList';
// import TestLayout from './Layout/TestLayout';
 import Http from './Http';


function App() {

  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(`${Http}/menubar`)
      .then(response => setData(response.data))
      .catch(error => console.error('Error fetching data:', error));

  }, []);
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route
            path="/adminDashboard"
            element={
              <ProtectedRoute element={<AdminDashboard />} />
            }
          />
          <Route
            path="/adminDashboardView"
            element={
              <AdminLayout>
                <ProtectedRoute element={<AdminDashboardView />} />
              </AdminLayout>
            }
          />
          <Route
            path="/category"
            element={
              <AdminLayout>
                <ProtectedRoute element={<ViewCategory />} />
              </AdminLayout>
            }
          />

          <Route
            path="/reporter-dashboard"
            element={
              <AdminLayout>
                <ProtectedRoute element={<ReporterDashboard />} />
              </AdminLayout>
            }
          />

          <Route
            path="/reporteradd"
            element={
              <AdminLayout>
                <ProtectedRoute element={<ReporterAdd />} />
              </AdminLayout>
            }
          />







          <Route path="/master-login" element={<MasterLogin />} />

          {/* Protect these routes with MasterProtectRoute */}
          <Route element={<MasterProtectRoute />}>


          <Route
            path="/adminDashboardView"
            element={
              <AdminLayout>
                element={<AdminDashboardView />}
              </AdminLayout>
            }
          />


            <Route
              path="/menu"
              element={
                <AdminLayout>
                  element={<MenuList />}
                </AdminLayout>
              }
            />

            <Route
              path="/reporteradd"
              element={
                <AdminLayout>
                  <ProtectedRoute element={<ReporterAdd />} />
                </AdminLayout>
              }
            />

            <Route
              path="/reporterList"
              element={
                <AdminLayout>
                  <ProtectedRoute element={<ReporterList />} />
                </AdminLayout>
              }
            />

            <Route path="/viewcategories/:categoryId" element={<CategoryWiseView />} />
            <Route path="/viewpages" element={<ViewPages />} />

          </Route>

          <Route path="/home/category" element={<CategoryComponent />} />
          <Route path="/" element={<Home />} />

          {/* <Route path="/reporterL" element={<TestLayout>element={<ReporterList />}</TestLayout>} /> */}

          <Route path={`/news/:id`} element={<ViewNews />} />


          {data && data.map((item, index) => {
            return <Route key={index} path={`/category/${item._id}`} element={<CategoryPosts catName={item.itemName} />} />
          })}


          <Route path="/:slug" element={<PageDetails />} />
          <Route path="*" element={<p>404 Not Found</p>} />



        </Routes>
      </Router>
    </AuthProvider>
  );
}


export default App;
