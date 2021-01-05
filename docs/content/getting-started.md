# Overview

React Headless Notifier is component library for building highly customizable notification system. This library is lightweight, and ultra-customizable, but do not render any markup or styles for you. This effectively means that React Headless Notifier is a "headless" UI library

## What is a "headless" UI library?

React Headless Notifier is a headless utility, which means out of the box, it doesn't render or supply any actual UI elements. You are in charge of utilizing styling and managing your different notification types across your application. Read this article to understand [why React Headless Notifier is built this way](https://www.merrickchristensen.com/articles/headless-user-interface-components/). If you don't want to, then here's a quick explanation of why headless UI is important:

- Separation of Concerns - Not that superficial kind you read about all the time. The real kind. React Headless Notifier as a library honestly has no business being in charge of your UI. The look, feel, and overall experience of your table is what makes your app or product great. The less React Headless Notifier gets in the way of that, the better!
- Maintenance - By removing the API surface area required to support every UI use-case, React Headless Notifier can remain small, easy-to-use and simple to customize.
- Extensibility - UI presents countless edge cases for a library simply because it's a creative medium, and one where every developer does things differently. By not dictating UI concerns, React Headless Notifier empowers the developer to design and extend the UI based on their unique use-case.

## Installation

```bash
npm install react-headless-notifier --save
```

or

```bash
yarn add react-headless-notifier
```

React Headless Notifier is compatible with React v16.8+ and works with ReactDOM and React Native.

## Quick Start

```js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { NotifierContextProvider, useNotifier } from 'react-headless-notifier';

function App() {
  return (
    // 1. Wrap your app with the provider
    <NotifierContextProvider>
      <SendNotificationButton />
    </NotifierContextProvider>
  );
}

function SendNotificationButton() {
  // 2. Get the `notify` function to send notification to the user
  const { notify } = useNotifier();

  return (
    <button
      type="button"
      onClick={() => {
        // 3. Send any notifications as a React Component
        notify(<DemoNotification />);
      }}
    >
      Click me to send a notification!
    </button>
  );
}

// 4. Notification sent receive a `dismiss` function
// that you can use to hide the notification programmatically
// Note: React Headless Notification will dismiss automatically
// after the configured amount of time (cf. Option section for more info)
export default function DemoNotification({ dismiss }) {
  return (
    <div className="bg-blue-500 border border-gray-200 px-4 py-2 shadow-lg rounded">
      <p className="font-bold text-blue-100">Well, hello there</p>
      <p className="text-blue-300">
        This is a demo notification, you can customize it live in the editor!
      </p>

      <button
        type="button"
        className=" text-blue-200 font-semibold mt-2 hover:text-blue-100"
        onClick={dismiss}
      >
        Dismiss
      </button>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
```
