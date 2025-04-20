export type PlanT = {
  id: string;
  price: number;
  discount: number;
};

export interface SubscriptionContextI {
  plan: PlanT | null | undefined;
  isLoading: boolean;
  onSubscribe: ({ slot }: { slot: number }) => void;
  onVerify: ({ id }: { id: string }) => void;
}
