import { create } from 'zustand'

function updateHome(state: GlobalState, homeName: string, newHomeProperties: Partial<Home>) {
  if (state.myHome.name === homeName) {
    return { ...state, myHome: { ...state.myHome, ...newHomeProperties } }
  }
  const newHomes = state.homes.map(h => h.name === homeName ? { ...h, ...newHomeProperties } : h)
  return { ...state, homes: newHomes }
}

function getHome(state: GlobalState, homeName: string): Home {
  if (state.myHome.name === homeName) return state.myHome
  const [home] = state.homes.filter(h => h.name === homeName)
  return home
}

function createCell(cell: CellType, num: number): Cell {
  switch (cell) {
    case 'text':
      return {
        id: num,
        type: 'text',
        value: ''
      }
    case 'code':
      return {
        id: num,
        type: 'code',
        value: ''
      }
    case 'color':
      return {
        id: num,
        type: 'color',
        value: ''
      }
    default:
      return {
        id: num,
        type: 'text',
        value: ''
      }
  }
}

export const useStore = create<GlobalState & { setHomeTheme: (theme: Theme, homeName: string) => void, addCell: (cellType: CellType, homeName: string) => void }>(set => ({
  myHome: {
    theme: 'light',
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
    theme: 'dark',
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
  addCell: (cellType, homeName) => {
    set((state: GlobalState) => {
      const home = getHome(state, homeName)
      const newCells = [...home.cells, createCell(cellType, home?.cells.length + 1)]
      const newHome = updateHome(state, homeName, { cells: newCells })
      return newHome
    })
  },
  setHomeTheme: (theme: Theme, homeName: string) => {
    set((state: GlobalState) => {
      const newHome = updateHome(state, homeName, { theme })
      // console.log(newHome)
      return newHome
    })
  }
}))

export type CellType = 'text' | 'code' | 'color'

export interface Cell {
  id: number; // integer
  type: CellType;
  value: string;
}

export const themes = ['light', 'dark', 'cupcake', 'bumblebee', 'emerald', 'corporate', 'synthwave', 'retro', 'cyberpunk', 'valentine', 'halloween', 'garden', 'forest', 'aqua', 'lofi', 'pastel', 'fantasy', 'wireframe', 'black', 'luxury', 'dracula', 'cmyk', 'autumn', 'business', 'acid', 'lemonade', 'night', 'coffee', 'winter', 'dim', 'nord', 'sunset'] as const;
export type Theme = typeof themes[number];
export interface Home {
  name: string;
  emoji: string;
  cells: Cell[];
  theme: Theme
}

export interface GlobalState {
  myHome: Home;
  homes: Home[];
}

export function allHomes(globalState: GlobalState) {
  return [globalState.myHome, ...globalState.homes];
}