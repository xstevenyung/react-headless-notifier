import { useReducer } from 'react';

export default function ThemeList({ elements }) {
  return (
    <dl className="mt-6 space-y-6 divide-y divide-gray-200">
      {elements.map(({ name, children }) => (
        <ThemeItem name={name}>{children}</ThemeItem>
      ))}
      {/* <ThemeItem name="SuccessNotification">
        <SuccessVueNotification />
      </ThemeItem>
      <ThemeItem name="WarningNotification">
        <WarningVueNotification />
      </ThemeItem>
      <ThemeItem name="DangerNotification">
        <DangerVueNotification />
      </ThemeItem> */}
    </dl>
  );
}

export function ThemeItem({ name, children }) {
  const [open, toggle] = useReducer(state => !state, false);
  return (
    <div className="pt-6">
      <dt className="text-lg">
        <button
          onClick={toggle}
          className="text-left w-full flex justify-between items-start text-gray-400"
        >
          <span className="font-medium text-gray-900">{name}</span>
          <span className="ml-6 h-7 flex items-center">
            <svg
              className={`${
                open ? '-rotate-180' : 'rotate-0'
              } h-6 w-6 transform`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </span>
        </button>
      </dt>
      {open && <dd className="mt-2 pr-12">{children}</dd>}
    </div>
  );
}
