export type ProviderMessage =
  | { command: "search-result"; hits: Hit[] };

export type Hit = {
  foo: string;
};
