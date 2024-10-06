const UserInfo = () => {
  return (
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
  )
}

export default UserInfo
