// BMI評価（日本肥満学会基準）
export function assessBMI(bmi: number): string {
  if (bmi < 18.5) return '低体重';
  if (bmi < 25) return '普通体重';
  if (bmi < 30) return '肥満度1';
  if (bmi < 35) return '肥満度2';
  if (bmi < 40) return '肥満度3';
  return '肥満度4';
}

// 血清アルブミン評価
export function assessAlbumin(albumin: number): string {
  if (albumin >= 3.5) return '正常';
  if (albumin >= 3.0) return '軽度低下';
  if (albumin >= 2.5) return '中等度低下';
  return '重度低下';
}

// CONUT score（栄養評価スコア）
export function calculateCONUT(albumin: number, tlc: number, cholesterol: number): number {
  let score = 0;
  if (albumin >= 3.5) score += 0;
  else if (albumin >= 3.0) score += 2;
  else if (albumin >= 2.5) score += 4;
  else score += 6;

  if (tlc >= 1600) score += 0;
  else if (tlc >= 1200) score += 1;
  else if (tlc >= 800) score += 2;
  else score += 3;

  if (cholesterol >= 180) score += 0;
  else if (cholesterol >= 140) score += 1;
  else if (cholesterol >= 100) score += 2;
  else score += 3;

  return score;
}

export function calculateIdealBodyWeight(height: number): number {
  const h = height / 100;
  return 22 * h * h;
}

export function calculatePercentIBW(weight: number, height: number): number {
  const ibw = calculateIdealBodyWeight(height);
  return (weight / ibw) * 100;
}

export function getBMIColorClass(bmi?: number): string {
  if (bmi === undefined) return '';
  if (bmi < 18.5) return 'text-red-600';
  if (bmi < 25) return 'text-green-600';
  return 'text-orange-600';
}

export function getLabValueColorClass(type: string, value?: number): string {
  if (value === undefined) return '';
  if (type === 'albumin' && value < 3.5) return 'text-orange-600';
  return '';
}

export function calculateSGAScore(data: {
  weightLoss: number;
  dietaryIntake: number;
  giSymptoms: any;
  functionalCapacity: string;
  disease: string;
  physicalExam: string;
}): number {
  let score = 0;
  if (data.weightLoss <= -10) score += 2;
  else if (data.weightLoss <= -5) score += 1;

  if (data.dietaryIntake < 50) score += 2;
  else if (data.dietaryIntake < 75) score += 1;

  if (data.functionalCapacity === 'bedridden') score += 2;
  else if (data.functionalCapacity === 'limited') score += 1;

  if (data.physicalExam === 'severe') score += 2;
  else if (data.physicalExam === 'moderate') score += 1;

  return score;
}

export function getSGACategory(score: number): 'normal' | 'malnutrition-risk' | 'malnutrition' {
  if (score <= 2) return 'normal';
  if (score <= 5) return 'malnutrition-risk';
  return 'malnutrition';
}

export function getSGARecommendations(score: number): string[] {
  if (score <= 2) return ['経過観察'];
  if (score <= 5) return ['摂取量増加を検討', '体重モニタリング'];
  return ['集中的栄養サポートを検討', '医師に相談'];
}

export function calculateMNAScore(data: {
  bmi: number;
  weightLoss: number;
  mobility: string;
  psychologicalStress: boolean;
  neuropsychologicalProblems: boolean;
  medicationCount: number;
}): number {
  let score = 0;
  if (data.bmi < 19) score += 2;
  else if (data.bmi < 21) score += 1;

  if (data.weightLoss <= -3) score += 1;
  if (data.weightLoss <= -5) score += 2;

  if (data.mobility !== 'independent') score += 1;
  if (data.psychologicalStress) score += 2;
  if (data.neuropsychologicalProblems) score += 2;
  if (data.medicationCount > 3) score += 1;

  return score;
}

export function getMNACategory(score: number): 'normal' | 'malnutrition-risk' | 'malnutrition' {
  if (score < 8) return 'malnutrition';
  if (score < 11) return 'malnutrition-risk';
  return 'normal';
}

export function getMNARecommendations(score: number): string[] {
  if (score < 8) return ['至急栄養介入を実施'];
  if (score < 11) return ['栄養摂取量を増やす', '定期的に再評価'];
  return ['定期的なフォロー'];
}
