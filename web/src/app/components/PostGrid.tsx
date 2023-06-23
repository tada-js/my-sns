import PostGridCard from './PostGridCard';
import SyncLoaderSpinner from './ui/SyncLoaderSpinner';
import usePosts from '@/hooks/usePosts';

const PostGrid = () => {
  const { posts, isLoading } = usePosts();

  return (
    <div className="w-full text-center">
      {isLoading && (
        <SyncLoaderSpinner size={8} color="red" className="py-10" />
      )}
      <ul className="grid grid-cols-3 gap-4 px-8 py-4">
        {posts &&
          posts.map((post, index) => (
            <li key={post.id}>
              <PostGridCard post={post} priority={index < 6} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default PostGrid;
