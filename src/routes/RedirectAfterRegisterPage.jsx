import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

const RedirectAfterRegisterPage = () => {
  const navigate = useNavigate();
    useEffect(() => {
        const timerId = setTimeout(() => {
            navigate('/');
    }, 2000);

        return () => clearTimeout(timerId);
    });

  return (
    <div>
      <div className="div-with-margins">
        <FaCheckCircle style={{ color: 'green', fontSize: '250px' }} />
      </div>
      <div className="div-with-margins">
        Inscription réussie, vous êtes connecté(e) !
      </div>
      <div className="div-with-margins">
        Vous allez être redirigé(e) vers la page d&apos;accueil...
      </div>
    </div>
  );
};

export default RedirectAfterRegisterPage;