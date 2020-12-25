import * as React from 'react';
import { createContext, useContext, cloneElement } from 'react';
import { ReplaySubject, merge } from 'rxjs';
import { useObservable } from 'rxjs-hooks';
import { scan, map, delay, tap } from 'rxjs/operators';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

const NotifierContext = createContext();

const alerts$ = new ReplaySubject();
const cleanerScheduler$ = new ReplaySubject();
const dismiss$ = new ReplaySubject();

const ADD = 'add';
const DISMISS = 'dismiss';

let id = 1;

function NotifierContextProvider({
  children,
  max = null,
  timePerAlert = 5000,
}) {
  const alerts =
    useObservable(() =>
      merge(
        alerts$.pipe(
          map((alert) => ({ type: ADD, error: { id: id++, alert } })),
        ),
        dismiss$.pipe(map((id) => ({ type: DISMISS, error: { id } }))),
        cleanerScheduler$.pipe(
          map((error) => ({ type: DISMISS, error })),
          delay(timePerAlert),
        ),
      ).pipe(
        tap(({ type, error }) => {
          if (type === ADD) return cleanerScheduler$.next(error);
        }),
        scan((acc, { type, error }) => {
          if (type === ADD) return [...acc, error];
          if (type === DISMISS) return acc.filter(({ id }) => error.id !== id);
          return acc;
        }, []),
        map((alerts) =>
          max ? alerts.slice(Math.max(alerts.length - max, 0)) : alerts,
        ),
      ),
    ) || [];

  const displayedAlerts = alerts;

  return (
    <NotifierContext.Provider
      value={{
        alerts: alerts$.asObservable(),
        notify: (alert) => alerts$.next(alert),
      }}
    >
      {children}

      <div className="w-80 fixed bottom-0 right-0 m-8">
        <AnimatePresence>
          {displayedAlerts.map(({ id, alert }) => (
            <motion.div
              key={id}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 300, opacity: 0 }}
              className="mb-4"
            >
              {cloneElement(alert, {
                id,
                dismiss: () => dismiss$.next(id),
              })}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </NotifierContext.Provider>
  );
}

function useNotifier() {
  return useContext(NotifierContext);
}

export { NotifierContext, NotifierContextProvider, useNotifier };
