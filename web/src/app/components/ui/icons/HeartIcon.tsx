import { AiOutlineHeart } from 'react-icons/ai';

interface Props {
  className?: string;
}

const HeartIcon = ({ className }: Props) => {
  return <AiOutlineHeart className={className || 'w-7 h-7'} />;
};

export default HeartIcon;
