// 로딩 모달 컴포넌트
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface LoadingModalProps {}

// 큐리 이미지 8개를 배열로 저장 
const frames = Array.from(
  { length: 8 },
  (_, i) => `/images/curi/${String(i + 1).padStart(2, '0')}.png`
);

export const LoadingModal: React.FC<LoadingModalProps> = () => {
  const [idx, setIdx] = useState(0);
  const [open, setOpen] = useState(true);

  // 8장의 이미지 돌아가도록 구현 
  useEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      setIdx(count % frames.length);
      count++;
    }, 1000 / 8); 
    return () => clearInterval(id);
  }, []);

  if(!open) return null;

  return (
    <Overlay>
      <ModalContainer>
        <ImageContainer src={frames[idx]} alt="loading" />
        <ContentContainer>잠시만 기다려주세요...</ContentContainer>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
`;

const ModalContainer = styled.div`
  position: relative;
  width: 21.4375rem;
  height: 15.1875rem;
  border-radius: 0.9375rem;
  border: 1px solid var(--Black-1, #AFAFAF);
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  gap: 5px;
`;

const ImageContainer = styled.img`
  width: 170px;
  height: 170px;
  object-fit: contain;
`;

const ContentContainer = styled.div`
  color: #000;
  font-family: KoPubWorld_m;
  font-size: 1.25rem;
  font-weight: 700;
`;
