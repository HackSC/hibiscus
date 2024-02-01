import styles from './event-service-next.module.scss';

/* eslint-disable-next-line */
export interface EventServiceNextProps {}

export function EventServiceNext(props: EventServiceNextProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to EventServiceNext!</h1>
    </div>
  );
}

export default EventServiceNext;
