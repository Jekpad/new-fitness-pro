type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string;
  children?: React.ReactNode;
};

const ButtonRegular = ({ children, className, ...props }: Props) => {
  return (
    <button
      className={`font-semibold bg-color-acсent hover:bg-color-acent-hover px-[26px] active:bg-black active:text-color-component-background py-4 rounded-full ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default ButtonRegular;
