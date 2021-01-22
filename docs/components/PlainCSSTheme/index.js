import InfoVueNotification from './InfoVueNotification';
import SuccessVueNotification from './SuccessVueNotification';
import WarningVueNotification from './WarningVueNotification';
import DangerVueNotification from './DangerVueNotification';

import VueTheme from './VueTheme';

function Theme({ name }) {
  if (name === 'vue') return <VueTheme />;
  throw new Error(`Theme ${name} doesn't exists.`);
}

export default Theme;
export {
  InfoVueNotification,
  SuccessVueNotification,
  WarningVueNotification,
  DangerVueNotification,
};
