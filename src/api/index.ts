import {useHorariosApi} from "./HorariosApi"
import {useAsignaturasApi} from "./AsignaturasApi"
import { useProfesoresApi } from "./ProfesoresApi"

export default function useApi() {
  return {
    horarios: useHorariosApi(),
    asignaturas: useAsignaturasApi(),
    profesores: useProfesoresApi()
  }
}

export * from "./types"