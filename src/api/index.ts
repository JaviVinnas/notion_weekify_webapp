import {useHorariosApi} from "./HorariosApi"

export default function useApi() {
  return {
      horarios: useHorariosApi()
  }
}

export * from "./types"