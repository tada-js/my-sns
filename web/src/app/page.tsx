import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import FollowingBar from './components/FollowingBar';
import PostList from './components/PostList';
import SideBar from './components/SideBar';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex flex-col w-full md:flex-row max-w-[850px] p-4">
      <div className="w-full min-w-0 basis-3/4">
        <FollowingBar />
        <PostList />
      </div>
      <div className="ml-8 basis-1/4">
        <SideBar user={user} />
      </div>
    </section>
  );
}
