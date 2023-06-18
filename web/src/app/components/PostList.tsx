'use client';
import { SimplePost } from '@/model/post';
import { SyncLoader } from 'react-spinners';
import useSWR from 'swr';
import PostListCard from './PostListCard';

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {isLoading && (
        <div className="mt-12 text-center">
          <SyncLoader size={8} color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li className="mb-4" key={post.id}>
              <PostListCard post={post} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
