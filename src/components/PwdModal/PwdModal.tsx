// 비밀번호 입력 모달 컴포넌트
import React, { useState } from 'react';
import { Eye } from "@mynaui/icons-react";
import { EyeSlash } from "@mynaui/icons-react";
import styled from 'styled-components';

interface PwdModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (password: string) => void;
}

export const PwdModal: React.FC<PwdModalProps> = ({ open, onClose, onSave }) => {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState("");

  if(!open) return null;

  // 엑셀 비밀번호 받아오기
  const handlePWDSave = () => {
    if (!password.trim()) {
        setError("비밀번호를 입력해주세요");
        return;
    }
    setError("");
    onSave(password || "");
  }; 

  return (
    <Overlay>
      <ModalContainer>
        <Title>비밀번호 입력</Title>

        <InputWrapper>
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="엑셀 파일 비밀번호를 입력해주세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <ToggleButton onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ? <Eye color='#afafaf'/> : <EyeSlash color='#afafaf'/>}
            </ToggleButton>
        </InputWrapper>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <CancelButton onClick={onClose}>취소</CancelButton>
        <CompleteButton onClick={handlePWDSave}>완료</CompleteButton>
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
  height: 12rem;
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
  top: 2.1rem;
  left: 1.56rem;
`;

const InputWrapper = styled.div`
  position: absolute;
  top: 5.25rem;
  left: 1.56rem;
  width: 81%;
  display: flex;
  align-items: center;
  border: 1px solid #afafaf;
  border-radius: 0.5rem;
  padding: 0 0.5rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  font-family: KoPubWorld_r;
  border: none;
  outline: none;

  &:focus {
    border-color: #246BEB;
  }
`;

const ToggleButton = styled.button`
  margin-left: 0.5rem;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
`;

const ErrorMessage = styled.div`
  position: absolute;
  top: 8.2rem;
  left: 1.56rem;
  color: red;
  font-size: 0.875rem;
  font-family: KoPubWorld_r;
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
    top: 10rem;
    left: 11.44rem;

    &:hover {
      background-color: #eeeeee;
      border: 1px solid #949494;
    }
`;

const CompleteButton = styled.button`
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
    top: 10rem;
    left: 17.31rem;

    &:hover {
      background-color: #9DBEE1;
    }
`;