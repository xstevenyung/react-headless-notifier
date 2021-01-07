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

const NotifierContext = createContext({ notify: (notification, config) => {} });

const ADD = 'add';
const DISMISS = 'dismiss';

let id = 1;

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
    default:
      return state;
  }
}

const positions = {
  TOP: 'top',
  TOP_RIGHT: 'topRight',
  TOP_LEFT: 'topLeft',
  BOTTOM_RIGHT: 'bottomRight',
  BOTTOM_LEFT: 'bottomLeft',
  BOTTOM: 'bottom',
};

function useNotifications() {
  const [notifications, dispatch] = useReducer(reducer, {
    [positions.TOP]: [],
    [positions.TOP_RIGHT]: [],
    [positions.TOP_LEFT]: [],
    [positions.BOTTOM_RIGHT]: [],
    [positions.BOTTOM_LEFT]: [],
    [positions.BOTTOM]: [],
  });

  const notify = (children, config = { position: positions.BOTTOM_RIGHT }) => {
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
      },
    });
  };

  const dismiss = id => {
    dispatch({ type: DISMISS, notification: { id } });
  };

  return { notifications, notify, dismiss };
}

function NotifierContextProvider({
  children,
  max = null,
  durationPerNotification = 5000,
}) {
  const { notifications, notify, dismiss } = useNotifications();

  return (
    <NotifierContext.Provider
      value={{
        notify,
      }}
    >
      {children}

      <NotificationBag
        className="react-headless-notifier-fixed react-headless-notifier-top-0 react-headless-notifier-left-0 react-headless-notifier-m-8"
        notifications={notifications[positions.TOP_LEFT]}
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              key={id}
              duration={durationPerNotification}
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
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              key={id}
              duration={durationPerNotification}
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
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              position={positions.TOP}
              key={id}
              duration={durationPerNotification}
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
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              position={positions.BOTTOM}
              key={id}
              duration={durationPerNotification}
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
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              key={id}
              duration={durationPerNotification}
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
        max={max}
      >
        {notifications => {
          return notifications.map(({ id, children }) => (
            <NotificationWrapper
              key={id}
              duration={durationPerNotification}
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
  }, [notifications.length, max]);

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

  useEffect(() => {
    const timeout = setTimeout(() => setActive(false), duration);
    return () => clearTimeout(timeout);
  }, [duration]);

  const { enter, exit } = useMemo(() => animations[position], [position]);

  return (
    <div
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
