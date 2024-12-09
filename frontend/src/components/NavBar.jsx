import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { useLogout } from '../hooks/useLogout.js';
import { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { FaSun, FaMoon } from 'react-icons/fa';

const NavBar = () => {
    const { user } = useAuthContext();
    const { logout } = useLogout();
    const { theme, toggleTheme } = useContext(ThemeContext);

    const handleClick = () => logout();

    return (
        <AppBar
            position="static"
            sx={{
                backgroundColor: "#1976d2", // Always blue
                height: '56px', // Adjust height slightly
                display: 'flex',
                justifyContent: 'center',
            }}
        >
            <Container maxWidth="lg">
                <Toolbar
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        minHeight: 'unset', // Remove default Material-UI minHeight
                        padding: '0 10px', // Reduce vertical padding
                    }}
                >
                    {/* Left: Home Link */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: '1rem',
                        }}
                    >
                        <Link
                            to="/"
                            style={{
                                color: 'white',
                                textDecoration: 'none',
                            }}
                        >
                            Home
                        </Link>
                    </Typography>

                    {/* Center: App Title */}
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{
                            fontSize: '1.2rem',
                            color: 'white',
                        }}
                    >
                        The Diary App
                    </Typography>

                    {/* Right: Theme Toggle and Auth Buttons */}
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                        {/* Theme Toggle */}
                        <Button color="inherit" onClick={toggleTheme} sx={{ minWidth: 'auto', padding: 0 }}>
                            {theme === 'light' ? <FaMoon /> : <FaSun />}
                        </Button>

                        {/* Auth Buttons */}
                        {user ? (
                            <>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        marginRight: 2,
                                        color: 'white',
                                    }}
                                >
                                    {user.email}
                                </Typography>
                                <Button
                                    color="inherit"
                                    onClick={handleClick}
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/api/login"
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    Login
                                </Button>
                                <Button
                                    color="inherit"
                                    component={Link}
                                    to="/api/signup"
                                    sx={{
                                        color: 'white',
                                    }}
                                >
                                    Signup
                                </Button>
                            </>
                        )}
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default NavBar;
