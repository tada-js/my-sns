'use client';

import { useState } from 'react';
import { SimplePost } from '@/model/post';
import Image from 'next/image';
import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import CommentForm from './CommentForm';
import PostDetail from './PostDetail';
import PostUserAvatar from './PostUserAvatar';
import usePosts from '@/hooks/usePosts';

interface Props {
  post: SimplePost;
  priority: boolean;
}

const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, image, comments, text } = post;
  const [openModal, setOpenModal] = useState(false);
  const { postComment } = usePosts();

  const handlePostComment = (comment: string) => {
    postComment(post, comment);
  };

  return (
    <article className="border border-gray-200 rounded-lg shadow-md">
      <PostUserAvatar image={userImage} username={username} />
      <Image
        className="object-cover w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar post={post}>
        <p>
          <span className="mr-1 font-bold">{username}</span>
          {text}
        </p>
        {comments > 1 && (
          <button
            className="my-2 font-bold text-sky-500 hover:text-sky-600"
            onClick={() => setOpenModal(true)}
          >{`View all ${comments} comments`}</button>
        )}
      </ActionBar>
      <CommentForm onPostComment={handlePostComment} />
      {openModal && (
        <ModalPortal>
          <PostModal onClose={() => setOpenModal(false)}>
            <PostDetail post={post} />
          </PostModal>
        </ModalPortal>
      )}
    </article>
  );
};

export default PostListCard;
