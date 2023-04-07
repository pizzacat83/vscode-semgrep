export type WebviewMessage =
  | {
    command: "input";
    requestIdx: number;
    input: Input
  };

export type Input = {
  pattern: string;
};
