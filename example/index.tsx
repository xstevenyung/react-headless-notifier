import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotifierContextProvider, useNotifier } from '../.';
import {
  SuccessDemoNotification,
  InfoDemoNotification,
  DangerDemoNotification,
  WarningDemoNotification,
} from './components/DemoNotification';

const App = () => {
  return (
    <NotifierContextProvider>
      <ShowNotification />
    </NotifierContextProvider>
  );
};

function ShowNotification() {
  const { notify } = useNotifier();

  React.useEffect(() => {
    notify(<SuccessDemoNotification />);
    notify(<InfoDemoNotification />);
    notify(<WarningDemoNotification />);
    notify(<DangerDemoNotification />);
  }, []);

  return <p>A notification should appear</p>;
}

ReactDOM.render(<App />, document.getElementById('root'));
