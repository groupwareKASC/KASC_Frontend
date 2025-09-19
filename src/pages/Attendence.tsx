// 근태 검증 메인 화면 
import { useState, useEffect, type ReactElement } from 'react'
import styled from 'styled-components'
import { Button } from '../components/Button/Button';
import { ConversionButton } from '../components/Button/ConversionButton';
import { RadioField } from '../components/RadioField/RadioField';
import { LoadingModal } from '../components/LoadingModal/LoadingModal';
import { DownloadModal } from '../components/DownloadModal/DownloadModal';
import { PwdModal } from '../components/PwdModal/PwdModal';
import { Buffer } from "buffer";

export const Attendence = () : ReactElement => {
  // 라디오 버튼 상태관리
  const [selected, setSelected] = useState('mismatch');

  // 파일 업로드 상태관리 
  const [manualUpload, setManualUpload] = useState(false);
  const [erpUpload, setErpUpload] = useState(false);
  const allUpload = manualUpload && erpUpload;

  // 모달 상태관리
  const [loadingModal, setLoadingModal] = useState(false);
  const [downloadModal, setDownloadModal] = useState(false);
  const [downloadTitle, setDownloadTitle] = useState("다운로드 완료");

  // 엑셀 비밀번호 상태관리 (수기, erp)
  const [passwordModal, setPasswordModal] = useState<"manual" | "erp" | null>(null);
  const [manualExcelPassword, setManualExcelPassword] = useState<string>("");
  const [erpExcelPassword, setErpExcelPassword] = useState<string>("");

  // 올라간 파일들 상태관리
  const [manualFile, setManualFile] = useState<File|null>(null);
  const [erpFile, setErpFile] = useState<File|null>(null);

  // 다운로드 실패 메시지 
  const [downloadMessage, setDownloadMessage] = useState<string>("처음으로 돌아가시겠습니까?");

  // 옵션 리스트
  const options = [
    {label: '전체 (일치+불일치)', value: 'all'},
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
    if(passwordModal === "manual") {
      setManualExcelPassword(password);
      console.log("수기 엑셀 파일 비밀번호: ", password);
    } else if (passwordModal === "erp") {
      setErpExcelPassword(password);
      console.log("erp 엑셀 파일 비밀번호: ", password);
    }
    setPasswordModal(null); 
  }

  // 파일 업로드
  const handleManualUpload = (file: File | null) => {
    setManualFile(file);
    setManualUpload(!!file);     
    if (file) setPasswordModal("manual");
  };
  
  const handleErpUpload = (file: File | null) => {
    setErpFile(file);
    setErpUpload(!!file);         
    if (file) setPasswordModal("erp");
  };

  // api 연동
  const handleConversion = async() => {
    if(!manualFile || !erpFile) {
      alert("파일이 모두 업로드해주세요");
      return;
    }

    setLoadingModal(true);

    const formData = new FormData();
    formData.append("manualExcel", manualFile);
    formData.append("erpExcel", erpFile);
    formData.append("returnType", selected === "all" ? "0" : "1");
    formData.append("excelPassword", JSON.stringify({ erpExcelPassword, manualExcelPassword }));

    try{
      const response = await fetch(
        "http://localhost:18080/api/validations", 
        {
          method: "POST",
          body: formData,
        }
      );

      // 다운로드 실패 시
      if(!response.ok) {
        const errorData = await response.json().catch(() => null);
        const msg = errorData?.message || "처리 중 오류가 발생했습니다";
        setDownloadTitle("다운로드 실패");
        setDownloadMessage(msg);
        setLoadingModal(false);
        setDownloadModal(true);
        return;
      }

      // 파일로 데이터 받기
      const blob = await response.blob();

      // 백엔드에서 보내준 파일명 추출
      const fileNameResponse = await fetch("http://localhost:18080/api/data/filename");
      if(!fileNameResponse.ok) throw new Error("파일명 api 불러오기 실패");

      const fileName = await fileNameResponse.text();

      // 파일 다운로드 처리하기
      await handleDownload(blob, fileName);

      setLoadingModal(false);
      setDownloadTitle("다운로드 완료");
      setDownloadMessage("save폴더에 저장되었습니다.");
      setDownloadModal(true);
    } catch(error) {
      console.log("호출 오류: ", error);
      setLoadingModal(false);
      setDownloadTitle("다운로드 실패");
      setDownloadMessage("처리 중 오류가 발생했습니다.");
      setDownloadModal(true);
    }
  };

  // 저장 완료 시 save 폴더 열기
  useEffect(() => {
    if (window.electron?.onSaveFileSuccess) {
      window.electron.onSaveFileSuccess((saveDir: string) => {
        console.log("저장 완료, 폴더 열기:", saveDir);
        window.electron.openFolder(saveDir);
      });
    }
  }, []);

  // 다운로드 파일들 지정 폴더에 관리
  const handleDownload = async (blob: Blob, fileName: string) => {
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    window.electron.saveFile(buffer, fileName);
  };

  return (
    <Wrapper>
      <div className='logo'>
        <SideLogo src={`./images/logo/logo_side.svg`} alt='사이드 미니 로고'/>
        <BackLogo src={`./images/logo/logo_back.svg`} alt='백 로고'/>
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
          <Button label='수기파일 업로드' onFileSelect={handleManualUpload}/>
          <Button label='ERP파일 업로드' onFileSelect={handleErpUpload}/>
        </ButtonWrapper>

        {allUpload && (
          <ConversionButton onClick={handleConversion}/>
        )}

        {/* 모달 */}
        {loadingModal && <LoadingModal />}
        {downloadModal && 
          <DownloadModal 
            open={downloadModal} 
            title={downloadTitle} 
            message={downloadMessage}
          />
        }        
        {passwordModal && (
          <PwdModal 
            open={!!passwordModal} 
            onClose={() => setPasswordModal(null)}
            onSave={handleSavePassword} 
          />
        )}
      </ContentWrapper>
    </Wrapper>
  )
};

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
  width: 12vw;
  max-width: 150px;
  min-width: 100px;
  right: 3vw; 
  top: 4vh; 
  z-index: 1;
`;

const BackLogo = styled.img`
  position: absolute;
  width: 55vw;
  max-width: 700px;
  min-width: 400px;
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