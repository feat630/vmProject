import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Input = (props) => {
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const dataInsert = () => {
    console.log(name);
    console.log(gender);
    console.log(age);
    axios.post("http://localhost:4000/victim/register", {
      data: { data: [name, gender, age] },
    });
  };

  const getValue = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
    } else if (name === "age") {
      setAge(value);
    } else if (name === "gender") {
      setGender(value);
    }
  };

  const onReset = () => {
    setName("");
    setGender("");
    setAge("");
  };

  return (
    <>
      이름:
      <input
        className="name-input"
        type="text"
        placeholder="이름"
        value={name}
        onChange={getValue}
        name="name"
      ></input>
      <br />
      성별:
      <input
        className="gender-input"
        type="text"
        placeholder="성별"
        value={gender}
        onChange={getValue}
        name="gender"
      ></input>
      <br />
      나이:
      <input
        className="age-input"
        type="text"
        placeholder="나이"
        value={age}
        onChange={getValue}
        name="age"
      ></input>
      <br />
      <Link to="/victim">
        <button
          onClick={() => {
            dataInsert();
            onReset();
          }}
        >
          제출하기
        </button>
      </Link>
    </>
  );
};

export default Input;
