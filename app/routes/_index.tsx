import type { MetaFunction } from "@remix-run/node";
import Cell from "../components/Cell";

import { House } from "~/app/components/House";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-4xl font-bold">Welcome to The Neighborhood</h1>
      <p className="text-lg">This is a simple app to help you find your next home.</p>
      <Cell height={60} />
      <House />
    </div>
  );
}
