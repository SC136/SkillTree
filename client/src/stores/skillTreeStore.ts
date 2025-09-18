import { create } from 'zustand';
import { SkillNode } from '@shared/types';

interface SkillTreeState {
  selectedNode: SkillNode | null;
  filter: string | null;
  showOnlyAvailable: boolean;
  
  // Actions
  setSelectedNode: (node: SkillNode | null) => void;
  setFilter: (filter: string | null) => void;
  setShowOnlyAvailable: (show: boolean) => void;
}

export const useSkillTreeStore = create<SkillTreeState>((set) => ({
  selectedNode: null,
  filter: null,
  showOnlyAvailable: false,
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  setFilter: (filter) => set({ filter }),
  setShowOnlyAvailable: (show) => set({ showOnlyAvailable: show }),
}));