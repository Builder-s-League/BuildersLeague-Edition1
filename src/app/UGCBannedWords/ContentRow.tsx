interface ContentRowProps {
  // check: ???
  note: string
  link: string
  author: string
  organization: string
  //approval: ???
}

function ContentRow({ note, link, author, organization }: ContentRowProps) {
  return (
    <tr>
      <td className="whitespace-nowrap px-4 py-4"> Check...?</td>
      <td className="whitespace-nowrap px-4 py-4">{note}</td>
      <td className="whitespace-nowrap px-4 py-4">{link}</td>
      <td className="whitespace-nowrap px-4 py-4">{author}</td>
      <td className="whitespace-nowrap px-4 py-4">{organization}</td>
      <td className="whitespace-nowrap px-4 py-4">Approval....?</td>
    </tr>
  )
}

export default ContentRow
