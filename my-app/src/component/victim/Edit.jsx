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

  console.log(name);
  console.log(gender);
  console.log(age);

  let { id } = useParams();

  console.log("id ", id);

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
              className="name-input-victim"
              type="text"
              placeholder="이름"
              value={name}
              onChange={getValue}
              name="name"
            ></input>
          </td>
        </tr>
        <tr>
          <td className="victim-table-detail">
            <label>성별</label>
          </td>
          <td>
            <input
              className="gender-input"
              type="text"
              placeholder="성별"
              value={gender}
              onChange={getValue}
              name="gender"
            ></input>
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
              onChange={getValue}
              name="age"
            ></input>
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
