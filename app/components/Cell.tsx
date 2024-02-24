
// make a react component which stores a text value inside itself as state
// and renders a div with that text valueimport {TextField, Label, Input} from 'react-aria-components';
import { TextField, Label, Input } from 'react-aria-components';
import { useEffect, useState } from "react";
import { allHomes, globalState } from '../state';

interface CellProps {
  height: number;
}

interface CellContainer {
  children: React.ReactNode;
}

export function CellContainer({ children }: CellContainer) {
  return <TextField className="input flex flex-row items-center rounded-none mx-2 px-1 border-gray-300">{children}</TextField>;
}

export default function TextCell({ height }: CellProps) {
  const [text, setText] = useState('');

  return (
    <CellContainer>
      <TextField className="flex items-center flex-row">
        <Label>1</Label>
        <Input className="w-full h-full pl-2" value={text} onChange={(e) => setText(e.target.value)} />
      </TextField>
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

function getValFromRef(valRef: string) {
  const [valHome, valIndexStr] = valRef.split('.');
  const valHomeClean = valHome.replace('@', '');
  const valIndex = parseInt(valIndexStr);
  const home = allHomes().find((home) => home.name === valHomeClean)
  if (!home) throw new Error(`No home found for val ${valRef}`)
  return home.cells.find((cell) => cell.id === valIndex);
}

function recursiveEval(valHome: string, val: string) {
  // step 1 -- get all of the references (valRefs), which begin with an @ symbol, so get all the @1 or @liam.2 or etc.
  const valRefs = getValRefs(val) ?? []; // [@andrew.1, ...]

  valRefs.forEach((valRef) => {
    // step 2 -- validate that each valRef is @<string>.<int> using regex. If not, error!
    validateValRef(valRef)
  });

  // step 3 -- fetch those reference's code from global store
  valRefs.forEach((valRef) => {
    const [valHome, valIndex] = valRef.split('.');
    const valHomeClean = valHome.replace('@', '');
    const valIndexClean = parseInt(valIndex);
  });

  // step 4 -- replace all of the references with the actual values by evaling them (this happens recursively)
  // step 5 -- eval this val
  // step 6 -- return the result of that eval
}


export function CodeCell({ height }: CellProps) {
  const [val, setVal] = useState('');
  const [error, setError] = useState(false);
  const [evalResult, setEvalResult] = useState('');

  useEffect(() => {

    try {
      const result = eval(val);
      setEvalResult(String(result));
      setError(false);
    } catch {
      setError(true);
    }
  }, [val]);

  return (
    <CellContainer>
      <TextField className={`flex items-center flex-row ${error ? 'text-red-500' : ''}`}>
        <Label>1</Label>
        <Input className="w-full h-full pl-2" value={val} onChange={(e) => setVal(e.target.value)} />
        {!error && <div>{evalResult}</div>}
        {error && <div>Error</div>}
      </TextField>
    </CellContainer>
  )
}

