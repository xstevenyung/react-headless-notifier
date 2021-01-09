# React Headless Notifier

## Overview

React Headless Notifier is component library for building highly customizable notification system. This library is lightweight, and ultra-customizable, but do not render any markup or styles for you. This effectively means that React Headless Notifier is a "headless" UI library

### What is a "headless" UI library?

React Headless Notifier is a headless utility, which means out of the box, it doesn't render or supply any actual UI elements. You are in charge of utilizing styling and managing your different notification types across your application. Read this article to understand [why React Headless Notifier is built this way](https://www.merrickchristensen.com/articles/headless-user-interface-components/). If you don't want to, then here's a quick explanation of why headless UI is important:

- Separation of Concerns - Not that superficial kind you read about all the time. The real kind. React Headless Notifier as a library honestly has no business being in charge of your UI. The look, feel, and overall experience of your table is what makes your app or product great. The less React Headless Notifier gets in the way of that, the better!
- Maintenance - By removing the API surface area required to support every UI use-case, React Headless Notifier can remain small, easy-to-use and simple to customize.
- Extensibility - UI presents countless edge cases for a library simply because it's a creative medium, and one where every developer does things differently. By not dictating UI concerns, React Headless Notifier empowers the developer to design and extend the UI based on their unique use-case.

### Installation

```bash
npm install react-headless-notifier --save
```

or

```bash
yarn add react-headless-notifier
```

React Headless Notifier is compatible with React v16.8+ and works with ReactDOM.

### Quick Start

#### Setup

First, wrap your application with `NotifierContextProvider` in your `App.js` or `pages/_app.js` for Next.js apps:

```jsx
import * as React from 'react';
// 1. import the NotifierContextProvider
import { NotifierContextProvider } from 'react-headless-notifier';

function App() {
  return (
    // 2. Wrap your app
    <NotifierContextProvider
      // All props are optional, those are the values by default
      config={{
        max: null, // Max number of notiication simultaneously, `null` will result in no maximum
        duration: 5000, // Duration by notification in milliseconds
        position: 'bottomRight', // You can specify a position where the notification should appears, valid positions are 'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom'.
      }}
    >
      {/* The rest of your app here */}
    </NotifierContextProvider>
  );
}
```

#### Hit the ground running 🏃‍♂️

Using headless components doesn't mean you have comprise with productivity. We crafted some beautiful styles so you can start hacking right away without
wasting time.

Check out the [documentation website](https://react-headless-notifier.recodable.io#hit-the-ground-running) for more details

#### Use it

Use `notify()` anywhere in your project by passing down any React component for maximum flexibility.

```jsx
// 1. Import `useNotifier` hook
import { useNotifier } from 'react-headless-notifier';
import { SuccessNotification } from './Notification';

function SendNotificationButton() {
  // 2. Get the `notify` function to send notification to the user
  const { notify } = useNotifier();

  return (
    <button
      type="button"
      onClick={() => {
        // 3. Send any notifications as a React component
        notify(
          <SuccessNotification
            title="You are done!"
            message="Enjoy React Headless Notifier!"
          />,
          // 4. (optional) as a second parameter, you can override the default config for this specific notification
          // All value here are optional and will take what you passed in the `<NotifierContextProvider />`
          {
            position: 'bottomRight', // You can specify a position where the notification should appears, valid positions are 'top', 'topRight', 'topLeft', 'bottomRight', 'bottomLeft', 'bottom'.
            duration: 5000, // Display duration in milliseconds
          },
        );
      }}
    >
      Click me to send a notification!
    </button>
  );
}
```
