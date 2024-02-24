// import type { MetaFunction } from "@remix-run/node";
// import { useEffect, useState, useCallback, useMemo } from "react";

// export const meta: MetaFunction = () => {
//   return [
//     { title: "New Remix App" },
//     { name: "description", content: "Welcome to Remix!" },
//   ];
// };

// interface Props {
//   userId: string
//   isOnline?: boolean
//   belongsToCurrentUser?: boolean
//   onChangeName?: (name: string) => void
//   name: string
// }

// function Indicator(props: Props) {
//   const bgColor = props.isOnline ? 'bg-green-200' : 'bg-gray-400'
//   const ringColor = props.isOnline ? 'ring-green-400' : 'ring-gray-400'
//   return <span className={`indicator-item badge ${bgColor} ring ${ringColor} ring-opacity-50 border-0 w-5 h-5`}></span>
// }


// function useLocalStorage() {
//   const isLocalStorageAvailable = typeof localStorage !== "undefined";

//   const getItem = useCallback((key) => {
//     if (isLocalStorageAvailable) {
//       return localStorage.getItem(key);
//     }
//     // Fallback or stub behavior if localStorage is not available
//     console.warn("localStorage is not available.");
//     return null;
//   }, [isLocalStorageAvailable]);

//   const setItem = useCallback((key, value) => {
//     if (isLocalStorageAvailable) {
//       localStorage.setItem(key, value);
//     } else {
//       // Fallback or stub behavior if localStorage is not available
//       console.warn("localStorage is not available. Unable to set item.");
//     }
//   }, [isLocalStorageAvailable]);

//   return { getItem, setItem };
// }

// function useUserId() {
//   const getUserId = useGetUserId()
//   const userId = getUserId()
//   return userId
// }

// export function House() {
//   const getEmoji = useGetEmoji()
//   const userId = useUserId()

//   const emoji = useMemo(async () => {
//     console.log(userId)
//     const emoji = await getEmoji(userId)
//     console.log(emoji)
//     return emoji
//   }, [getEmoji, userId])

//   return <div className="card shadow-2xl bg-gray-200 p-2 flex flex-row items-center w-72 min-w-72 indicator">
//     <Indicator {...props} />
//     {/* <div className="min-w-10 min-h-10 border rounded-full flex items-center justify-center border-gray-200 shadow-xl bg-white flex-shrink-0">{emoji}</div> */}
//   </div>
// }

// function useGetUserId() {
//   const localStorage = useLocalStorage()
//   return useCallback(() => {
//     let userId = localStorage.getItem("userId");
//     if (!userId) {
//       userId = crypto.randomUUID();
//       localStorage.setItem("userId", userId);
//     }
//     return userId;
//   }, [localStorage]);
// }

// function useGetRandomEmoji() {
//   return useCallback(() => {
//     const emojis = [
//       "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰", "😘", "😗",
//       "😙", "😚", "😋", "😛", "😜", "🤓", "😎", "🥸", "🤩", "🥳",
//       "🤗", "🤔", "🤠", "😺", "😸", "😹", "😻", "😼", "😽", "🙀",
//       "😿", "😾", "👻", "👽", "🤖"
//     ];
//     return emojis[Math.floor(Math.random() * emojis.length)];
//   }, []);
// }

// function useGetEmojiDoc() {
//   return useCallback(async (clientId: string) => {
//     const docRef = doc(db, "emojis", clientId);
//     const docSnap = await getDoc(docRef)
//     return { docRef, docSnap }
//   }, [])
// }

// function useGetEmoji() {
//   const getEmojiDoc = useGetEmojiDoc()
//   return useCallback(async (userId: string) => {
//     if (!userId) {
//       return
//     }
//     const { docSnap } = await getEmojiDoc(userId)
//     if (docSnap.exists()) {
//       return docSnap.data().emoji
//     }
//     return null
//   }, [getEmojiDoc])
// }

// // function useInitializeClient() {
// //   const getRandomEmoji = useGetRandomEmoji()
// //   const getUserId = useGetUserId()

// //   console.log(getRandomEmoji())
// //   console.log(getUserId())
// // }

// export default function Index() {
//   // useInitializeClient();

//   return (
//     <div className="px-8 py-4" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
//       <h1 className="text-4xl font-bold my-4">My Neighborhood</h1>
//       <div className="flex w-full">
//         <House isOnline />
//       </div>
//     </div>
//   );
// }
