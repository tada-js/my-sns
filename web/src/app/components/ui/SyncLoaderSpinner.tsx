import dynamic from 'next/dynamic';

const SyncLoaderSpinner = dynamic(
  () => import('react-spinners').then((lib) => lib.SyncLoader),
  {
    ssr: false,
  }
);

interface Props {
  color?: string;
}

const SyncSpinner = ({ color = 'red' }: Props) => {
  return <SyncLoaderSpinner color={color} />;
};

export default SyncLoaderSpinner;
