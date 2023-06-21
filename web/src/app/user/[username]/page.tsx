import UserPosts from '@/app/components/UserPosts';
import UserProfile from '@/app/components/UserProfile';
import { getUserForProfile } from '@/service/user';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { cache } from 'react';

interface Props {
  params: {
    username: string;
  };
}

const getUser = cache(async (username: string) => getUserForProfile(username));

const UserPage = async ({ params: { username } }: Props) => {
  const user = await getUserForProfile(username);

  if (!user) {
    notFound();
  }

  return (
    <section className="w-full">
      <UserProfile user={user} />
      <UserPosts user={user} />
    </section>
  );
};

export default UserPage;

export const generateMetadata = async ({
  params: { username },
}: Props): Promise<Metadata> => {
  const user = await getUser(username);
  return {
    title: `${user?.name} (@${user?.username}) · My SNS Photos`,
    description: `${user?.name}'s all My SNS posts`,
  };
};
