import { Suspense } from "react";

export default function AvailabilityLayout({ children }) {
  return (
    <div>
      <Suspense fallback={<div>Loading Availabilities...</div>}>{children}</Suspense>
    </div>
  );
}
