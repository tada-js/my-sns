import { client } from './sanity';

interface OAuthUser {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
}

export const addUser = async ({
  id,
  email,
  name,
  username,
  image,
}: OAuthUser) => {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    image,
    email,
    name,
    following: [],
    followers: [],
    bookmarks: [],
  });
};

export const getUserByUsername = async (username: string) => {
  return client.fetch(`*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    following[]->{username, image},
    followers[]->{username, image},
    "bookmarks": bookmarks[]->_id
  }`);
};
