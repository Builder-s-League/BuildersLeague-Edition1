import ContentRow from './ContentRow'

function ContentTable() {
  return (
    <div>
      <table className="min-w-full overflow-hidden rounded-lg bg-gray-400 shadow-md">
        <thead className="bg-gray-500">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Checkbox
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Note
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Linked Content
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Author
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Organization
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Approval reports
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <ContentRow
            note="note test"
            link="link test"
            author="author test"
            organization="organization test"
          />
          <ContentRow
            note="note test"
            link="link test"
            author="author test"
            organization="organization test"
          />
          <ContentRow
            note="note test"
            link="link test"
            author="author test"
            organization="organization test"
          />
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
