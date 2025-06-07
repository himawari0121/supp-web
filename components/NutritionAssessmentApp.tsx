import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AlertCircle, TrendingUp, TrendingDown, Activity, Heart, Brain, Utensils } from './icons';
import { calculateCONUT } from '../utils/nutrition-assessment';

export default function NutritionAssessmentApp() {
  const [patientInfo] = useState({
    name: '山田 太郎',
    age: 68,
    gender: 'male',
    height: 170,
    weight: 62,
    diagnosis: '慢性心不全、2型糖尿病',
    admissionDate: '2025-06-01',
  });

  const [anthropometry] = useState({
    weight: 62,
    height: 170,
    bmi: 21.5,
    weightChange: -3.2,
  });

  const [labData] = useState({
    albumin: 3.2,
    prealbumin: 18,
    tlc: 1200,
  });

  const [intakeData] = useState({
    energyAchievement: 67,
    proteinAchievement: 63,
  });

  const [assessment, setAssessment] = useState<any>(null);

  const calculateBMI = () => {
    const h = anthropometry.height / 100;
    return (anthropometry.weight / (h * h)).toFixed(1);
  };

  const calculateIBW = () => {
    const h = anthropometry.height / 100;
    return (22 * h * h).toFixed(1);
  };

  const calculatePercentIBW = () => {
    const ibw = Number(calculateIBW());
    return ((anthropometry.weight / ibw) * 100).toFixed(1);
  };

  const calculateSGA = () => {
    let score = 0;
    if (anthropometry.weightChange > -5) score += 0;
    else if (anthropometry.weightChange > -10) score += 1;
    else score += 2;

    if (intakeData.energyAchievement >= 75) score += 0;
    else if (intakeData.energyAchievement >= 50) score += 1;
    else score += 2;

    if (labData.albumin >= 3.5) score += 0;
    else if (labData.albumin >= 3.0) score += 1;
    else score += 2;

    if (score <= 2) return 'A: 栄養状態良好';
    else if (score <= 5) return 'B: 中等度栄養不良';
    else return 'C: 高度栄養不良';
  };

  const performAssessment = () => {
    const sga = calculateSGA();
    const conut = calculateCONUT(labData.albumin, labData.tlc, 150);
    setAssessment({ sga, conut });
  };

  useEffect(() => {
    performAssessment();
  }, []);

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div style={{ background: '#3b82f6', color: 'white', padding: '1rem', borderRadius: '4px' }}>
        <h1 style={{ fontSize: '1.5rem' }}>栄養アセスメント・管理システム</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>患者情報</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{patientInfo.name} / {patientInfo.age}歳 / {patientInfo.gender === 'male' ? '男性' : '女性'}</p>
          <p>{patientInfo.diagnosis}</p>
        </CardContent>
      </Card>

      <Tabs defaultValue="assessment">
        <TabsList>
          <TabsTrigger value="assessment">栄養評価</TabsTrigger>
          <TabsTrigger value="monitoring">モニタリング</TabsTrigger>
        </TabsList>
        <TabsContent value="assessment">
          <Card>
            <CardHeader>
              <CardTitle>身体計測</CardTitle>
            </CardHeader>
            <CardContent>
              <p>身長 {anthropometry.height} cm</p>
              <p>体重 {anthropometry.weight} kg</p>
              <p>BMI {calculateBMI()}</p>
              <p>理想体重 {calculateIBW()} kg</p>
              <p>%IBW {calculatePercentIBW()}%</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>栄養評価スコア</CardTitle>
            </CardHeader>
            <CardContent>
              {assessment && (
                <>
                  <p>SGA: {assessment.sga}</p>
                  <p>CONUT: {assessment.conut}</p>
                </>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="monitoring">
          <Alert>
            <AlertDescription>モニタリング機能は未実装です。</AlertDescription>
          </Alert>
        </TabsContent>
      </Tabs>
    </div>
  );
}
