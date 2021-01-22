import GettingStarted from '../content/getting-started.mdx';
import { useTheme } from '../components/ThemeContext';

export default function Home() {
  const { themeName, setThemeName, notifyWithTheme } = useTheme();

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

      <section className="prose prose-lg mx-auto">
        <GettingStarted selectedTheme={themeName} onChange={setThemeName} />
      </section>
    </main>
  );
}
