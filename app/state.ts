
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

const globalState: GlobalState = {
  myHome: {
    name: 'Home',
    emoji: '🏠',
    cells: [
      {
        id: 1,
        type: 'text',
        value: 'Hello, world!',
      },
    ],
  },
  homes: [],
};

