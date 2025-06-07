import { create } from 'zustand';

export interface PatientInfo {
  name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  diagnosis: string;
  admissionDate: string;
}

export interface Anthropometry {
  weight: number;
  height: number;
  bmi: number;
  ac: number;
  tsf: number;
  amc: number;
  weightChange: number;
  edema: string;
}

export interface LabData {
  albumin: number;
  prealbumin: number;
  transferrin: number;
  tlc: number;
  hemoglobin: number;
  creatinine: number;
  glucose: number;
  hba1c: number;
  sodium: number;
  potassium: number;
  cholesterol: number;
}

export interface IntakeData {
  energy: number;
  protein: number;
  energyAchievement: number;
  proteinAchievement: number;
}

interface PatientState {
  patientInfo: PatientInfo;
  anthropometry: Anthropometry;
  labData: LabData;
  intakeData: IntakeData;
  setPatientInfo: (info: PatientInfo) => void;
  setAnthropometry: (data: Anthropometry) => void;
  setLabData: (data: LabData) => void;
  setIntakeData: (data: IntakeData) => void;
}

const usePatientStore = create<PatientState>((set) => ({
  patientInfo: {
    name: '山田 太郎',
    age: 68,
    gender: 'male',
    height: 170,
    weight: 62,
    diagnosis: '慢性心不全、2型糖尿病',
    admissionDate: '2025-06-01',
  },
  anthropometry: {
    weight: 62,
    height: 170,
    bmi: 21.5,
    ac: 25,
    tsf: 8,
    amc: 22.5,
    weightChange: -3.2,
    edema: 'mild',
  },
  labData: {
    albumin: 3.2,
    prealbumin: 18,
    transferrin: 180,
    tlc: 1200,
    hemoglobin: 11.5,
    creatinine: 1.2,
    glucose: 145,
    hba1c: 7.2,
    sodium: 138,
    potassium: 4.2,
    cholesterol: 150,
  },
  intakeData: {
    energy: 1200,
    protein: 45,
    energyAchievement: 67,
    proteinAchievement: 63,
  },
  setPatientInfo: (info) => set({ patientInfo: info }),
  setAnthropometry: (data) => set({ anthropometry: data }),
  setLabData: (data) => set({ labData: data }),
  setIntakeData: (data) => set({ intakeData: data }),
}));

export default usePatientStore;
