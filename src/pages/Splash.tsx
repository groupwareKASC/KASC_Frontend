import { useEffect, type ReactElement } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";

export const Splash = (): ReactElement => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/Attendence");
    }, 2800);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <SplashWrapper>
      <img src="/images/logo/logo_back.svg" alt="logo_back" />
    </SplashWrapper>
  );
};

// 점점 커지는 애니메이션 
const fadeInScale = keyframes`
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
`;

// 나갈 때 자연스럽게 페이드아웃
const fadeOut = keyframes`
  0% { opacity: 1; }
  100% { opacity: 0; }
`;

const SplashWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  animation: 
    ${fadeInScale} 1.5s ease-out 0.5s both,
    ${fadeOut} 0.5s ease-in 2.2s forwards;
`;