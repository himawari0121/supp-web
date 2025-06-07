import { create } from 'zustand';

interface SupplementDatabase {
  vitamins: any[];
  minerals: any[];
  herbs: any[];
  others: any[];
}

interface SupplementState {
  supplementDatabase: SupplementDatabase;
  medicationDatabase: any[];
  interactionDatabase: any[];
  selectedSupplements: any[];
  selectedMedications: any[];
  searchTerm: string;
  interactions: any[];
  activeTab: string;
  setDatabases: (supp: SupplementDatabase, meds: any[], ints: any[]) => void;
  toggleSupplement: (supp: any) => void;
  toggleMedication: (med: any) => void;
  setSearchTerm: (term: string) => void;
  setActiveTab: (tab: string) => void;
  setInteractions: (data: any[]) => void;
}

const useSupplementStore = create<SupplementState>((set) => ({
  supplementDatabase: { vitamins: [], minerals: [], herbs: [], others: [] },
  medicationDatabase: [],
  interactionDatabase: [],
  selectedSupplements: [],
  selectedMedications: [],
  searchTerm: '',
  interactions: [],
  activeTab: 'selection',
  setDatabases: (supp, meds, ints) =>
    set({ supplementDatabase: supp, medicationDatabase: meds, interactionDatabase: ints }),
  toggleSupplement: (supp) =>
    set((state) => {
      const exists = state.selectedSupplements.find((s) => s.id === supp.id);
      return {
        selectedSupplements: exists
          ? state.selectedSupplements.filter((s) => s.id !== supp.id)
          : [...state.selectedSupplements, supp],
      };
    }),
  toggleMedication: (med) =>
    set((state) => {
      const exists = state.selectedMedications.find((m) => m.id === med.id);
      return {
        selectedMedications: exists
          ? state.selectedMedications.filter((m) => m.id !== med.id)
          : [...state.selectedMedications, med],
      };
    }),
  setSearchTerm: (term) => set({ searchTerm: term }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setInteractions: (data) => set({ interactions: data }),
}));

export default useSupplementStore;
