import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Input = (props) => {
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const navigate = useNavigate();

  const dataInsert = () => {
    if (name.length === 0 || gender.length === 0 || age.length === 0) {
      alert("항목을 모두 입력해주세요.");
    } else {
      console.log(name);
      console.log(gender);
      console.log(age);
      axios.post("http://localhost:4000/victim/register", {
        data: { data: [name, gender, age] },
      });
      navigate("/victim");
    }
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

  return (
    <>
      <h1>이재민 등록</h1>
      <div className="victim-create-wrapper">
        이름:
        <input
          style={{ marginBottom: "10px", marginLeft: "5px" }}
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
          style={{ marginBottom: "10px", marginLeft: "5px" }}
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
          style={{ marginLeft: "5px" }}
          className="age-input"
          type="text"
          placeholder="나이"
          value={age}
          onChange={getValue}
          name="age"
        ></input>
        <br />
      </div>
      <button
        onClick={() => {
          dataInsert();
          // onReset();
        }}
      >
        제출하기
      </button>
    </>
  );
};

export default Input;
