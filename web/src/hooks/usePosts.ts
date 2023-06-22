import { SimplePost } from '@/model/post';
import useSWR, { useSWRConfig } from 'swr';

const usePosts = () => {
  const { data: posts, isLoading, error } = useSWR<SimplePost[]>('/api/posts');
  const { mutate } = useSWRConfig();

  const setLike = (post: SimplePost, username: string, like: boolean) => {
    fetch('/api/likes', {
      method: 'PUT',
      body: JSON.stringify({ id: post.id, like }),
    }).then(() => mutate('/api/posts')); // 데이터 변경되면 revalidate
  };
  return { posts, isLoading, error, setLike };
};
export default usePosts;
