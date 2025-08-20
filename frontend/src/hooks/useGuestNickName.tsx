import { useEffect, useState } from 'react';
import { guestService } from '../apis/services/guest.service';
import HighlightText from '../components/@common/highlightText/HighlightText';
import InputModal from '../components/@common/modal/inputModal/InputModal';
import { useOverlay } from '../contexts/OverlayProvider';
import { createRandomNickName } from '../utils/createRandomNickName';
import { validateGuestId } from '../validators/guest.validator';
import useError from './@common/useError';

interface UseGuestNickNameProps {
  spaceCode: string;
}

const useGuestNickName = ({ spaceCode }: UseGuestNickNameProps) => {
  const overlay = useOverlay();
  const { tryFetch, tryTask } = useError();

  type NickNameModalMode = 'create' | 'edit';
  const [nickName, setNickName] = useState('');

  const FAILED_GUEST_ID = -1;
  const guestId = localStorage.getItem('guestId');
  const mode = guestId ? 'edit' : 'create';

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 모달 표시
  useEffect(() => {
    const fetchNickName = async () => {
      const fetchedNickName = await tryGetNickName();
      setNickName(String(fetchedNickName));
    };
    if (guestId) {
      fetchNickName();
    }
    if (mode === 'create') {
      showNickNameModal('create');
    }
  }, []);

  const createNickNameErrorMessage = (nickName: string) => {
    if (nickName.length > 10) {
      return '10자 이하로 입력해주세요.';
    }
    if (nickName.length === 0) {
      return '닉네임을 입력해주세요.';
    }
    if (nickName.startsWith(' ')) {
      return '공백으로 시작할 수 없어요.';
    }
    return '';
  };

  const showNickNameModal = async (mode: NickNameModalMode) => {
    const defaultInputModalProps = {
      description: (
        <HighlightText
          text="닉네임을 입력해 주세요"
          highlightTextArray={['닉네임']}
          fontStyle="header03"
          highlightColorStyle="primary"
        />
      ),
      subDescription: '10자까지 입력할 수 있어요.',
      placeholder: '닉네임을 입력해 주세요',
      confirmText: '확인',
      cancelText: mode === 'create' ? '취소' : undefined,
      initialValue: mode === 'create' ? createRandomNickName() : nickName,
      createErrorMessage: createNickNameErrorMessage,
    };

    const result = await overlay<{ value: string }>(
      <InputModal {...defaultInputModalProps} />,
    );
    if (result) {
      setNickName(result.value);
    }
  };

  const tryValidateGuestId = () => {
    const taskResult = tryTask({
      task: () => validateGuestId(),
      errorActions: ['console'],
      context: {
        console: {
          text: 'guestId가 없습니다. create 요청이 필요합니다.',
        },
      },
    });

    return taskResult;
  };

  const tryGetNickName = async () => {
    const validateResult = tryValidateGuestId();
    if (!validateResult.success) return;
    const validGuestId = validateResult.data;

    const taskResult = await tryFetch({
      task: async () => {
        const response = await guestService.getGuestId(spaceCode, validGuestId);
        if (!response.success) return;

        const guestNickName = response?.data?.name;
        return guestNickName;
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '닉네임을 가져오는 중 오류가 발생했어요. 다시 시도해 주세요.',
        },
      },
    });

    return taskResult.data ?? FAILED_GUEST_ID;
  };

  const tryCreateNickName = async (): Promise<number> => {
    const taskResult = await tryFetch({
      task: async () => {
        const response = await guestService.createNickName(spaceCode, {
          name: nickName,
        });
        if (!response.success) return;

        const guestId = response.data?.id;
        if (guestId) {
          storageGuestNickName(String(guestId));
        }

        return guestId;
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '닉네임을 저장하는 중 오류가 발생했어요. 다시 시도해 주세요.',
        },
      },
    });

    return taskResult.data ?? FAILED_GUEST_ID;
  };

  const tryChangeNickName = async () => {
    const validateResult = tryValidateGuestId();
    if (!validateResult.success) return FAILED_GUEST_ID;
    const validGuestId = validateResult.data;

    const taskResult = await tryFetch({
      task: async () => {
        const response = await guestService.patchNickName(
          spaceCode,
          validGuestId,
          {
            name: nickName,
          },
        );
        if (!response.success) return;

        const guestId = response.data?.id;
        if (guestId) {
          storageGuestNickName(String(guestId));
        }

        return guestId;
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: '닉네임을 수정하는 중 오류가 발생했어요. 다시 시도해 주세요.',
        },
      },
    });

    return taskResult.data ?? FAILED_GUEST_ID;
  };

  const saveGuestId = async () => {
    if (nickName.length !== 0) {
      return await tryChangeNickName();
    }
    return await tryCreateNickName();
  };

  const storageGuestNickName = (guestId: string) => {
    localStorage.setItem('guestId', guestId);
  };

  return { nickName, showNickNameModal, saveGuestId };
};

export default useGuestNickName;
