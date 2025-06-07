import { Alert, AlertDescription } from './ui/alert';
import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Label } from './ui/label';
import { TabsContent } from './ui/tabs';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { TrendingDown, TrendingUp, AlertCircle } from './icons';
import usePatientStore from '../stores/usePatientStore';

interface Props {
  assessment: any;
  weightTrendData: any[];
  nutritionRadarData: any[];
  labTrendData: any[];
  calculateBMI: () => string;
  calculateIBW: () => string;
  calculatePercentIBW: () => string;
}

export default function AssessmentTab({
  assessment,
  weightTrendData,
  nutritionRadarData,
  labTrendData,
  calculateBMI,
  calculateIBW,
  calculatePercentIBW,
}: Props) {
  const { anthropometry, labData } = usePatientStore();
  return (
    <TabsContent value="assessment" className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">身体計測</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">身長</Label>
                <p className="text-xl font-semibold">{anthropometry.height}cm</p>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">体重</Label>
                <p className="text-xl font-semibold">{anthropometry.weight}kg</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="text-sm text-muted-foreground">BMI</Label>
                <p className="text-xl font-semibold">{calculateBMI()}</p>
                <Badge variant="outline" className="mt-1">
                  {calculateBMI() < 18.5 ? '低体重' : calculateBMI() < 25 ? '普通体重' : '肥満'}
                </Badge>
              </div>
              <div>
                <Label className="text-sm text-muted-foreground">理想体重</Label>
                <p className="text-xl font-semibold">{calculateIBW()} kg</p>
                <p className="text-sm text-muted-foreground">%IBW: {calculatePercentIBW()}%</p>
              </div>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">体重変化</Label>
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold">{anthropometry.weightChange} kg</p>
                {anthropometry.weightChange < 0 ? (
                  <TrendingDown className="h-5 w-5 text-red-500" />
                ) : (
                  <TrendingUp className="h-5 w-5 text-green-500" />
                )}
                <span className="text-sm text-muted-foreground">(1ヶ月)</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">栄養関連検査値</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm">アルブミン</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{labData.albumin}</span>
                  <span className="text-sm text-muted-foreground">g/dL</span>
                  {labData.albumin < 3.5 && <AlertCircle className="h-4 w-4 text-orange-500" />}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">プレアルブミン</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{labData.prealbumin}</span>
                  <span className="text-sm text-muted-foreground">mg/dL</span>
                  {labData.prealbumin < 20 && <AlertCircle className="h-4 w-4 text-orange-500" />}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">総リンパ球数</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{labData.tlc}</span>
                  <span className="text-sm text-muted-foreground">/μL</span>
                  {labData.tlc < 1500 && <AlertCircle className="h-4 w-4 text-orange-500" />}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">ヘモグロビン</span>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{labData.hemoglobin}</span>
                  <span className="text-sm text-muted-foreground">g/dL</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">栄養評価スコア</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assessment && (
              <>
                <div>
                  <Label className="text-sm text-muted-foreground">SGA評価</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={assessment.sga.includes('A') ? 'default' : assessment.sga.includes('B') ? 'secondary' : 'destructive'}>
                      {assessment.sga}
                    </Badge>
                  </div>
                </div>
                <div>
                  <Label className="text-sm text-muted-foreground">CONUTスコア</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-2xl font-bold">{assessment.conut.score}</span>
                    <Badge variant={assessment.conut.score <= 1 ? 'default' : assessment.conut.score <= 4 ? 'secondary' : 'destructive'}>
                      {assessment.conut.status}
                    </Badge>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">栄養必要量</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {assessment && (
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                  <Label className="text-sm text-muted-foreground">エネルギー</Label>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{assessment.energyNeeds}</p>
                  <p className="text-sm text-muted-foreground">kcal/日</p>
                </div>
                <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                  <Label className="text-sm text-muted-foreground">たんぱく質</Label>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">{assessment.proteinNeeds}</p>
                  <p className="text-sm text-muted-foreground">g/日</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {assessment && assessment.recommendations.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">推奨事項</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {assessment.recommendations.map((rec: any, index: number) => (
                <Alert key={index} variant={rec.type === 'alert' ? 'destructive' : 'default'}>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{rec.message}</AlertDescription>
                </Alert>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">体重推移</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weightTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">栄養摂取バランス</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <RadarChart data={nutritionRadarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar name="摂取率" dataKey="A" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">栄養指標の推移</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={labTrendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="albumin" stroke="#8b5cf6" name="アルブミン (g/dL)" strokeWidth={2} />
                <Line yAxisId="right" type="monotone" dataKey="prealbumin" stroke="#f59e0b" name="プレアルブミン (mg/dL)" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
