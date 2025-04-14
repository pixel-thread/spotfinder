type Props = {
  condition: boolean;
  trueComponent: React.ReactNode;
  falseComponent: React.ReactNode;
};
export const Ternary = ({ condition, trueComponent, falseComponent }: Props) => {
  return condition ? trueComponent : falseComponent;
};
