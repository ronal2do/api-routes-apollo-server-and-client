import { FormEvent, PropsWithChildren } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ButtonVariant = 'solid' | 'outline';
type ButtonColor = 'gray' | 'cyan' | 'white' | 'gray';

type ButtonProps = PropsWithChildren<{
  variant?: ButtonVariant;
  color?: ButtonColor;
  className?: string;
  href?: string;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
  loading?: boolean;
  onClick?: (event: FormEvent) => void;
}>;

const baseStyles: Record<ButtonVariant, string> = {
  solid:
    'inline-flex justify-center rounded-lg py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-lg border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm outline-2 outline-offset-2 transition-colors',
}

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    cyan: 'relative overflow-hidden bg-cyan-500 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-gray-800 text-white hover:bg-gray-900 active:bg-gray-800 active:text-white/80',
  },
  outline: {
    gray: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
    cyan: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
    white: 'border-gray-300 text-gray-700 hover:border-gray-400 active:bg-gray-100 active:text-gray-700/80',
  },
}

export const Button = ({
  variant = 'solid',
  color = 'gray',
  className,
  href,
  type,
  loading = false,
  ...props
}: ButtonProps): JSX.Element => {
  className = clsx(
    baseStyles[variant],
    variantStyles[variant][color],
    className
  );

  return href ? (
    <Link href={href} className={className} {...props} />
  ) : (
    <button type={type} className={className} {...props} />
  );
};