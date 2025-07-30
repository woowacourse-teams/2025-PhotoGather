import type { BaseFunnelPageProps } from '../../../types/funnel.type';

const NameInputPage = ({ onNext }: BaseFunnelPageProps) => {
  return (
    <div>
      <p>스페이스 이름을 정해볼까요?</p>
      <button type="button" onClick={() => onNext('name')}>
        다음으로
      </button>
    </div>
  );
};

export default NameInputPage;
