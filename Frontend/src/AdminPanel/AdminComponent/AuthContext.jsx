// import React, { createContext, useState, useEffect } from 'react';
// import axios from 'axios';

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [authState, setAuthState] = useState({
//     isAuthenticated: false,
//     reporterId: null,
//   });

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const loggedInUser = localStorage.getItem("authenticated");
//       const reporterId = localStorage.getItem("reporterId");

//       console.log('Retrieved reporterId from localStorage:', reporterId); // Debugging

//       if (loggedInUser === "true" && reporterId) {
//         setAuthState({
//           isAuthenticated: true,
//           reporterId,
//         });
//       } else {
//         // Optional: Make a call to the server to validate the session or token validity
//       }
//     };

//     checkAuthentication();
//   }, []);

//   const login = async (credentials) => {
//     try {
//       const response = await axios.post('http://localhost:5000/login', credentials);
//       if (response.status === 200) {
//         const { reporterId } = response.data;

//         console.log('Login successful, reporterId:', reporterId); // Debugging

//         setAuthState({
//           isAuthenticated: true,
//           reporterId,
//         });
//         localStorage.setItem("authenticated", "true");
//         localStorage.setItem("reporterId", reporterId); // Ensure reporterId is a string
//         return true;
//       }
//     } catch (error) {
//       console.error('Login error:', error.response ? error.response.data : error.message); // Improved error handling
//       return false;
//     }
//   };

//   const logout = () => {
//     setAuthState({
//       isAuthenticated: false,
//       reporterId: null,
//     });
//     localStorage.removeItem("authenticated");
//     localStorage.removeItem("reporterId");
//   };

//   return (
//     <AuthContext.Provider value={{ ...authState, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;





// AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Http from '../../Http';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    isAuthenticated: false,
    reporterId: null,
    isMasterAuthenticated: false,  // Added for master login
  });

  useEffect(() => {
    const checkAuthentication = async () => {
      const loggedInUser = localStorage.getItem("authenticated");
      const reporterId = localStorage.getItem("reporterId");
      const isMasterAuthenticated = localStorage.getItem("masterAuthenticated") === "true"; // Check for master login

      if (loggedInUser === "true" && reporterId) {
        setAuthState({
          isAuthenticated: true,
          reporterId,
          isMasterAuthenticated,  // Set master auth state
        });
      } else if (isMasterAuthenticated) {
        setAuthState((prevState) => ({
          ...prevState,
          isMasterAuthenticated: true,
        }));
      }
    };

    checkAuthentication();
  }, []);

  const login = async (credentials) => {
    try {
      const response = await axios.post(`${Http}/login`, credentials);
      if (response.status === 200) {
        const { reporterId } = response.data;
        setAuthState({
          isAuthenticated: true,
          reporterId,
          isMasterAuthenticated: authState.isMasterAuthenticated,  // Preserve master auth state
        });
        localStorage.setItem("authenticated", "true");
        localStorage.setItem("reporterId", reporterId);
        return true;
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const masterLogin = async (credentials) => {
    try {
      const response = await axios.post(`${Http}/master-login`, credentials);
      if (response.status === 200) {
        setAuthState({
          ...authState,
          isMasterAuthenticated: true,
        });
        localStorage.setItem("masterAuthenticated", "true");
        return true;
      }
    } catch (error) {
      console.error('Master login error:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const logout = () => {
    setAuthState({
      isAuthenticated: false,
      reporterId: null,
      isMasterAuthenticated: false,  // Reset master auth state
    });
    localStorage.removeItem("authenticated");
    localStorage.removeItem("reporterId");
    localStorage.removeItem("masterAuthenticated"); // Remove master auth state
  };

  return (
    <AuthContext.Provider value={{ ...authState, login, masterLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
