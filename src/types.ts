export type ItemField = keyof Item;

export type Item = {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
};
