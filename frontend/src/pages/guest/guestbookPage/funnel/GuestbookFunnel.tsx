import { useNavigate, useParams } from 'react-router-dom';
import { guestbookService } from '../../../../apis/services/guestbook/guestbook.service';
import { ROUTES } from '../../../../constants/routes';
import useConfirmBeforeRefresh from '../../../../hooks/@common/useConfirmBeforeRefresh';
import useLocalFile from '../../../../hooks/@common/useLocalFile';
import { useToast } from '../../../../hooks/@common/useToast';
import useFormFunnel from '../../../../hooks/domain/funnel/useFormFunnel';
import useFileUpload from '../../../../hooks/domain/image/useFileUpload';
import { DividerLine } from '../../../../styles/@common/DividerLine.styles';
import type {
  GuestbookForm,
  GuestbookFunnelInfo,
} from '../../../../types/domain/guestbook.type';
import type { LocalFile, UploadFile } from '../../../../types/file.type';
import { mockData } from '../../../mockData';
import MessageElement from '../funnelElements/messageElement/MessageElement';
import NicknameElement from '../funnelElements/nicknameElement/NicknameElement';
import PhotosElement from '../funnelElements/photosElement/PhotosElement';
import * as S from './GuestbookFunnel.styles';

type STEP = 'nickname' | 'message' | 'photos';

const initialFunnelValue: GuestbookFunnelInfo = {
  nickname: '',
  message: '',
  photos: [],
};

const GuestBookFunnel = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  useConfirmBeforeRefresh();
  const MOCK_RECEIVER = '방명록 주인장';

  const Funnel = useFormFunnel<STEP, GuestbookFunnelInfo>(
    'nickname',
    initialFunnelValue,
  );

  const {
    localFiles,
    handleFilesUploadClick,
    handleFilesDrop,
    deleteFile,
    clearFiles,
  } = useLocalFile({
    fileType: 'image',
    initialLocalFiles: Funnel.form.photos,
  });

  const { spaceCode } = useParams<{ spaceCode: string }>();

  const { processFileUpload } = useFileUpload({
    spaceCode: spaceCode ?? '',
    localFiles: localFiles,
    onUploadSuccess: () => {},
    clearFiles: clearFiles,
  });

  const createSubmitImage = (uploadFiles: UploadFile[]) => {
    return uploadFiles.map((file) => {
      return {
        originalName: file.originFile.name,
        uploadFileName: file.objectKey,
        capacity: file.originFile.size,
      };
    });
  };

  // TODO : nickname 값을 다르게 처리할 방법 물색
  const createGuestbookForm = async (
    photos: LocalFile[],
  ): Promise<GuestbookForm> => {
    const baseForm: GuestbookForm = {
      nickname: Funnel.form.nickname,
      message: Funnel.form.message,
      photos: [],
    };

    if (photos.length === 0) {
      return baseForm;
    }

    // TODO : 사진 업로드 기능 분리
    const uploadFiles = await processFileUpload('GUESTBOOK');
    if (!uploadFiles) {
      throw new Error('uploadFiles is null');
    }

    return {
      ...baseForm,
      photos: createSubmitImage(uploadFiles),
    };
  };

  const submitForm = async (photos: LocalFile[]) => {
    try {
      const form = await createGuestbookForm(photos);
      const result = await guestbookService.createGuestbook(
        spaceCode ?? '',
        form,
      );

      if (!result.success) {
        throw new Error('createGuestbook is failed');
      }

      navigate(ROUTES.GUEST.CREATE_GUESTBOOK_COMPLETE, {
        state: {
          receiver: MOCK_RECEIVER,
          guestNickName: Funnel.form.nickname,
        },
      });
    } catch (error) {
      console.error(error);
      showToast({ text: '전송에 실패했습니다.', type: 'error' });
    }
  };

  return (
    <S.Wrapper>
      <S.DisplayInfoContainer>
        <S.DisplayImage src={mockData.thumbnail} alt="전시 썸네일 이미지" />
        <S.DisplayName>{mockData.title}</S.DisplayName>
      </S.DisplayInfoContainer>
      <DividerLine width="15%" />
      <Funnel.Step name="nickname">
        <NicknameElement
          receiver={MOCK_RECEIVER}
          initialValue={Funnel.form.nickname}
          onNext={(nickname) => Funnel.goNextWithData('message', { nickname })}
        />
      </Funnel.Step>
      <Funnel.Step name="message">
        <MessageElement
          receiver={MOCK_RECEIVER}
          initialValue={Funnel.form.message}
          onNext={(message) => Funnel.goNextWithData('photos', { message })}
        />
      </Funnel.Step>
      <Funnel.Step name="photos">
        <PhotosElement
          receiver={MOCK_RECEIVER}
          onNextButtonClick={(photos) => submitForm(photos)}
          localFiles={localFiles}
          deleteFile={deleteFile}
          handleFilesUploadClick={handleFilesUploadClick}
          handleFilesDrop={handleFilesDrop}
        />
      </Funnel.Step>
    </S.Wrapper>
  );
};

export default GuestBookFunnel;
