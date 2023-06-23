'use client';

import { HomeUser, ProfileUser } from '@/model/user';
import Button from './ui/Button';
import useMe from '@/hooks/useMe';

interface Props {
  user: ProfileUser;
}

const FollowButton = ({ user }: Props) => {
  const { username } = user;
  const { user: loggedInUser, toggleFollow } = useMe();

  const showButton = loggedInUser && loggedInUser.username !== username;
  const following =
    loggedInUser &&
    loggedInUser.following.find((item) => item.username === username);

  const text = following ? 'Unfollow' : 'Follow';

  const handleFollow = () => {
    toggleFollow(user.id, !following);
  };
  return (
    <>
      {showButton && (
        <Button text={text} onClick={handleFollow} red={text === 'Unfollow'} />
      )}
    </>
  );
};

export default FollowButton;
