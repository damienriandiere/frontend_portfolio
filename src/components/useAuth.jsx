import { useState, useEffect } from 'react';

export default function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const admin = localStorage.getItem('admin');
    setIsLoggedIn(!!token);
    setIsAdmin(!!admin);
  }, []);

  return {isLoggedIn, isAdmin};
}