// src/models/member.model.ts
import mongoose, { Schema, Document } from 'mongoose';
import { Member } from '../domain/entities/member';

// 🔹 Interface que extiende Document, sin conflicto de 'id'
export interface MemberDocument extends Member, Document {}

// 🔹 Esquema
const MemberSchema = new Schema<MemberDocument>({
  nombre: { type: String, required: true },
  tipoId: { type: String, required: true },
  numeroId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  celular: { type: String },
  barrio: { type: String },
  sexo: { type: String },
  poblacion: { type: String },
  estadoCivil: { type: String },
  fechaNacimiento: { type: Date },
  tipoMiembro: { type: String },
  bautizado: { type: String },
  fechaMembresia: { type: Date },
  ministerioId: { type: mongoose.Schema.Types.ObjectId, ref: 'Ministerio' },
  estado: { type: String, default: 'activo' },
  ocupacion: { type: String },
  foto: { type: String }
}, { timestamps: true });

// 🔹 Exporta el modelo
export const MemberModel = mongoose.model<MemberDocument>('Member', MemberSchema);
