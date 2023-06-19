'use client';

import { useState } from 'react';
import { SimplePost } from '@/model/post';
import Avatar from './Avatar';
import Image from 'next/image';
import ActionBar from './ActionBar';
import ModalPortal from './ui/ModalPortal';
import PostModal from './PostModal';
import CommentForm from './CommentForm';
import PostDetail from './PostDetail';

interface Props {
  post: SimplePost;
  priority: boolean;
}

const PostListCard = ({ post, priority = false }: Props) => {
  const { userImage, username, image, createdAt, likes, text } = post;
  const [openModal, setOpenModal] = useState(false);

  return (
    <article className="border border-gray-200 rounded-lg shadow-md">
      <div className="flex items-center p-2">
        <Avatar image={userImage} size="medium" highlight />
        <span className="ml-2 font-bold text-gray-900">{username}</span>
      </div>
      <Image
        className="object-cover w-full aspect-square"
        src={image}
        alt={`photo by ${username}`}
        width={500}
        height={500}
        priority={priority}
        onClick={() => setOpenModal(true)}
      />
      <ActionBar
        likes={likes}
        username={username}
        text={text}
        createdAt={createdAt}
      />
      <CommentForm />
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
