import GoogleLoginForm from '@/components/AllForms/LoginForm';

export const metadata = {
  title: 'Login - Food Loop',
  description: 'Log in to your Food Loop account',
};

export default function LoginPage() {
  return (
    <div className="container mx-auto px-4">
      <GoogleLoginForm />
    </div>
  );
}