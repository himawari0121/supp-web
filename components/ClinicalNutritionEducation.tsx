import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Slider } from '@/components/ui/slider';
import {
  Heart,
  Brain,
  Utensils,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Info,
  Users,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
  ChevronRight,
  ChevronLeft,
  Pill,
  Apple,
  Droplets,
  Flame,
  Scale,
  Calculator,
  TargetIcon,
  Timer,
  Award,
  FileText,
  Download
} from '@/components/icons';

// 教育モジュールデータ
const educationModules = {
  diabetes: {
    title: '糖尿病の栄養管理',
    icon: Heart,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    topics: [
      '血糖値と食事の関係',
      'カーボカウンティング',
      '食品交換表の使い方',
      '低血糖の対処法'
    ]
  },
  hypertension: {
    title: '高血圧の栄養管理',
    icon: Activity,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    topics: [
      '減塩の重要性',
      'DASH食',
      '隠れ塩分を見つける',
      '外食時の工夫'
    ]
  },
  dyslipidemia: {
    title: '脂質異常症の栄養管理',
    icon: Droplets,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    topics: [
      'コレステロールと食事',
      '良い脂質・悪い脂質',
      '食物繊維の役割',
      '調理法の工夫'
    ]
  },
  renal: {
    title: '腎臓病の栄養管理',
    icon: Pill,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    topics: [
      'たんぱく質制限',
      'カリウム・リン制限',
      '水分管理',
      'エネルギー確保の工夫'
    ]
  }
};

// クイズデータ
const quizQuestions = {
  diabetes: [
    {
      question: '血糖値が最も上がりやすい栄養素はどれですか？',
      options: ['たんぱく質', '脂質', '炭水化物', 'ビタミン'],
      correct: 2,
      explanation: '炭水化物は消化吸収後、ブドウ糖となり血糖値を直接上昇させます。'
    },
    {
      question: '1単位（80kcal）のご飯の量は？',
      options: ['30g', '50g', '80g', '100g'],
      correct: 1,
      explanation: 'ご飯50g（茶碗約1/3杯）が1単位（80kcal）に相当します。'
    }
  ],
  hypertension: [
    {
      question: '高血圧の方の1日の塩分摂取目標は？',
      options: ['10g未満', '8g未満', '6g未満', '3g未満'],
      correct: 2,
      explanation: '日本高血圧学会では、高血圧の方は1日6g未満を推奨しています。'
    },
    {
      question: 'カリウムを多く含む食品は？',
      options: ['白米', 'バナナ', 'うどん', '食パン'],
      correct: 1,
      explanation: 'バナナはカリウムが豊富で、ナトリウムの排出を促進します。'
    }
  ]
};

export default function ClinicalNutritionEducation() {
  const [selectedModule, setSelectedModule] = useState('diabetes');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showQuizResults, setShowQuizResults] = useState(false);
  const [interactiveValues, setInteractiveValues] = useState({
    weight: 60,
    bloodSugar: 140,
    saltIntake: 8
  });

  // スライドショー自動再生
  useEffect(() => {
    if (isPlaying) {
      const timer = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % 4);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isPlaying, currentSlide]);

  // BMI計算
  const calculateBMI = (weight: number, height: number) => {
    const heightM = height / 100;
    return (weight / (heightM * heightM)).toFixed(1);
  };

  // エネルギー必要量計算
  const calculateEnergyNeeds = (weight: number, activityLevel: string = 'moderate') => {
    const factors: any = { low: 25, moderate: 30, high: 35 };
    return weight * factors[activityLevel];
  };

  // クイズの採点
  const checkQuizAnswers = () => {
    const questions = (quizQuestions as any)[selectedModule];
    let score = 0;
    questions.forEach((q: any, idx: number) => {
      if ((quizAnswers as any)[idx] === q.correct) score++;
    });
    setQuizScore(score);
    setShowQuizResults(true);
  };

  // 教材のダウンロード
  const downloadMaterial = (type: string) => {
    alert(`${type}教材をダウンロードします（実装例）`);
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      {/* ヘッダー */}
      <div className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">臨床栄養教育ツール</h1>
        <p className="text-indigo-100">エビデンスに基づく効果的な栄養指導をサポート</p>
      </div>

      {/* モジュール選択 */}
      <Card>
        <CardHeader>
          <CardTitle>教育モジュール選択</CardTitle>
          <CardDescription>疾患別の栄養教育コンテンツ</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(educationModules).map(([key, module]: any) => {
              const Icon = module.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedModule(key)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    selectedModule === key 
                      ? 'border-indigo-500 bg-indigo-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Icon />
                  <p className="text-sm font-medium">{module.title}</p>
                </button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* メインコンテンツ */}
      <Tabs defaultValue="presentation" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="presentation">
            <BookOpen /> 教材
          </TabsTrigger>
          <TabsTrigger value="interactive">
            <Calculator /> 体験型
          </TabsTrigger>
          <TabsTrigger value="quiz">
            <Brain /> クイズ
          </TabsTrigger>
          <TabsTrigger value="handouts">
            <FileText /> 配布資料
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Play /> 動画
          </TabsTrigger>
        </TabsList>
        {/* プレゼンテーションタブ */}
        <TabsContent value="presentation" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{educationModules[selectedModule].title}</span>
                <div className="flex gap-2">
                  <Button size="sm" onClick={() => setIsPlaying(!isPlaying)}>
                    {isPlaying ? <Pause /> : <Play />}
                  </Button>
                  <Button size="sm" onClick={() => setCurrentSlide(0)}>
                    <RotateCcw />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-white rounded-lg border-2 border-gray-200 p-8 min-h-[400px]">
                {/* スライド内容は省略（上記コード参照） */}
                <p>{educationModules[selectedModule].topics[currentSlide]}</p>
              </div>
              <div className="flex items-center justify-between mt-6">
                <Button onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))} disabled={currentSlide === 0}>
                  <ChevronLeft /> 前へ
                </Button>
                <div className="flex gap-2">
                  {[0,1,2,3].map(idx => (
                    <button key={idx} onClick={() => setCurrentSlide(idx)} className={`w-2 h-2 rounded-full ${currentSlide===idx?'bg-indigo-500':'bg-gray-300'}`}/>
                  ))}
                </div>
                <Button onClick={() => setCurrentSlide(Math.min(3, currentSlide + 1))} disabled={currentSlide===3}>
                  次へ <ChevronRight />
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 体験型学習タブ */}
        <TabsContent value="interactive" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>BMI計算機</CardTitle>
            </CardHeader>
            <CardContent>
              <Slider value={[interactiveValues.weight]} onValueChange={([v]) => setInteractiveValues({...interactiveValues, weight: v})} min={30} max={120} step={0.5} />
              <p>BMI: {calculateBMI(interactiveValues.weight, 170)}</p>
            </CardContent>
          </Card>
        </TabsContent>
        {/* クイズタブ */}
        <TabsContent value="quiz" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>理解度チェック</CardTitle>
            </CardHeader>
            <CardContent>
              {!showQuizResults ? (
                <>
                  {(quizQuestions as any)[selectedModule]?.map((q: any, idx: number) => (
                    <div key={idx}>
                      <p>{q.question}</p>
                      {q.options.map((o: string, i: number) => (
                        <label key={i}>
                          <input type="radio" name={`q${idx}`} value={i} onChange={() => setQuizAnswers({...quizAnswers, [idx]: i})} /> {o}
                        </label>
                      ))}
                    </div>
                  ))}
                  <Button onClick={checkQuizAnswers}>回答を確認</Button>
                </>
              ) : (
                <div>
                  <p>{quizScore} / {(quizQuestions as any)[selectedModule].length}正解</p>
                  <Button onClick={() => {setShowQuizResults(false); setQuizAnswers({}); setQuizScore(0);}}>もう一度</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        {/* 配布資料タブ */}
        <TabsContent value="handouts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>配布資料</CardTitle>
            </CardHeader>
            <CardContent>
              <Button onClick={() => downloadMaterial('資料')}>ダウンロード</Button>
            </CardContent>
          </Card>
        </TabsContent>
        {/* 動画タブ */}
        <TabsContent value="videos" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>動画ライブラリ</CardTitle>
            </CardHeader>
            <CardContent>
              <p>動画は今後追加予定です。</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>最終更新: 2025年6月8日</p>
            <p>日本栄養士会監修教材準拠</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
