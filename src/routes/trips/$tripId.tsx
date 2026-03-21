import { createFileRoute } from "@tanstack/react-router";
import { TripDetails } from "../../pages/TripDetails";

export const Route = createFileRoute("/trips/$tripId")({
  component: TripDetailsWrapper,
});

function TripDetailsWrapper() {
  const { tripId } = Route.useParams();

  return <TripDetails tripId={tripId} />;
}
