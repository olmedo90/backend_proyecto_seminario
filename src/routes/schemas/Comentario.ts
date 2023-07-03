import { Schema, Document, Mongoose } from 'mongoose';


export interface IComentarios extends Document {
  username: string;
  comentario: string;
}
const comentarioSchema: Schema = new Schema({
  username: { type: String, required: true },
  comentario: { type: String, required: true},
 
});
export const ComentarioModel = (mongoose: Mongoose) => {
  return mongoose.model<IComentarios>("Comentarios", comentarioSchema);
} 