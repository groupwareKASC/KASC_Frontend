// 변환하기 버튼 컴포넌트
import styled, { keyframes } from "styled-components";
import "../../App.css";

interface ConversionButtonProps {
  onClick?: () => void;
}

export const ConversionButton = ({onClick} : ConversionButtonProps) => {
    return(
        <Btn onClick={onClick}>변환하기</Btn>
    );
};

// 점점 나타나는 애니메이션 추가
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px); 
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Btn = styled.button<{ $active?: boolean }>`
  width: 57.6vw;               
  max-width: 45rem;       
  min-width: 18rem;  

  height: 16vh;              
  max-height: 8rem;          
  min-height: 3rem;     

  flex-shrink: 0;
  color: #F8F8F8;
  font-family: "KoPubWorld_b";
  font-size: clamp(2rem, 1.5vw + 1rem, 2.5rem);
  font-style: normal;
  letter-spacing: 0.5rem;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border: none;
  border-radius: 0.5rem;
  background: var(--Blue-3, #182E64);
  margin-top: 0.9rem;
  opacity: 0;
  animation: ${fadeInUp} 0.6s ease forwards; 

  &:hover {
    background: #5f709c;
  }
`;

