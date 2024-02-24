
// make a react component which stores a text value inside itself as state
// and renders a div with that text valueimport {TextField, Label, Input} from 'react-aria-components';
import { TextField, Label, Input } from 'react-aria-components';
import { useEffect, useState } from "react";

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


export function CodeCell({ height }: CellProps) {
  const [val, setVal] = useState('');
  const [error, setError] = useState(false);
  const [evalResult, setEvalResult] = useState('');

  useEffect(() => {

    // step 1 -- get all of the references (sub-vals), which begin with an @ symbol, so get all the @1 or @liam.2 or etc.
    // step 2 -- fetch those reference's code from global store
    // step 3 -- replace all of the references with the actual values by evaling them (this happens recursively)
    // step 4 -- eval this val
    // step 5 -- return the result of that eval

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

