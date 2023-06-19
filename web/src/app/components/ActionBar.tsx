import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';

interface Props {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
}

const ActionBar = ({ likes, username, text, createdAt }: Props) => {
  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <HeartIcon />
        <BookmarkIcon />
      </div>
      <div className="px-4 py-1">
        <p className="pb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {text && (
          <p>
            <span className="pr-1 font-bold">{username}</span>
            {text}
          </p>
        )}
        <p className="py-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
      </div>
    </>
  );
};

export default ActionBar;
