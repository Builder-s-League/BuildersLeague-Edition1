import BannedWordsTable from './BannedWordsTable'
import ContentTable from './ContentTable'
import SearchBar from './SearchBar'

function UGCBannedwords() {
  return (
    <>
      <h1>User content review</h1>
      <SearchBar />
      <ContentTable />
      <h1>Banned words</h1>
      <SearchBar />
      <BannedWordsTable />
    </>
  )
}

export default UGCBannedwords
