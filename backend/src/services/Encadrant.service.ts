import { EncadrantModel, IEncadrant } from "../models/Encadrant.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export class EncadrantService {

    // fonction pour créer un encadrant
    async createEncadrant(data: Partial<IEncadrant & { password: string}>){
        if (!data.password) throw new Error("Le mot de passe est requis.");

        const hashedPassword = await bcrypt.hash(data.password, 10);
        const encadrant = new EncadrantModel({
            ...data,
            password: hashedPassword,
        });
        return await encadrant.save();
    } 

    // Login encadrant
    async login(email: string, password: string) {
        const encadrant = await EncadrantModel.findOne({ email});
        if (!encadrant) throw new Error("Encadreur non trouvé.");

        const isMatch = await bcrypt.compare(password, encadrant.password);
        if (!isMatch) throw new Error("Mot de passe incorrect.");

        const token = jwt.sign(
            { id: encadrant._id, role: encadrant.role},
            process.env.JWT_SECRET!,
            { expiresIn: "1d" }
        );

        return {
            token,
            encadrant};
    }

    // Récupérer tous les encadreurs
    async getAllEncadrants(): Promise<IEncadrant[]> {
        return await EncadrantModel.find().sort({ createdAt: -1 });
    }

    // Récupérer un encadreur par ID
    async getEncadrantById(id: string): Promise<IEncadrant | null> {
        return await EncadrantModel.findById(id);
    }

    // modifier les infos d'un encadreur
    async updateEncadrant(id: string, data: Partial<IEncadrant>): Promise<IEncadrant | null> {
        return await EncadrantModel.findByIdAndUpdate(id, data, { new: true });
    }

    // Supprimer un encadeur
    async deleteEncadrant(id: string): Promise<IEncadrant | null> {
        return await EncadrantModel.findByIdAndDelete(id);
    }

    // création d'un super Admin
    async createSuperAdmin(data: {
    nom: string;
    prenom: string;
    email: string;
    telephone?: string;
    poste: string;
    password: string;
    }) {
    const existing = await EncadrantModel.findOne({ role: "SuperAdmin" });
    if (existing) throw new Error("Super Admin existe déjà");

    const superAdmin = new EncadrantModel({
        ...data,
        role: "SuperAdmin",
    });

    return await superAdmin.save();
    }

}
