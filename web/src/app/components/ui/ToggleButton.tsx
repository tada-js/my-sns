interface Props {
  toggled: boolean;
  onToggle: (toggled: boolean) => void;
  onIcon: React.ReactNode;
  offIcon: React.ReactNode;
}

const ToggleButton = ({ toggled, onToggle, offIcon, onIcon }: Props) => {
  return (
    <button onClick={() => onToggle(!toggled)}>
      {toggled ? onIcon : offIcon}
    </button>
  );
};

export default ToggleButton;
