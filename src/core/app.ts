import { dateMixer, Horario, hourPicker } from ".";
import { Clase, Cuatrimestre, Curso, Hora } from "./types";
import useApi, { asignaturasDefinition, profesoresDefinition, RowMapper } from "../api";

async function getAsignaturaById(
  id: string
): Promise<RowMapper<typeof asignaturasDefinition>> {
  const api = useApi();
    const asignaturas = await api.asignaturas.getAsignaturas();
    const selectedAsignatura = asignaturas.results.find((asignatura) => asignatura.id === id);
    if (!selectedAsignatura) throw new Error(`Asignatura con ID ${id} not found`);
    return selectedAsignatura;
}

async function getProfeById(
    id: string
): Promise<RowMapper<typeof profesoresDefinition>> {
    const api = useApi();
    const profes = await api.profesores.getProfesores();
    const selectedProfe = profes.results.find((profe) => profe.id === id);
    if (!selectedProfe) throw new Error(`Profesor con ID ${id} not found`);
    return selectedProfe;
}


export async function getHorarios(
  curso: Curso,
cuatrimestre: Cuatrimestre,
  weekDay?: Date, 
): Promise<void> {
  const api = useApi();
  const horarioRaw = await api.horarios.getHorario();
  const filteredClasesHorario = horarioRaw.results
    //filter by curso
    .filter((claseHorario) => {
      if (claseHorario.properties.Curso.rollup.type !== "array")
        throw new Error("El rollup de cursos no es un array");
      return claseHorario.properties.Curso.rollup.array.some((cursoRollup) => {
        if (cursoRollup.type !== "select")
          throw new Error("El rollup de cursos no es un select");
        return cursoRollup.select.id === curso;
      });
    })
    //filter by cuatrimestre
    .filter((claseHorario) => {
      if (claseHorario.properties.Cuatri.rollup.type !== "array")
        throw new Error("El rollup de cuatrimestre no es un select");
      return claseHorario.properties.Cuatri.rollup.array.some(
        (cuatrimestreRollup) => {
          if (cuatrimestreRollup.type !== "select")
            throw new Error("El rollup de cuatrimestre no es un select");
          return cuatrimestreRollup.select.id === cuatrimestre;
        }
      );
    });
  //transform the rows into class objects
    const clases: Clase[] = await Promise.all( filteredClasesHorario.map(async (claseHorario) => {
        const start = weekDay ? dateMixer(weekDay, new Date(claseHorario.properties.Duración.date.start)) : hourPicker(new Date(claseHorario.properties.Duración.date.start));
        const end = weekDay ? dateMixer(weekDay, new Date(claseHorario.properties.Duración.date.end)) : hourPicker(new Date(claseHorario.properties.Duración.date.end));
        const duracionMessage = start instanceof Date ? "fecha completa" : "hora" as const;
        const esPractica = claseHorario.properties.Práctica.checkbox;
        const esPresencial = claseHorario.properties.Presencial.checkbox;
        const ubicacion = claseHorario.properties.Ubicación.rich_text[0].plain_text ?? "(Sin ubicación)";
        const asignatura = await getAsignaturaById(claseHorario.properties.Asignatura.relation[0].id);
        const nombreCorto = asignatura.properties.Nombre.title[0].plain_text ?? "(Sin nombre)";
        const profesTeoricas = await Promise.all(asignatura.properties["Profe teóricas"].relation.map(async (profeId) => {
            const profePage = await getProfeById(profeId.id);
            const nombre = profePage.properties.Nombre.title[0].plain_text ?? "(Sin nombre)";
            return { nombre }
        }));
        const profePracticas = await Promise.all(asignatura.properties["Profe prácticas"].relation.map(async (profeId) => {
            const profePage = await getProfeById(profeId.id);
            const nombre = profePage.properties.Nombre.title[0].plain_text ?? "(Sin nombre)";
            return { nombre }
        }));
        const activasTeoricas = asignatura.properties["Activas teóricas"].checkbox;
        const activasPracticas = asignatura.properties["Activas prácticas"].checkbox;
        const numeroTeoricas = asignatura.properties["Número teóricas"].number;
        const numeroPrácticas = asignatura.properties["Número prácticas"].number;
        const clase: Clase = {
            duracion: { type: duracionMessage, start, end } as unknown as { type: "fecha completa", start: Date; end: Date } | { type: "hora"; start: Hora; end: Hora },
            esPractica,
            esPresencial,
            ubicacion,
            asignatura: {
                nombreCorto,
                practicas: { profes: profePracticas, activas: activasPracticas, numero: numeroPrácticas },
                teoricas: { profes: profesTeoricas, activas: activasTeoricas, numero: numeroTeoricas },
            }
        }
        return clase;

      
    }));
    //TODO: clasificar por días
}
