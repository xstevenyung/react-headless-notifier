import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotifierContextProvider, useNotifier } from '../.';

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
    notify(<div>hello</div>);
  }, []);

  return <p>A notification should appear</p>;
}

ReactDOM.render(<App />, document.getElementById('root'));
