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
  ...props}) {

  const baseStyles =
    'inline-flex items-center justify-center gap-2 font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40 disabled:opacity-50 disabled:cursor-not-allowed'


  const variants = {
    primary: 'bg-primary text-white hover:bg-primary/90',
    secondary: 'bg-secondary text-white hover:bg-secondary/90',
    outline: 'border border-primary text-primary hover:bg-primary hover:text-white',    
    bg_white_green_outline: 'radius-radius-lg bg-grey-0 text-black border border-2 border-border-buttons-secondary-default',
    bg_green: 'radius-radius-lg bg-green-200 text-black border border-2 border-border-buttons-secondary-default',
    icon_toggle: 'bg-red-100 text-black rounded-xl p-0 hover:bg-red-200 border-none',
    icon_toggle_active: 'bg-red-700 text-white rounded-xl p-0 border-none',
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'w-16 h-16',
    icon_small: 'w-14 h-14',
    icon_big: 'w-16 h-16',
  }

  return (
      <Link
        disabled={disabled} 
        href={href}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}>
          {children}
      </Link>
  );
}