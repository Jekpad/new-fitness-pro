import { UseFormRegister, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = React.InputHTMLAttributes<HTMLInputElement> & {
  name: Path<T>;
  className?: string;
  register?: UseFormRegister<T>;
};

const InputRegular = <T extends FieldValues>({ className, register, name, ...props }: Props<T>) => {
  return (
    <input
      {...(register ? register(name) : {})}
      className={`rounded-lg border-2 border-[#D0CECE] px-[18px] py-4 text-lg ${className}`}
      {...props}
    />
  );
};

export default InputRegular;
