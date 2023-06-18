'use client';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostListCard from './PostListCard';
import SyncLoaderSpinner from './ui/SyncLoaderSpinner';

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {isLoading && (
        <div className="mt-12 text-center">
          <SyncLoaderSpinner size={8} color="red" />
        </div>
      )}
      {posts && (
        <ul>
          {posts.map((post, index) => (
            <li className="mb-4" key={post.id}>
              <PostListCard post={post} priority={index < 2} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
