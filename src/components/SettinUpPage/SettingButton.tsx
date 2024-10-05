interface SettingUpButtonProps {
  label: string
}

function SettingUpButton({ label }: SettingUpButtonProps) {
  return (
    <button className="rounded px-4 py-2 text-white hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-500">
      {label}
    </button>
  )
}

export default SettingUpButton
