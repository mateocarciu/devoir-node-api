import { Schema, model, Document, Types } from 'mongoose';

interface IFlipper extends Document {
  nom: string;
  marque: Types.ObjectId;
  anneeFabrication: number;
  description: string;
  images: string[];
  prix: number;
  etat: string;
  quantite: number;
  note: number;
  showQuantity: boolean;
  guidePdfPath: string;
  dateAjout: Date;
}

const FlipperSchema: Schema = new Schema({
  nom: { type: String, required: true },
  marque: { type: Schema.Types.ObjectId, ref: 'Marque', required: true },
  anneeFabrication: { type: Number, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  prix: { type: Number, required: true },
  etat: { type: String, required: true },
  quantite: { type: Number, required: true },
  note: { type: Number, required: true },
  showQuantity: { type: Boolean, required: true },
  guidePdfPath: { type: String, required: false },
  dateAjout: { type: Date, default: Date.now }
});

const Flipper = model<IFlipper>('Flipper', FlipperSchema);

export default Flipper;
