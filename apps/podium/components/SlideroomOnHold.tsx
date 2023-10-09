import { useSortable } from '@dnd-kit/sortable';
import { FC } from 'react'
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';

interface SlideroomOnHoldProps {
  project: Project;
}

const SlideroomOnHold: FC<SlideroomOnHoldProps> = ({ project }) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    isDragging,
    transform,
    transition,
  } = useSortable({
    id: project.projectId,
    data: {
      type: 'OnHold',
    },
    disabled: true,
  })

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1.0,
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundImage: `url(${project.imageUrl})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  }

  return (
    <li
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}>
      <div>{project.name}</div>
    </li>
  )
}

export default SlideroomOnHold;