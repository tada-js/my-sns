import { FullPost, SimplePost } from '@/model/post';
import Image from 'next/image';
import useSWR from 'swr';
import ActionBar from './ActionBar';
import CommentForm from './CommentForm';
import Avatar from './Avatar';
import PostUserAvatar from './PostUserAvatar';
import { ClipLoader } from 'react-spinners';

interface Props {
  post: SimplePost;
}

const PostDetail = ({ post }: Props) => {
  const { id, userImage, username, image, createdAt, likes } = post;
  const { data, isLoading } = useSWR<FullPost>(`/api/posts/${id}`);
  const comments = data?.comments;

  const handlePostComment = (comment: string) => {};

  return (
    <section className="flex w-full h-full">
      <div className="relative basis-3/5">
        <Image
          className="object-cover"
          src={image}
          alt={`photo by ${username}`}
          priority
          fill
          sizes="650px"
        />
      </div>
      <div className="flex flex-col w-full basis-2/5">
        <PostUserAvatar image={userImage} username={username} />
        <ul className="h-full p-4 mb-1 overflow-y-auto border-t border-gray-200">
          <div className="flex justify-center">
            {isLoading && <ClipLoader color="red" />}
          </div>
          {comments &&
            comments.map(
              ({ image, username: commentUsername, comment }, index) => (
                <li className="flex items-center mb-1" key={index}>
                  <Avatar
                    image={image}
                    size="small"
                    highlight={commentUsername === username}
                  />
                  <div className="ml-2">
                    <span className="mr-1 font-semibold">
                      {commentUsername}
                    </span>
                    <span>{comment}</span>
                  </div>
                </li>
              )
            )}
        </ul>
        <ActionBar post={post} />
        <CommentForm onPostComment={handlePostComment} />
      </div>
    </section>
  );
};

export default PostDetail;
