import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double processing in React Strict Mode
    if (hasProcessed.current) return;

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');
    const email = urlParams.get('email');
    const name = urlParams.get('name');

    if (token) {
      hasProcessed.current = true;
      localStorage.setItem('token', token);
      
      // Store user information if provided in URL params
      if (email) {
        localStorage.setItem('userEmail', email);
      }
      if (name) {
        localStorage.setItem('userName', name);
      } else if (email) {
        // Fallback to using email username as name
        const fallbackName = email.split('@')[0];
        localStorage.setItem('userName', fallbackName);
      }

      // Clear the URL parameters and navigate
      window.history.replaceState({}, '', '/auth/google/callback');
      navigate('/dashboard', { replace: true });
    } else if (error) {
      hasProcessed.current = true;
      navigate('/signin?error=' + encodeURIComponent(error), { replace: true });
    } else if (!hasProcessed.current) {
      hasProcessed.current = true;
      navigate('/signin', { replace: true });
    }
  }, [navigate]);

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p className="text-gray-500">Completing sign in...</p>
      </div>
    </div>
  );
};

export default GoogleCallback;