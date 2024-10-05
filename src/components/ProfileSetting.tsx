export const ProfileSetting = () => {
  return (
    <div className="mx-auto flex w-fit flex-col items-center rounded-2xl border-2 border-white p-6">
      <h1 className="mb-4 text-center text-2xl font-bold">Profile Settings</h1>
      <div className="flex flex-row rounded-2xl p-4">
        <div className="m-4 flex flex-col items-center rounded-lg p-4">
          <div className="flex flex-row rounded-lg p-4">
            <div className="mr-4 flex flex-col font-semibold">
              <label>Full Name: </label>
              <label>Nickname: </label>
              <label>Email: </label>
              <label>DOB: </label>
              <label>Address: </label>
            </div>
            <div className="flex flex-col">
              <label>John Doe</label>
              <label>John</label>
              <label>john.doe@example.com</label>
              <label>January 1, 1999</label>
              <label>123 This St</label>
            </div>
          </div>
          <div className="mt-4 flex w-48 flex-col">
            <button className="my-1 h-8 rounded-lg bg-blue-500 text-white hover:bg-blue-700">
              Change Password
            </button>
            <button className="my-1 h-8 rounded-lg bg-green-500 text-white hover:bg-green-700">
              Help
            </button>
            <button className="my-1 h-8 rounded-lg bg-red-500 text-white hover:bg-red-700">
              Logout
            </button>
          </div>
        </div>
        <div className="m-4 flex flex-col items-center rounded-lg p-4">
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-10 w-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
            </svg>

            <button className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform text-3xl text-gray-500 opacity-0 transition-opacity hover:opacity-100">
              ✎
            </button>
          </div>
          <label className="mt-2 italic text-gray-500">@johndoe</label>
        </div>
      </div>
      <div className="border-grey flex gap-2 rounded-lg border-2 p-4">
        <button className="h-8 w-12 bg-gray-900 hover:bg-gray-500">F</button>
        <button className="h-8 w-12 bg-gray-900 hover:bg-gray-500">C</button>
        <button className="h-8 w-12 bg-gray-900 hover:bg-gray-500">N</button>
        <button className="h-8 w-12 bg-gray-900 hover:bg-gray-500">P</button>
      </div>
    </div>
  )
}
