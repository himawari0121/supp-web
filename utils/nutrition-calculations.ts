// Harris-Benedict式（日本人版）による基礎代謝量計算
export function calculateBMR(gender: 'male' | 'female', weight: number, height: number, age: number): number {
  if (gender === 'male') {
    return 66.47 + (13.75 * weight) + (5.0 * height) - (6.76 * age);
  } else {
    return 655.1 + (9.56 * weight) + (1.85 * height) - (4.68 * age);
  }
}

// 活動係数
export function getActivityFactor(activityLevel: string): number {
  const factors: Record<string, number> = {
    bedrest: 1.2,
    sedentary: 1.3,
    light: 1.5,
    moderate: 1.7,
    heavy: 1.9,
  };
  return factors[activityLevel] ?? 1.3;
}

// ストレス係数（疾患別）
export function getStressFactor(condition: string): number {
  const factors: Record<string, number> = {
    normal: 1.0,
    minorSurgery: 1.1,
    majorSurgery: 1.2,
    mildInfection: 1.2,
    severeInfection: 1.5,
    burns: 2.0,
  };
  return factors[condition] ?? 1.0;
}

// たんぱく質必要量計算
export function calculateProteinNeeds(condition: string, weight: number): number {
  const proteinFactors: Record<string, number> = {
    healthy: 0.8,
    elderly: 1.0,
    mildStress: 1.2,
    moderateStress: 1.5,
    severeStress: 2.0,
    renalFailure: 0.6,
    dialysis: 1.2,
  };
  return weight * (proteinFactors[condition] ?? 0.8);
}

// 水分必要量計算
export function calculateFluidNeeds(weight: number, age: number): number {
  if (age < 65) {
    return weight * 35; // mL/day
  } else {
    return weight * 30; // mL/day (高齢者は少なめ)
  }
}
