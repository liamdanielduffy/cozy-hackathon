// interface Props {
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

// export function House(props: Props) {
//   const name = props.belongsToCurrentUser ? <input type="text" value={props.name} onChange={e => props.onChangeName(e.target.value)} placeholder="Your Name" className="input w-full max-w-xs text-gray-900 bg-white ml-2 shadow-xl" /> : <p className="text-gray-900 ml-3 mr-4">{props.name}</p>
//   return <div className="card shadow-2xl bg-gray-200 p-2 flex flex-row items-center w-72 min-w-72 indicator">
//     <Indicator {...props} />
//     <div className="min-w-10 min-h-10 border rounded-full flex items-center justify-center border-gray-200 shadow-xl bg-white flex-shrink-0">🍀</div>
//     {name}
//   </div>
// }