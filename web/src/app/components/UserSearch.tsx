'use client';

import { useState } from 'react';
import useSWR from 'swr';
import { SearchUser } from '@/model/user';
import SyncLoaderSpinner from './ui/SyncLoaderSpinner';
import UserCard from './UserCard';

const UserSearch = () => {
  const [keyword, setKeyword] = useState('');
  const {
    data: users,
    isLoading,
    error,
  } = useSWR<SearchUser[]>(`/api/search/${keyword}`);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="flex flex-col items-center w-full max-w-2xl my-4">
        <form className="w-full mb-4" onSubmit={onSubmit}>
          <input
            className="w-full p-3 text-xl border border-gray-400 outline-none"
            type="text"
            autoFocus
            placeholder="사용자 아이디 또는 이름 검색"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>
        {error && <p>ERROR</p>}
        {isLoading && <SyncLoaderSpinner size={8} color="red" />}
        {!isLoading && !error && users?.length === 0 && (
          <p>검색된 사용자가 없습니다.</p>
        )}
        <ul className="w-full p-4">
          {users &&
            users.map((user) => (
              <li key={user.username}>
                <UserCard user={user} />
              </li>
            ))}
        </ul>
      </section>
    </>
  );
};

export default UserSearch;
