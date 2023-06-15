'use client';

import { ClientSafeProvider, signIn } from 'next-auth/react';
import ColorButton from './ui/ColorButton';

interface Props {
  providers: Record<string, ClientSafeProvider>;
  callbackUrl: string;
}

const Signin = ({ providers, callbackUrl }: Props) => {
  return (
    <>
      {Object.values(providers).map(({ name, id }) => (
        <ColorButton
          key={id}
          text={`Sign In with ${name}`}
          onClick={() => signIn(id, { callbackUrl })}
          size="big"
        ></ColorButton>
      ))}
    </>
  );
};

export default Signin;
