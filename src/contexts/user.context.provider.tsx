import { FunctionComponent, ReactNode, useEffect, useState } from 'react';

import User from '../types/user.types';
import UserContext from './user.context';

import { onAuthStateChanged } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../config/firebase.config';
import { userConverter } from '../converters/firestore.converters';

interface ChildrenProps {
  children: ReactNode;
}

const UserContextProvider: FunctionComponent<ChildrenProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const isAuthenticated = currentUser !== null;

  const loginUser = (user: User) => {
    setCurrentUser(user);
  };

  const logoutUser = () => {
    setCurrentUser(null);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (isAuthenticated && !user) {
        logoutUser();
      } else if (!isAuthenticated && user) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid),
          ),
        );

        const userFromFirestore = querySnapshot.docs[0]?.data();
        if (userFromFirestore) {
          loginUser(userFromFirestore);
        }
      }
    });

    return () => unsubscribe();
  }, [isAuthenticated]);

  return (
    <UserContext.Provider
      value={{ currentUser, isAuthenticated, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
