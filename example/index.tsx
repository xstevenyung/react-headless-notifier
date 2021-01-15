import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotifierContextProvider, useNotifier, positions } from '../.';
import {
  SuccessDemoNotification,
  InfoDemoNotification,
  DangerDemoNotification,
  WarningDemoNotification,
} from './components/DemoNotification';

const App = () => {
  return (
    <NotifierContextProvider
      config={{ position: positions.BOTTOM_RIGHT, duration: 5000 }}
    >
      <ShowNotification />
    </NotifierContextProvider>
  );
};

function ShowNotification() {
  const { notify, dismissAll } = useNotifier();

  React.useEffect(() => {}, []);

  return (
    <div className="prose flex items-center justify-center w-screen h-screen gap-4">
      <button
        type="button"
        onClick={() =>
          notify(<SuccessDemoNotification />, { position: positions.TOP })
        }
      >
        Top Notification
      </button>

      <button
        type="button"
        onClick={() =>
          notify(<DangerDemoNotification />, { position: positions.BOTTOM })
        }
      >
        Bottom Notification
      </button>

      <button
        type="button"
        onClick={() =>
          notify(<WarningDemoNotification />, { duration: Infinity })
        }
      >
        Bottom Right Notification
      </button>

      <button
        type="button"
        onClick={() =>
          notify(<InfoDemoNotification />, {
            position: positions.BOTTOM_LEFT,
          })
        }
      >
        Bottom Left Notification
      </button>

      <button type="button" onClick={dismissAll}>
        Dismiss All Notificaitons
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
