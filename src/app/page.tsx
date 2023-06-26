import { authService } from '@/libs/auth.service';
import { dbConnect } from '@/libs/db/connect';
import { AUTH_TOKEN_COOKIE_NAME } from '@/utils/constants';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function Home() {
  await dbConnect();
  const cookieStorage = cookies();

  const sessionToken = cookieStorage.get(AUTH_TOKEN_COOKIE_NAME);
  const sessionUser = await authService.getSessionUser(
    sessionToken?.value || '',
  );

  if (!sessionUser) {
    redirect('/login');
  }

  redirect('/boards');
}
