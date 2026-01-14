export interface Transaction {
  id?: string;
  numeroId: string; // referencia por número de identificación del miembro
  tipotrx: 'INGRESO' | 'EGRESO';
  concepto: string;
  valor: number;
  fecha: Date;
  fechaCreacion?: Date;
  userId: string; // id del usuario que creó el registro
}

export default Transaction;
