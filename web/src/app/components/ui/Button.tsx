interface Props {
  text: string;
  onClick: () => void;
  red?: boolean;
}

const Button = ({ text, onClick, red }: Props) => {
  return (
    <button
      className={`border-node rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'
      }`}
      onClick={() => onClick()}
    >
      {text}
    </button>
  );
};

export default Button;
