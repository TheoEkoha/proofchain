import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/dashboard")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div className="p-2">
      <h3>Welcome Home!</h3>
    </div>
  );
}
