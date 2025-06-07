import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { Alert, AlertDescription } from './ui/alert';
import { TrendIndicator } from './TrendIndicator';

export default function NutritionMonitoringDashboard() {
  const [timeRange, setTimeRange] = useState('1month');
  const [monitoringData] = useState<any>({
    weightHistory: [
      { date: '5/1', weight: 65 },
      { date: '5/8', weight: 64.5 },
      { date: '5/15', weight: 64.1 },
      { date: '5/22', weight: 63.8 },
      { date: '5/29', weight: 63.0 },
      { date: '6/5', weight: 62.5 },
    ],
    intakeAchievement: [
      { nutrient: 'エネルギー', achievement: 90, target: 100 },
      { nutrient: 'たんぱく質', achievement: 85, target: 100 },
      { nutrient: '脂質', achievement: 92, target: 100 },
    ],
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>体重変化</CardTitle>
        </CardHeader>
        <CardContent>
          <LineChart width={400} height={300} data={monitoringData.weightHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="weight" stroke="#8884d8" name="体重 (kg)" />
          </LineChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>栄養摂取達成率</CardTitle>
        </CardHeader>
        <CardContent>
          <BarChart width={400} height={300} data={monitoringData.intakeAchievement}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="nutrient" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="achievement" fill="#8884d8" name="達成率 (%)" />
            <Bar dataKey="target" fill="#82ca9d" name="目標値 (100%)" />
          </BarChart>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>栄養関連検査値の推移</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">アルブミン</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold">3.8</span>
                <span className="text-sm text-gray-500 ml-1">g/dL</span>
                <TrendIndicator value={0.3} />
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-medium">プレアルブミン</span>
              <div className="flex items-center">
                <span className="text-2xl font-bold">25.2</span>
                <span className="text-sm text-gray-500 ml-1">mg/dL</span>
                <TrendIndicator value={2.1} />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>アラート・注意事項</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Alert variant="warning">
              <AlertDescription>
                カリウム値が上昇傾向です（5.2 mEq/L）。カリウム制限の強化を検討してください。
              </AlertDescription>
            </Alert>
            <Alert variant="info">
              <AlertDescription>
                次回の栄養評価予定日：2025年6月15日
              </AlertDescription>
            </Alert>
          </div>
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function NutritionMonitoringDashboard() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>栄養モニタリングダッシュボード</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ここにモニタリンググラフが表示されます。</p>
        </CardContent>
      </Card>
    </div>
  );
}
