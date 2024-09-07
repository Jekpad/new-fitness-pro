import { UseFormRegister } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  register?: UseFormRegister<any>;
};

const InputRegular = ({ className, register, name, ...props }: Props) => {
  return (
    <input
      {...(register ? register(name) : {})}
      className={`border-[#D0CECE] rounded-lg px-[18px] py-4 border-2 text-lg ${className}`}
      {...props}
    />
  );
};

export default InputRegular;
