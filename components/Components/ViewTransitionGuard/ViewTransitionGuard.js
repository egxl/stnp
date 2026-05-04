'use client';

import { ViewTransition } from 'react';

// Patch document.startViewTransition globally on the client
// to prevent InvalidStateError when document is hidden.
if (typeof document !== 'undefined' && document.startViewTransition) {
  const originalStartViewTransition = document.startViewTransition.bind(document);
  document.startViewTransition = function (callback) {
    if (document.hidden) {
      if (callback) {
        // Run the callback synchronously to ensure UI updates
        const result = callback();
        if (result instanceof Promise) {
          result.catch(() => {});
        }
      }
      return {
        finished: Promise.resolve(),
        ready: Promise.resolve(),
        updateCallbackDone: Promise.resolve(),
        skipTransition: () => {},
      };
    }
    
    try {
      return originalStartViewTransition(callback);
    } catch (error) {
      if (error instanceof DOMException && error.name === 'InvalidStateError') {
        if (callback) {
          const result = callback();
          if (result instanceof Promise) {
            result.catch(() => {});
          }
        }
        return {
          finished: Promise.resolve(),
          ready: Promise.resolve(),
          updateCallbackDone: Promise.resolve(),
          skipTransition: () => {},
        };
      }
      throw error;
    }
  };
}

export default function ViewTransitionGuard({ children, ...props }) {
  // We can now safely render ViewTransition because document.startViewTransition is patched.
  // We just return it directly.
  return <ViewTransition {...props}>{children}</ViewTransition>;
}

