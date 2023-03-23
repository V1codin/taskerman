import HeaderLayout from '@/layouts/HeaderLayout';

import { useLogin } from '@/hooks/hooks';

export default function Home() {
  useLogin({
    redirectTo: '/login',
  });

  return (
    <HeaderLayout>
      <></>
    </HeaderLayout>
  );
}
