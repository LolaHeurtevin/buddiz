import Link from "next/link"

// Utility function to replace clsx
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ')
}

export default function CustomButton({ children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  className,
  href,
  onClick,
  ...props}) {

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed'


  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',    
    bg_white_green_outline: 'radius-radius-lg bg-grey-0 text-black border border-border-buttons-secondary-default',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'w-16 h-16',
  }

  return (
      <Link
        disabled={disabled} 
        href={href}
        onClick={onClick} 
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}>
        {children}
      </Link>
  );
}