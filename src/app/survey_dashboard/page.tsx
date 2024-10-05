export default function SurveyDashboard() {
  return (
    <div>
        <p>Survey Dashboard</p>
        <button>Add Survey</button>
        <input/>
        <button>Search</button>
        <button>Export Selected</button>
        <button>Delete Selected</button>
        <table>
            <tr>
                <th><input type="checkbox"/></th>
                <th>Survey</th>
                <th>Date</th>
                <th>Link To Survey</th>
                <th>Target Org</th>
                <th>Activate/Deactivate</th>
            </tr>
        </table>
    </div>
  )
}
