import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { AuthUser } from '@/model/user';
import { getServerSession } from 'next-auth';

export const withSessionUser = async (
  handler: (user: AuthUser) => Promise<Response>
): Promise<Response> => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    return new Response('Authentication Error', { status: 401 });
  }

  return handler(user);
};
