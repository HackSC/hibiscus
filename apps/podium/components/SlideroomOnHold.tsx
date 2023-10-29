import { useSortable } from '@dnd-kit/sortable';
import { FC, useMemo } from 'react';
import { CSS } from '@dnd-kit/utilities';
import { CSSProperties } from 'react';
import { getYoutubeThumbnail } from '../utils/getYoutubeThumbnail';
import { Project } from '../types';

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
  });

  const image = useMemo(() => {
    if (project?.videoUrl) {
      const ytThumbnail = getYoutubeThumbnail(project.videoUrl);
      if (ytThumbnail) {
        return ytThumbnail;
      }
    }
    return project?.imageUrl;
  }, [project]);

  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : 1.0,
    transform: CSS.Translate.toString(transform),
    transition,
    backgroundImage: `url(${image})`,
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  };

  return (
    <li ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <div>{project.name}</div>
    </li>
  );
};

export default SlideroomOnHold;
