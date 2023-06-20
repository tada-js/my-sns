import Link from 'next/link';
import Avatar from './Avatar';
import { SearchUser } from '@/model/user';

interface Props {
  user: SearchUser;
}

const UserCard = ({
  user: { name, username, image, following, followers },
}: Props) => {
  return (
    <Link
      className="flex items-center w-full gap-3 p-4 mb-2 bg-white border rounded-sm shadow-md border-neutral-300 hover:bg-neutral-50"
      href={`/user/${username}`}
    >
      <Avatar image={image} />
      <div className="text-neutral-500">
        <p className="font-bold leading-4 text-black">{username}</p>
        <p>{name}</p>
        <p className="text-sm leading-4">{`${followers} followers ${following} following`}</p>
      </div>
    </Link>
  );
};

export default UserCard;
