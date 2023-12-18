import styles from './user-library.module.css';

/* eslint-disable-next-line */
export interface UserLibraryProps {}

export function UserLibrary(props: UserLibraryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UserLibrary!</h1>
    </div>
  );
}

export default UserLibrary;
