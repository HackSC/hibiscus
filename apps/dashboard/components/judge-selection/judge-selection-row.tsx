import { useState } from 'react';
import JudgeInfo from './judge-info/judge-info';
import VerticalDropdown from './vertical-dropdown/vertical-dropdown';

interface Judge {
  name: string;
  email: string;
}

export default function JudgeSelectionRow({
  judgeInfo,
  checkedItems,
  onCheckChange,
}: {
  judgeInfo: Judge[];
  checkedItems: boolean[];
  onCheckChange: (index: number) => void;
}) {
  return (
    <div className="flex flex-col gap-4 width-full">
      {judgeInfo.map((judgeObj, index) => (
        <div key={index} className="pt-3 border-t flex items-center">
          <JudgeInfo
            judgeName={judgeObj.name}
            judgeEmail={judgeObj.email}
            checked={checkedItems[index]}
            onCheckChange={() => onCheckChange(index)}
          />
          <VerticalDropdown />
        </div>
      ))}
    </div>
  );
}
