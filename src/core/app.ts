import { Horario } from ".";
import { Clase, Cuatrimestre, Curso } from "./types";
import useApi, { asignaturasDefinition, RowMapper } from "../api";

async function getAsignaturaById(
  id: string
): Promise<RowMapper<typeof asignaturasDefinition>> {
  const api = useApi();
  const asignaturas = api.asignaturas.getAsignaturas();
  return (await asignaturas).results.find((asignatura) => asignatura.id === id);
}

export async function getHorarios(
  curso: Curso,
  cuatrimestre: Cuatrimestre
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
}
