import clsx from 'clsx';
import { InputHTMLAttributes, SelectHTMLAttributes } from 'react';

const formClasses =
  'block w-full appearance-none rounded-lg border border-gray-200 bg-white py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-gray-900 placeholder:text-gray-400 focus:border-cyan-500 focus:outline-none focus:ring-cyan-500 sm:text-sm';

type LabelProps = {
  id: string;
  children: React.ReactNode;
};

function Label({ id, children }: LabelProps) {
  return (
    <label
      htmlFor={id}
      aria-label={id}
      className="mb-2 block text-sm font-semibold text-gray-900"
    >
      {children}
    </label>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label?: string;
  className?: string;
};

export function TextField({
  id,
  label,
  type = 'text',
  className,
  ...rest
}: TextFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <input id={id} type={type} {...rest} className={formClasses} />
    </div>
  );
}

type SelectFieldProps = SelectHTMLAttributes<HTMLSelectElement> & {
  id: string;
  label?: string;
  className?: string;
};

export function SelectField({
  id,
  label,
  className,
  ...rest
}: SelectFieldProps) {
  return (
    <div className={className}>
      {label && <Label id={id}>{label}</Label>}
      <select
        id={id}
        {...rest}
        className={clsx(formClasses, 'pr-8')}
      />
    </div>
  );
}