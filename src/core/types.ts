export const cuatrimestres = ["Primero", "Segundo", "Anual"] as const;
export type Cuatrimestre = typeof cuatrimestres[number];

export const cursos = ["Primero", "Segundo", "Tercero", "Cuarto"] as const;
export type Curso = typeof cursos[number];

export const diasNoLaborables = ["Sábado", "Domingo"] as const;
export type DiaNoLaborable = typeof diasNoLaborables[number];

export const diasLaborables = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
] as const;
export type DiaLaborable = typeof diasLaborables[number];

export const diasDeLaSemana = [...diasLaborables, ...diasNoLaborables] as const;
export type DiaDeLaSemana = typeof diasDeLaSemana[number];

export interface Profesor {
    nombre: string;
}

export interface Asignatura {
  nombreCorto: string;
  teoricas: { profes: Profesor[]; activas: boolean; numero: number };
  practicas: { profes: Profesor[]; activas: boolean; numero: number };
}

export interface Hora{
  hora: number;
  minutos: number;
}

/**
 * Tipo de dato que identifica una clase del horario
 */
export interface Clase {
  duracion: { type: "fecha completa", start: Date; end: Date } | { type: "hora"; start: Hora; end: Hora };
  esPractica: boolean;
  esPresencial: boolean;
  ubicacion: string;
  asignatura: Asignatura;
}

export type Horario = Record<DiaLaborable, Clase[]>;



