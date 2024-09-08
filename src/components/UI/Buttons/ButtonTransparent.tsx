type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

const ButtonTransparent = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={`font-semibold bg-color-component-background border-black border-2 hover:bg-color-inactive active:bg-[#E9ECED] px-[26px] py-4 rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonTransparent;
