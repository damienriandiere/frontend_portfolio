import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 

function Register() {
    const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    var admin;
    if (role == 'admin'){
        admin = true;
    } else {
        admin = false;
    }

    try {
        const response = await axios.post('http://localhost:3000/auth/register', {
            name,
            email,
            password,
            admin
        });
        const token = response.data.token;
        localStorage.setItem('token', token);
        navigate('/');
    } catch (error) {
        console.error('Erreur lors de la connexion:', error);
    }
  };

  return (
    <div>
      <h2>Inscription</h2>
      <form onSubmit={handleSubmit}>
      <div className="div-with-margins">
          <label htmlFor="name">Nom : </label>
          <input
            type="name"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div className="div-with-margins">
          <label htmlFor="email">E-mail : </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div className="div-with-margins">
          <label htmlFor="password">Mot de passe : </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div className="div-with-margins">
          <label htmlFor="role">Code : </label>
          <input
            type="role"
            id="role"
            value={role}
            onChange={handleRoleChange}
            required
          />
        </div>
        <button type="submit" href="/">S&apos;enregistrer</button>
      </form>
    </div>
  );
}

export default Register;