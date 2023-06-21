import { RiBookmarkLine } from 'react-icons/ri';
interface Props {
  className?: string;
}

const BookmarkIcon = ({ className }: Props) => {
  return <RiBookmarkLine className={className || 'w-6 h-6'} />;
};

export default BookmarkIcon;
