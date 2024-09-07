type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
};

const InputRegular = ({ className, ...props }: Props) => {
  return (
    <input
      className={`border-[#D0CECE] rounded-lg px-[18px] py-4 border-2 text-lg ${className}`}
      {...props}
    />
  );
};

export default InputRegular;
