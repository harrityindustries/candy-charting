import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../AuthContext';

const LoginButton = () => {
  const { login } = useAuth();

  const handleSuccess = (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      login({
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
      });
    } catch (error) {
      console.error('Error decoding token:', error);
    }
  };

  const handleError = () => {
    console.error('Login Failed');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
      <GoogleLogin
        onSuccess={handleSuccess}
        onError={handleError}
        useOneTap
      />
    </div>
  );
};

export default LoginButton;
