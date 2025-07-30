import type { BaseFunnelPageProps } from '../../../types/funnel.type';

const TimeInputPage = ({ onNext }: BaseFunnelPageProps) => {
  return (
    <div>
      <p>스페이스를 몇시부터 열까요?</p>
      <button type="button" onClick={() => onNext('time')}>
        다음으로
      </button>
    </div>
  );
};

export default TimeInputPage;
