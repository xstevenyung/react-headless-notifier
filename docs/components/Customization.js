import themes from '../themes';

const defaultTitle = 'Well, hello there';
const defaultMessage =
  'This is a demo notification, you can customize it live in the editor!';

export default function Customization({
  selectedTheme,
  onChange: handleChange,
}) {
  return (
    <fieldset>
      <legend className="sr-only">Preset style</legend>

      <div className="bg-white rounded-md space-y-3.5">
        {Object.keys(themes).map((themeName, themeIndex) => {
          const theme = themes[themeName];

          return (
            <label
              key={themeName}
              for={`settings-option-${themeIndex + 1}`}
              className="relative flex items-center p-4 overflow-hidden rounded-md cursor-pointer"
            >
              <div className="flex items-center h-5 mr-4">
                <input
                  id={`settings-option-${themeIndex + 1}`}
                  name="privacy_setting"
                  type="radio"
                  className="w-4 h-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                  checked={selectedTheme === themeName}
                  onChange={() => handleChange(themeName)}
                />
                <span
                  aria-hidden="true"
                  class="absolute inset-0 rounded-md border"
                ></span>
              </div>

              <div className="grid grid-cols-4">
                {theme.map((NotificationComponent, index) => (
                  <div key={index} className="w-80">
                    <NotificationComponent
                      title={defaultTitle}
                      message={defaultMessage}
                    />
                  </div>
                ))}
              </div>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
