import * as React from 'react';
import {
  createContext,
  useContext,
  cloneElement,
  useReducer,
  useState,
  useEffect,
  useMemo,
} from 'react';
import './index.css';
import Timer from './Timer';

const NotifierContext = createContext({
  notify: (children, overrideConfig = {}) => {},
  dismissAll: () => {},
});

const ADD = 'add';
const DISMISS = 'dismiss';
const DISMISS_ALL = 'dismiss_all';

let id = 1;

export const positions = {
  TOP: 'top',
  TOP_RIGHT: 'topRight',
  TOP_LEFT: 'topLeft',
  BOTTOM_RIGHT: 'bottomRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM: 'bottom',
};

const initialState = {
  [positions.TOP]: [],
  [positions.TOP_RIGHT]: [],
  [positions.TOP_LEFT]: [],
  [positions.BOTTOM_RIGHT]: [],
  [positions.BOTTOM_LEFT]: [],
  [positions.BOTTOM]: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        [action.notification.position]: [
          ...state[action.notification.position],
          action.notification,
        ],
      };
    case DISMISS:
      // we extract the position from the `id`
      const [position] = action.notification.id.split('-');
      return {
        ...state,
        [position]: state[position].filter(
          ({ id }) => id !== action.notification.id,
        ),
      };
    case DISMISS_ALL:
      return { ...initialState };
    default:
      return state;
  }
}

function useNotifications(defaultConfig) {
  const [notifications, dispatch] = useReducer(reducer, initialState);

  const notify = (children, overrideConfig = {}) => {
    const config = { ...defaultConfig, ...overrideConfig };

    const newId = id++;

    dispatch({
      type: ADD,
      notification: {
        // `id` is compose of the position and a unique number
        // so a first notification created on the top position will have the `id` = "top-1"
        // then the second one on the bottom right will be `bottomRight-2`
        // this system allow us to understand in which array is the notification using only the `id`
        // check `DISMISS` action in the reducer
        id: `${config.position}-${newId}`,
        children,
        position: config.position,
        duration: config.duration,
      },
    });
  };

  const dismiss = id => {
    dispatch({ type: DISMISS, notification: { id } });
  };

  const dismissAll = () => {
    dispatch({ type: DISMISS_ALL });
  };

  return { notifications, notify, dismiss, dismissAll };
}

const defaultConfig = {
  max: null,
  duration: 5000,
  position: positions.BOTTOM_RIGHT,
};

function NotifierContextProvider({ children, config: overrideConfig = {} }) {
  const config = useMemo(() => ({ ...defaultConfig, ...overrideConfig }), [
    overrideConfig,
  ]);
  const { notifications, notify, dismiss, dismissAll } = useNotifications(
    config,
  );

  return (
    <NotifierContext.Provider
      value={{
        notify,
        dismissAll,
      }}
    >
      {children}

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-top-0 react-headless-notifier-left-0 react-headless-notifier-m-8"
        notifications={notifications[positions.TOP_LEFT]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
              position={positions.TOP_LEFT}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-top-0 react-headless-notifier-right-0 react-headless-notifier-m-8"
        notifications={notifications[positions.TOP_RIGHT]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
              position={positions.TOP_RIGHT}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-top-0 react-headless-notifier-right-0 react-headless-notifier-left-0 react-headless-notifier-flex react-headless-notifier-flex-col-reverse react-headless-notifier-items-center"
        notifications={notifications[positions.TOP]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              position={positions.TOP}
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-bottom-0 react-headless-notifier-right-0 react-headless-notifier-left-0 react-headless-notifier-flex react-headless-notifier-flex-col react-headless-notifier-items-center"
        notifications={notifications[positions.BOTTOM]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              position={positions.BOTTOM}
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-bottom-0 react-headless-notifier-left-0 react-headless-notifier-m-8"
        notifications={notifications[positions.BOTTOM_LEFT]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
              position={positions.BOTTOM_LEFT}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-bottom-0 react-headless-notifier-right-0 react-headless-notifier-m-8"
        notifications={notifications[positions.BOTTOM_RIGHT]}
        max={config.max}
      >
        {notifications => {
          return notifications.map(({ id, children, duration }) => (
            <NotificationWrapper
              key={id}
              duration={duration}
              onDismiss={() => dismiss(id)}
              position={positions.BOTTOM_RIGHT}
            >
              {children}
            </NotificationWrapper>
          ));
        }}
      </NotificationBag>
    </NotifierContext.Provider>
  );
}

function NotificationBag({ className, notifications, max = null, children }) {
  const displayedNotifications = useMemo(() => {
    return max
      ? notifications.slice(Math.max(notifications.length - max, 0))
      : notifications;
  }, [notifications, max]);

  return <div className={className}>{children(displayedNotifications)}</div>;
}

const animations = {
  [positions.TOP]: {
    enter: 'react-headless-notifier-animate-enter-top',
    exit: 'react-headless-notifier-animate-exit-top',
  },
  [positions.TOP_RIGHT]: {
    enter: 'react-headless-notifier-animate-enter-right',
    exit: 'react-headless-notifier-animate-exit-right',
  },
  [positions.TOP_LEFT]: {
    enter: 'react-headless-notifier-animate-enter-left',
    exit: 'react-headless-notifier-animate-exit-left',
  },
  [positions.BOTTOM]: {
    enter: 'react-headless-notifier-animate-enter-bottom',
    exit: 'react-headless-notifier-animate-exit-bottom',
  },
  [positions.BOTTOM_RIGHT]: {
    enter: 'react-headless-notifier-animate-enter-right',
    exit: 'react-headless-notifier-animate-exit-right',
  },
  [positions.BOTTOM_LEFT]: {
    enter: 'react-headless-notifier-animate-enter-left',
    exit: 'react-headless-notifier-animate-exit-left',
  },
};

function NotificationWrapper({
  children,
  duration,
  onDismiss: handleDismiss,
  position,
}) {
  const [active, setActive] = useState(true);
  const timer = useMemo(() => new Timer(() => setActive(false), duration), [
    duration,
  ]);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    return () => timer.clear();
  }, []);

  useEffect(() => {
    running ? timer.resume() : timer.pause();
  }, [running]);

  const { enter, exit } = useMemo(() => animations[position], [position]);

  return (
    <div
      onMouseEnter={() => setRunning(false)}
      onMouseLeave={() => setRunning(true)}
      className={`react-headless-notifier-mb-4 react-headless-notifier-transform-gpu react-headless-notifier-transition-all ${
        active ? enter : exit
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
