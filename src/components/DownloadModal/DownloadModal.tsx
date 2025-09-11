// 다운로드 모달 컴포넌트
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { typography } from 'storybook/internal/theming';
import styled from 'styled-components';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
}

export const DownloadModal: React.FC<DownloadModalProps> = ({ open, onClose, title }) => {
  const navigate = useNavigate();
  if(!open) return null;

  // DB 초기화 API 호출 함수
  const truncateDB = async () => {
    try{
      const response = await fetch("http://localhost:18080/api/data/truncate", {
        method: "POST",
        headers: {
          "accept": "*/*"
        },
        body: ""
      });
      if(!response.ok) throw new Error("DB 초기화 실패");
      console.log("초기화 결과: ", await response.text());
    } catch (err) {
      console.error(err);
    }
  };

  // 취소 버튼
  const handleCancel = async () => {
    await truncateDB();
    onClose();
  };

  // 처음으로 버튼 
  const handleHome = async () => {
    await truncateDB();
    navigate('/');
  };

  return (
    <Overlay>
      <ModalContainer>
        <Title>{title}</Title>
        <Content>처음으로 돌아가시겠습니까?</Content>
        <CancelButton onClick={handleCancel}>취소</CancelButton>
        <HomeButton onClick={handleHome}>처음으로</HomeButton>
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
  width: 22.3125rem;
  height: 11.5625rem;
  border-radius: 0.9375rem;
  border: 1px solid var(--Black-1, #AFAFAF);
  background: #fff;
  padding: 1rem;
`;

const Title = styled.div`
  position: absolute;
  color: #000;
  font-family: KoPubWorld_m;
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  top: 2.5rem;
  left: 1.56rem;
`;


const Content = styled.div`
  position: absolute;
  color: #000;
  font-family: KoPubWorld_r;
  font-size: 1.25rem;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  top: 5.25rem;
  left: 1.56rem;
`;

const CancelButton = styled.button`
    position: absolute;
    font-family: KoPubWorld_m;
    cursor: pointer;
    width: 5.2rem;
    height: 2.75rem;
    flex-shrink: 0;
    border-radius: 0.9375rem;
    border: 1px solid rgba(0,0,0,0.4);
    background: var(--White-1, #FFF);
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.1rem;
    top: 8.69rem;
    left: 11.44rem;

    &:hover {
      background-color: #eeeeee;
      border: 1px solid #949494;
    }
`;

const HomeButton = styled.button`
    position: absolute;
    font-family: KoPubWorld_m;
    cursor: pointer;
    width: 5.2rem;
    height: 2.75rem;
    flex-shrink: 0;
    border-radius: 0.9375rem;
    background: var(--Blue-4, #246BEB);
    border: #246BEB;
    color: var(--White-1, #FFF);
    font-size: 1rem;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    letter-spacing: 0.1rem;
    top: 8.69rem;
    left: 17.31rem;

    &:hover {
      background-color: #9DBEE1;
    }
`;