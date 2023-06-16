'use client';
import Link from 'next/link';
import { SyncLoader } from 'react-spinners';
import useSWR from 'swr';
import Avatar from './Avatar';
import { HomeUser } from '@/model/user';

const FollowingBar = () => {
  const { data, isLoading, error } = useSWR<HomeUser>('/api/me');
  // const users = data?.following;
  const users = data?.following && [
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
    ...data?.following,
  ];

  return (
    <section className="flex items-center justify-center w-full p-4 mb-4 rounded-lg shadow-sm shadow-neutral-300 min-h-[90px] overflow-x-auto">
      {isLoading ? (
        <SyncLoader size={8} color="red" />
      ) : (
        (!users || users.length === 0) && <p>{'팔로잉을 해보세요!'}</p>
      )}
      {users && users.length > 0 && (
        <ul className="flex w-full gap-2">
          {users.map(({ image, username }) => (
            <li key={username}>
              <Link
                className="flex flex-col items-center w-20"
                href={`/user/${username}`}
              >
                <Avatar image={image} highlight />
                <p className="w-full overflow-hidden text-sm text-center text-ellipsis">
                  {username}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default FollowingBar;
