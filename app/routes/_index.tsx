import { Cell, CellType, Home, Status, allHomes, themes, useStore } from "../state";
import TextCell, { CodeCell, DrawingCell } from "../components/Cell";
import { useState } from "react";

interface IndicatorProps {
  status: Status
}

function Indicator(props: IndicatorProps) {
  const statusStyles = {
    online: 'bg-green-200 ring-green-400 ',
    dnd: 'bg-red-200 ring-red-400',
    offline: 'bg-gray-400 ring-gray-400',
  }
  return <span className={`indicator-item badge ring ${statusStyles[props.status]} ring-opacity-50 border-0 w-5 h-5`}></span>
}

function HouseSettings({ settingsOpen, setSettingsOpen }: { settingsOpen: boolean, setSettingsOpen: (open: boolean) => void }) {
  return (
    <label className="self-end swap swap-rotate">
      {/* this hidden checkbox controls the state */}
      <input type="checkbox" checked={settingsOpen} onChange={() => setSettingsOpen(!settingsOpen)} />
      {/* sun icon */}
      <svg className="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
      </svg>
      <svg className="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
      </svg>
    </label>
  )
}

export function House(props: Home & { children: React.ReactNode }) {
  const [settingsOpen, setSettingsOpen] = useState(false)

  return (
    <div data-theme={props.theme} className="shadow-2xl bg-primary p-2 flex flex-col w-96 min-w-96">
      <HouseSettings settingsOpen={settingsOpen} setSettingsOpen={setSettingsOpen} />
      <div className="w-full flex flex-col justify-center items-center ">
        <div className="min-w-16 min-h-16 border rounded-full flex items-center justify-center border-gray-200 shadow-xl bg-white flex-shrink-0 text-3xl indicator">
          <Indicator status={props.status} />
          {props.emoji}
        </div>
        <p className="text-base-100 text-2xl mt-2">{props.name}</p>
      </div>
      <div className="mb-4" />

      {settingsOpen && (
        <ThemeSelector home={props} />
      )}

      {!settingsOpen && (
        <div className="w-full flex flex-col">
          {props.children}
        </div>
      )}
    </div>
  )
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
        className="select select-bordered focus:outline-1 focus:outline-offset-0 w-full max-w-xs join-item"
        value={selectedCell}
        onChange={(e) => setSelectedCell(e.target.value as CellType)}
      >
        <option value="text">Text</option>
        <option value="color">Color Picker</option>
        <option value="code">Code Cell</option>
        <option value="draw">Drawing Cell</option>
      </select>
      <button
        className="btn btn-secondary join-item"
        onClick={() => props.addCell(selectedCell)}
      >
        Add Cell
      </button>
    </div>
  );
}

function ThemeSelector(props: { home: Home }) {
  const setHomeTheme = useStore(state => state.setHomeTheme)
  return (
    <>
      <div className="join join-vertical">
        {themes.map(t => <input key={t} type="radio" name="theme-buttons" className="btn join-item" aria-label={t} value={t} onChange={() => setHomeTheme(t, props.home.name)} />)}
      </div>
    </>
  );
}

function CellComponent(props: { cell: Cell, home: Home }) {
  switch (props.cell.type) {
    case 'code': return <CodeCell cell={props.cell} home={props.home} />
    case 'color': return <ColorPickerCell />
    case 'text': return <TextCell />
    case 'draw': return <DrawingCell />
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
            <House status={h.status} theme={h.theme} key={h.name} name={h.name} cells={h.cells} emoji={h.emoji}>
              {h.cells.map(c => <CellComponent key={c.id} cell={c} home={h} />)}
              <div className="mb-4" />
              <CellSelector addCell={(cell) => store.addCell(cell, h.name)} />
            </House>
            <div className="mr-8" />
          </>
        ))
        }
      </div >
    </div >
  );
}