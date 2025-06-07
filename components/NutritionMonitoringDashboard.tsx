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
