import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const GoogleCallback = () => {
  const navigate = useNavigate();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // Prevent double processing in React Strict Mode
    if (hasProcessed.current) return;
    
    console.log("Callback component mounted. Current URL:", window.location.href);

    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const error = urlParams.get('error');

    if (token) {
      console.log("Success: Token found in URL.");
      hasProcessed.current = true;
      localStorage.setItem('token', token);
      console.log("Token has been stored. Navigating to /dashboard...");

      // Clear the URL parameters and navigate
      window.history.replaceState({}, '', '/auth/google/callback');
      navigate('/dashboard', { replace: true });
    } else if (error) {
      console.error("Error found in URL:", error);
      hasProcessed.current = true;
      navigate('/signin?error=' + encodeURIComponent(error), { replace: true });
    } else if (!hasProcessed.current) {
      console.warn("No token or error found in URL. Redirecting to signin.");
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