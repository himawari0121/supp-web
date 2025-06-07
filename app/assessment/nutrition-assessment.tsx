"use client";

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  calculateSGAScore,
  getSGACategory,
  getSGARecommendations,
  calculateMNAScore,
  getMNACategory,
  getMNARecommendations,
  calculateIdealBodyWeight,
  calculatePercentIBW,
  getBMIColorClass,
  getLabValueColorClass,
} from '@/utils/nutrition-assessment';

interface NutritionAssessment {
  userId: string;
  assessmentDate: Date;
  nutritionStatus: 'normal' | 'malnutrition-risk' | 'malnutrition';
  assessmentType: 'SGA' | 'MNA' | 'MUST' | 'NRS2002';
  score: number;
  recommendations: string[];
}

export function NutritionAssessmentModule({ userId }: { userId: string }) {
  const [assessment, setAssessment] = useState<NutritionAssessment | null>(null);
  const [userData, setUserData] = useState<any>({
    height: 170,
    weight: 62,
    bmi: 21.5,
    labData: { albumin: 3.2, prealbumin: 18, tlc: 1200 },
    weightLoss: -3,
    dietaryIntake: 70,
    giSymptoms: 'none',
    functionalCapacity: 'normal',
    disease: 'none',
    physicalExam: 'normal',
    mobility: 'independent',
    psychologicalStress: false,
    neuropsychologicalProblems: false,
    medications: [],
  });

  // SGA (Subjective Global Assessment) の実装
  const performSGA = () => {
    const sgaScore = calculateSGAScore({
      weightLoss: userData.weightLoss,
      dietaryIntake: userData.dietaryIntake,
      giSymptoms: userData.giSymptoms,
      functionalCapacity: userData.functionalCapacity,
      disease: userData.disease,
      physicalExam: userData.physicalExam,
    });

    return {
      score: sgaScore,
      category: getSGACategory(sgaScore),
      recommendations: getSGARecommendations(sgaScore),
    };
  };

  // MNA (Mini Nutritional Assessment) の実装
  const performMNA = () => {
    const mnaScore = calculateMNAScore({
      bmi: userData.bmi,
      weightLoss: userData.weightLoss,
      mobility: userData.mobility,
      psychologicalStress: userData.psychologicalStress,
      neuropsychologicalProblems: userData.neuropsychologicalProblems,
      medicationCount: userData.medications.length,
    });

    return {
      score: mnaScore,
      category: getMNACategory(mnaScore),
      recommendations: getMNARecommendations(mnaScore),
    };
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>栄養アセスメント</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">身体計測値</h3>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt>身長:</dt>
                  <dd>{userData?.height} cm</dd>
                </div>
                <div className="flex justify-between">
                  <dt>体重:</dt>
                  <dd>{userData?.weight} kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt>BMI:</dt>
                  <dd className={getBMIColorClass(userData?.bmi)}>
                    {userData?.bmi?.toFixed(1)}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>理想体重:</dt>
                  <dd>{calculateIdealBodyWeight(userData?.height).toFixed(1)} kg</dd>
                </div>
                <div className="flex justify-between">
                  <dt>%IBW:</dt>
                  <dd>{calculatePercentIBW(userData?.weight, userData?.height).toFixed(1)}%</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold mb-2">生化学検査値</h3>
              <dl className="space-y-1">
                <div className="flex justify-between">
                  <dt>アルブミン:</dt>
                  <dd className={getLabValueColorClass('albumin', userData?.labData?.albumin)}>
                    {userData?.labData?.albumin} g/dL
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt>プレアルブミン:</dt>
                  <dd>{userData?.labData?.prealbumin} mg/dL</dd>
                </div>
                <div className="flex justify-between">
                  <dt>総リンパ球数:</dt>
                  <dd>{userData?.labData?.tlc} /μL</dd>
                </div>
              </dl>
            </div>
          </div>

          {assessment && (
            <Alert className="mt-4">
              <AlertDescription>
                <strong>栄養状態評価:</strong> {assessment.nutritionStatus}
                <br />
                <strong>推奨事項:</strong>
                <ul className="list-disc list-inside mt-2">
                  {assessment.recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
