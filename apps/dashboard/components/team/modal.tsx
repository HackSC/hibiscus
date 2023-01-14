import TeamCreateForm from './team-create-form';
import { Modal } from '@hibiscus/ui';

type Props = React.PropsWithChildren & {
  isOpen?: boolean;
  closeModal: () => void;
};

export const CreateTeamModal = ({ isOpen, closeModal }: Props) => {
  return (
    <div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <TeamCreateForm closeModal={closeModal} />
      </Modal>
    </div>
  );
};

export default CreateTeamModal;
