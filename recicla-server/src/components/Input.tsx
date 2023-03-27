import { FormLabel, Input as SystemInput } from "@chakra-ui/react";

interface IInputProps {
  label: string
  placeholder: string
  type: string
  onChange?: (e: any) => void;
  value?: string
}

export const Input: React.FunctionComponent<IInputProps> = ({ label, placeholder, type, onChange, value }: IInputProps) => {
  return (
    <>
      <FormLabel ms='4px' fontSize='sm' fontWeight='normal'>
        {label}
      </FormLabel>
      <SystemInput
        borderRadius='15px'
        mb='24px'
        id={`field-${label}`}
        fontSize='sm'
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        size='lg'
      />
    </>
  );
};
