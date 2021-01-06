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
        {Object.keys(themes).map(themeName => {
          const theme = themes[themeName];

          return (
            <div
              key={themeName}
              className="relative border rounded-md rounded-tr-md p-4 flex overflow-hidden items-center"
            >
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
                {theme.map((NotificationComponent, index) => (
                  <div key={index} className="w-80">
                    <NotificationComponent
                      title={defaultTitle}
                      message={defaultMessage}
                    />
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
