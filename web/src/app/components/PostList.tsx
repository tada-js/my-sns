'use client';
import PostListCard from './PostListCard';
import SyncLoaderSpinner from './ui/SyncLoaderSpinner';
import usePosts from '@/hooks/usePosts';

const PostList = () => {
  const { posts, isLoading } = usePosts();
  return (
    <section>
      {isLoading && (
        <div className="text-center mt-52">
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
