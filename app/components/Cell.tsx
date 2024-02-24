
// make a react component which stores a text value inside itself as state
// and renders a div with that text valueimport {TextField, Label, Input} from 'react-aria-components';
import { TextField, Label, Input } from 'react-aria-components';
import { useEffect, useState } from "react";
import { allHomes, globalState } from '../state';

interface CellProps {
  value: string
}

interface CellContainer {
  children: React.ReactNode;
}

export function CellContainer({ children }: CellContainer) {
  return <TextField className="py-0 my-0 w-full input flex flex-row items-center rounded-none px-1 border-gray-300">{children}</TextField>;
}

export default function TextCell() {
  const [text, setText] = useState('');

  return (
    <CellContainer>
      <div className="flex items-center flex-row w-full">
        <Label>1</Label>
        <Input className="w-full h-full pl-2" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
    </CellContainer>
  )
}

function getValRefs(val: string): string[] | null {
  console.log("test")
  return val.match(/@[^ ]+/g);
}

function validateValRef(valRef: string) {
  if (!valRef.match(/@(\w+)\.(\d+)/g)) {
    throw new Error("Invalid valRef format. Expected format is @<string>.<int>");
  }
}

function getValFromRef(valRef: string) {
  const [valHome, valIndexStr] = valRef.split('.');
  const valHomeClean = valHome.replace('@', '');
  const valIndex = parseInt(valIndexStr);
  const home = allHomes(globalState).find((home) => home.name === valHomeClean)
  if (!home) throw new Error(`No home found for val ${valRef}`)
  const cell = home.cells.find((cell) => cell.id === valIndex);
  if (!cell) throw new Error(`No cell found for val ${valRef}`)
  return cell.value;
}

function recursiveEval(val: string) {
  // step 1 -- get all of the references (valRefs), which begin with an @ symbol, so get all the @1 or @liam.2 or etc.
  const valRefs = getValRefs(val) ?? []; // [@andrew.1, ...]

  console.log(valRefs)
  // @andrew.1 -> 2 + 2
  // 2 + @andrew.1

  valRefs.forEach((valRef) => {
    // step 2 -- validate that each valRef is @<string>.<int> using regex. If not, error!
    validateValRef(valRef)
    // step 3 -- fetch those reference's code from global store
    const valText = getValFromRef(valRef); // 2 + 2

    const result = recursiveEval(valText);
    // step 4 -- replace the valRef with the result of the recursiveEval
    val = val.replace(valRef, String(result));
  });

  return eval(val); // at the end, eval the val.


  // step 5 -- eval this val
  // step 6 -- return the result of that eval
}


export function CodeCell() {
  const [val, setVal] = useState('');
  const [error, setError] = useState(false);
  const [evalResult, setEvalResult] = useState('');

  useEffect(() => {

    try {
      const result = recursiveEval(val);
      setEvalResult(String(result));
      setError(false);
    } catch {
      setError(true);
    }
  }, [val]);

  return (
    <CellContainer>
      <div className={`w-full flex items-center flex-row ${error ? 'text-red-500' : ''}`}>
        <Label>1</Label>
        <Input className="pl-2 w-full h-full" value={val} onChange={(e) => setVal(e.target.value)} />
        {!error && <div>{evalResult}</div>}
        {error && <div>Error</div>}
      </div>
    </CellContainer>
  )
}

