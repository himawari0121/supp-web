import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export default function NutritionCarePlan() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>栄養ケアプラン</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ここに栄養ケアプランの内容が表示されます。</p>
        </CardContent>
      </Card>
    </div>
  );
}
