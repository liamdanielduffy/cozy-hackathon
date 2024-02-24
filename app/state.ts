import { create } from 'zustand'

export const useStore = create<GlobalState>(() => ({
  myHome: {
    name: 'andrew',
    emoji: '🥳',
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
    emoji: '🎉',
    cells: [
      {
        id: 1,
        type: 'code',
        value: '@andrew.1 + 2',
      },
      {
        id: 2,
        type: 'code',
        value: '@andrew.2 + 3',
      },
      {
        id: 3,
        type: 'code',
        value: '@andrew.3 + 4',
      },
      {
        id: 4,
        type: 'code',
        value: '@andrew.4 + 5',
      },
      {
        id: 5,
        type: 'code',
        value: '@andrew.5 + 6',
      },
      {
        id: 6,
        type: 'code',
        value: '@andrew.6 + 7',
      },
      {
        id: 7,
        type: 'code',
        value: '@andrew.7 + 8',
      },
      {
        id: 8,
        type: 'code',
        value: '@andrew.8 + 9',
      },
      {
        id: 9,
        type: 'code',
        value: '@andrew.9 + 10',
      },
      {
        id: 10,
        type: 'code',
        value: '@andrew.10 + 11',
      },
      {
        id: 11,
        type: 'code',
        value: '@andrew.11 + 12',
      },
    ],
  }],
}))

interface Cell {
  id: number; // integer
  type: 'text' | 'code';
  value: string;
}

export interface Home {
  name: string;
  emoji: string;
  cells: Cell[];
}

export interface GlobalState {
  myHome: Home;
  homes: Home[];
}

export function allHomes(globalState: GlobalState) {
  return [globalState.myHome, ...globalState.homes];
}