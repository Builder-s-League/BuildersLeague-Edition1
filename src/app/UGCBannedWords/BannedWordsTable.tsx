import BannedWordsRow from './BannedWordRow'

function BannedWordsTable() {
  return (
    <div>
      <table className="min-w-full overflow-hidden rounded-lg bg-amber-700 shadow-md">
        <thead>
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Word
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Organization
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Automatically filter variations?
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Added by
            </th>
            <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider">
              Organization
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          <BannedWordsRow organization="org test" addedBy="added test" />
          <BannedWordsRow organization="org test" addedBy="added test" />
          <BannedWordsRow organization="org test" addedBy="added test" />
        </tbody>
      </table>
    </div>
  )
}

export default BannedWordsTable
