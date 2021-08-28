
export const cuatrimestres = ["Primero", "Segundo", "Anual"] as const;
export type Cuatrimestre = typeof cuatrimestres[number];

export const cursos = ["Primero", "Segundo", "Tercero", "Cuarto"] as const;
export type Curso = typeof cursos[number];

export const diasNoLaborables = ["Sábado", "Domingo"] as const;
export type DiaNoLaborable = typeof diasNoLaborables[number];

export const diasLaborables = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"] as const;
export type DiaLaborable = typeof diasLaborables[number];

export const diasDeLaSemana = [...diasLaborables, ...diasNoLaborables] as const;
export type DiaDeLaSemana = typeof diasDeLaSemana[number];
