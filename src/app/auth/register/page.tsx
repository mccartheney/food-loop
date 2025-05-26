import SignupForm from '@/components/AllForms/SignupForm';

export const metadata = {
  title: 'Register - Food Loop',
  description: 'Create a new account on Food Loop',
};

export default function RegisterPage() {
  return (
    <div className="container mx-auto px-4">
      <SignupForm />
    </div>
  );
}