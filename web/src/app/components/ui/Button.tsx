interface Props {
  text: string;
  onClick: () => void;
  red?: boolean;
  disabled?: boolean;
}

const Button = ({ text, onClick, red, disabled = false }: Props) => {
  return (
    <button
      className={`border-node rounded-md py-2 px-8 text-white font-bold leading-4 ${
        red ? 'bg-red-500 hover:bg-red-600' : 'bg-sky-500 hover:bg-sky-600'
      } ${disabled && 'opacity-80'}`}
      onClick={() => onClick()}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
