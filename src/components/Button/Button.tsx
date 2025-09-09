// 파일 업로드 버튼 컴포넌트
import React, {useState, useRef} from "react";
import styled, { css } from "styled-components";
import { Edit } from "@mynaui/icons-react";
import "../../App.css";
interface ButtonProps {
    label: string;
    onFileSelect?: (isSelected: boolean) => void; 
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
          setFileSelected(true);
          setFileName(e.target.files[0].name);
          onFileSelect?.(true);
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
            {/* {fileSelected && (
                <Edit 
                    onClick={handleClick} 
                    size="4rem" 
                    color="#182E64" 
                    cursor="pointer" 
                    strokeWidth={1.8}
                />
            )} */}
        </BtnWrapper>

        {/* 숨겨진 파일 입력창 열기 */}
        <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
        />

        <Text $isFile={fileSelected}>
        파일이 업로드되지 않았습니다.
        </Text>
        </>
    );
};

const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem; 
`;

const Btn = styled.button<{ $active?: boolean }>`
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
  border-radius: 0.5rem;
  background: var(--Blue-3, #182E64);
  white-space: nowrap;       
  overflow: hidden;       
  text-overflow: ellipsis;      
  word-break: normal;
  padding: 0 1.1rem;
  /* 자연스럽게 변하도록 추가 */
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
  font-size: ${({ $isFile }) => ($isFile ? "1.5rem" : "2rem")};
  letter-spacing: ${({ $isFile }) => ($isFile ? "0.1rem" : "0.5rem")}
`;

const Text = styled.div<{ $isFile?: boolean }>`
  margin-top: -0.5rem;
  margin-left: 1rem;
  font-family: "KoPubWorld_l";
  font-size: 1.125rem;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 0.1125rem;
  color: #F00;
  opacity: ${({ $isFile }) => ($isFile ? 0 : 1)};   
  margin-bottom: ${({ $isFile }) => ($isFile ? "-1rem" : "1rem")};
  transition: opacity 0.3s ease;
`;