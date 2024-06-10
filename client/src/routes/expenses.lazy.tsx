import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/expenses")({
  component: Expenses,
});

function Expenses() {
  return (
    <div>
      <li>Lorem, ipsum dolor.</li>
      <li>Doloremque, quam inventore?</li>
      <li>Laborum, quasi aspernatur.</li>
      <li>Quaerat, doloribus ipsum?</li>
    </div>
  );
}
