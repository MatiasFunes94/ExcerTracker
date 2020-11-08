import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td style={{ color: "white" }}>{props.exercise.username}</td>
    <td style={{ color: "white" }}>{props.exercise.description}</td>
    <td style={{ color: "white" }}>{props.exercise.duration}</td>
    <td style={{ color: "white" }}>{props.exercise.date.substring(0, 10)}</td>
    <td className="d-flex">
      <Link to={"/edit/" + props.exercise._id}>
        <p className="mr-2" style={{ color: "white" }}>
          edit
        </p>
      </Link>{" "}
      <span style={{ color: "white" }}>|</span>{" "}
      <a
        href="#"
        onClick={() => {
          props.deleteExercise(props.exercise._id);
        }}
      >
        <p className="ml-2" style={{ color: "white" }}>
          delete
        </p>
      </a>
    </td>
  </tr>
);

const ExercisesList = () => {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/exercises")
      .then((res) => {
        setExercises(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteExercise = (id) => {
    axios
      .delete("http://localhost:5000/exercises/" + id)
    setExercises(exercises.filter((ele) => ele._id !== id));
  };

  const exerciseList = () => {
    return exercises.map((ele) => {
      return (
        <Exercise
          exercise={ele}
          deleteExercise={deleteExercise}
          key={ele._id}
        />
      );
    });
  };

  return (
    <div>
      <h3 className="mt-3 mb-3" style={{ color: "white" }}>
        Logged exercises
      </h3>
      <table className="table">
        <thead style={{backgroundColor: 'white'}}>
          <tr>
            <th style={{fontWeight: '400'}}>Username</th>
            <th style={{fontWeight: '400'}}>Description</th>
            <th style={{fontWeight: '400'}}>Duration</th>
            <th style={{fontWeight: '400'}}>Date</th>
            <th style={{fontWeight: '400'}}>Actions</th>
          </tr>
        </thead>
        <tbody>{exerciseList()}</tbody>
      </table>
    </div>
  );
};

export default ExercisesList;
