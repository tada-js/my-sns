import SmileIcon from './ui/icons/SmileIcon';

const CommentForm = () => {
  return (
    <form className="flex items-center px-3 border-t border-neutral-300">
      <SmileIcon />
      <input
        className="w-full p-3 ml-2 border-none rounded-md outline-none"
        type="text"
        placeholder="Add a comment..."
      />
      <button className="pl-2 font-bold text-sky-500">Post</button>
    </form>
  );
};

export default CommentForm;
