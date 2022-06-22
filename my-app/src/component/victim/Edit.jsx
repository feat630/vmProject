import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./victim.css";

const Edit = (props) => {
  let [alert, setAlert] = useState(true);
  const [victim, setVictim] = useState([]);
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const [nameMessage, setNameMessage] = useState("");
  const [ageMessage, setAgeMessage] = useState("");

  // console.log(name);
  // console.log(gender);
  // console.log(age);

  let { id } = useParams();

  // console.log("id: ", id);

  const navigate = useNavigate();

  const fetchData = async () => {
    console.log("fetchData 실행!!!");
    const response = await axios.get(
      `http://localhost:4000/victim/detail/${id}`
    );
    setVictim(response.data[0]);
    console.log("victim: ", victim);
    setName(victim.name);
    setGender(victim.gender);
    setAge(victim.age);
  };

  const onChangeAge = (e) => {
    const { value } = e.target;
    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(e.target.value)) {
      setAgeMessage("숫자만 입력 가능합니다.");
    } else {
      setAgeMessage("");
    }
    // value의 값이 숫자가 아닐경우 빈문자열로 replace 해버림.
    const onlyNumber = value.replace(/[^0-9]/g, "");
    setAge(onlyNumber);
  };

  const onChangeName = (e) => {
    if (e.target.value.length < 2 || e.target.value.length > 5) {
      setNameMessage("2글자 이상 5글자 이하로 입력해주세요.");
    } else {
      setNameMessage("");
    }
  };

  const updateData = () => {
    console.log("updateData!!!");
    console.log(name);
    console.log(gender);
    console.log(age);
    console.log(id);
    axios.post(`http://localhost:4000/victim/update`, {
      data: { data: [name, gender, age, id] },
    });
  };

  const getValue = (e) => {
    console.log("getValue 실행!!!");
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

  useEffect(() => {
    let timer = setTimeout(() => {
      setAlert(false);
    }, 100);
    fetchData();
  }, [alert]);

  return (
    <>
      <h1>이재민 수정</h1>
      <table className="victim-table">
        <tr>
          <td className="victim-table-detail">
            <label>이름</label>
          </td>
          <td>
            <input
              className="victim-name-input"
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => {
                getValue(e);
                onChangeName(e);
              }}
              name="name"
            ></input>
            <div className="victim-message-edit">{nameMessage}</div>
          </td>
        </tr>
        <tr>
          <td className="victim-table-detail">
            <label>성별</label>
          </td>
          <td>
            {/* <input
              className="gender-input"
              type="text"
              placeholder="성별"
              value={gender}
              onChange={getValue}
              name="gender"
            ></input> */}
            <input
              id="man"
              value="M"
              type="radio"
              name="gender"
              onChange={getValue}
              checked={gender === "M"}
            ></input>
            <label htmlFor="man">남자</label>
            <input
              id="woman"
              value="W"
              type="radio"
              name="gender"
              onChange={getValue}
              checked={gender === "W"}
            ></input>
            <label htmlFor="woman">여자</label>
          </td>
        </tr>
        <tr>
          <td className="victim-table-detail">
            <label>나이</label>
          </td>
          <td>
            <input
              className="age-input"
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
          </td>
        </tr>
      </table>
      <button
        className="victim-btn"
        onClick={() => {
          updateData();
          navigate("/victim");
        }}
      >
        수정완료
      </button>
    </>
  );
};

export default Edit;
