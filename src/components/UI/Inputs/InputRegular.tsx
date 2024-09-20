import { UseFormRegister, FieldValues } from 'react-hook-form';

interface FormValues extends FieldValues {
  [key: string]: string; 
}
type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  className?: string;
  register?: UseFormRegister<FormValues>;
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
