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

      <div
        style={{
          width: '20rem',
          position: 'fixed',
          bottom: 0,
          right: 0,
          margin: '2rem',
        }}
      >
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
  }, []);

  return (
    <div
      className={`mb-4 transform-gpu transition-all ${
        active ? 'animate-enter-right' : 'animate-exit-right'
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
