import { Card } from "../../../libs/ui/Card.tsx";

type PersonOwedProps = {
  /** the person's name to display */
  name: string;
  /** the formatted amount that the person owes */
  amountOwed: string;
};

/**
 * Represents a person and how much money they are owed
 */
export function PersonOwed({ name, amountOwed }: PersonOwedProps) {
  return (
    <Card>
      <div>{name}</div>
      <div
      // sx={{
      //   textAlign: "right",
      //   fontFamily: "Courier",
      //   ...(amountOwed[0] === "-" && { color: "#a41e1e" }),
      // }}
      >
        {amountOwed}
      </div>
    </Card>
  );
}
