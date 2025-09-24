import * as S from './DonutGraph.styles';

interface DonutGraphProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 그래프의 width */
  width?: number;
  /** 그래프의 height */
  height?: number;
  /** 현재 value */
  value: number;
  /** 최대 value */
  maxValue: number;
  /** 도넛 두께 */
  strokeWidth?: number;
}

const DonutGraph = ({
  width = 100,
  height = 100,
  value,
  maxValue,
  strokeWidth = 15,
}: DonutGraphProps) => {
  const radius = (Math.min(width, height) - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const ratio = Math.min(value / maxValue, 1);
  const offset = circumference * (1 - ratio);

  return (
    <S.Wrapper $width={width} $height={height}>
      <svg width={width} height={height}>
        <title>도넛 그래프: {Math.round(ratio * 100)}%</title>
        {/* 배경 원 */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="donut-bg"
        />
        {/* 진행 원 */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="donut-progress"
          strokeLinecap="round"
        />
      </svg>
      <S.Label>{Math.round(ratio * 100)}%</S.Label>
    </S.Wrapper>
  );
};

export default DonutGraph;
