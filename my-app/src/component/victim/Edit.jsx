import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./victim.css";
import DaumPostcode from "react-daum-postcode";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";

const Edit = (props) => {
  let [alert2, setAlert2] = useState(true);
  const [victim, setVictim] = useState([]);
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const [nameMessage, setNameMessage] = useState("");
  const [nameMessage2, setNameMessage2] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [ageMessage2, setAgeMessage2] = useState("");

  // console.log(name);
  // console.log(gender);
  // console.log(age);

  let { id } = useParams();

  // console.log("id: ", id);

  const navigate = useNavigate();

  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  // 팝업창 열기
  const openPostCode = () => {
    setIsPopupOpen(true);
  };

  // 팝업창 닫기
  const closePostCode = () => {
    setIsPopupOpen(false);
  };

  const [address, setAddress] = useState(""); // 주소
  const [addressDetail, setAddressDetail] = useState(""); // 상세주소

  const [isOpenPost, setIsOpenPost] = useState(false);

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
    setAddress(victim.address);
  };

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
    const { value } = e.target;
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
    // value의 값이 문자가 아닐경우 빈문자열로 replace 해버림.
    const onlyString = value.replace(/[^ㄱ-ㅎ가-힣a-zA-Z]/g, "");
    setName(onlyString);
  };

  const updateData = async () => {
    if (
      name.length === 0 ||
      gender.length === 0 ||
      age.length === 0 ||
      address.length === 0
    ) {
      alert("항목을 모두 입력해주세요.");
      return;
    }

    const nameRegex = /^[ㄱ-ㅎ가-힣a-zA-Z]{2,5}$/;
    if (!nameRegex.test(name)) {
      alert("이름을 확인해주세요.");
      return;
    }

    const ageRegex = /^[0-9]{1,2}$/;
    if (!ageRegex.test(age)) {
      alert("나이를 확인해주세요.");
      return;
    }

    console.log("updateData 실행!!!");
    console.log(name);
    console.log(gender);
    console.log(age);
    console.log(id);
    const response = await axios.post(`http://localhost:4000/victim/update`, {
      data: { data: [name, gender, age, id] },
    });
    if (response.status === 200) {
      alert("수정되었습니다.");
      navigate("/victim");
    }
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
      setAlert2(false);
    }, 100);
    fetchData();
  }, [alert2]);

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
            <div className="victim-message-edit">{nameMessage2}</div>
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
            <div className="victim-message-edit">{ageMessage2}</div>
          </td>
        </tr>
        <tr>
          <td className="victim-table-detail">
            <label>주소</label>
          </td>
          <td>
            <div>
              {/* // 버튼 클릭 시 팝업 생성 */}
              <span style={{ marginRight: "5px" }}>주소:</span>
              <button type="button" onClick={openPostCode}>
                우편번호 검색
              </button>
              {/* // 팝업 생성 기준 div */}
              <div id="popupDom">
                {isPopupOpen && (
                  <PopupDom>
                    <PopupPostCode
                      onClose={closePostCode}
                      setAddress={setAddress}
                    />
                  </PopupDom>
                )}
              </div>
            </div>
            <div>{address}</div>
          </td>
        </tr>
      </table>
      <button
        className="victim-btn"
        onClick={() => {
          updateData();
          // navigate("/victim");
        }}
      >
        수정완료
      </button>
    </>
  );
};

export default Edit;
