import mongoose, { Schema, Document } from 'mongoose';

export interface ITransaction extends Document {
  numeroId: string;
  tipotrx: 'INGRESO' | 'EGRESO';
  concepto: string;
  valor: number;
  fecha: Date;
  fechaCreacion: Date;
  userId: string;
}

const TransactionSchema: Schema = new Schema({
  // referencia al documento Member (ObjectId). Se mantiene el nombre `numeroId`
  // por compatibilidad con la API, pero ahora es una referencia a la colección `Member`.
  numeroId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true, index: true },
  tipotrx: { type: String, enum: ['INGRESO', 'EGRESO'], required: true },
  concepto: { type: String, required: true },
  valor: { type: Number, required: true },
  fecha: { type: Date, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  userId: { type: String, required: true }
}, {
  collection: 'transactions'
});

export default mongoose.model<ITransaction>('Transaction', TransactionSchema);
