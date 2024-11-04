import React from 'react';
import { BonusPointsStatus } from '../../../common/apis/battlepass/types';
import { BonusPointItem } from './types';

interface Props {
  data: BonusPointItem;
  handleClick?: () => void;
}

function BonusPointsItem({ data, handleClick }: Props) {
  return (
    <div className="flex justify-between space-x-[15px]">
      <div className="space-y-[5px]">
        <p className="text-theme-blue font-medium text-xs">{data.points} pts</p>
        <p className="text-sm">{data.title}</p>
      </div>
      <div className="flex items-center">
        <button
          className="border border-theme-gray rounded px-[20px] py-[5px] text-xs text-theme-gray"
          disabled={data.status !== BonusPointsStatus.VERIFY}
          onClick={handleClick}
        >
          {data.status}
        </button>
      </div>
    </div>
  );
}

export default BonusPointsItem;
