type AvatarSize = 'small' | 'medium' | 'large';

interface Props {
  image?: string | null;
  size?: AvatarSize;
  highlight?: boolean;
}

const Avatar = ({ image, size = 'large', highlight = false }: Props) => {
  return (
    <div className={getContainerStyle(size, highlight)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className={`bg-white object-cover rounded-full p-[0.1rem] ${getImageSizeStyle(
          size
        )}`}
        alt="user profile"
        src={image ?? undefined}
        referrerPolicy="no-referrer"
      />
    </div>
  );
};

const getContainerStyle = (size: AvatarSize, highlight: boolean): string => {
  const baseStyle = 'rounded-full flex justify-center items-center';
  const highlightStyle = highlight
    ? 'bg-gradient-to-bl from-fuchsia-600 via-rose-500 to-amber-300'
    : '';
  const sizeStyle = getContainerSize(size);

  return `${baseStyle} ${highlightStyle} ${sizeStyle}`;
};

const getContainerSize = (size: AvatarSize): string => {
  switch (size) {
    case 'small':
      return 'w-9 h-9';
    case 'medium':
      return 'w-11 h-11';
    case 'large':
      return 'w-[68px] h-[68px]';
  }
};

const getImageSizeStyle = (size: AvatarSize): string => {
  switch (size) {
    case 'small':
      return 'w-[34px] h-[34px]';
    case 'medium':
      return 'w-[42px] h-[42px]';
    case 'large':
      return 'w-16 h-16';
  }
};

export default Avatar;
