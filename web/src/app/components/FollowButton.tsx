'use client';

import { ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/useMe';
import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PulseLoader } from 'react-spinners';

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();
  const [isPending, startTransition] = useTransition();
  const [isFetching, setIsFetching] = useState(false);
  const router = useRouter();
  const isUpdating = isPending || isFetching;

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = async () => {
    setIsFetching(true);
    await toggleFollow(user.id, !following);
    setIsFetching(false);
    startTransition(() => {
      router.refresh();
    });
  };
  return (
    <>
      {showButton && (
        <div className="relative">
          {isUpdating && (
            <div className="absolute inset-0 z-20 flex items-center justify-center">
              <PulseLoader size={6} color="gray" />
            </div>
          )}
          <Button
            disabled={isUpdating}
            text={text}
            onClick={handleFollow}
            red={text === 'Unfollow'}
          />
        </div>
      )}
    </>
  );
};

export default FollowButton;
