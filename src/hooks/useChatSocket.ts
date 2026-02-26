import { useEffect, useRef, useCallback } from 'react';
import { socket, connectSocket, disconnectSocket } from '@/sockets/socket';

type MessageHandler = (msg: any) => void;

/**
 * useChatSocket
 * - Provides a stable subscribe/unsubscribe API for socket 'message' events.
 * - Ensures there is only one listener on the socket and avoids re-creating
 *   listeners when components re-render or when selected chat changes.
 */
export function useChatSocket() {
  const handlersRef = useRef<MessageHandler[]>([]);

  const onSocketMessage = useCallback((msg: any) => {
    handlersRef.current.forEach((h) => {
      try {
        h(msg);
      } catch (e) {
        // swallow handler errors to avoid breaking other subscribers
        // eslint-disable-next-line no-console
        console.error('chat socket handler error', e);
      }
    });
  }, []);

  useEffect(() => {
    // lazy connect the socket when the hook is mounted in the app
    if (!socket.connected) {
      connectSocket();
    }

    // attach single shared listener
    socket.on('message', onSocketMessage);

    return () => {
      // remove this listener on unmount
      socket.off('message', onSocketMessage);
      // do not disconnect socket here; leave lifecycle to app-level logic
    };
  }, [onSocketMessage]);

  const subscribe = useCallback((handler: MessageHandler) => {
    handlersRef.current.push(handler);
    return () => {
      handlersRef.current = handlersRef.current.filter((h) => h !== handler);
    };
  }, []);

  return {
    subscribe,
    connectSocket,
    disconnectSocket,
    socket,
  } as const;
}
