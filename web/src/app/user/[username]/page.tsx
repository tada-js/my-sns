import UserProfile from '@/app/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    username: string;
  };
}

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return <UserProfile user={user} />;
};

export default UserPage;
