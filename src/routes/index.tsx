import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent
});

function RouteComponent () {
  return <Root />;
}

function Root () {
  return <a href="/trips">Go to trips</a>;
}
