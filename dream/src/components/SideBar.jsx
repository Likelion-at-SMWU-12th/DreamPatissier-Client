import React, { useRef, useEffect } from "react";
import styled from "styled-components";
import Cansle from "../assets/cancel.svg";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const outside = useRef();

  const handlerOutside = (e) => {
    if (outside.current && !outside.current.contains(e.target)) {
      toggleSide();
    }
  };

  const toggleSide = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handlerOutside);
    return () => {
      document.removeEventListener("mousedown", handlerOutside);
    };
  }, []);

  return (
    <>
      {isOpen && <Overlay onClick={toggleSide} />}
      <SideBarWrap ref={outside} className={isOpen ? "open" : ""}>
        <CloseImg
          src={Cansle}
          alt="close"
          onClick={toggleSide}
          onKeyDown={toggleSide}
          role="button"
          tabIndex={0}
        />
        <ul>
          <Menu>메뉴1</Menu>
          <Menu>메뉴2</Menu>
          <Menu>메뉴3</Menu>
        </ul>
      </SideBarWrap>
    </>
  );
};

export default Sidebar;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 4;
`;

const SideBarWrap = styled.div`
  z-index: 5;
  padding: 12px;
  border-radius: 5px 0 0 5px;
  background-color: #ffffff;
  height: 100%;
  width: 55%;
  right: -60%;
  top: 0;
  position: fixed;
  transition: 0.5s ease;
  cursor: pointer;
  &.open {
    right: 0;
    transition: 0.5s ease;
  }
`;

const CloseImg = styled.img`
  position: absolute;
  right: 15px;
  top: 9px;
`;

const Menu = styled.li`
  margin: 30px 8px;
`;

const ExitMenu = styled.span`
  position: absolute;
  bottom: 26px;
  font-size: 0.8rem;
`;
