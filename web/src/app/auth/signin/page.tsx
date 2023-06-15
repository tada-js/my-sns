import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Signin from '@/app/components/Signin';
import { getServerSession } from 'next-auth';
import { getProviders } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: {
    callbackUrl: string;
  };
}

const SignPage = async ({ searchParams: { callbackUrl } }: Props) => {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/');
  }

  const providers = (await getProviders()) ?? {};

  return (
    <section className="flex justify-center mt-[30%]">
      <Signin providers={providers} callbackUrl={callbackUrl ?? '/'} />
    </section>
  );
};

export default SignPage;
