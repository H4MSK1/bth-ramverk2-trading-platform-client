import React from 'react';
import useSocket from 'use-socket.io-client';

const useSocketEvents = (options = {}) => {
  const [socket] = useSocket(process.env.REACT_APP_BACKEND_URL, {
    autoConnect: false,
    ...options,
  });
  const [isSocketReady, setIsSocketReady] = React.useState(false);

  React.useEffect(() => {
    socket.connect();
    setIsSocketReady(true);
    return () => {
      socket.disconnect();
    };
  }, []);

  return { socket, isSocketReady };
};

export default useSocketEvents;
