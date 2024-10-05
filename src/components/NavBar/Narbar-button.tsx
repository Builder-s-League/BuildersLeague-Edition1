interface NavbarButtonProps {
  label: string
  link: string
}

function NavBarButton({ label, link }: NavbarButtonProps) {
  return (
    <a
      className="rounded px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
      href={link}
    >
      {label}
    </a>
  )
}

export default NavBarButton
