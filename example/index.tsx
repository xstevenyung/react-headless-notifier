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
      config={{ position: positions.TOP, duration: 1000 }}
    >
      <ShowNotification />
    </NotifierContextProvider>
  );
};

function ShowNotification() {
  const { notify } = useNotifier();

  React.useEffect(() => {
    notify(<SuccessDemoNotification />);
    notify(<InfoDemoNotification />, {
      position: positions.BOTTOM,
      duration: 10000,
    });
    // notify(<WarningDemoNotification />);
    // notify(<DangerDemoNotification />);
  }, []);

  return <p>A notification should appear</p>;
}

ReactDOM.render(<App />, document.getElementById('root'));
