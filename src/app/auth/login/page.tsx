import AuthBackground from '@/components/auth/AuthBackground';
import ModernLoginForm from '@/components/auth/ModernLoginForm';

export const metadata = {
  title: 'Login - Food Loop',
  description: 'Sign in to your Food Loop account',
};

export default function LoginPage() {
  return (
    <AuthBackground>
      <ModernLoginForm />
    </AuthBackground>
  );
}