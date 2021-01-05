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

      <div className="react-headless-notifier-w-80 react-headless-notifier-fixed react-headless-notifier-bottom-0 react-headless-notifier-right-0 react-headless-notifier-m-8">
        <div>
          {displayedAlerts.map(({ id, alert }) => (
            <NotificationWrapper
              key={id}
              timer={timePerAlert}
              onDismiss={() => dismiss(id)}
            >
              {alert}
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
