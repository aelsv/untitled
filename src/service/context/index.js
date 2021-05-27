let context = {};

export const addToContext = (newContext) => {
  context = {
    ...context,
    ...newContext,
  };
};

export const getContextValue = (name) => context[name];
