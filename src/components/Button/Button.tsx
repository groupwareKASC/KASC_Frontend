// 파일 업로드 버튼 컴포넌트
import React, {useState, useRef} from "react";
import styled, { css } from "styled-components";
import "../../App.css";
interface ButtonProps {
    label: string;
    onFileSelect?: (file: File | null) => void;
};

export const Button = ({ label, onFileSelect  }: ButtonProps) => {
    const [fileSelected, setFileSelected] = useState(false);
    const [fileName, setFileName] = useState("");
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // 버튼 클릭 시 숨겨진 파일 입력창 열기
    const handleClick = () => {
        fileInputRef.current?.click();
    };

    // 파일이 선택되었다면 상태변경 (파일명 저장)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
          const file = e.target.files[0];
          setFileSelected(true);
          setFileName(file.name);
          onFileSelect?.(file);
        }
    };

    return(
        <>
        <BtnWrapper>
            <Btn 
                onClick={handleClick} 
                $active={fileSelected}
            >
                <Label $isFile={fileSelected}>{fileSelected ? fileName : label}</Label>
            </Btn>
        </BtnWrapper>
        {/* 숨겨진 파일 입력창 열기 */}
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
        />
        <Text $isFile={fileSelected}>파일이 업로드되지 않았습니다.</Text>
        </>
    );
};

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 2vw; 
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
  white-space: nowrap;       
  overflow: hidden;       
  text-overflow: ellipsis;      
  word-break: normal;
  padding: 0 1.1rem;
  transition: background-color 0.4s ease, color 0.4s ease, transform 0.3s ease;

  ${({ $active }) =>
    $active &&
    css`
      background: var(--Blue-1, #9DBEE1);
      color: #F8F8F8;
    `}

  &:hover {
    background-color: #9DBEE1;
    color: #F8F8F8;
  }
`;

const Label = styled.span<{ $isFile?: boolean }>`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  flex: 1; 
  font-size: ${({ $isFile }) =>
    $isFile
      ? "clamp(1.5rem, 1vw + 1rem, 1.8rem)" 
      : "clamp(2rem, 1vw + 1.2rem, 2.3rem)"}; 
  letter-spacing: ${({ $isFile }) => ($isFile ? "0.1rem" : "0.3rem")};
`;

const Text = styled.div<{ $isFile?: boolean }>`
  margin-top: -0.5rem;
  margin-left: 1vw; 
  font-family: "KoPubWorld_l";
  font-size: clamp(1.125rem, 0.5vw + 0.8rem, 1.3rem);
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.1rem;
  color: #f00;
  opacity: ${({ $isFile }) => ($isFile ? 0 : 1)};   
  margin-bottom: ${({ $isFile }) => ($isFile ? "-1rem" : "1rem")};
  transition: opacity 0.3s ease;
`;