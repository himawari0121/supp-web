import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Progress } from './ui/progress';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import {
  Calendar as CalendarIcon,
  Camera,
  Plus,
  Search,
  Utensils,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Apple,
  Coffee,
  Sandwich,
  Pizza,
  Fish,
  Salad,
  Cookie,
  Info,
  BarChart3,
  Target,
  Activity,
  Zap,
  Heart,
  Brain,
} from 'lucide-react';

// Food database
const foodDatabase = [
  { id: 'rice-150', name: '白米（茶碗1杯）', category: '主食', amount: 150, unit: 'g', nutrition: { energy: 252, protein: 3.8, fat: 0.5, carbs: 55.7, fiber: 0.5, salt: 0 }},
  { id: 'bread-60', name: '食パン（6枚切1枚）', category: '主食', amount: 60, unit: 'g', nutrition: { energy: 158, protein: 5.6, fat: 2.6, carbs: 28.0, fiber: 1.4, salt: 0.8 }},
  { id: 'udon-250', name: 'うどん（1玉）', category: '主食', amount: 250, unit: 'g', nutrition: { energy: 263, protein: 6.5, fat: 1.0, carbs: 52.5, fiber: 2.5, salt: 0.8 }},
  { id: 'chicken-100', name: '鶏むね肉（100g）', category: '主菜', amount: 100, unit: 'g', nutrition: { energy: 108, protein: 22.3, fat: 1.5, carbs: 0, fiber: 0, salt: 0.1 }},
  { id: 'salmon-80', name: '鮭（1切）', category: '主菜', amount: 80, unit: 'g', nutrition: { energy: 110, protein: 17.8, fat: 4.1, carbs: 0.1, fiber: 0, salt: 0.1 }},
  { id: 'tofu-150', name: '木綿豆腐（1/2丁）', category: '主菜', amount: 150, unit: 'g', nutrition: { energy: 108, protein: 9.9, fat: 6.3, carbs: 2.4, fiber: 0.6, salt: 0 }},
  { id: 'egg-50', name: '卵（1個）', category: '主菜', amount: 50, unit: 'g', nutrition: { energy: 76, protein: 6.2, fat: 5.2, carbs: 0.2, fiber: 0, salt: 0.2 }},
  { id: 'spinach-80', name: 'ほうれん草おひたし', category: '副菜', amount: 80, unit: 'g', nutrition: { energy: 16, protein: 1.8, fat: 0.3, carbs: 2.4, fiber: 2.2, salt: 0.5 }},
  { id: 'hijiki-50', name: 'ひじき煮', category: '副菜', amount: 50, unit: 'g', nutrition: { energy: 35, protein: 1.2, fat: 1.5, carbs: 4.5, fiber: 2.8, salt: 1.2 }},
  { id: 'salad-100', name: '野菜サラダ', category: '副菜', amount: 100, unit: 'g', nutrition: { energy: 25, protein: 1.0, fat: 0.2, carbs: 5.0, fiber: 2.0, salt: 0.3 }},
  { id: 'miso-soup', name: '味噌汁', category: '汁物', amount: 150, unit: 'ml', nutrition: { energy: 40, protein: 2.5, fat: 1.2, carbs: 5.0, fiber: 1.0, salt: 1.5 }},
  { id: 'milk-200', name: '牛乳（コップ1杯）', category: '飲み物', amount: 200, unit: 'ml', nutrition: { energy: 134, protein: 6.6, fat: 7.6, carbs: 9.6, fiber: 0, salt: 0.2 }},
  { id: 'orange-juice', name: 'オレンジジュース', category: '飲み物', amount: 200, unit: 'ml', nutrition: { energy: 82, protein: 1.4, fat: 0.2, carbs: 17.8, fiber: 0.4, salt: 0 }},
  { id: 'yogurt-100', name: 'ヨーグルト', category: '間食', amount: 100, unit: 'g', nutrition: { energy: 62, protein: 3.6, fat: 3.0, carbs: 4.9, fiber: 0, salt: 0.1 }},
  { id: 'banana-100', name: 'バナナ（1本）', category: '間食', amount: 100, unit: 'g', nutrition: { energy: 86, protein: 1.1, fat: 0.2, carbs: 22.5, fiber: 1.1, salt: 0 }},
];

const nutritionStandards = {
  energy: { value: 2650, unit: 'kcal' },
  protein: { value: 65, unit: 'g' },
  fat: { value: 73, unit: 'g' },
  carbs: { value: 381, unit: 'g' },
  fiber: { value: 21, unit: 'g' },
  salt: { value: 7.5, unit: 'g' },
};

const getMealIcon = (mealType: string) => {
  switch (mealType) {
    case 'breakfast':
      return <Coffee className="h-4 w-4" />;
    case 'lunch':
      return <Sandwich className="h-4 w-4" />;
    case 'dinner':
      return <Pizza className="h-4 w-4" />;
    case 'snack':
      return <Cookie className="h-4 w-4" />;
    default:
      return <Utensils className="h-4 w-4" />;
  }
};

export default function NutritionDiarySystem() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [mealRecords, setMealRecords] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('breakfast');
  const [weeklyData, setWeeklyData] = useState<any[]>([]);

  useEffect(() => {
    setMealRecords([
      {
        id: 1,
        date: new Date(),
        mealType: 'breakfast',
        time: '07:30',
        foods: [
          { ...foodDatabase[1], actualAmount: 60 },
          { ...foodDatabase[6], actualAmount: 50 },
          { ...foodDatabase[11], actualAmount: 200 },
        ],
      },
      {
        id: 2,
        date: new Date(),
        mealType: 'lunch',
        time: '12:00',
        foods: [
          { ...foodDatabase[0], actualAmount: 150 },
          { ...foodDatabase[3], actualAmount: 100 },
          { ...foodDatabase[9], actualAmount: 100 },
          { ...foodDatabase[10], actualAmount: 150 },
        ],
      },
    ]);

    setWeeklyData([
      { date: '6/2', energy: 2450, protein: 68 },
      { date: '6/3', energy: 2380, protein: 62 },
      { date: '6/4', energy: 2520, protein: 70 },
      { date: '6/5', energy: 2600, protein: 65 },
      { date: '6/6', energy: 2480, protein: 64 },
      { date: '6/7', energy: 2550, protein: 72 },
      { date: '6/8', energy: 1840, protein: 58 },
    ]);
  }, []);

  const filteredFoods = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const addFood = (food: any) => {
    const currentMeal = mealRecords.find(
      (meal) => meal.mealType === selectedMealType && meal.date.toDateString() === selectedDate.toDateString(),
    );

    if (currentMeal) {
      setMealRecords((prev) =>
        prev.map((meal) =>
          meal.id === currentMeal.id ? { ...meal, foods: [...meal.foods, { ...food, actualAmount: food.amount }] } : meal,
        ),
      );
    } else {
      setMealRecords((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: selectedDate,
          mealType: selectedMealType,
          time: new Date().toLocaleTimeString('ja-JP', { hour: '2-digit', minute: '2-digit' }),
          foods: [{ ...food, actualAmount: food.amount }],
        },
      ]);
    }
  };

  const calculateTodayNutrition = () => {
    const todayMeals = mealRecords.filter((meal) => meal.date.toDateString() === selectedDate.toDateString());

    const totals: any = { energy: 0, protein: 0, fat: 0, carbs: 0, fiber: 0, salt: 0 };
    todayMeals.forEach((meal) => {
      meal.foods.forEach((food: any) => {
        const ratio = food.actualAmount / food.amount;
        Object.keys(totals).forEach((key) => {
          totals[key] += food.nutrition[key] * ratio;
        });
      });
    });
    return totals;
  };

  const todayNutrition = calculateTodayNutrition();

  const calculateAchievementRate = (actual: number, standard: number) => Math.round((actual / standard) * 100);

  const calculatePFCBalance = () => {
    const totalEnergy = todayNutrition.energy || 1;
    const proteinEnergy = todayNutrition.protein * 4;
    const fatEnergy = todayNutrition.fat * 9;
    const carbsEnergy = todayNutrition.carbs * 4;
    return {
      protein: Math.round((proteinEnergy / totalEnergy) * 100),
      fat: Math.round((fatEnergy / totalEnergy) * 100),
      carbs: Math.round((carbsEnergy / totalEnergy) * 100),
    };
  };

  const pfcBalance = calculatePFCBalance();

  const getNutritionEvaluation = () => {
    const energyRate = calculateAchievementRate(todayNutrition.energy, nutritionStandards.energy.value);
    const proteinRate = calculateAchievementRate(todayNutrition.protein, nutritionStandards.protein.value);
    if (energyRate < 80) return { status: 'warning', message: 'エネルギー摂取量が不足しています' };
    if (energyRate > 120) return { status: 'warning', message: 'エネルギー摂取量が過剰です' };
    if (proteinRate < 80) return { status: 'warning', message: 'たんぱく質摂取量が不足しています' };
    if (todayNutrition.salt > nutritionStandards.salt.value) return { status: 'alert', message: '塩分摂取量が過剰です' };
    return { status: 'good', message: '栄養バランスは良好です' };
  };

  const evaluation = getNutritionEvaluation();

  const nutritionRadarData = [
    { subject: 'エネルギー', value: calculateAchievementRate(todayNutrition.energy, nutritionStandards.energy.value) },
    { subject: 'たんぱく質', value: calculateAchievementRate(todayNutrition.protein, nutritionStandards.protein.value) },
    { subject: '脂質', value: calculateAchievementRate(todayNutrition.fat, nutritionStandards.fat.value) },
    { subject: '炭水化物', value: calculateAchievementRate(todayNutrition.carbs, nutritionStandards.carbs.value) },
    { subject: '食物繊維', value: calculateAchievementRate(todayNutrition.fiber, nutritionStandards.fiber.value) },
  ];

  const pfcPieData = [
    { name: 'たんぱく質', value: pfcBalance.protein, color: '#3b82f6' },
    { name: '脂質', value: pfcBalance.fat, color: '#ef4444' },
    { name: '炭水化物', value: pfcBalance.carbs, color: '#10b981' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">食事記録・栄養分析システム</h1>
        <p className="text-green-100">日々の食事を記録し、栄養バランスを可視化</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>記録日の選択</span>
            <Badge variant="outline">
              {selectedDate.toLocaleDateString('ja-JP', { year: 'numeric', month: 'long', day: 'numeric' })}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate.toLocaleDateString('ja-JP')}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={selectedDate} onSelect={setSelectedDate} />
            </PopoverContent>
          </Popover>
        </CardContent>
      </Card>

      <Tabs defaultValue="record" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="record">食事記録</TabsTrigger>
          <TabsTrigger value="analysis">栄養分析</TabsTrigger>
          <TabsTrigger value="trend">推移グラフ</TabsTrigger>
          <TabsTrigger value="advice">アドバイス</TabsTrigger>
        </TabsList>

        <TabsContent value="record" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>食品を追加</CardTitle>
                <CardDescription>データベースから検索または手入力</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>食事タイプ</Label>
                  <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="breakfast">朝食</SelectItem>
                      <SelectItem value="lunch">昼食</SelectItem>
                      <SelectItem value="dinner">夕食</SelectItem>
                      <SelectItem value="snack">間食</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>食品検索</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="食品名で検索..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
                  </div>
                </div>
                {searchTerm && (
                  <div className="max-h-48 overflow-y-auto space-y-2 border rounded-lg p-2">
                    {filteredFoods.map((food) => (
                      <div key={food.id} className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer" onClick={() => { addFood(food); setSearchTerm(''); }}>
                        <div>
                          <p className="font-medium">{food.name}</p>
                          <p className="text-sm text-muted-foreground">{food.nutrition.energy}kcal / {food.amount}{food.unit}</p>
                        </div>
                        <Plus className="h-4 w-4" />
                      </div>
                    ))}
                  </div>
                )}
                <div className="pt-4 border-t">
                  <Label>写真から記録</Label>
                  <Button variant="outline" className="w-full mt-2">
                    <Camera className="mr-2 h-4 w-4" />
                    食事の写真を撮影
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>本日の食事記録</CardTitle>
                <CardDescription>{selectedDate.toLocaleDateString('ja-JP')}の記録</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['breakfast', 'lunch', 'dinner', 'snack'].map((mealType) => {
                    const meal = mealRecords.find(
                      (m) => m.mealType === mealType && m.date.toDateString() === selectedDate.toDateString(),
                    );
                    return (
                      <div key={mealType} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          {getMealIcon(mealType)}
                          <span className="font-semibold">
                            {mealType === 'breakfast' ? '朝食' : mealType === 'lunch' ? '昼食' : mealType === 'dinner' ? '夕食' : '間食'}
                          </span>
                          {meal && (
                            <Badge variant="outline" className="ml-auto">
                              {meal.time}
                            </Badge>
                          )}
                        </div>
                        {meal ? (
                          <div className="space-y-1">
                            {meal.foods.map((food: any, idx: number) => (
                              <div key={idx} className="flex justify-between text-sm">
                                <span>{food.name}</span>
                                <span className="text-muted-foreground">{food.nutrition.energy}kcal</span>
                              </div>
                            ))}
                            <div className="pt-2 border-t">
                              <div className="flex justify-between text-sm font-semibold">
                                <span>小計</span>
                                <span>{meal.foods.reduce((sum: number, food: any) => sum + food.nutrition.energy, 0)}kcal</span>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-sm text-muted-foreground">記録がありません</p>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">本日の合計</span>
                    <span className="text-2xl font-bold">{Math.round(todayNutrition.energy)}kcal</span>
                  </div>
                  <Progress value={calculateAchievementRate(todayNutrition.energy, nutritionStandards.energy.value)} className="mt-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analysis" className="space-y-6">
          <Alert variant={evaluation.status === 'good' ? 'default' : evaluation.status === 'alert' ? 'destructive' : 'default'}>
            {evaluation.status === 'good' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
            <AlertTitle>本日の栄養評価</AlertTitle>
            <AlertDescription>{evaluation.message}</AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>栄養素別摂取状況</CardTitle>
                <CardDescription>推奨量に対する達成率</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(nutritionStandards).map(([key, standard]) => {
                    const actual: any = (todayNutrition as any)[key];
                    const rate = calculateAchievementRate(actual, (standard as any).value);
                    return (
                      <div key={key}>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-sm font-medium">
                            {key === 'energy' ? 'エネルギー' : key === 'protein' ? 'たんぱく質' : key === 'fat' ? '脂質' : key === 'carbs' ? '炭水化物' : key === 'fiber' ? '食物繊維' : '食塩相当量'}
                          </span>
                          <span className="text-sm">{Math.round(actual)}{(standard as any).unit} / {(standard as any).value}{(standard as any).unit}</span>
                        </div>
                        <Progress value={Math.min(rate, 150)} className={rate > 100 && key === 'salt' ? 'bg-red-100' : ''} />
                        <p className="text-xs text-muted-foreground mt-1">達成率: {rate}%</p>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>栄養バランス</CardTitle>
                <CardDescription>5大栄養素のバランス</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <RadarChart data={nutritionRadarData}>
                    <PolarGrid />
                    <PolarAngleAxis dataKey="subject" />
                    <PolarRadiusAxis angle={90} domain={[0, 150]} />
                    <Radar name="達成率" dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                    <Tooltip />
                  </RadarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>PFCバランス</CardTitle>
                <CardDescription>たんぱく質・脂質・炭水化物の比率</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pfcPieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                      {pfcPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-500 rounded-full" />たんぱく質</span>
                    <span>{pfcBalance.protein}% (推奨: 13-20%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-full" />脂質</span>
                    <span>{pfcBalance.fat}% (推奨: 20-30%)</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2"><div className="w-3 h-3 bg-green-500 rounded-full" />炭水化物</span>
                    <span>{pfcBalance.carbs}% (推奨: 50-65%)</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>食事バランスガイド</CardTitle>
                <CardDescription>食品群別の摂取状況</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center"><Sandwich className="h-6 w-6 text-yellow-600" /></div>
                    <div className="flex-1"><p className="font-medium">主食</p><Progress value={75} className="mt-1" /></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"><Fish className="h-6 w-6 text-red-600" /></div>
                    <div className="flex-1"><p className="font-medium">主菜</p><Progress value={85} className="mt-1" /></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"><Salad className="h-6 w-6 text-green-600" /></div>
                    <div className="flex-1"><p className="font-medium">副菜</p><Progress value={60} className="mt-1" /></div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center"><Apple className="h-6 w-6 text-blue-600" /></div>
                    <div className="flex-1"><p className="font-medium">果物</p><Progress value={40} className="mt-1" /></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="trend" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>エネルギー摂取量の推移</CardTitle>
                <CardDescription>過去1週間の推移</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="energy" stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6' }} />
                    <Line type="monotone" dataKey={() => nutritionStandards.energy.value} stroke="#ef4444" strokeDasharray="5 5" name="推奨量" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>たんぱく質摂取量の推移</CardTitle>
                <CardDescription>過去1週間の推移</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={weeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="protein" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>週間サマリー</CardTitle>
              <CardDescription>過去7日間の栄養摂取状況</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Zap className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">2,483</p>
                  <p className="text-sm text-muted-foreground">平均エネルギー</p>
                  <p className="text-xs">kcal/日</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Heart className="h-8 w-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">66</p>
                  <p className="text-sm text-muted-foreground">平均たんぱく質</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Activity className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">94%</p>
                  <p className="text-sm text-muted-foreground">エネルギー達成率</p>
                </div>
                <div className="text-center p-4 bg-muted rounded-lg">
                  <Target className="h-8 w-8 mx-auto mb-2 text-orange-500" />
                  <p className="text-2xl font-bold">6/7</p>
                  <p className="text-sm text-muted-foreground">目標達成日数</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="advice" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>栄養アドバイス</CardTitle>
              <CardDescription>あなたの食事記録に基づく個別アドバイス</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold mb-2 flex items-center gap-2"><BarChart3 className="h-5 w-5" />総合評価</h3>
                <p className="text-sm">全体的な栄養バランスは良好ですが、食物繊維の摂取がやや不足しています。野菜や果物の摂取を増やすことをおすすめします。</p>
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-3">改善ポイント</h3>
                  <div className="space-y-3">
                    <Alert><Salad className="h-4 w-4" /><AlertTitle>野菜摂取を増やしましょう</AlertTitle><AlertDescription>1日の野菜摂取目標350gに対して、現在約200gです。毎食に野菜料理を1品追加することを心がけましょう。</AlertDescription></Alert>
                    <Alert><Apple className="h-4 w-4" /><AlertTitle>果物を取り入れましょう</AlertTitle><AlertDescription>果物の摂取が不足しています。間食として果物を選ぶことで、ビタミンや食物繊維を補給できます。</AlertDescription></Alert>
                    <Alert><Clock className="h-4 w-4" /><AlertTitle>食事時間を規則的に</AlertTitle><AlertDescription>朝食の時間が不規則です。毎日同じ時間に食事をとることで、体内リズムが整い、代謝も向上します。</AlertDescription></Alert>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">明日のおすすめメニュー</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><Coffee className="h-4 w-4" />朝食</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-1"><li>・全粒粉パン 2枚</li><li>・目玉焼き</li><li>・野菜サラダ</li><li>・ヨーグルト</li><li>・オレンジ 1/2個</li></ul></CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><Sandwich className="h-4 w-4" />昼食</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-1"><li>・玄米ご飯</li><li>・鮭の塩焼き</li><li>・ほうれん草のお浸し</li><li>・きのこの味噌汁</li><li>・りんご 1/4個</li></ul></CardContent></Card>
                    <Card><CardHeader><CardTitle className="text-base flex items-center gap-2"><Pizza className="h-4 w-4" />夕食</CardTitle></CardHeader><CardContent><ul className="text-sm space-y-1"><li>・雑穀ご飯</li><li>・鶏肉と野菜の炒め物</li><li>・ひじきの煮物</li><li>・豆腐とわかめの味噌汁</li></ul></CardContent></Card>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">今月の目標</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3"><CheckCircle className="h-5 w-5 text-green-500" /><span>毎日野菜を350g以上摂取する</span></div>
                    <div className="flex items-center gap-3"><Target className="h-5 w-5 text-blue-500" /><span>塩分摂取量を1日7g以下に抑える</span></div>
                    <div className="flex items-center gap-3"><Brain className="h-5 w-5 text-purple-500" /><span>週3回以上魚料理を取り入れる</span></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>最終更新: {new Date().toLocaleString('ja-JP')}</p>
            <p>管理栄養士監修</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
