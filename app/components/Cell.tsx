
// make a react component which stores a text value inside itself as state
// and renders a div with that text valueimport {TextField, Label, Input} from 'react-aria-components';
import { TextField, Label, Input } from 'react-aria-components';
import { useState } from "react";

interface CellProps {
  height: number;
}

export default function Cell({ height }: CellProps) {
  const [text, setText] = useState('');

  return (
    <TextField className="input rounded-none flex flex-row items-center mx-2 px-1 border-gray-300">
      <Label>1</Label>
      <Input className="w-full h-full pl-2" value={text} onChange={(e) => setText(e.target.value)} />
    </TextField>
  )
}

