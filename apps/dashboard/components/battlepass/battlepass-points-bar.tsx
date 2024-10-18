import React from 'react';

interface Props {
  rangeMinPoint: number;
  rangeMaxPoint: number;
  currentPoint: number;
  minLabel?: React.ReactNode;
  maxLabel?: React.ReactNode;
}

function BattlepassPointsBar(props: Props) {
  const progress = Math.min(
    Math.max(
      (props.currentPoint - props.rangeMinPoint) /
        (props.rangeMaxPoint - props.rangeMinPoint),
      0
    ),
    1
  );

  return (
    <div className="space-y-[5px]">
      <div className="relative h-[25px]">
        {progress > 0 && (
          <div
            className="bg-theme-red absolute rounded h-full border"
            style={{ width: progress * 100 + '%' }}
          />
        )}
        <div className="absolute rounded w-full h-full border"></div>
      </div>
      <div className="flex justify-between">
        <div>{props.minLabel}</div>
        <div>{props.maxLabel}</div>
      </div>
    </div>
  );
}

export default BattlepassPointsBar;
