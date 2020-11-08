import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditExercise = (props) => {

    const [username, setUsername] = useState("")
    const [description, setDescription] = useState("")
    const [duration, setDuration] = useState("")
    const [users, setUsers] = useState([])

    const [stateDate, setStateDate] = useState(new Date())

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises/" + props.match.params.id)
      .then((res) => {
        setUsername(res.data.username)
        setDescription(res.data.description)
        setDuration(res.data.duration)
        setUsers(res.data.users)
        setStateDate(new Date(res.data.date))
      })
      .catch((err) => console.log(err));
    }, [])

    useEffect(() => {
      axios.get("http://localhost:5000/users/").then((response) => {
      if (response.data.length > 0) {
        setUsers(response.data.map((user) => user.username));
      }
    });
    }, [])

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onChangeDescription = (e) => {
    setDescription(e.target.value)
  }

  const onChangeDuration = (e) => {
    setDuration(e.target.value)
  }
 
  const onChangeDate = (date) => {
    setStateDate(date)
  }

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const exercise = {
      username,
      description,
      duration,
      date: stateDate,
    };
    axios
      .post(
        "http://localhost:5000/exercises/update/" + props.match.params.id,
        exercise
      )
    window.location = "/";
  }

    return (
      <div>
        <h3 className="mt-3" style={{color: 'white'}}>Edit Exercise</h3>
        <form onSubmit={handleOnSubmit}>
          <div className="form-group">
            <label style={{color: 'white'}}>Username: </label>
            <select
              name="username"
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}
            >
              {users && users.map((user) => (
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
              value={description}
              onChange={onChangeDescription}
            />
          </div>
          <div className="form-group">
            <label style={{color: 'white'}}>Duration (in minutes): </label>
            <input
              name="duration"
              type="text"
              className="form-control"
              value={duration}
              onChange={onChangeDuration}
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
              value="Edit Exercise Log"
              className="btn btn-light"
            />
          </div>
        </form>
      </div>
    );
}

export default EditExercise;