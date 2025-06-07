import { useEffect, useState } from 'react';
import usePatientStore from '../stores/usePatientStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from './ui/tabs';
import { Badge } from './ui/badge';
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
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from 'recharts';
import {
  AlertCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  Heart,
  Brain,
  Utensils,
} from './icons';
import AssessmentTab from './AssessmentTab';

// 栄養アセスメントアプリケーション
export default function NutritionAssessmentApp() {
  const {
    patientInfo,
    anthropometry,
    labData,
    intakeData,
    setPatientInfo,
    setAnthropometry,
    setLabData,
    setIntakeData,
  } = usePatientStore();

  // patient information and related data are managed in the zustand store
  // so local state declarations are unnecessary here.

  const [assessment, setAssessment] = useState<any>(null);

  useEffect(() => {
    fetch('/api/patient')
      .then((res) => res.json())
      .then((data) => {
        setPatientInfo(data.patientInfo);
        setAnthropometry(data.anthropometry);
        setLabData(data.labData);
        setIntakeData(data.intakeData);
      })
      .catch(console.error);
  }, []);

  const calculateBMI = () => {
    const heightInM = anthropometry.height / 100;
    return (anthropometry.weight / (heightInM * heightInM)).toFixed(1);
  };

  const calculateIBW = () => {
    const heightInM = anthropometry.height / 100;
    return (22 * heightInM * heightInM).toFixed(1);
  };

  const calculatePercentIBW = () => {
    const ibw = parseFloat(calculateIBW());
    return ((anthropometry.weight / ibw) * 100).toFixed(1);
  };

  const calculateEnergyNeeds = () => {
    const bmr =
      patientInfo.gender === 'male'
        ? 66.47 + 13.75 * anthropometry.weight + 5.0 * anthropometry.height - 6.76 * patientInfo.age
        : 655.1 + 9.56 * anthropometry.weight + 1.85 * anthropometry.height - 4.68 * patientInfo.age;

    const activityFactor = 1.3;
    const stressFactor = 1.1;

    return Math.round(bmr * activityFactor * stressFactor);
  };

  const calculateProteinNeeds = () => {
    return Math.round(anthropometry.weight * 1.2);
  };

  const calculateSGA = () => {
    let score = 0;
    if (anthropometry.weightChange > -5) score += 0;
    else if (anthropometry.weightChange > -10) score += 1;
    else score += 2;

    if (intakeData.energyAchievement >= 75) score += 0;
    else if (intakeData.energyAchievement >= 50) score += 1;
    else score += 2;

    score += 0;
    score += 1;

    if (labData.albumin >= 3.5) score += 0;
    else if (labData.albumin >= 3.0) score += 1;
    else score += 2;

    if (score <= 2) return 'A: 栄養状態良好';
    else if (score <= 5) return 'B: 中等度栄養不良';
    else return 'C: 高度栄養不良';
  };

  const calculateCONUT = () => {
    let score = 0;
    if (labData.albumin >= 3.5) score += 0;
    else if (labData.albumin >= 3.0) score += 2;
    else if (labData.albumin >= 2.5) score += 4;
    else score += 6;

    if (labData.tlc >= 1600) score += 0;
    else if (labData.tlc >= 1200) score += 1;
    else if (labData.tlc >= 800) score += 2;
    else score += 3;

    if (labData.cholesterol >= 180) score += 0;
    else if (labData.cholesterol >= 140) score += 1;
    else if (labData.cholesterol >= 100) score += 2;
    else score += 3;

    if (score <= 1) return { score, status: '正常' };
    else if (score <= 4) return { score, status: '軽度栄養不良' };
    else if (score <= 8) return { score, status: '中等度栄養不良' };
    else return { score, status: '高度栄養不良' };
  };

  const performAssessment = () => {
    const sgaResult = calculateSGA();
    const conutResult = calculateCONUT();
    const energyNeeds = calculateEnergyNeeds();
    const proteinNeeds = calculateProteinNeeds();

    setAssessment({
      sga: sgaResult,
      conut: conutResult,
      energyNeeds,
      proteinNeeds,
      recommendations: generateRecommendations(),
    });
  };

  const generateRecommendations = () => {
    const recommendations: { type: string; message: string }[] = [];
    if (intakeData.energyAchievement < 75) {
      recommendations.push({
        type: 'warning',
        message: 'エネルギー摂取量が目標の75%未満です。栄養補助食品の使用を検討してください。',
      });
    }
    if (intakeData.proteinAchievement < 75) {
      recommendations.push({
        type: 'warning',
        message: 'たんぱく質摂取量が不足しています。高たんぱく質食品の摂取を増やしてください。',
      });
    }
    if (labData.albumin < 3.5) {
      recommendations.push({
        type: 'alert',
        message: '血清アルブミン値が低下しています。たんぱく質摂取の強化が必要です。',
      });
    }
    if (anthropometry.weightChange < -5) {
      recommendations.push({
        type: 'alert',
        message: '有意な体重減少を認めます。エネルギー・たんぱく質摂取の増加が必要です。',
      });
    }
    return recommendations;
  };

  const weightTrendData = [
    { date: '5/1', weight: 65.2 },
    { date: '5/8', weight: 64.8 },
    { date: '5/15', weight: 64.1 },
    { date: '5/22', weight: 63.5 },
    { date: '5/29', weight: 62.8 },
    { date: '6/5', weight: 62.0 },
  ];

  const nutritionRadarData = [
    { subject: 'エネルギー', A: intakeData.energyAchievement, fullMark: 100 },
    { subject: 'たんぱく質', A: intakeData.proteinAchievement, fullMark: 100 },
    { subject: '脂質', A: 85, fullMark: 100 },
    { subject: '炭水化物', A: 70, fullMark: 100 },
    { subject: 'ビタミン', A: 65, fullMark: 100 },
    { subject: 'ミネラル', A: 75, fullMark: 100 },
  ];

  const labTrendData = [
    { date: '4月', albumin: 3.5, prealbumin: 22 },
    { date: '5月', albumin: 3.3, prealbumin: 20 },
    { date: '6月', albumin: 3.2, prealbumin: 18 },
  ];

  useEffect(() => {
    performAssessment();
  }, []);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">栄養アセスメント・管理システム</h1>
        <p className="text-blue-100">エビデンスに基づく個別化栄養管理</p>
      </div>

      {/* 患者情報カード */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Heart className="h-5 w-5" />
            患者情報
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Label className="text-muted-foreground">氏名</Label>
              <p className="font-semibold">{patientInfo.name}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">年齢/性別</Label>
              <p className="font-semibold">
                {patientInfo.age}歳 / {patientInfo.gender === 'male' ? '男性' : '女性'}
              </p>
            </div>
            <div>
              <Label className="text-muted-foreground">診断名</Label>
              <p className="font-semibold text-sm">{patientInfo.diagnosis}</p>
            </div>
            <div>
              <Label className="text-muted-foreground">入院日</Label>
              <p className="font-semibold">{patientInfo.admissionDate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* メインコンテンツ - タブ形式 */}
      <Tabs defaultValue="assessment" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assessment">栄養評価</TabsTrigger>
          <TabsTrigger value="monitoring">モニタリング</TabsTrigger>
          <TabsTrigger value="planning">栄養計画</TabsTrigger>
          <TabsTrigger value="intervention">介入記録</TabsTrigger>
        </TabsList>
        <AssessmentTab
          assessment={assessment}
          weightTrendData={weightTrendData}
          nutritionRadarData={nutritionRadarData}
          labTrendData={labTrendData}
          calculateBMI={calculateBMI}
          calculateIBW={calculateIBW}
          calculatePercentIBW={calculatePercentIBW}
        />

        {/* 栄養計画タブ */}
        <TabsContent value="planning" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>個別栄養管理計画</CardTitle>
              <CardDescription>NCPに基づく栄養ケアプロセス</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">栄養診断 (PES)</h3>
                <div className="bg-muted p-4 rounded-lg space-y-2">
                  <p>
                    <strong>問題 (P):</strong> エネルギー・たんぱく質摂取量不足
                  </p>
                  <p>
                    <strong>原因 (E):</strong> 心不全による食欲不振および活動制限に関連した
                  </p>
                  <p>
                    <strong>徴候・症状 (S):</strong> 1ヶ月で5%の体重減少、摂取量は必要量の67%
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">栄養目標</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      1
                    </div>
                    <div>
                      <p className="font-medium">体重の維持・増加</p>
                      <p className="text-sm text-muted-foreground">2週間で0.5kg以上の体重増加</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      2
                    </div>
                    <div>
                      <p className="font-medium">栄養摂取量の改善</p>
                      <p className="text-sm text-muted-foreground">エネルギー・たんぱく質摂取量を必要量の80%以上に</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-semibold">
                      3
                    </div>
                    <div>
                      <p className="font-medium">栄養指標の改善</p>
                      <p className="text-sm text-muted-foreground">血清アルブミン値3.5g/dL以上を目標</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* 介入記録タブ */}
        <TabsContent value="intervention" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>栄養介入記録</CardTitle>
              <CardDescription>SOAPに基づく経過記録</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">2025年6月8日 14:30</h4>
                    <Badge>栄養指導実施</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>S (主観的情報):</strong> 「最近少しずつ食べられるようになってきた。栄養補助食品は飲みやすい」
                    </p>
                    <p>
                      <strong>O (客観的情報):</strong> 体重62.0kg（前回比+0.2kg）、食事摂取量70%、栄養補助食品200ml/日摂取
                    </p>
                    <p>
                      <strong>A (評価):</strong> エネルギー摂取量は改善傾向。体重減少は停止。継続的な栄養サポートが必要
                    </p>
                    <p>
                      <strong>P (計画):</strong> 現行の栄養管理を継続。来週再評価予定。摂取量80%を目標に段階的に増量
                    </p>
                  </div>
                </div>

                <div className="border rounded-lg p-4 opacity-75">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="font-semibold">2025年6月5日 10:00</h4>
                    <Badge variant="outline">初回評価</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <p>
                      <strong>S:</strong> 「食欲がなく、少し食べると満腹になる」
                    </p>
                    <p>
                      <strong>O:</strong> 体重61.8kg、BMI 21.4、食事摂取量50-60%
                    </p>
                    <p>
                      <strong>A:</strong> 中等度栄養不良リスク。エネルギー・たんぱく質摂取不足
                    </p>
                    <p>
                      <strong>P:</strong> 栄養補助食品導入、少量頻回食への変更、栄養指導実施
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Button className="w-full">
                  <span className="mr-2">＋</span>
                  新規記録を追加
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>最終更新: 2025年6月8日 14:30</p>
            <p>担当管理栄養士: 佐藤 花子</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
