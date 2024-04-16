import { useState } from 'react';
import useAuth from './useAuth';
import { FiArrowLeft } from 'react-icons/fi';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function Navbar() {
  const isLoggedIn = useAuth();
  const [showAlert, setShowAlert] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      window.location.reload();
    }, 2000);
  };

  const handleGoBack = () => {
    window.history.back();
  };

  return (
    <div className="navbar navbar-fixed-top">
      <div>
        <button onClick={handleGoBack} style={{ backgroundColor: '#242424' }}>
          <FiArrowLeft />
        </button>
          <a href="/" className="nav-item">Accueil</a>
          <a href="/projects" className="nav-item">Projets</a>
          <a href="/contact" className="nav-item">À Propos</a>
          {isLoggedIn ? (
            <a onClick={handleLogout} className="nav-item">Se déconnecter</a>
          ) : (
            <>
              <a href="/login" className="nav-item">Se connecter</a>
              <a href="/register" className="nav-item">S&apos;inscrire</a>
            </>
          )}
          {showAlert && ( 
            <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
              Vous avez été déconnecté avec succès.
            </Alert>
        )}
      </div>
    </div>
  );
}

export default Navbar;