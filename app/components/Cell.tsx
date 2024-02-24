
// make a react component which stores a text value inside itself as state
// and renders a div with that text valueimport {TextField, Label, Input} from 'react-aria-components';
import { TextField, Label, Input } from 'react-aria-components';
import { useEffect, useState } from "react";
import { Cell, GlobalState, Home, allHomes, useStore } from '../state';
import { ReactSketchCanvas } from "react-sketch-canvas";


interface CellContainer {
  children: React.ReactNode;
}

export function CellContainer({ children }: CellContainer) {
  return <TextField className="py-0 my-0 w-full input input-bordered flex flex-row items-center focus:outline-1 focus:outline-offset-0 rounded-none px-1 border-gray-300">{children}</TextField>;
}

export function DrawingCell() {
  return (
    <ReactSketchCanvas
      width="100%"
      height="150px"
      canvasColor="white"
      strokeColor="blue"
    />
  )
}

export function ValCell() {
  return (
    <iframe
      title="valcell"
      src="https://www.val.town/embed/new"
      style={{ width: '100%', height: '150px' }}
    />
  )
}

export default function TextCell() {
  const [text, setText] = useState('');

  return (
    <CellContainer>
      <div className="focus:outline-1 focus:outline-offset-0 flex items-center flex-row w-full">
        <Input className="focus:outline-1 focus:outline-offset-0 w-full h-full pl-2" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </CellContainer>
  )
}

function getValRefs(val: string): string[] | null {
  return val.match(/@[^ ]+/g);
}

function validateValRef(valRef: string) {
  if (!valRef.match(/@(\w+)\.(\d+)/g)) {
    throw new Error("Invalid valRef format. Expected format is @<string>.<int>");
  }
}

function getValFromRef(valRef: string, state: GlobalState) {
  const [valHome, valIndexStr] = valRef.split('.');
  const valHomeClean = valHome.replace('@', '');
  const valIndex = parseInt(valIndexStr);
  const home = allHomes(state).find((home) => home.name === valHomeClean)
  if (!home) throw new Error(`No home found for val ${valRef}`)
  const cell = home.cells.find((cell) => cell.id === valIndex);
  if (!cell) throw new Error(`No cell found for val ${valRef}`)
  console.log(home, cell)
  return cell.value;
}

function recursiveEval(val: string, state: GlobalState) {
  // step 1 -- get all of the references (valRefs), which begin with an @ symbol, so get all the @1 or @liam.2 or etc.
  const valRefs = getValRefs(val) ?? []; // [@andrew.1, ...]

  console.log(valRefs)
  // @andrew.1 -> 2 + 2
  // 2 + @andrew.1

  valRefs.forEach((valRef) => {
    // step 2 -- validate that each valRef is @<string>.<int> using regex. If not, error!
    validateValRef(valRef)
    // step 3 -- fetch those reference's code from global store
    const valText = getValFromRef(valRef, state); // 2 + 2
    console.log(valText)
    const result = recursiveEval(valText, state);
    console.log(result)
    // step 4 -- replace the valRef with the result of the recursiveEval
    val = val.replace(valRef, String(result));
    console.log(val)
  });

  return eval(val); // at the end, eval the val.


  // step 5 -- eval this val
  // step 6 -- return the result of that eval
}


export function CodeCell(props: { cell: Cell, home: Home }) {

  const setCellProperties = useStore(store => store.setCellProperties)

  const updateCellValue = (value: string) => {
    setCellProperties(props.home.name, props.cell.id, { value })
  }

  const [error, setError] = useState(false);
  const [evalResult, setEvalResult] = useState('');
  const store = useStore()

  useEffect(() => {
    try {
      const result = recursiveEval(props.cell.value, store);
      setEvalResult(String(result));
      setError(false);
    } catch {
      setError(true);
    }
  }, [props.cell.value, store]);

  return (
    <CellContainer>
      <div className={`w-full flex items-center flex-row ${error ? 'text-red-500' : ''}`}>
        <Label className="bg-secondary text-base-100 px-2 rounded-full">{props.cell.id}</Label>
        <Input className="focus:outline-1 focus:outline-offset-0 pl-2 w-full h-full" value={props.cell.value} onChange={(e) => updateCellValue(e.target.value)} />
        {!error && <div>{evalResult}</div>}
        {error && <div>Error</div>}
      </div>
    </CellContainer>
  )
}

