import { Cell, CellType, Home, Theme, allHomes, themes, useStore } from "../state";
import TextCell, { CodeCell } from "../components/Cell";
import { useState } from "react";

interface Props {
  isOnline?: boolean
}

function Indicator(props: Props) {
  const bgColor = props.isOnline ? 'bg-green-200' : 'bg-gray-400'
  const ringColor = props.isOnline ? 'ring-green-400' : 'ring-gray-400'
  return <span className={`indicator-item badge ${bgColor} ring ${ringColor} ring-opacity-50 border-0 w-5 h-5`}></span>
}

export function House(props: Home & { children: React.ReactNode }) {
  console.log(props.cells)
  return <div data-theme={props.theme} className="shadow-2xl bg-gray-200 p-2 flex flex-col w-96 min-w-96 indicator">
    <Indicator isOnline />
    <div className="w-full flex flex-col justify-center items-center ">
      <div className="min-w-16 min-h-16 border rounded-full flex items-center justify-center border-gray-200 shadow-xl bg-white flex-shrink-0 text-3xl">{props.emoji}</div>
      <p className="text-gray-900 text-2xl mt-2">{props.name}</p>
    </div>
    <div className="mb-4" />
    <div className="w-full flex flex-col">
      {props.children}
    </div>
  </div>
}


function ColorPickerCell() {
  const [color, setColor] = useState("#FFFFFF");

  return (
    <div className="relative p-4 w-full h-32">
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        className="w-full h-full border-none cursor-pointer"
      />
    </div>
  );
}


function CellSelector(props: { addCell: (cell: CellType) => void }) {
  const [selectedCell, setSelectedCell] = useState<CellType>("text");
  return (
    <div className="join">
      <select
        className="select select-bordered w-full max-w-xs join-item"
        value={selectedCell}
        onChange={(e) => setSelectedCell(e.target.value as CellType)}
      >
        <option value="text">Text</option>
        <option value="color">Color Picker</option>
        <option value="code">Code Cell</option>
      </select>
      <button
        className="btn btn-primary join-item"
        onClick={() => props.addCell(selectedCell)}
      >
        Add Cell
      </button>
    </div>
  );
}

function ThemeSelector(props: { home: Home }) {
  const setHomeTheme = useStore(state => state.setHomeTheme)
  const [theme, setTheme] = useState<Theme>(props.home.theme)
  return (
    <div className="join">
      <select
        className="select select-bordered w-full max-w-xs join-item"
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
      >
        {themes.map(t => <option key={t} value={t}>{t}</option>)}
      </select>
      <button
        className="btn btn-primary join-item"
        onClick={() => setHomeTheme(theme, props.home.name)}
      >
        Set Theme
      </button>
    </div>
  );
}

function CellComponent(props: { cell: Cell }) {
  switch (props.cell.type) {
    case 'code': return <CodeCell />
    case 'color': return <ColorPickerCell />
    case 'text': return <TextCell />
    default: return <></>
  }
}

export default function Index() {

  const store = useStore(state => state)

  return (
    <div className="px-8 py-4" style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <div className="flex w-full">
        {allHomes(store).map(h => (
          <>
            <House theme={h.theme} key={h.name} name={h.name} cells={h.cells} emoji={h.emoji}>
              {h.cells.map(c => <CellComponent key={c.id} cell={c} />)}
              <CellSelector addCell={(cell) => store.addCell(cell, h.name)} />
            </House>
            <div className="mr-8" />
          </>
        ))}
      </div>
    </div>
  );
}