// src/domain/entities/member.ts
export interface Member {
  nombre: string;
  tipoId: string;
  numeroId: string; // identificador único de negocio
  email: string;
  celular?: string;
  barrio?: string;
  sexo?: string;
  poblacion?: string; // Jóven, adulto, niño
  estadoCivil?: string; // soltero, casado
  fechaNacimiento?: Date;
  tipoMiembro?: string; // líder, asistente, invitado
  bautizado?: string; // SI / NO
  fechaMembresia?: Date;
  ministerioId?: string; // referencia al ministerio
  estado?: string; // activo, inactivo
  ocupacion?: string;
  foto?: string; // URL
}
