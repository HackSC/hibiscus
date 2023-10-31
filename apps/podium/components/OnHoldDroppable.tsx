import { useDroppable } from '@dnd-kit/core';
import { FC } from 'react';
import * as styles from '../pages/index.css';

interface OnHoldDroppableProps {
  type: Container;
}

const OnHoldDroppable: FC<OnHoldDroppableProps> = ({ type }) => {
  const { setNodeRef } = useDroppable({
    id: 'on-hold-droppable',
    data: { type },
  })

  return (
    <div className={`${styles.dragToOnHold} ${styles.flexCenter}`} ref={setNodeRef}>
      <p>+ Drag to on hold</p>
    </div>
  )
}

export default OnHoldDroppable;