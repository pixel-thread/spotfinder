export type PlanT = {
  id: string;
  price: number;
};

export interface SubscriptionContextI {
  plan: PlanT | null | undefined;
  isLoading: boolean;
  onSubscribe: ({ slot }: { slot: number }) => void;
  onVerify: ({ id }: { id: string }) => void;
}
