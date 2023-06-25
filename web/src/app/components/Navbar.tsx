'use client';

import Link from 'next/link';
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from './ui/icons';
import { usePathname } from 'next/navigation';
import ColorButton from './ui/ColorButton';
import { useSession, signIn, signOut } from 'next-auth/react';
import Avatar from './Avatar';

const menu = [
  {
    href: '/',
    icon: <HomeIcon />,
    clickedIcon: <HomeFillIcon />,
    title: 'Home',
  },
  {
    href: '/search',
    icon: <SearchIcon />,
    clickedIcon: <SearchFillIcon />,
    title: 'Search users',
  },
  {
    href: '/new',
    icon: <NewIcon />,
    clickedIcon: <NewFillIcon />,
    title: 'New post',
  },
];

const Navbar = () => {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex items-center justify-between px-6">
      <Link href="/" aria-label="Home">
        <h1 className="text-3xl font-bold">My SNS</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-4 p-4">
          {menu.map(({ href, icon, clickedIcon, title }) => (
            <li key={href}>
              <Link href={href} aria-label={title}>
                {pathName === href ? clickedIcon : icon}
              </Link>
            </li>
          ))}
          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}
          <li>
            {session ? (
              <ColorButton
                text="Sign out"
                onClick={() => {
                  signOut();
                }}
              />
            ) : (
              <ColorButton
                text="Sign in"
                onClick={() => {
                  signIn();
                }}
              />
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
