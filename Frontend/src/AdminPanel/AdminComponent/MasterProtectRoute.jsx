// import React, { useContext } from 'react';
// import { Route, Navigate } from 'react-router-dom';
// import AuthContext from './AuthContext';

// const MasterProtectRoute = ({ element: Component, ...rest }) => {
//   const { isMasterAuthenticated } = useContext(AuthContext);

//   return (
//     <Route
//       {...rest}
//       element={isMasterAuthenticated ? <Component /> : <Navigate to="/master-login" />}
//     />
//   );
// };

// export default MasterProtectRoute;




import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from './AuthContext';

const MasterProtectRoute = () => {
  const { isMasterAuthenticated } = useContext(AuthContext);

  return isMasterAuthenticated ? <Outlet /> : <Navigate to="/master-login" />;
};

export default MasterProtectRoute;

