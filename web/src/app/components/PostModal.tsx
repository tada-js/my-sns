import CloseIcon from './ui/icons/CloseIcon';

interface Props {
  children: React.ReactNode;
  onClose: () => void;
}

const PostModal = ({ onClose, children }: Props) => {
  return (
    <section
      className="fixed top-0 left-0 z-50 flex flex-col items-center justify-center w-full h-full bg-neutral-900/70"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          // children이 아닌 외부(section) 클릭하면 onClose
          onClose();
        }
      }}
    >
      <button
        className="fixed top-0 right-0 p-8 text-white"
        onClick={() => onClose()}
      >
        <CloseIcon />
      </button>
      <div className="w-4/5 bg-white h-3/5 max-w-7xl">{children}</div>
    </section>
  );
};

export default PostModal;
