import { AppBar, Toolbar, Alert, Button, IconButton, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { FiArrowLeft } from 'react-icons/fi';
import { useState } from 'react';
import CheckIcon from '@mui/icons-material/Check';
import useAuth from './useAuth';


export default function Navbar() {
  const isLoggedIn = useAuth();
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      window.location.reload();
    }, 2000);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuItemClick = (pageURL) => {
    window.location.href = pageURL;
    handleMenuClose();
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#242424' }}>
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
          onClick={handleMenuOpen}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={() => handleMenuItemClick('/')}>Accueil</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/contact')}>A propos</MenuItem>
          <MenuItem onClick={() => handleMenuItemClick('/projects')}>Projects</MenuItem>
          {isLoggedIn ? (
          <Button onClick={() => handleMenuItemClick('/dashboard')}>Dashboard</Button>
          ) : (<></>
          )}
        </Menu>
        <IconButton
          size="large"
          color="inherit"
          aria-label="back"
          onClick={handleGoBack}
          sx={{ mr: 2 }}
        >
          <FiArrowLeft />
        </IconButton>
        <Button href="/" color="inherit" sx={{ flexGrow: 1 }}>Portfolio de Damien Riandiere</Button>
        {isLoggedIn ? (
          <Button onClick={handleLogout} color="inherit">Se déconnecter</Button>
          ) : (
            <>
              <Button href="/login" color="inherit">Se connecter</Button>
              <Button href="/register" color="inherit">S&apos;inscrire</Button>
            </>
          )}
          {showAlert && ( 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Vous avez été déconnecté avec succès.
            </Alert>
        )}
      </Toolbar>
    </AppBar>
  );
}