import { useEffect, useState } from 'react';
import { guestService } from '../apis/services/guest.service';
import HighlightText from '../components/@common/highlightText/HighlightText';
import InputModal from '../components/@common/modal/inputModal/InputModal';
import { useOverlay } from '../contexts/OverlayProvider';
import { createRandomNickName } from '../utils/createRandomNickName';
import useError from './@common/useError';

interface UseGuestNickNameProps {
  spaceCode: string;
}

const useGuestNickName = ({ spaceCode }: UseGuestNickNameProps) => {
  const overlay = useOverlay();
  const { tryFetch } = useError();

  type NickNameModalMode = 'create' | 'edit';
  const [nickName, setNickName] = useState('');

  const guestId = localStorage.getItem('guestId');
  const mode = guestId ? 'edit' : 'create';

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 모달 표시
  useEffect(() => {
    if (guestId) {
      // TODO : 게스트 닉네임 fetch 로직 넣기
      setNickName('예시 닉네임');
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
      onSubmit: fetchGuestNickName,
      createErrorMessage: createNickNameErrorMessage,
    };

    const result = await overlay<{ value: string }>(
      <InputModal {...defaultInputModalProps} />,
    );
    if (result) {
      setNickName(result.value);
    }
  };

  const matchingToastText: Record<NickNameModalMode, string> = {
    create: '닉네임을 저장하는 중 오류가 발생했어요. 다시 시도해 주세요.',
    edit: '닉네임을 수정하는 중 오류가 발생했어요. 다시 시도해 주세요.',
  };

  const fetchGuestNickName = async () => {
    const taskResult = await tryFetch({
      task: () => {
        return guestService.createNickName({
          spaceCode,
          name: nickName,
        });
      },
      errorActions: ['toast'],
      context: {
        toast: {
          text: matchingToastText[mode],
        },
      },
    });
    if (taskResult.success) {
      const guestId = taskResult.data?.data?.id;
      if (guestId) {
        localStorage.setItem('guestId', guestId.toString());
      }
    }
  };

  return { nickName, showNickNameModal, fetchGuestNickName };
};

export default useGuestNickName;
