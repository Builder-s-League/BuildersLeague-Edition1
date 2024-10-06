interface PageButtonProps {
  label: string
  link: string
}

function PageButton({ label, link }: PageButtonProps) {
  return (
    <a
      className="m-2 rounded bg-gray-500 px-4 py-2 text-center text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500"
      href={link}
    >
      {label}
    </a>
  )
}

export default PageButton
