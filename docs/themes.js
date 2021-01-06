import {
  InfoDemoNotification,
  WarningDemoNotification,
  DangerDemoNotification,
  SuccessDemoNotification,
} from './components/DemoNotification';
import {
  SuccessVueNotification,
  InfoVueNotification,
  WarningVueNotification,
  DangerVueNotification,
} from './components/VueNotification';
import {
  SuccessNotyNotification,
  InfoNotyNotification,
  DangerNotyNotification,
  WarningNotyNotification,
} from './components/NotyNotification';

export default {
  demo: [
    InfoDemoNotification,
    SuccessDemoNotification,
    WarningDemoNotification,
    DangerDemoNotification,
  ],
  vue: [
    InfoVueNotification,
    SuccessVueNotification,
    WarningVueNotification,
    DangerVueNotification,
  ],
  noty: [
    InfoNotyNotification,
    SuccessNotyNotification,
    WarningNotyNotification,
    DangerNotyNotification,
  ],
};
