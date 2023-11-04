import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import styles from './modal.module.css';
import styled from 'styled-components';

type Props = React.PropsWithChildren & {
  isOpen?: boolean;
  closeModal: () => void;
};

export const Modal = ({ isOpen, closeModal, children }: Props) => {
  return (
    <div>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={styles['dialog']} onClose={closeModal}>
          <Backdrop aria-hidden={true} className={isOpen ? 'blurred' : ''} />

          <div className={styles['div1']}>
            <div className={styles['div2']}>
              <Transition.Child
                as="div"
                enter={styles['dialogTransition__enter']}
                enterFrom={styles['dialogTransition__enterFrom']}
                enterTo={styles['dialogTransition__enterTo']}
                leave={styles['dialogTransition__leave']}
                leaveFrom={styles['dialogTransition__leaveFrom']}
                leaveTo={styles['dialogTransition__leaveTo']}
              >
                <Dialog.Panel className={styles['dialog__panel']}>
                  {children}
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
  background-color: rgba(0, 0, 0, 0);
  backdrop-filter: blur(0);
  transition: all 1s;
  
  &.blurred {
    backdrop-filter: blur(5px);
    background-color: rgba(0, 0, 0, 0.25);
  }
`;