interface BannedWordsRowProps {
  // word: ???
  organization: string
  // validation: ????
  addedBy: string
  // remote: button???
}

function BannedWordsRow({ organization, addedBy }: BannedWordsRowProps) {
  return (
    <tr className="hover:bg-gray-500">
      <td className="whitespace-nowrap px-4 py-4"> word...?</td>
      <td className="whitespace-nowrap px-4 py-4">{organization}</td>
      <td className="whitespace-nowrap px-4 py-4">validation...?</td>
      <td className="whitespace-nowrap px-4 py-4">{addedBy}</td>
      <td className="whitespace-nowrap px-4 py-4">remote....?</td>
    </tr>
  )
}

export default BannedWordsRow
