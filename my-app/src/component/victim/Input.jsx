import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Input = (props) => {
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const [nameMessage, setNameMessage] = useState("");
  const [nameMessage2, setNameMessage2] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [ageMessage2, setAgeMessage2] = useState("");

  const navigate = useNavigate();

  const onChangeAge = (e) => {
    const { value } = e.target;
    const ageRegex = /^[0-9]*$/;
    if (!ageRegex.test(e.target.value)) {
      setAgeMessage("숫자만 입력 가능합니다.");
    } else {
      setAgeMessage("");
    }
    if (e.target.value <= 0 || e.target.value > 100) {
      setAgeMessage2("1부터 100까지 입력 가능합니다.");
    } else {
      setAgeMessage2("");
    }
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setAge(onlyNumber);
  };

  const onChangeName = (e) => {
    const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]*$/;
    if (!nameRegex.test(e.target.value)) {
      setNameMessage2("문자만 입력 가능합니다.");
    } else {
      setNameMessage2("");
    }
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage("2글자 이상 5글자 이하로 입력해주세요.");
    } else {
      setNameMessage("");
    }
  };

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
    console.log(e.target.name);
    console.log(e.target.value);
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
        <div>
          이름:
          <input
            // style={{ marginBottom: "10px", marginLeft: "5px" }}
            style={{ marginLeft: "5px" }}
            className="victim-name-input victim-input"
            type="text"
            placeholder="이름"
            value={name}
            onChange={(e) => {
              getValue(e);
              onChangeName(e);
            }}
            name="name"
          ></input>
        </div>
        <div className="victim-message">{nameMessage2}</div>
        <div className="victim-message">{nameMessage}</div>
        <div className="victim-register-div">
          성별:
          {/* <input
          style={{ marginBottom: "10px", marginLeft: "5px" }}
          className="gender-input"
          type="text"
          placeholder="성별"
          value={gender}
          onChange={getValue}
          name="gender"
        ></input>
        <br /> */}
          <input
            id="man"
            value="M"
            type="radio"
            name="gender"
            onChange={getValue}
          ></input>
          <label htmlFor="man">남자</label>
          <input
            id="woman"
            value="W"
            type="radio"
            name="gender"
            onChange={getValue}
          ></input>
          <label htmlFor="woman">여자</label>
        </div>
        <div>
          나이:
          <input
            style={{ marginTop: "10px", marginLeft: "5px" }}
            className="age-input victim-input"
            type="text"
            placeholder="나이"
            value={age}
            onChange={(e) => {
              getValue(e);
              onChangeAge(e);
            }}
            name="age"
          ></input>
          <div className="victim-message-edit">{ageMessage}</div>
          <div className="victim-message">{ageMessage2}</div>
        </div>
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
