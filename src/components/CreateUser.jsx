import React, {useState} from "react";
import axios from "axios";

const CreateUser = () => {

    const [username, setUsername] = useState("")

  const onChangeUsername = (e) => {
    setUsername(e.target.value)
  }

  const onSubmit =(e) => {
    e.preventDefault();
    const user = {
      username: username,
    };

    axios.post("http://localhost:5000/users/add", user)

    setUsername("")
  }
    return (
      <div>
        <h3 className="mt-3" style={{color: 'white'}}>Create New User</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label style={{color: 'white'}}>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={username}
              onChange={onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-light"
            />
          </div>
        </form>
      </div>
    );
}


export default CreateUser;