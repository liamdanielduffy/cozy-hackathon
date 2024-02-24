import type { MetaFunction } from "@remix-run/node";
import { useState } from "react";

import { House } from "~/app/components/House";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBg5Pzcza66C8FlvxVDSz2_injqrOmJf0Q",
  authDomain: "cozy-hackathon.firebaseapp.com",
  projectId: "cozy-hackathon",
  storageBucket: "cozy-hackathon.appspot.com",
  messagingSenderId: "312548285382",
  appId: "1:312548285382:web:db25ecc43b49d0878f30c7",
  measurementId: "G-SGKQY5V0SN"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {

  const [name1State, setName1State] = useState('Hi')
  const [name2State, setName2State] = useState('Hello')

  console.log(db.type);

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
