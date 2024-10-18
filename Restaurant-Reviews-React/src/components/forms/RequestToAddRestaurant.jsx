import './forms.css'



export default function RequestToAddRestaurant() {

  return(
    <div>
      <h2>Form for user to send a request to admin to add a new restaurant.</h2>
      <form >
        <h2>Request to Add Restaurant</h2>
        <label>
          Name:
          <input />
        </label>
        <label>
          Restaurant Name:
          <input />
        </label>
        <label>
          Category:
          <input />
        </label>
        <label>
          Phone #:
          <input />
        </label>
        <label>
          Address:
          <input />
        </label>
        <label>
          Open Hours: <br/>
          From 
          <select>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
          </select> A.M.
          To 
          <select>
            <option value='5'>5</option>
            <option value='6'>6</option>
            <option value='7'>7</option>
            <option value='8'>8</option>
            <option value='9'>9</option>
            <option value='10'>10</option>
            <option value='11'>11</option>
          </select> P.M.
        </label>
      </form>
    </div>
  )
}