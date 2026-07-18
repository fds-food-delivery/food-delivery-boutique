import { create } from "zustand";

export const useUIStore = create<{
  openModalValidatedHandle: boolean;
  setOpenModalValidatedHandle: (v: boolean) => void;
  openModalErrorHandle: boolean;
  setOpenModalErrorHandle: (v: boolean) => void;
  openModalValiderHandle: boolean;
  setOpenModalValiderHandle: (v: boolean) => void;
  selectedPayment: string | null;
  setSelectedPayment: (v: string | null) => void;
  isModalOpen: boolean;
  modalChildren: any;
  setModalChildren: (v: any) => void;
  openModalHandle: (children: any) => void;
}>((set) => ({
  openModalValidatedHandle: false,
  setOpenModalValidatedHandle: (v) => set({ openModalValidatedHandle: v }),

  openModalErrorHandle: false,
  setOpenModalErrorHandle: (v) => set({ openModalErrorHandle: v }),

  openModalValiderHandle: false,
  setOpenModalValiderHandle: (v) => set({ openModalValiderHandle: v }),

  selectedPayment: null,
  setSelectedPayment: (v) => set({ selectedPayment: v }),

  isModalOpen: false,
  modalChildren: null,
  setModalChildren: (v) => set({ modalChildren: v }),

  openModalHandle: (children) => set({ isModalOpen: true, modalChildren: children }),
}));
