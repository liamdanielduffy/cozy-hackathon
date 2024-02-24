
interface Cell {
  id: number; // integer
  type: 'text' | 'code';
  value: string;
}

interface Home {
  name: string;
  emoji: string;
  cells: Cell[];
}

interface GlobalState {
  myHome: Home;
  homes: Home[];
}

export function allHomes() {
  return [globalState.myHome, ...globalState.homes];
}

export const globalState: GlobalState = {
  myHome: {
    name: 'andrew',
    emoji: '🏠',
    cells: [
      {
        id: 1,
        type: 'code',
        value: '2+2',
      },
    ],
  },
  homes: [{
    name: 'liam',
    emoji: '🏠',
    cells: [
      {
        id: 1,
        type: 'code',
        value: '@andrew.1 + 2',
      },
    ],
  }],
};

