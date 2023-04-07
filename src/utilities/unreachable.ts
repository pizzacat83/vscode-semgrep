export const assertUnreachable = (proof: never): never => {
  throw new Error(`Didn't expect to get here: ${proof}`);
};
