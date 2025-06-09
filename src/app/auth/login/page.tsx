import AuthBackground from '@/components/auth/AuthBackground';
import ModernLoginForm from '@/components/auth/ModernLoginForm';

export const metadata = {
  title: 'Entrar - Food Loop',
  description: 'Entre na sua conta Food Loop',
};

export default function LoginPage() {
  return (
    <AuthBackground>
      <ModernLoginForm />
    </AuthBackground>
  );
}
