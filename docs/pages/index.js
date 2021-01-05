import { useEffect, useState } from 'react';
import { useNotifier } from '../../';
import {
  InfoDemoNotification,
  WarningDemoNotification,
  DangerDemoNotification,
  SuccessDemoNotification,
} from '../components/DemoNotification';
import {
  SuccessVueNotification,
  InfoVueNotification,
  WarningVueNotification,
  DangerVueNotification,
} from '../components/VueNotification';
import {
  SuccessNotyNotification,
  InfoNotyNotification,
  DangerNotyNotification,
  WarningNotyNotification,
} from '../components/NotyNotification';
import GettingStarted from '../content/getting-started.md';

const themes = {
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

export default function Home() {
  const { notify } = useNotifier();
  const [selectedTheme, setSelectedTheme] = useState(Object.keys(themes)[0]);

  const theme = themes[selectedTheme];

  const notifyWithTheme = () => {
    theme.forEach(NotificationComponent => {
      notify(<NotificationComponent />);
    });
  };

  useEffect(() => {
    notifyWithTheme();
  }, [selectedTheme]);

  return (
    <main className="mb-12">
      <section className="sm:pt-16 pb-16 sm:pb-32 relative">
        <h1 className="text-5xl font-bold text-center pt-28 pb-16">
          Highly customizable
          <br />
          notifications for React
        </h1>

        <div className="flex flex-col items-center px-4 sm:flex-row justify-center">
          <button
            type="button"
            className="w-full inline-flex items-center px-8 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 focus:ring-600 sm:w-48"
            onClick={notifyWithTheme}
          >
            <span className="mx-auto">Try it</span>
          </button>

          <span className="w-4 h-4 flex-shrink-0" />

          <a
            href="#installation"
            className="w-full inline-flex items-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-48"
          >
            <span className="mx-auto">Get Started</span>
          </a>
        </div>
      </section>

      <div className="prose mx-auto">
        <section>
          <GettingStarted />
        </section>

        <section>
          <h1>Hit the ground running</h1>

          <p>
            We created some predefined style so you can start hacking right away
            without wasting time!
          </p>

          <Customization
            selectedTheme={selectedTheme}
            onChange={setSelectedTheme}
          />
        </section>
      </div>
    </main>
  );
}

function Customization({ selectedTheme, onChange: handleChange }) {
  return (
    <fieldset>
      <legend className="sr-only">Preset style</legend>

      <div className="bg-white rounded-md space-y-3.5">
        {Object.keys(themes).map(themeName => {
          const theme = themes[themeName];

          return (
            <div className="relative border rounded-md rounded-tr-md p-4 flex overflow-hidden items-center">
              <div className="flex items-center h-5 mr-4">
                <input
                  id="settings-option-0"
                  name="privacy_setting"
                  type="radio"
                  className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
                  checked={selectedTheme === themeName}
                  onChange={() => handleChange(themeName)}
                />
              </div>

              <div className="grid grid-cols-4">
                {theme.map(NotificationComponent => (
                  <div className="w-80">
                    <NotificationComponent />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </fieldset>
  );
}
