'use client';
import useSWR from 'swr';

const FollowingBar = () => {
  const { data, isLoading, error } = useSWR('/api/me');
  console.log(data);

  return <div>FollowingBar</div>;
};

export default FollowingBar;
