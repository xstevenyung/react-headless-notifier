import Customization from '../components/Customization';
import TailwindTheme from './TailwindTheme';
import { useTheme, TAILWIND, CSS } from '../components/ThemeContext';
import PlainCSSTheme from './PlainCSSTheme';

export default function ThemePicker({ selectedTheme, onChange: handleChange }) {
  const { type: selectedType, types, setType, themeName } = useTheme();

  return (
    <>
      <div className="mb-6">
        <div className="sm:hidden">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            id="tabs"
            name="tabs"
            className="block w-full focus:ring-blue-500 focus:border-blue-500 border-gray-300 rounded-md"
          >
            {types.map(type => (
              <option key={type}>{type}</option>
            ))}
          </select>
        </div>

        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {/* <!-- Current: "border-blue-500 text-blue-600", Default: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300" --> */}

              {types.map(type => (
                <button
                  key={type}
                  className={`${
                    selectedType === type
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } w-1/2 py-4 px-1 text-center border-b-2 font-medium text-sm`}
                  onClick={() => setType(type)}
                >
                  {type}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <Customization />

      {selectedType === TAILWIND && <TailwindTheme name={themeName} />}

      {selectedType === CSS && <PlainCSSTheme name={themeName} />}
    </>
  );
}
