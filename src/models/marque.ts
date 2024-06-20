import { Schema, model, Document, Types } from 'mongoose';

interface IMarque extends Document {
  nom: string;
  pays?: string;
  siteWeb?: string;
  anneeCreation?: number;
  dateAjout: Date;
  flippers: Types.ObjectId[];
}

const MarqueSchema: Schema = new Schema({
  nom: { type: String, required: true },
  pays: { type: String },
  siteWeb: { type: String },
  anneeCreation: { type: Number },
  dateAjout: { type: Date, default: Date.now },
  flippers: [{ type: Schema.Types.ObjectId, ref: 'Flipper', required: false }],
});

const Marque = model<IMarque>('Marque', MarqueSchema);

export default Marque;
