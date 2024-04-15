import { useState, useEffect } from 'react';
import axios from 'axios';

function useTokenRefresh() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const refreshToken = async () => {
      try {
        const response = await axios.post('/auth/refresh');
        const newToken = response.data.token;
        localStorage.setItem('token', newToken);
        setToken(newToken);
      } catch (error) {
        console.error(error);
      }
    };

    const intervalId = setInterval(refreshToken, 30 * 60 * 1000); // Rafraîchir toutes les 30 minutes

    return () => clearInterval(intervalId);
  }, []);

  return token;
}

export default useTokenRefresh;