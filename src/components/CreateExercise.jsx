import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CreateExercise = () => {

  const [state, setState] = useState({
      username: "",
      description: "",
      duration: 0,
      users: [],
  })
  const [stateDate, setStateDate] = useState(new Date())

  useEffect(() => {
    axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setState({
          users: response.data.map((user) => user.username),
          username: response.data[0].username,
        });
      }
    });
  }, [])

  const handleOnChange = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    })
  }

  const onChangeDate = (date) => {
    setStateDate(date)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username: state.username,
      description: state.description,
      duration: state.duration,
      date: stateDate,
    };

    window.location = "/";
    axios
      .post("http://localhost:5000/exercises/add", exercise)
  }

    return (
      <div>
        <h3 className="mt-3" style={{color: 'white'}}>Create New Exercise Log</h3>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label style={{color: 'white'}}>Username: </label>
            <select
              name="username"
              required
              className="form-control"
              value={state.username || ""}
              onChange={handleOnChange}
            >
              {state.users.map((user) => (
                  <option key={user} value={user}>
                    {user}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label style={{color: 'white'}}>Description: </label>
            <input
              name="description"
              type="text"
              required
              className="form-control"
              value={state.description || ""}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label style={{color: 'white'}}>Duration (in minutes): </label>
            <input
              name="duration"
              type="text"
              className="form-control"
              value={state.duration || ""}
              onChange={handleOnChange}
            />
          </div>
          <div className="form-group">
            <label style={{color: 'white'}}>Date: </label>
            <div>
              <DatePicker
                selected={stateDate}
                onChange={onChangeDate}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Exercise Log"
              className="btn btn-light"
            />
          </div>
        </form>
      </div>
    );
}

export default CreateExercise;