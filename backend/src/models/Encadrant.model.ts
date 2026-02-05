import mongoose, {Document, Schema} from "mongoose";
import bcrypt from "bcryptjs";

export interface IEncadrant extends Document {
    nom: string;
    prenom: string;
    email: string;
    password: string;
    telephone?: string;
    poste: string;
    role: "SuperAdmin" | "Admin" | "Encadreur";
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const EncadrantSchema = new Schema<IEncadrant>({
    nom: { type: String, required: true},
    prenom: {type: String, required: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true, minlength: 6 },  // le mdp doit avoir aumoins 6 caractères
    telephone: { type: String, required: false },
    poste: { type: String, required: true },
    role: { type: String, required: true, enum: ['SuperAdmin', 'Admin', 'Encadreur'], default: 'Encadreur' }
}, {
    timestamps: true
});

EncadrantSchema.pre<IEncadrant>('save', async function(next) {
  if (!this.isModified('password')) return next();
  // si le password commence par $2 (probablement déjà haché), on skip
  if (typeof this.password === 'string' && this.password.startsWith("$2")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


//  Fonction pour comparer le mot de passe
EncadrantSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, this.password);
}

export const EncadrantModel = mongoose.model<IEncadrant>("Encadrant", EncadrantSchema);