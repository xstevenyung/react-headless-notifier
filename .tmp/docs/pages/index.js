import { useEffect, useState } from 'react';
import { useNotifier } from 'react-headless-notifier';
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

export default function Home() {
  const { notify } = useNotifier();

  useEffect(() => {
    notify(<InfoDemoNotification />);
    notify(<SuccessDemoNotification />);
    notify(<WarningDemoNotification />);
    notify(<DangerDemoNotification />);
  }, []);

  return (
    <main>
      <section className="sm:pt-16 pb-16 sm:pb-32">
        <h1 className="text-5xl font-bold text-center pt-28 pb-16">
          Highly customizable
          <br />
          notifications for React
        </h1>

        <div className="flex flex-col items-center px-4 sm:flex-row justify-center">
          <button
            type="button"
            className="w-full inline-flex items-center px-8 py-3 border border-transparent text-base font-semibold rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 bg-blue-500 hover:bg-blue-600 focus:ring-600 sm:w-48"
            onClick={() => {
              notify(<InfoDemoNotification />);
              notify(<SuccessDemoNotification />);
              notify(<WarningDemoNotification />);
              notify(<DangerDemoNotification />);
            }}
          >
            Try it!
          </button>

          <span className="w-4 h-4 flex-shrink-0" />

          <button
            type="button"
            className="w-full inline-flex items-center px-8 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:w-48"
          >
            Get Started
          </button>
        </div>
      </section>

      {/* <div className="grid grid-cols-2 mx-auto" style={{ width: '768px' }}>
          {[1, 2, 3, 4].map(() => (
            <div className="border border-gray-100 p-4 flex items-center justify-around">
              <input type="checkbox" />
              <span
                dangerouslySetInnerHTML={{ __html: DemoNotificationTemplate }}
              />
            </div>
          ))}
        </div> */}

      <section className="prose mx-auto">
        <GettingStarted />
      </section>

      <section className="prose mx-auto">
        <h1>Customization</h1>

        <Customization />
      </section>
    </main>
  );
}

function Customization() {
  return (
    <fieldset>
      <legend className="sr-only">Preset style</legend>

      <div className="bg-white rounded-md -space-y-px">
        <div className="relative border rounded-tl-md rounded-tr-md p-4 flex overflow-hidden items-center">
          <div className="flex items-center h-5 mr-4">
            <input
              id="settings-option-0"
              name="privacy_setting"
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
              checked
            />
          </div>
          {/* <li className="border rounded-lg px-4 py-6 overflow-hidden"> */}
          <div className="grid grid-cols-4">
            <div className="w-80">
              <InfoDemoNotification />
            </div>

            <div className="w-80">
              <SuccessDemoNotification />
            </div>

            <div className="w-80">
              <WarningDemoNotification />
            </div>

            <div className="w-80">
              <DangerDemoNotification />
            </div>
          </div>
        </div>

        <div className="relative border rounded-tl-md rounded-tr-md p-4 flex overflow-hidden items-center">
          <div className="flex items-center h-5 mr-4">
            <input
              id="settings-option-0"
              name="privacy_setting"
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
              checked
            />
          </div>

          <div className="grid grid-cols-4">
            <div className="w-80">
              <InfoVueNotification />
            </div>

            <div className="w-80">
              <SuccessVueNotification />
            </div>

            <div className="w-80">
              <WarningVueNotification />
            </div>

            <div className="w-80">
              <DangerVueNotification />
            </div>
          </div>
        </div>

        <div className="relative border rounded-tl-md rounded-tr-md p-4 flex overflow-hidden items-center">
          <div className="flex items-center h-5 mr-4">
            <input
              id="settings-option-0"
              name="privacy_setting"
              type="radio"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 cursor-pointer border-gray-300"
              checked
            />
          </div>

          <div className="grid grid-cols-4">
            <div className="w-80">
              <InfoNotyNotification />
            </div>

            <div className="w-80">
              <SuccessNotyNotification />
            </div>

            <div className="w-80">
              <WarningNotyNotification />
            </div>

            <div className="w-80">
              <DangerNotyNotification />
            </div>
          </div>
        </div>
      </div>
    </fieldset>
  );
}
