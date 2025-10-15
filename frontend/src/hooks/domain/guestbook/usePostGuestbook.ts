import { useNavigate } from 'react-router-dom';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import { ROUTES } from '../../../constants/routes';
import type { GuestbookForm } from '../../../types/domain/guestbook.type';
import type { LocalFile, UploadFile } from '../../../types/file.type';
import { useToast } from '../../@common/useToast';
import useFileUpload from '../image/useFileUpload';

interface UsePostGuestbookProps {
  spaceCode: string;
  receiver: string;
  formData: {
    nickname: string;
    message: string;
    photos: LocalFile[];
  };
}

const usePostGuestbook = ({
  spaceCode,
  receiver,
  formData,
}: UsePostGuestbookProps) => {
  const { showToast } = useToast();
  const navigate = useNavigate();

  const { processFileUpload } = useFileUpload({
    spaceCode: spaceCode ?? '',
    localFiles: formData.photos,
    onUploadSuccess: () => {},
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

  const createGuestbookForm = async (): Promise<GuestbookForm> => {
    const baseForm: GuestbookForm = {
      nickname: formData.nickname,
      message: formData.message,
      photos: [],
    };

    if (formData.photos.length === 0) {
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

  const submitForm = async () => {
    try {
      const form = await createGuestbookForm();
      const result = await guestbookService.createGuestbook(
        spaceCode ?? '',
        form,
      );

      if (!result.success) {
        throw new Error('createGuestbook is failed');
      }

      navigate(ROUTES.GUEST.CREATE_GUESTBOOK_COMPLETE, {
        state: {
          receiver: receiver,
          guestNickName: formData.nickname,
        },
      });
    } catch (error) {
      console.error(error);
      showToast({ text: '전송에 실패했습니다.', type: 'error' });
    }
  };

  return {
    submitForm,
  };
};

export default usePostGuestbook;
