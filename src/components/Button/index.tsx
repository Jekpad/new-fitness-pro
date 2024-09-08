type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  text: string;
  className?: string;
};

const Button = ({ text, className, ...props }: Props) => {
  return (
    <button
      className={`font-semibold bg-color-acсent hover:bg-color-acent-hover px-[26px] py-4 rounded-full ${className}`}
      {...props}
    >
      {text}
    </button>
  );
};

export default Button;
