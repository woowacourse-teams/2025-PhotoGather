import type { BaseFunnelPageProps } from '../../../types/funnel.type';

const DateInputPage = ({ onNext }: BaseFunnelPageProps) => {
  return (
    <div>
      <p>스페이스를 언제부터 열까요?</p>
      <button type="button" onClick={() => onNext('date')}>
        다음으로
      </button>
    </div>
  );
};

export default DateInputPage;
