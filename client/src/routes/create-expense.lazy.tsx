import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/create-expense")({
  component: CreateExpnese,
});

function CreateExpnese() {
  return <div>Lorem ipsum dolor sit amet.</div>;
}
