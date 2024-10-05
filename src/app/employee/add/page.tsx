import PageButton from '@/components/EmployeeDashboard/PageButton'

export default function AddNewEmployee() {
  return (
    <div>
      <div className="flex w-full flex-col p-4">
        <div className="flex flex-wrap space-x-4">
          <PageButton
            label="Back to last page"
            link="/cbh/organization-dashboard"
          />
        </div>
      </div>

      <div className="  flex w-full flex-col space-y-2">
        <div className="m-6 flex flex-col space-x-4 self-end">
          <div className="flex">
            <PageButton label="Add" link="/employee/add" />
            <PageButton label="Import" link="/import" />
            <PageButton label="Export" link="/export" />
          </div>
        </div>
      </div>

      <div>
        <input placeholder="Employee name" />
      </div>

      <div>
        <input placeholder="Employee email" />
      </div>

      <div>
        <label>
          Employee profile photo
          <input type="file" accept="image/*" hidden />
        </label>
      </div>

      <div>
        <input placeholder="Employee generated password" />
        <div>
          <a href="#">Add</a>
        </div>
      </div>

      <div>
        <a href="#">OM</a>
        <a href="#">OGC</a>
        <a href="#">C</a>
        <a href="#">FB</a>
        <a href="#">S</a>
      </div>
    </div>
  )
}
