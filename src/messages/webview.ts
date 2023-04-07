export type WebviewMessage =
  | { command: "input"; input: Input };

export type Input = {
  pattern: string;
};
