import React, { createContext, useContext, useReducer } from 'react';

export const StateContext = createContext();

export const getStateWithDispatcher = () => {
  const [state, dispatch] = useContext(StateContext);
  return { state, dispatch };
};

export const StateProvider = ({ reducer, initialState, children }) => (
  <StateContext.Provider value={useReducer(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);
