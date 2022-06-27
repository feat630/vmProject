import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopupDom from "./PopupDom";
import PopupPostCode from "./PopupPostCode";

const Input = (props) => {
  const [name, setName] = useState([]);
  const [gender, setGender] = useState([]);
  const [age, setAge] = useState([]);

  const [nameMessage, setNameMessage] = useState("");
  const [nameMessage2, setNameMessage2] = useState("");
  const [ageMessage, setAgeMessage] = useState("");
  const [ageMessage2, setAgeMessage2] = useState("");

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

  const onChangeOpenPost = () => {
    setIsOpenPost(!isOpenPost);
  };

  const toggle = () => {
    setIsOpenPost(!isOpenPost);
  };

  const changeHandler = (e) => {
    setAddressDetail(e.target.value);
  };

  const clickHandler = () => {
    if (addressDetail === "") {
      alert("상세주소를 입력해주세요.");
    } else {
      console.log(address, addressDetail);
    }
  };

  const onCompletePost = (data) => {
    let fullAddress = data.address;
    let extraAddr = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddr += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddr +=
          extraAddr !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddr !== "" ? ` (${extraAddr})` : "";
    }

    setAddress(data.zonecode);
    setAddressDetail(fullAddress);
    setIsOpenPost(false);
  };

  const postCodeStyle = {
    display: "block",
    position: "relative",
    top: "0%",
    width: "400px",
    height: "400px",
    padding: "7px",
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
    const numOfchr = value.substr(0, 5);
    setName(numOfchr);
  };

  const dataInsert = async () => {
    if (
      name.length === 0 ||
      gender.length === 0 ||
      age.length === 0 ||
      address.length === 0
    ) {
      alert("항목을 모두 입력해주세요.");
      return;
    }

    const nameRegex = /^[가-힣a-zA-Z]{2,5}$/;
    if (!nameRegex.test(name)) {
      alert("이름을 확인해주세요.");
      return;
    }

    const ageRegex = /^[0-9]{1,2}$/;
    if (!ageRegex.test(age)) {
      alert("나이를 확인해주세요.");
      return;
    }

    console.log(name);
    console.log(gender);
    console.log(age);
    console.log(address);
    const response = await axios.post("http://localhost:4000/victim/register", {
      data: { data: [name, gender, age, address] },
    });
    if (response.status === 200) {
      alert("등록되었습니다.");
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

  useEffect(() => {
    console.log(props.addr);
  }, [props]);

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
