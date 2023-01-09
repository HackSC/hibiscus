import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './team.module.css';
import styled from 'styled-components';
import TeamCreateForm from './team-create-form';

type Props = React.PropsWithChildren & {
  isOpen?: boolean;
  closeModal: () => void;
};

export const Modal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles.dialog} onClose={closeModal}>
          <Backdrop aria-hidden={true} />

          <div className={styles.div1}>
            <div className={styles.div2}>
              <Transition.Child
                as="div"
                enter={styles.dialogTransition__enter}
                enterFrom={styles.dialogTransition__enterFrom}
                enterTo={styles.dialogTransition__enterTo}
                leave={styles.dialogTransition__leave}
                leaveFrom={styles.dialogTransition__leaveFrom}
                leaveTo={styles.dialogTransition__leaveTo}
              >
                <Dialog.Panel className={styles.dialog__panel}>
                  {children}
                  <TeamCreateForm closeModal={closeModal} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default Modal;

const Backdrop = styled.div`
  inset: 0;
  position: fixed;
  background-color: black;
  opacity: 0.25;
`;
