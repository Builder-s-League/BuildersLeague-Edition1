import React from 'react'
interface NewSurveyProps {
  onClose: () => void
}
const NewSurvey: React.FC<NewSurveyProps> = ({ onClose }) => {
  return (
    <div className="container">
      <h1>New Survey</h1>
      <button>Back</button>
      <style></style>

      <form>
        <label id="survey-name">Survey Name</label>
        <input
          type="text"
          id="survey-name"
          placeholder="Survey name"
          required
        />

        <label id="survey-link">Link to Survey</label>
        <input
          type="url"
          id="survey-link"
          placeholder="Link to Survey"
          required
        />

        <label id="survey-date">Survey Date</label>
        <input type="time" />
        <input type="date" id="survey-date" required />

        <label>Target Org</label>
        <div className="checkbox-group">
          <label>
            <input type="checkbox" checked /> *{' '}
          </label>
          <label>
            <input type="checkbox" /> ACME inc
          </label>
          <label>
            <input type="checkbox" /> Ori.Gatou
          </label>
          <label>
            <input type="checkbox" /> RRC
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export default NewSurvey
