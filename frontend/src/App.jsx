import React, { useContext } from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { useAuthContext } from './hooks/useAuthContext';
import { ThemeContext } from './context/ThemeContext'; // Import ThemeContext
import Layout from './pages/Layout';
import Home from './pages/Home';
import DiaryPost from './pages/DiaryPost';
import Signup from './pages/Signup';
import Login from './pages/Login';

const App = () => {
    const { user } = useAuthContext();
    const { theme } = useContext(ThemeContext); // Access theme context (if needed for further functionality)

    const elements = useRoutes([
        {
            path: '/',
            element: <Layout />, // Wrap with Layout to preserve structure
            children: [
                { path: '/', element: user ? <Home /> : <Navigate to="/api/login" /> },
                { path: '/api/posts/:id', element: user ? <DiaryPost /> : <Navigate to="/api/login" /> },
                { path: '/api/signup', element: !user ? <Signup /> : <Navigate to="/" /> },
                { path: '/api/login', element: !user ? <Login /> : <Navigate to="/" /> },
            ],
        },
    ]);

    return elements;
};

export default App;