import { create } from 'zustand'

function updateHome(state: GlobalState, homeName: string, newHomeProperties: Partial<Home>) {
  if (state.myHome.name === homeName) {
    return { ...state, myHome: { ...state.myHome, ...newHomeProperties } }
  }
  const newHomes = state.homes.map(h => h.name === homeName ? { ...h, ...newHomeProperties } : h)
  return { ...state, homes: newHomes }
}

function updateCellInHome(state: GlobalState, homeName: string, cellId: number, newCellProperties: Partial<Cell>) {
  const home = getHome(state, homeName)
  const newCells = home.cells.map(c => c.id === cellId ? { ...c, ...newCellProperties } : c)
  return updateHome(state, homeName, { cells: newCells })
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
    case 'draw':
      return {
        id: num,
        type: 'draw',
        value: ''
      }
    case 'val':
      return {
        id: num,
        type: 'val',
        value: ''
      }
    case 'map': {
      return {
        id: num,
        type: 'map',
        value: ''
      }
    }
    default:
      return {
        id: num,
        type: 'text',
        value: ''
      }
  }
}

export const useStore = create<GlobalState & { setHomeTheme: (theme: Theme, homeName: string) => void, addCell: (cellType: CellType, homeName: string) => void, setCellProperties: (homeName: string, cellId: number, newCellProperties: Partial<Cell>) => void }>(set => ({
  myHome: {
    theme: 'bumblebee',
    name: 'joce',
    emoji: '🥳',
    status: 'online',
    cells: [],
  },
  homes: [{
    name: 'liam',
    theme: 'synthwave',
    emoji: '🎉',
    status: 'dnd',
    cells: [],
  },
  {
    name: 'priya',
    theme: 'default',
    emoji: '🥰',
    status: 'offline',
    cells: [],
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
  },
  setCellProperties: (homeName: string, cellId: number, newCellProperties: Partial<Cell>) => {
    set((state: GlobalState) => {
      return updateCellInHome(state, homeName, cellId, newCellProperties)
    })
  }
}))

export type CellType = 'text' | 'code' | 'color' | 'draw' | 'val' | 'map'

export interface Cell {
  id: number; // integer
  type: CellType;
  value: string;
}

export const themes = ['default', 'retro', 'cupcake', 'cyberpunk', 'valentine', 'bumblebee', 'synthwave', 'nord'] as const;
export type Theme = typeof themes[number];
export type Status = 'online' | 'offline' | 'dnd';
export interface Home {
  name: string;
  emoji: string;
  status: Status;
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