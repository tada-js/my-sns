'use client';

import HeartIcon from './ui/icons/HeartIcon';
import BookmarkIcon from './ui/icons/BookmarkIcon';
import { parseDate } from '@/util/date';
import ToggleButton from './ui/ToggleButton';
import HeartFillIcon from './ui/icons/HeartFillIcon';
import BookmarkFillIcon from './ui/icons/BookmarkFillIcon';
import { Comment, SimplePost } from '@/model/post';
import usePosts from '@/hooks/usePosts';
import useMe from '@/hooks/useMe';
import CommentForm from './CommentForm';

interface Props {
  post: SimplePost;
  children?: React.ReactNode;
  onComment: (comment: Comment) => void;
}

const ActionBar = ({ post, children, onComment }: Props) => {
  const { id, likes, createdAt } = post;
  const { user, setBookmark } = useMe();
  const { setLike } = usePosts();

  const liked = user ? likes.includes(user.username) : false;
  const bookmarked = user?.bookmarks.includes(id) ?? false;

  const handleLike = (like: boolean) => {
    user && setLike(post, user.username, like);
  };

  const handleBookmark = (bookmark: boolean) => {
    user && setBookmark(id, bookmark);
  };

  const handleComment = (comment: string) => {
    user && onComment({ comment, username: user.username, image: user.image });
  };

  return (
    <>
      <div className="flex justify-between px-4 my-2">
        <ToggleButton
          toggled={liked}
          onToggle={handleLike}
          onIcon={<HeartFillIcon />}
          offIcon={<HeartIcon />}
        />
        <ToggleButton
          toggled={bookmarked}
          onToggle={handleBookmark}
          onIcon={<BookmarkFillIcon />}
          offIcon={<BookmarkIcon />}
        />
      </div>
      <div className="px-4 py-1">
        <p className="pb-2 text-sm font-bold">{`${likes?.length ?? 0} ${
          likes?.length > 1 ? 'likes' : 'like'
        }`}</p>
        {children}
        <p className="py-2 text-xs uppercase text-neutral-500">
          {parseDate(createdAt)}
        </p>
      </div>
      <CommentForm onPostComment={handleComment} />
    </>
  );
};

export default ActionBar;
