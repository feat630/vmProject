import React, { useState } from "react";
import DaumPostcode from "react-daum-postcode";

const PopupPostCode = (props) => {
  const [victimAddress, setVictimAddress] = useState("");
  // 우편번호 검색 후 주소 클릭 시 실행될 함수, data callback 용
  const handlePostCode = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);
    setVictimAddress(fullAddress);
    props.onClose();
  };

  const postCodeStyle = {
    display: "block",
    position: "absolute",
    top: "10%",
    width: "500px",
    height: "500px",
    padding: "7px",
  };

  return (
    <div>
      <DaumPostcode
        style={postCodeStyle}
        onComplete={handlePostCode}
        addr={victimAddress}
      />
      // 닫기 버튼 생성
      <button
        type="button"
        onClick={() => {
          props.onClose();
        }}
        className="postCode_btn"
      >
        닫기
      </button>
      <div>여기에 주소 넣어야지</div>
      <div>{victimAddress}</div>
    </div>
  );
};

export default PopupPostCode;
