import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './ui/tabs';
import { Activity, Brain, Utensils } from './icons';

export default function NutritionCarePlan() {
  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>栄養ケアプラン</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold mb-3">栄養診断 (PES)</h3>
              <div className="bg-gray-50 p-4 rounded">
                <p><strong>問題 (P):</strong> 不適切なたんぱく質摂取</p>
                <p><strong>原因 (E):</strong> 食欲不振および嚥下困難に関連した</p>
                <p><strong>徴候・症状 (S):</strong> 1ヶ月で5%の体重減少、血清アルブミン値3.0g/dL</p>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3">栄養必要量</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded">
                  <h4 className="font-semibold">エネルギー</h4>
                  <p className="text-2xl font-bold">1,800 kcal/日</p>
                  <p className="text-sm text-gray-600">30 kcal/kg/日</p>
                </div>
                <div className="bg-green-50 p-4 rounded">
                  <h4 className="font-semibold">たんぱく質</h4>
                  <p className="text-2xl font-bold">72 g/日</p>
                  <p className="text-sm text-gray-600">1.2 g/kg/日</p>
                </div>
              </div>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3">栄養介入計画</h3>
              <Tabs defaultValue="nutrition" className="w-full">
                <TabsList>
                  <TabsTrigger value="nutrition">栄養補給</TabsTrigger>
                  <TabsTrigger value="education">栄養教育</TabsTrigger>
                  <TabsTrigger value="counseling">カウンセリング</TabsTrigger>
                </TabsList>
                <TabsContent value="nutrition" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Utensils className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>心臓病食（塩分6g/日）＋たんぱく質強化</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>1日6回の少量頻回食</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Utensils className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>栄養補助食品の使用（200kcal/日）</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="education" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Brain className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>心不全における栄養管理の重要性</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>適切な塩分制限の方法</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Brain className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>高たんぱく質食品の選択と調理法</span>
                    </li>
                  </ul>
                </TabsContent>
                <TabsContent value="counseling" className="mt-4">
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>食事記録を用いた摂取量の自己モニタリング</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>段階的な目標設定と達成度の評価</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Activity className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <span>家族を含めた栄養サポート体制の構築</span>
                    </li>
                  </ul>
                </TabsContent>
              </Tabs>
            </section>
            <section>
              <h3 className="text-lg font-semibold mb-3">モニタリング計画</h3>
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2 text-left">項目</th>
                    <th className="border p-2 text-left">頻度</th>
                    <th className="border p-2 text-left">目標値</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">体重</td>
                    <td className="border p-2">週1回</td>
                    <td className="border p-2">0.5-1.0kg/週の増加</td>
                  </tr>
                  <tr>
                    <td className="border p-2">食事摂取量</td>
                    <td className="border p-2">毎日</td>
                    <td className="border p-2">目標量の80%以上</td>
                  </tr>
                  <tr>
                    <td className="border p-2">血清アルブミン</td>
                    <td className="border p-2">月1回</td>
                    <td className="border p-2">3.5 g/dL以上</td>
                  </tr>
                </tbody>
              </table>
            </section>
          </div>
          <p>ここに栄養ケアプランの内容が表示されます。</p>
        </CardContent>
      </Card>
    </div>
  );
}
