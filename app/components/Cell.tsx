
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
  const [text, setText] = useState('');
  const [error, setError] = useState(false);
  const [evalResult, setEvalResult] = useState('');

  useEffect(() => {
    try {
      const result = eval(text);
      setEvalResult(String(result));
      setError(false);
    } catch {
      setError(true);
    }
  }, [text]);

  return (
    <CellContainer>
      <TextField className={`flex items-center flex-row ${error ? 'text-red-500' : ''}`}>
        <Label>1</Label>
        <Input className="w-full h-full pl-2" value={text} onChange={(e) => setText(e.target.value)} />
        {!error && <div>{evalResult}</div>}
        {error && <div>Error</div>}
      </TextField>
    </CellContainer>
  )
}

