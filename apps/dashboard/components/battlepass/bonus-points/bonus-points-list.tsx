import { H3, Modal, Text, Link } from '@hibiscus/ui';
import { Button } from '@hibiscus/ui-kit-2023';
import React, { useState } from 'react';
import styled from 'styled-components';
import { GrayBox } from '../../gray-box/gray-box';
import BonusPointsItem from './bonus-points-item';
import { BonusPointItem } from './types';

interface Props {
  items: BonusPointItem[];
}

function BattlepassBonusPointsList({ items }: Props) {
  const [chosenBP, setChosenBP] = useState<BonusPointItem | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <Div>
      {chosenBP !== null && (
        <Modal
          isOpen={open}
          closeModal={() => {
            setOpen(false);
          }}
        >
          <GrayBox style={{ maxWidth: '30rem', gap: '10px', padding: '30px' }}>
            <H3 style={{ fontWeight: 'bold' }}>{chosenBP.title}</H3>
            <Text>
              <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>
                POINTS
              </span>
              : {chosenBP.points}
            </Text>
            <Text>{chosenBP.description}</Text>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Link href={chosenBP.link ?? ''} passHref>
                <Button color="black">SUBMIT FORM</Button>
              </Link>
            </div>
          </GrayBox>
        </Modal>
      )}
      {items.map((item, i) => (
        <BonusPointsItem
          data={item}
          key={i}
          handleClick={() => {
            setChosenBP(item);
            setOpen(true);
          }}
        />
      ))}
    </Div>
  );
}

export default BattlepassBonusPointsList;

const Div = styled(GrayBox)`
  gap: 10px;
`;
