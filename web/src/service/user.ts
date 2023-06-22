import { SearchUser } from '@/model/user';
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

export const searchUsers = async (keyword?: string) => {
  const query = keyword
    ? `&& (name match "*${keyword}*") || (username match "*${keyword}*")`
    : '';
  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`
    )
    .then((user) =>
      user.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
};

export const getUserForProfile = async (username: string) => {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
    ...,
    "id":_id,
    "following": count(following),
    "followers": count(followers),
    "posts": count(*[_type=="post" && author->username == "${username}"])
  }`
    )
    .then((user) => ({
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      post: user.post ?? 0,
    }));
};

export const addBookmark = async (userId: string, postId: string) => {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
};

export const removeBookmark = async (userId: string, postId: string) => {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
};
