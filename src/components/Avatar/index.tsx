interface AvatarProps {
  src?: string | null
  name: string
  className?: string
}

export const Avatar = ({ src, name, className = '' }: AvatarProps) => {
  // Get initials from name (up to 2 characters)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((word) => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2)
  }

  if (!src) {
    return (
      <div
        className={`flex items-center justify-center rounded-full bg-primary text-primary-foreground ${className}`}
        role="img"
        aria-label={`${name}'s avatar`}
      >
        {getInitials(name)}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`}>
      <img
        src={src}
        alt={`${name}'s avatar`}
        className="h-full w-full rounded-full object-cover"
        onError={(e) => {
          // If image fails to load, show initials
          e.currentTarget.style.display = 'none'
          e.currentTarget.parentElement?.classList.add(
            'flex',
            'items-center',
            'justify-center',
            'bg-primary',
            'text-primary-foreground',
          )
          if (e.currentTarget.parentElement) {
            e.currentTarget.parentElement.innerHTML = getInitials(name)
          }
        }}
      />
    </div>
  )
}
