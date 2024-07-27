import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import YellowBtn from "../../src/components/YellowBtn";
import Checkbox from "../components/CheckBox";
import TermS from "../pages/accounts/TermS";
import TermP from "../pages/accounts/TermP";
import Popup from "../components/Popup";
import styled from "styled-components";
import canSeeIcon from "../assets/cansee.svg";
import noSeeIcon from "../assets/nosee.svg";
import delPasswordIcon from "../assets/delpassword.svg";

const SignForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    nickname: "",
    phone: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [allChecked, setAllChecked] = useState({
    termsAgree: false,
    privacyAgree: false,
    serviceAgree: false,
    allChecked: false,
  });
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  // 입력 필드 값 변경 시 호출되는 함수
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
    setErrors({ ...errors, [id]: "" });
  };

  // 비밀번호 확인 필드 값 변경 시 호출되는 함수
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors({ ...errors, confirmPassword: "" });
  };

  // 폼 유효성 검사 함수
  const validateForm = () => {
    const newErrors = {};
    let isErrorPresent = false;

    if (!formData.username) {
      newErrors.username = "ⓘ 아이디를 입력해 주세요.";
      isErrorPresent = true;
    } else if (!/^[a-z0-9]{4,12}$/.test(formData.username)) {
      newErrors.username =
        "ⓘ 아이디는 영문 소문자와 숫자 4~12자리로 이루어져야 합니다.";
      isErrorPresent = true;
    }

    if (!formData.password) {
      newErrors.password = "ⓘ 비밀번호를 입력해 주세요.";
      isErrorPresent = true;
    } else if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{10,16}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "ⓘ 비밀번호는 영문, 숫자, 특수문자를 포함한 10~16자리여야 합니다.";
      isErrorPresent = true;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "ⓘ 비밀번호를 다시 한 번 입력해주세요.";
      isErrorPresent = true;
    } else if (formData.password !== confirmPassword) {
      newErrors.confirmPassword = "ⓘ 비밀번호가 일치하지 않습니다.";
      isErrorPresent = true;
    }

    if (!formData.nickname) {
      newErrors.nickname = "ⓘ 이름을 입력해 주세요.";
      isErrorPresent = true;
    }

    if (formData.phone && !/^\d{10,11}$/.test(formData.phone)) {
      newErrors.phone = "ⓘ 유효한 연락처를 입력해주세요. 예) 01012345678";
      isErrorPresent = true;
    }

    setErrors(newErrors);
    setIsError(isErrorPresent);
    return Object.keys(newErrors).length === 0;
  };

  // 폼 제출 시 호출되는 함수
  const handleSubmit = (e) => {
    e.preventDefault();

    // 현재 입력된 데이터를 배열 형태로 콘솔에 출력
    console.log("Form data before validation:", [
      formData.username,
      formData.password,
      confirmPassword,
      formData.nickname,
      formData.phone,
    ]);

    // 필수 항목 체크 확인
    if (
      !allChecked.termsAgree ||
      !allChecked.privacyAgree ||
      !allChecked.serviceAgree
    ) {
      setMessage("ⓘ 필수 약관에 동의해 주세요.");
      setIsError(true);
      return;
    }

    // 유효성 검사
    if (!validateForm()) {
      setMessage(
        "ⓘ 회원가입에 실패했습니다. 입력하신 정보를 다시 한번 확인해 주세요."
      );
      return;
    }

    // 서버에 데이터 전송
    console.log("Sending data to server:", formData);

    axios
      .post("http://127.0.0.1:8000/accounts/signup/", formData)
      .then((response) => {
        console.log("Signup successful", response.data);
        setMessage("회원가입이 완료되었습니다.");
        setIsError(false);
        navigate("/signup-clear");
      })
      .catch((error) => {
        console.error(
          "Signup failed",
          error.response ? error.response.data : error.message
        );
        setMessage("서버 오류!");
        setIsError(true);
      });
  };

  return (
    <FormWrapper>
      <HiddenDiv isError={isError} />
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          {[
            {
              id: "username",
              label: "아이디",
              placeholder: "영문소문자/숫자포함 4~12자",
              buttons: [
                <DelButton
                  type="button"
                  onClick={() => setFormData({ ...formData, username: "" })}
                >
                  <img src={delPasswordIcon} alt="Clear" />
                </DelButton>,
              ],
            },
            {
              id: "password",
              label: "비밀번호",
              placeholder: "영문/숫자/특수문자 혼합,10~16자",
              type: "password",
              buttons: [
                <SeeButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? canSeeIcon : noSeeIcon}
                    alt="Toggle visibility"
                  />
                </SeeButton>,
                <DelButton
                  type="button"
                  onClick={() => setFormData({ ...formData, password: "" })}
                >
                  <img src={delPasswordIcon} alt="Clear" />
                </DelButton>,
              ],
            },
            {
              id: "confirmPassword",
              label: "비밀번호 확인",
              placeholder: "비밀번호를 한 번 더 입력해 주세요.",
              type: "password",
              value: confirmPassword,
              onChange: handleConfirmPasswordChange,
              buttons: [
                <SeeButton
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img src={showPassword ? canSeeIcon : noSeeIcon} />
                </SeeButton>,
                <DelButton type="button" onClick={() => setConfirmPassword("")}>
                  <img src={delPasswordIcon} alt="Clear" />
                </DelButton>,
              ],
            },
            { id: "nickname", label: "이름", placeholder: "빵사자" },
            {
              id: "phone",
              label: "연락처",
              placeholder: "-없이 숫자만 입력해 주세요.",
            },
          ].map(
            ({
              id,
              label,
              placeholder,
              type = "text",
              value = formData[id],
              onChange = handleChange,
              buttons = [],
            }) => (
              <InputBox key={id}>
                <LabelBox>
                  <Label htmlFor={id}>{label}</Label>
                  {id !== "phone" && (
                    <MustFill>* 필수 입력 항목입니다.</MustFill>
                  )}
                </LabelBox>
                <InputField
                  type={type === "password" && showPassword ? "text" : type}
                  id={id}
                  placeholder={placeholder}
                  value={value}
                  onChange={onChange}
                />
                {buttons.map((button, index) => (
                  <React.Fragment key={index}>{button}</React.Fragment>
                ))}
                {errors[id] && <ErrorMessage>{errors[id]}</ErrorMessage>}
              </InputBox>
            )
          )}
        </InputWrapper>
        <Checkbox
          allChecked={allChecked}
          setAllChecked={setAllChecked}
          onShowTerms={() => setShowTerms(true)} // 팝업 열기
          onShowPrivacy={() => setShowPrivacy(true)} // 팝업 열기
        />
        {message && <Message>{message}</Message>}
        <BtnBox>
          <YellowBtn
            txt="동의하고 가입하기"
            type="submit"
            width="340px"
            disabled={!allChecked.allChecked}
          />
        </BtnBox>
      </form>
      {showTerms && (
        <Popup onClose={() => setShowTerms(false)}>
          <TermS />
        </Popup>
      )}
      {showPrivacy && (
        <Popup onClose={() => setShowPrivacy(false)}>
          <TermP />
        </Popup>
      )}
    </FormWrapper>
  );
};

export default SignForm;

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: auto;
  width: 100%;
`;

const HiddenDiv = styled.div`
  width: 100%;
  height: ${(props) => (props.isError ? "90px" : "0")};
  transition: height 0.4s;
`;

const InputWrapper = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const InputBox = styled.div`
  margin-bottom: 15px;
  width: 310px;
  position: relative;
`;

const InputField = styled.input`
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  width: 300px;
  height: 41px;
  font-size: 14px;
  outline: none;
  text-indent: 8px;
`;

const LabelBox = styled.div`
  padding-bottom: 5px;
`;

const Label = styled.label`
  font-size: 18px;
  margin-bottom: 5px;
`;

const MustFill = styled.span`
  color: var(--grey);
  font-size: 10px;
  padding-left: 7px;
`;

const Message = styled.div`
  text-align: center;
  font-weight: 800;
  color: red;
  margin-top: 15px;
  margin-bottom: -15px;
  font-size: 12px;
`;

const BtnBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-top: 10px;
`;

const ErrorMessage = styled.div`
  font-weight: 800;
  color: red;
  font-size: 11px;
  padding-top: 10px;
  margin-bottom: -5px;
`;

const Button = styled.button`
  margin-top: 10px;
  background: none;
  border: none;
  position: absolute;
  right: 10px;
  cursor: pointer;

  img {
    width: 15px;
    height: 15px;
  }
`;

const SeeButton = styled(Button)`
  right: 35px;
  bottom: 11px;
`;

const DelButton = styled(Button)`
  right: 10px;
  bottom: 11px;
`;
