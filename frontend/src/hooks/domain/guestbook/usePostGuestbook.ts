import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { guestbookService } from '../../../apis/services/guestbook/guestbook.service';
import { createGuestbookCompleteRoute } from '../../../constants/routes';
import type { GuestbookForm } from '../../../types/domain/guestbook.type';
import type { LocalFile } from '../../../types/file.type';
import { clearFiles } from '../../../utils/clearFiles';
import { uploadPhotosToS3 } from '../../../utils/uploadPhotosToS3';
import { useToast } from '../../@common/useToast';

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

  const createGuestbookForm = async (
    photos: LocalFile[],
  ): Promise<GuestbookForm> => {
    const baseForm: GuestbookForm = {
      nickname: formData.nickname,
      message: formData.message,
      photos: [],
    };

    if (photos.length === 0) {
      return baseForm;
    }

    const uploadFiles = await uploadPhotosToS3(
      spaceCode,
      'GUESTBOOK',
      photos.map((photo) => photo.originFile),
    );
    if (!uploadFiles) {
      throw new Error('uploadFiles is null');
    }

    return {
      ...baseForm,
      photos: uploadFiles,
    };
  };

  const mutation = useMutation({
    mutationFn: async (photos: LocalFile[]) => {
      const form = await createGuestbookForm(photos);
      const result = await guestbookService.createGuestbook(
        spaceCode ?? '',
        form,
      );

      if (!result.success) {
        throw new Error('createGuestbook is failed');
      }

      return { photos };
    },
    onSuccess: (data) => {
      navigate(createGuestbookCompleteRoute(spaceCode), {
        state: {
          receiver: receiver,
          guestNickName: formData.nickname,
        },
      });
      clearFiles(data.photos);
    },
    onError: (error) => {
      console.error(error);
      showToast({ text: '전송에 실패했습니다.', type: 'error' });
    },
  });

  return {
    submitForm: mutation.mutate,
    isLoading: mutation.isPending,
  };
};

export default usePostGuestbook;
