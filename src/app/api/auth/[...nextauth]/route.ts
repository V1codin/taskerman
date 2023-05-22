import NextAuth from 'next-auth/next';

import { getAuthOptions } from '@/libs/db/adapter';

import type { NextApiRequest } from 'next/types';

const handler = async (
  request: NextApiRequest,
  { params }: { params: any },
) => {
  const result = await NextAuth({
    ...getAuthOptions(request.method),
  })(request, {
    params,
  });

  return result;
};

export { handler as GET, handler as POST };
