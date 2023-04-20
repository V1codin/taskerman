import ProfileForm from '@/components/ProfileForm/ProfileForm';

import { useSession } from 'next-auth/react';

export default function Profile() {
  const { status } = useSession();

  if (status !== 'authenticated') {
    return (
      <h1 style={{ textAlign: 'center' }}>Please log in for profile page</h1>
    );
  }

  return <ProfileForm />;
}
