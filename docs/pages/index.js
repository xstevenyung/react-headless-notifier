import { useEffect, useState } from 'react';
import { useNotifier } from 'react-headless-notifier';
import DemoNotification from '../components/DemoNotification';
import GettingStartedSection from '../components/GettingStartedSection.mdx';

export default function Home() {
  const { notify } = useNotifier();

  useEffect(() => {
    notify(<DemoNotification />);
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
            onClick={() => notify(<DemoNotification />)}
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
        <GettingStartedSection />
      </section>
    </main>
  );
}
