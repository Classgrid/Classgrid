// Platform marks for the download page (single colour, follow the text colour)
type IconProps = { className?: string };

export function WindowsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.9-1.801" />
    </svg>
  );
}

export function AppleIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
    </svg>
  );
}

// A simple penguin: body with the belly and eyes cut out, beak and feet
export function LinuxIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path
        fillRule="evenodd"
        d="M12 1.5c-3 0-5 2.4-5 5.6 0 1.5.2 2.6-.7 4.2C5.2 13.2 4 15.2 4 17.4 4 20.5 7.4 22.5 12 22.5s8-2 8-5.1c0-2.2-1.2-4.2-2.3-6.1-.9-1.6-.7-2.7-.7-4.2 0-3.2-2-5.6-5-5.6zm0 8.7c-2.3 0-3.9 2.9-3.9 6.1 0 2.4 1.7 3.9 3.9 3.9s3.9-1.5 3.9-3.9c0-3.2-1.6-6.1-3.9-6.1zM10 5.4a1 1.2 0 1 0 0 2.4 1 1.2 0 0 0 0-2.4zm4 0a1 1.2 0 1 0 0 2.4 1 1.2 0 0 0 0-2.4z"
      />
      <path d="M10.4 8.6h3.2L12 10.3z" />
      <ellipse cx="7.6" cy="21.4" rx="2.6" ry="1.3" />
      <ellipse cx="16.4" cy="21.4" rx="2.6" ry="1.3" />
    </svg>
  );
}
