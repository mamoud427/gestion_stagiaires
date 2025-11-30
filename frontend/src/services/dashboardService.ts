import api from "./api";

export interface DashboardStats {
  nbreStagiaire: number;
  nbreEncadrant: number;
  stageEnCours: number;
  stageTermine: number;
}

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get(`dashboard/stats`);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la récupération des statistiques :", error);
      throw error;
    }
  },
};