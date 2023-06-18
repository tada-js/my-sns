'use client';
import { SimplePost } from '@/model/post';
import useSWR from 'swr';
import PostListCard from './PostListCard';

const PostList = () => {
  const { data: posts, isLoading } = useSWR<SimplePost[]>('/api/posts');
  return (
    <section>
      {isLoading && <div></div>}
      {posts && (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{<PostListCard post={post} />}</li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default PostList;
