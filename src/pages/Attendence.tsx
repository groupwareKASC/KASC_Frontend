import React, { useState, useEffect, type ReactElement } from 'react'
import styled from 'styled-components'
// 컴포넌트들 불러오기
import { Button } from '../components/Button/Button';
import { ConversionButton } from '../components/Button/ConversionButton';
import { RadioField } from '../components/RadioField/RadioField';
import { LoadingModal } from '../components/LoadingModal/LoadingModal';
import { DownloadModal } from '../components/DownloadModal/DownloadModal';
import { PwdModal } from '../components/PwdModal/PwdModal';

export const Attendence = () : ReactElement => {
  // 라디오 버튼 상태관리
  const [selected, setSelected] = useState('mismatch');
  // 파일 업로드 상태관리 
  const [manualUpload, setManualUpload] = useState(false);
  const [erpUpload, setErpUpload] = useState(false);
  // 모달 상태관리
  const [loadingModal, setLoadingModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [passwordModal, setPasswordModal] = useState(false);
  // 엑셀 비밀번호 상태관리
  const [excelPassword, setExcelPassword] = useState<string>("");

  const allUpload = manualUpload && erpUpload;

  // 옵션 리스트
  const options = [
    {label: '전체', value: 'all'},
    {label: '불일치', value: 'mismatch'},
  ];

  // loadingModal을 열고난 후 5초 뒤 다운로드 모달로 전환 (이후에 수정필요)
  useEffect(() => {
    if(loadingModal) {
      const timer = setTimeout(() => {
        setLoadingModal(false);
        setDownloadModal(true);
      }, 3000);
      return() => clearTimeout(timer);
    }
  }, [loadingModal]);

  // 비밀번호 저장 처리
  const handleSavePassword = (password: string) => {
    setExcelPassword(password);
    setPasswordModal(false);
    console.log("입력된 비밀번호: ", password);
  }

  return (
    <Wrapper>
      <div className='logo'>
        <SideLogo src='/images/logo/logo_side.svg' alt='사이드 미니 로고'/>
        <BackLogo src='images/logo/logo_back.svg' alt='백 로고'/>
      </div>

      {/* 전체 컨텐트 영역 감싸기 */}
      <ContentWrapper>
        {/* 라디오 버튼 영역 */}
        <OptionWrapper>
          {options.map((opt) => (
            <RadioField
              key={opt.value}
              label={opt.label}
              name='attendence_radio_btn'
              value={opt.value}
              checked={selected === opt.value}
              onChange={() => setSelected(opt.value)}
            />
          ))}
        </OptionWrapper>

        <ButtonWrapper>
          <Button label='수기파일 업로드' onFileSelect={setManualUpload}/>
          <Button label='ERP파일 업로드' onFileSelect={setErpUpload}/>
        </ButtonWrapper>

        {allUpload && (
          <ConversionButton onClick={() => setLoadingModal(true)}/>
        )}

        {/* 모달 */}
        {loadingModal && <LoadingModal />}
        {downloadModal && <DownloadModal open={downloadModal} onClose={() => setDownloadModal(false)} />}
      </ContentWrapper>
    </Wrapper>
  )
};

// {passwordModal  && (
//   <PwdModal 
//     open={passwordModal} 
//     onClose={() => setPasswordModal(false)}
//     onSave={handleSavePassword} 
//   />
// )}

const Wrapper = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;  
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const SideLogo = styled.img`
  position: absolute;
  right: 3.44rem;
  top: 2.31rem;
  z-index: 1;
`;

const BackLogo = styled.img`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const ContentWrapper = styled.div`
  position: relative;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1;
  margin-bottom: 2rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1;
`;