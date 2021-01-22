import InfoVueNotification from './InfoVueNotification.mdx';
import SuccessVueNotification from './SuccessVueNotification.mdx';
import WarningVueNotification from './WarningVueNotification.mdx';
import DangerVueNotification from './DangerVueNotification.mdx';
import ThemeList from '../ThemeList';

export default function VueTheme() {
  return (
    <ThemeList
      elements={[
        { name: 'InfoNotification', children: <InfoVueNotification /> },
        { name: 'SuccessNotification', children: <SuccessVueNotification /> },
        { name: 'WarningNotification', children: <WarningVueNotification /> },
        { name: 'DangerNotification', children: <DangerVueNotification /> },
      ]}
    />
  );
}
