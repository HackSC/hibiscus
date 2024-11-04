import { H3, Modal, Text, Link } from '@hibiscus/ui';
import { Button } from '@hacksc/sctw-ui-kit';
import React, { useState } from 'react';
import { useBattlepassAPI } from '../../../hooks/use-battlepass-api/use-battlepass-api';
import useHibiscusUser from '../../../hooks/use-hibiscus-user/use-hibiscus-user';
import { GrayBox } from '../../gray-box/gray-box';
import BonusPointsItem from './bonus-points-item';
import { BonusPointItem } from './types';

interface Props {
  items: BonusPointItem[];
}

function BattlepassBonusPointsList({ items }: Props) {
  const [chosenBP, setChosenBP] = useState<BonusPointItem | null>(null);
  const [open, setOpen] = useState(false);
  const battlepassApi = useBattlepassAPI();
  const { user } = useHibiscusUser();

  return (
    <div className="border rounded-lg p-[30px]">
      <Modal
        isOpen={open}
        closeModal={() => {
          setOpen(false);
        }}
      >
        <div className="flex flex-col gap-[2rem] w-[30rem] p-[30px] bg-white rounded-[10px] border-solid border-black border-[1px]">
          <h2 className="text-lg font-bold m-0 text-theme-redward">
            {chosenBP?.title}
          </h2>
          <div>
            <p className="text-base m-0 font-bold text-theme-redward">Points</p>
            <p className="text-base m-0">{chosenBP?.points}</p>
          </div>
          <div>
            <p className="text-base m-0 font-bold text-theme-redward">
              Description
            </p>
            <p className="text-base m-0">{chosenBP?.description}</p>
          </div>
          <div className="flex justify-end">
            <Link href={chosenBP?.link ?? ''} passHref>
              <button className="bg-theme-redward px-[16px] py-[8px] border-black border-[1px] rounded-[8px] text-sm m-0 hover:bg-red-400">
                SUBMIT FORM
              </button>
            </Link>
          </div>
        </div>
      </Modal>
      <div className="space-y-[30px]">
        {items.map((item, i) => (
          <BonusPointsItem
            data={item}
            key={i}
            handleClick={async () => {
              setChosenBP(item);
              setOpen(true);
              await battlepassApi.setBonusPointPending(user.id, item.id);
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default BattlepassBonusPointsList;
