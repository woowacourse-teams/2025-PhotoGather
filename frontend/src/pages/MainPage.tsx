import { useToast } from '../hooks/@common/useToast';

const MainPage = () => {
  const { showToast } = useToast();

  return (
    <div>
      <p>글꼴 확인</p>
      <button
        type="button"
        onClick={() => showToast({ text: '토스트 테스트' })}
      >
        토스트 테스트
      </button>
    </div>
  );
};

export default MainPage;
