import * as React from 'react';
import {
  createContext,
  useContext,
  cloneElement,
  useReducer,
  useState,
  useEffect,
} from 'react';
import './index.css';

const NotifierContext = createContext({ notify: notification => {} });

const ADD = 'add';
const DISMISS = 'dismiss';

let id = 1;

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return [...state, action.notification];
    case DISMISS:
      return state.filter(({ id }) => id !== action.notification.id);
    default:
      return state;
  }
}

function useNotifications() {
  const [notifications, dispatch] = useReducer(reducer, []);

  const notify = children => {
    const newId = id++;

    dispatch({ type: ADD, notification: { id: newId, children } });
  };

  const dismiss = id => {
    dispatch({ type: DISMISS, notification: { id } });
  };

  return { notifications, notify, dismiss };
}

function NotifierContextProvider({
  children,
  max = null,
  timePerNotification = 5000,
}) {
  const { notifications, notify, dismiss } = useNotifications();

  const activeNotifications = max
    ? notifications.slice(Math.max(notifications.length - max, 0))
    : notifications;

  return (
    <NotifierContext.Provider
      value={{
        notify,
      }}
    >
      {children}

      <div className="react-headless-notifier-w-80 react-headless-notifier-fixed react-headless-notifier-bottom-0 react-headless-notifier-right-0 react-headless-notifier-m-8">
        <div>
          {activeNotifications.map(({ id, children }) => (
            <NotificationWrapper
              key={id}
              timer={timePerNotification}
              onDismiss={() => dismiss(id)}
            >
              {children}
            </NotificationWrapper>
          ))}
        </div>
      </div>
    </NotifierContext.Provider>
  );
}

function NotificationWrapper({ children, timer, onDismiss: handleDismiss }) {
  const [active, setActive] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setActive(false), timer);
    return () => clearTimeout(timeout);
  }, [timer]);

  return (
    <div
      className={`react-headless-notifier-mb-4 react-headless-notifier-transform-gpu react-headless-notifier-transition-all ${
        active
          ? 'react-headless-notifier-animate-enter-right'
          : 'react-headless-notifier-animate-exit-right'
      }`}
      onAnimationEnd={() => {
        if (!active) handleDismiss();
      }}
    >
      {cloneElement(children, { id, dismiss: () => setActive(false) })}
    </div>
  );
}

function useNotifier() {
  return useContext(NotifierContext);
}

export { NotifierContext, NotifierContextProvider, useNotifier };
