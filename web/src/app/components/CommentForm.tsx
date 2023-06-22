import { FormEvent, useState } from 'react';
import SmileIcon from './ui/icons/SmileIcon';

interface Props {
  onPostComment: (comment: string) => void;
}

const CommentForm = ({ onPostComment }: Props) => {
  const [comment, setComment] = useState('');
  const buttonDisabled = comment.length === 0;

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onPostComment(comment);
    setComment('');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center px-3 border-t border-neutral-300"
    >
      <SmileIcon />
      <input
        className="w-full p-3 ml-2 border-none rounded-md outline-none"
        type="text"
        placeholder="Add a comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button
        disabled={buttonDisabled}
        className={`pl-2 font-bold ${
          buttonDisabled ? 'text-sky-300' : 'text-sky-500'
        }`}
      >
        Post
      </button>
    </form>
  );
};

export default CommentForm;
