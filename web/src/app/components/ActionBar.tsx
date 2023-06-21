'use client';

import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import { useState } from 'react';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';

interface Props {
  likes: string[];
  username: string;
  createdAt: string;
  text?: string;
}

const ActionBar = ({ likes, username, text, createdAt }: Props) => {
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <ToggleButton
          toggled={liked}
          onToggle={setLiked}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={setBookmarked}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
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
