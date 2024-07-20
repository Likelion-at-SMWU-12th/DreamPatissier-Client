import React from "react";

const Checkbox = ({ allChecked, setAllChecked }) => {
  const handleAllChange = (e) => {
    const { checked } = e.target;
    setAllChecked({
      allAgree: checked,
      termsAgree: checked,
      privacyAgree: checked,
      marketingAgree: checked,
    });
  };

  const handleIndividualChange = (e) => {
    const { id, checked } = e.target;
    setAllChecked((prev) => ({
      ...prev,
      [id]: checked,
      allAgree:
        prev.termsAgree && prev.privacyAgree && prev.marketingAgree && checked,
    }));
  };

  return (
    <div className="agree">
      <div className="checkbox-item">
        <input
          type="checkbox"
          id="allAgree"
          name="allAgree"
          className="join_check"
          checked={allChecked.allAgree}
          onChange={handleAllChange}
        />
        <label htmlFor="allAgree" className="allAgree">
          약관 전체 동의
        </label>
      </div>
      <div className="checkbox-item check_alone">
        <input
          type="checkbox"
          id="termsAgree"
          name="termsAgree"
          className="join_check"
          checked={allChecked.termsAgree}
          onChange={handleIndividualChange}
        />
        <label htmlFor="termsAgree">[필수] 만 14세 이상 서비스 이용 동의</label>
      </div>
      <div className="checkbox-item check_alone">
        <input
          type="checkbox"
          id="privacyAgree"
          className="join_check"
          checked={allChecked.privacyAgree}
          onChange={handleIndividualChange}
        />
        <label htmlFor="privacyAgree">[필수] 서비스 이용 약관</label>
      </div>
      <div className="checkbox-item check_alone">
        <input
          type="checkbox"
          id="marketingAgree"
          name="marketingAgree"
          className="join_check"
          checked={allChecked.marketingAgree}
          onChange={handleIndividualChange}
        />
        <label htmlFor="marketingAgree">마케팅 정보 수신 선택 동의</label>
      </div>
    </div>
  );
};

export default Checkbox;
