import { FormEvent, PropsWithChildren } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ButtonVariant = 'solid' | 'outline';
type ButtonColor = 'gray' | 'cyan' | 'white' | 'orange';

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
    'inline-flex justify-center items-center rounded-3xl py-2 px-3 text-sm font-semibold outline-2 outline-offset-2 transition-colors',
  outline:
    'inline-flex justify-center rounded-3xl border py-[calc(theme(spacing.2)-1px)] px-[calc(theme(spacing.3)-1px)] text-sm font-medium text-blumine-700 outline-2 outline-offset-2 transition-colors',
}

const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
  solid: {
    cyan: 'relative overflow-hidden bg-bay-leaf-300 text-white before:absolute before:inset-0 active:before:bg-transparent hover:before:bg-white/10 active:bg-cyan-600 active:text-white/80 before:transition-colors',
    white:
      'bg-white text-cyan-900 hover:bg-white/90 active:bg-white/90 active:text-cyan-900/70',
    gray: 'bg-blumine-700 text-white hover:bg-blumine-900 active:bg-blumine-700 active:text-white/80',
    orange: 'bg-vivid-tangerine-400 text-white hover:bg-vivid-tangerine-500 active:bg-vivid-tangerine-400 active:text-white/80',
  },
  outline: {
    gray: 'border-blumine-700 text-blumine-800 hover:border-blumine-500 active:bg-gray-100 active:text-gray-800/80 dark:border-blumine-50 dark:text-blumine-100 dark:hover:border-blumine-100 dark:active:bg-gray-100 dark:active:text-gray-800/80',
    cyan: 'border-blumine-700 text-blumine-800 hover:border-blumine-500 active:bg-gray-100 active:text-blumine-800/80',
    white: 'border-blumine-700 text-blumine-800 hover:border-blumine-500 active:bg-gray-100 active:text-blumine-800/80',
    orange: 'border-blumine-700 text-blumine-800 hover:border-blumine-500 active:bg-gray-100 active:text-blumine-700/80',
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