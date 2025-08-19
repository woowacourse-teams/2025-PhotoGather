import { useEffect, useState } from 'react';
import HighlightText from '../components/@common/highlightText/HighlightText';
import InputModal from '../components/@common/modal/inputModal/InputModal';
import { useOverlay } from '../contexts/OverlayProvider';

// import useError from './@common/useError';

const useGuestNickName = () => {
  const overlay = useOverlay();
  // const { tryFetch } = useError();

  // biome-ignore lint/correctness/useExhaustiveDependencies: 초기 모달 표시
  useEffect(() => {
    showNickNameModal('create');
  }, []);

  const createNickNameErrorMessage = (nickName: string) => {
    if (nickName.length > 10) {
      return '10자 이하로 입력해주세요.';
    }
    if (nickName.length === 0) {
      return '닉네임을 입력해주세요.';
    }
    return '';
  };

  type NickNameModalMode = 'create' | 'edit';
  const [nickName, setNickName] = useState('');
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
    };

    const editModeInputModalProps = {
      ...defaultInputModalProps,
      cancelText: '취소',
    };

    const result = await overlay<{ value: string }>(
      <InputModal
        {...(mode === 'edit'
          ? editModeInputModalProps
          : defaultInputModalProps)}
        onSubmit={fetchGuestNickName}
        createErrorMessage={createNickNameErrorMessage}
      />,
    );
    if (result) {
      setNickName(result.value);
    }
  };

  const fetchGuestNickName = async () => {
    // const response = await tryFetch({
    //   task: () => {
    //     return api.get('/guest/nickname');
    //   },
    //   errorActions: ['toast'],
    //   context: {
    //     toast: {
    //       text: '닉네임을 저장하는 중 오류가 발생했어요. 다시 시도해 주세요.',
    //     },
    //   },
    // });
    console.log('호출');
  };

  return { nickName, showNickNameModal };
};

export default useGuestNickName;
