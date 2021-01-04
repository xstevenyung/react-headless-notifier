import * as React from 'react';
import { createContext, useContext, cloneElement, useReducer } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
// import styles from './index.module.css';

const NotifierContext = createContext({ notify: alert => {} });

const ADD = 'add';
const DISMISS = 'dismiss';

let id = 1;

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return [...state, action.error];
    case DISMISS:
      return state.filter(alert => alert.id !== action.error.id);
    default:
      return state;
  }
}

function useNotifications(config) {
  const [notifications, dispatch] = useReducer(reducer, []);

  const notify = alert => {
    const newId = id++;

    setTimeout(() => dismiss(newId), config.timePerAlert);

    dispatch({ type: ADD, error: { id: newId, alert } });
  };

  const dismiss = id => {
    dispatch({ type: DISMISS, error: { id } });
  };

  return { notifications, notify, dismiss };
}

function NotifierContextProvider({
  children,
  max = null,
  timePerAlert = 5000,
}) {
  const { notifications: alerts, notify, dismiss } = useNotifications({
    timePerAlert,
  });

  const displayedAlerts = max
    ? alerts.slice(Math.max(alerts.length - max, 0))
    : alerts;

  return (
    <NotifierContext.Provider
      value={{
        notify,
      }}
    >
      {children}

      <div
        // className={[
        //   // styles['w-80'],
        //   // styles['fixed'],
        //   // styles['bottom-0'],
        //   // styles['right-0'],
        //   // styles['m-8'],
        // ].join(' ')}
        style={{
          width: '20rem',
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: '2rem',
        }}
      >
        <AnimatePresence>
          {displayedAlerts.map(({ id, alert }) => (
            <motion.div
              key={id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              // className={styles['mb-4']}
              style={{ margin: '1rem' }}
            >
              {cloneElement(alert, { id, dismiss: () => dismiss(id) })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotifierContext.Provider>
  );
}

function useNotifier() {
  return useContext(NotifierContext);
}

export { NotifierContext, NotifierContextProvider, useNotifier };
