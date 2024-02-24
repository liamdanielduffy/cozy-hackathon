import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import { House } from "~/app/components/House";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const [name1State, setName1State] = useState('Hi')
  const [name2State, setName2State] = useState('Hello')

  return (
    <div className="px-8 py-4" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1 className="text-4xl font-bold my-4">My Neighborhood</h1>
      <div className="flex w-full">
        <House belongsToCurrentUser isOnline name={name1State} onChangeName={setName1State} />
        <div className="mr-4" />
        <House name={name2State} onChangeName={setName2State} />
      </div>
    </div>
  );
}
