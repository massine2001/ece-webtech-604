import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../components/supabaseClient';

const ProtectedRoute = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = supabase.auth.user();

      if (!user) {
        router.push('/loggingPage');
      }
    };

    checkUser();
  }, [router]);

  return (
    <div>
      {children}
    </div>
  );
};

export default ProtectedRoute;
