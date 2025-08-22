import React, {useState} from "react";
import styled, { css } from "styled-components";
import { useNavigate, useLocation } from 'react-router-dom';
import "../../App.css";

interface ButtonProps {
    label: string;
    path?: string; 
};

export const Button = ({ label, path }: ButtonProps) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isHovered, setHovered] = useState(false);

    const isActive = path === location.pathname; 

    const handleClick = () => {
        if (path) navigate(path);
    };

    return(
        <>
        <Btn 
            onClick={handleClick} 
            $active={isActive}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            {label}
        </Btn>
        <Text style={{ color: isHovered ? "transparent" : "#F00" }}>
            파일이 업로드되지 않았습니다.
        </Text>
        </>
    );
};

const Btn = styled.button<{ $active?: boolean }>`
  /* width: 29.6vw; */
  width: 35.5rem;
  height: 6rem;
  flex-shrink: 0;
  color: #F8F8F8;
  font-family: "KoPubWorld_b";
  font-size: 2rem;
  font-style: normal;
  letter-spacing: 0.5rem;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 0.9375rem;
  background: var(--Blue-3, #182E64);

  &:hover {
    background-color: #F6F7F9;
    color: #F8F8F8;

    ${({ $active }) =>
      $active &&
      css`
        background: var(--Blue-1, #9DBEE1);
        color: #F8F8F8;
      `}
  }
`;

const Text = styled.div<{ $active?: boolean }>`
    margin-top: 0.69rem;
    margin-left: 1rem;
    font-family: "KoPubWorld_l";
    font-size: 1.125rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.1125rem;
`;