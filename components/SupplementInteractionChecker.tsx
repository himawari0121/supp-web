import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import {
  AlertTriangle,
  Info,
  CheckCircle,
  Search,
  X,
  Pill,
  FlaskConical,
  ShieldAlert,
  Clock,
  Zap,
  Heart,
  Brain,
  Utensils,
} from './icons';

const supplementDatabase = {
  vitamins: [
    { id: 'vit-d', name: 'ビタミンD', category: 'vitamin', dosage: '1000-4000 IU/日' },
    { id: 'vit-c', name: 'ビタミンC', category: 'vitamin', dosage: '500-1000 mg/日' },
    { id: 'vit-e', name: 'ビタミンE', category: 'vitamin', dosage: '400 IU/日' },
    { id: 'vit-k', name: 'ビタミンK', category: 'vitamin', dosage: '90-120 μg/日' },
    { id: 'vit-b12', name: 'ビタミンB12', category: 'vitamin', dosage: '2.4 μg/日' },
    { id: 'folate', name: '葉酸', category: 'vitamin', dosage: '400 μg/日' },
  ],
  minerals: [
    { id: 'calcium', name: 'カルシウム', category: 'mineral', dosage: '1000-1200 mg/日' },
    { id: 'iron', name: '鉄', category: 'mineral', dosage: '8-18 mg/日' },
    { id: 'magnesium', name: 'マグネシウム', category: 'mineral', dosage: '310-420 mg/日' },
    { id: 'zinc', name: '亜鉛', category: 'mineral', dosage: '8-11 mg/日' },
    { id: 'selenium', name: 'セレン', category: 'mineral', dosage: '55 μg/日' },
  ],
  herbs: [
    { id: 'ginkgo', name: 'イチョウ葉', category: 'herb', dosage: '120-240 mg/日' },
    { id: 'ginseng', name: '高麗人参', category: 'herb', dosage: '200-400 mg/日' },
    { id: 'stjohns', name: 'セントジョーンズワート', category: 'herb', dosage: '300 mg×3回/日' },
    { id: 'echinacea', name: 'エキナセア', category: 'herb', dosage: '300-500 mg×3回/日' },
    { id: 'garlic', name: 'ニンニク', category: 'herb', dosage: '600-1200 mg/日' },
  ],
  others: [
    { id: 'omega3', name: 'オメガ3脂肪酸', category: 'other', dosage: '1-3 g/日' },
    { id: 'probiotics', name: 'プロバイオティクス', category: 'other', dosage: '1-10億CFU/日' },
    { id: 'coq10', name: 'コエンザイムQ10', category: 'other', dosage: '100-200 mg/日' },
    { id: 'glucosamine', name: 'グルコサミン', category: 'other', dosage: '1500 mg/日' },
  ],
};

const medicationDatabase = [
  { id: 'warfarin', name: 'ワルファリン', category: '抗凝固薬' },
  { id: 'aspirin', name: 'アスピリン', category: '抗血小板薬' },
  { id: 'metformin', name: 'メトホルミン', category: '糖尿病薬' },
  { id: 'levothyroxine', name: 'レボチロキシン', category: '甲状腺ホルモン' },
  { id: 'omeprazole', name: 'オメプラゾール', category: 'PPI' },
  { id: 'amlodipine', name: 'アムロジピン', category: 'Ca拮抗薬' },
  { id: 'atorvastatin', name: 'アトルバスタチン', category: 'スタチン' },
  { id: 'digoxin', name: 'ジゴキシン', category: '強心薬' },
];

const interactionDatabase = [
  {
    items: ['vit-k', 'warfarin'],
    severity: 'major',
    type: 'antagonism',
    mechanism: 'ビタミンKはワルファリンの抗凝固作用を減弱させます',
    clinicalEffect: 'INRの低下、血栓症リスクの増加',
    recommendation: 'ビタミンK摂取量を一定に保つ。INRモニタリングの強化',
    evidence: 'high',
  },
  {
    items: ['calcium', 'iron'],
    severity: 'moderate',
    type: 'absorption',
    mechanism: 'カルシウムは鉄の吸収を競合的に阻害します',
    clinicalEffect: '鉄の吸収率が30-50%低下',
    recommendation: '摂取時間を2時間以上あける',
    evidence: 'high',
  },
  {
    items: ['stjohns', 'digoxin'],
    severity: 'major',
    type: 'metabolism',
    mechanism: 'CYP3A4およびP-糖蛋白の誘導により薬剤の代謝が促進',
    clinicalEffect: 'ジゴキシン血中濃度の低下、治療効果の減弱',
    recommendation: '併用を避ける。代替のハーブを検討',
    evidence: 'high',
  },
  {
    items: ['vit-d', 'calcium'],
    severity: 'beneficial',
    type: 'synergism',
    mechanism: 'ビタミンDはカルシウムの腸管吸収を促進',
    clinicalEffect: 'カルシウム吸収率の向上',
    recommendation: '骨粗鬆症予防に有効な組み合わせ',
    evidence: 'high',
  },
  {
    items: ['omega3', 'aspirin'],
    severity: 'moderate',
    type: 'additive',
    mechanism: '両者とも血小板凝集を抑制',
    clinicalEffect: '出血リスクの増加',
    recommendation: '高用量での併用は注意。出血症状をモニタリング',
    evidence: 'moderate',
  },
  {
    items: ['magnesium', 'levothyroxine'],
    severity: 'moderate',
    type: 'absorption',
    mechanism: 'マグネシウムがレボチロキシンの吸収を阻害',
    clinicalEffect: '甲状腺ホルモンの効果減弱',
    recommendation: '摂取時間を4時間以上あける',
    evidence: 'moderate',
  },
];

export default function SupplementInteractionChecker() {
  const [selectedSupplements, setSelectedSupplements] = useState<any[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('selection');

  const allSupplements = [
    ...supplementDatabase.vitamins,
    ...supplementDatabase.minerals,
    ...supplementDatabase.herbs,
    ...supplementDatabase.others,
  ];

  const filteredSupplements = allSupplements.filter((supp) =>
    supp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleSupplement = (supp: any) => {
    setSelectedSupplements((prev) => {
      const exists = prev.find((s) => s.id === supp.id);
      return exists ? prev.filter((s) => s.id !== supp.id) : [...prev, supp];
    });
  };

  const toggleMedication = (med: any) => {
    setSelectedMedications((prev) => {
      const exists = prev.find((m) => m.id === med.id);
      return exists ? prev.filter((m) => m.id !== med.id) : [...prev, med];
    });
  };

  const checkInteractions = () => {
    const found: any[] = [];
    const allSelectedIds = [
      ...selectedSupplements.map((s) => s.id),
      ...selectedMedications.map((m) => m.id),
    ];
    for (let i = 0; i < allSelectedIds.length; i++) {
      for (let j = i + 1; j < allSelectedIds.length; j++) {
        const interaction = interactionDatabase.find(
          (int) =>
            int.items.includes(allSelectedIds[i]) && int.items.includes(allSelectedIds[j])
        );
        if (interaction) {
          const item1 = [...allSupplements, ...medicationDatabase].find(
            (item) => item.id === allSelectedIds[i]
          );
          const item2 = [...allSupplements, ...medicationDatabase].find(
            (item) => item.id === allSelectedIds[j]
          );
          found.push({
            ...interaction,
            item1Name: item1?.name || allSelectedIds[i],
            item2Name: item2?.name || allSelectedIds[j],
          });
        }
      }
    }
    if (selectedSupplements.length > 1) {
      const timingRecommendations = generateTimingRecommendations(selectedSupplements);
      found.push(...timingRecommendations);
    }
    setInteractions(found);
    setActiveTab('results');
  };

  const generateTimingRecommendations = (supplements: any[]) => {
    const recommendations: any[] = [];
    const fatSoluble = supplements.filter((s) => ['vit-d', 'vit-e', 'vit-k'].includes(s.id));
    if (fatSoluble.length > 1) {
      recommendations.push({
        severity: 'info',
        type: 'timing',
        item1Name: '脂溶性ビタミン',
        item2Name: fatSoluble.map((s) => s.name).join('、'),
        mechanism: '脂溶性ビタミンは食事と一緒に摂取すると吸収が向上',
        clinicalEffect: '吸収率の向上',
        recommendation: '脂質を含む食事と一緒に摂取',
        evidence: 'high',
      });
    }
    return recommendations;
  };

  const getSeverityInfo = (severity: string) => {
    switch (severity) {
      case 'major':
        return { icon: ShieldAlert, color: 'text-red-500', bgColor: 'bg-red-50 dark:bg-red-950', label: '重大' };
      case 'moderate':
        return { icon: AlertTriangle, color: 'text-orange-500', bgColor: 'bg-orange-50 dark:bg-orange-950', label: '中等度' };
      case 'minor':
        return { icon: Info, color: 'text-yellow-500', bgColor: 'bg-yellow-50 dark:bg-yellow-950', label: '軽度' };
      case 'beneficial':
        return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-50 dark:bg-green-950', label: '有益' };
      case 'info':
        return { icon: Info, color: 'text-blue-500', bgColor: 'bg-blue-50 dark:bg-blue-950', label: '情報' };
      default:
        return { icon: Info, color: 'text-gray-500', bgColor: 'bg-gray-50 dark:bg-gray-950', label: '情報' };
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'vitamin':
        return <Zap className="h-4 w-4" />;
      case 'mineral':
        return <FlaskConical className="h-4 w-4" />;
      case 'herb':
        return <Brain className="h-4 w-4" />;
      case 'other':
        return <Heart className="h-4 w-4" />;
      default:
        return <Pill className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-2">サプリメント相互作用チェッカー</h1>
        <p className="text-purple-100">エビデンスに基づく安全なサプリメント使用をサポート</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="selection">
            <span className="flex items-center gap-2">
              <Pill className="h-4 w-4" />
              選択
            </span>
          </TabsTrigger>
          <TabsTrigger value="results" disabled={interactions.length === 0}>
            <span className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4" />
              結果
            </span>
          </TabsTrigger>
          <TabsTrigger value="education">
            <span className="flex items-center gap-2">
              <Brain className="h-4 w-4" />
              教育
            </span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="selection" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>サプリメント選択</CardTitle>
                <CardDescription>服用中のサプリメントを選択してください</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="サプリメント名で検索..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>

                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Zap className="h-4 w-4" />
                          ビタミン
                        </h4>
                        <div className="space-y-2">
                          {supplementDatabase.vitamins
                            .filter((v) => v.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((vitamin) => (
                              <div
                                key={vitamin.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                  selectedSupplements.find((s) => s.id === vitamin.id)
                                    ? 'bg-purple-50 dark:bg-purple-950 border-purple-300'
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => toggleSupplement(vitamin)}
                              >
                                <div>
                                  <p className="font-medium">{vitamin.name}</p>
                                  <p className="text-sm text-muted-foreground">{vitamin.dosage}</p>
                                </div>
                                {selectedSupplements.find((s) => s.id === vitamin.id) && (
                                  <CheckCircle className="h-5 w-5 text-purple-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <FlaskConical className="h-4 w-4" />
                          ミネラル
                        </h4>
                        <div className="space-y-2">
                          {supplementDatabase.minerals
                            .filter((m) => m.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((mineral) => (
                              <div
                                key={mineral.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                  selectedSupplements.find((s) => s.id === mineral.id)
                                    ? 'bg-purple-50 dark:bg-purple-950 border-purple-300'
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => toggleSupplement(mineral)}
                              >
                                <div>
                                  <p className="font-medium">{mineral.name}</p>
                                  <p className="text-sm text-muted-foreground">{mineral.dosage}</p>
                                </div>
                                {selectedSupplements.find((s) => s.id === mineral.id) && (
                                  <CheckCircle className="h-5 w-5 text-purple-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Brain className="h-4 w-4" />
                          ハーブ・植物由来
                        </h4>
                        <div className="space-y-2">
                          {supplementDatabase.herbs
                            .filter((h) => h.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((herb) => (
                              <div
                                key={herb.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                  selectedSupplements.find((s) => s.id === herb.id)
                                    ? 'bg-purple-50 dark:bg-purple-950 border-purple-300'
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => toggleSupplement(herb)}
                              >
                                <div>
                                  <p className="font-medium">{herb.name}</p>
                                  <p className="text-sm text-muted-foreground">{herb.dosage}</p>
                                </div>
                                {selectedSupplements.find((s) => s.id === herb.id) && (
                                  <CheckCircle className="h-5 w-5 text-purple-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                          <Heart className="h-4 w-4" />
                          その他
                        </h4>
                        <div className="space-y-2">
                          {supplementDatabase.others
                            .filter((o) => o.name.toLowerCase().includes(searchTerm.toLowerCase()))
                            .map((other) => (
                              <div
                                key={other.id}
                                className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                                  selectedSupplements.find((s) => s.id === other.id)
                                    ? 'bg-purple-50 dark:bg-purple-950 border-purple-300'
                                    : 'hover:bg-muted'
                                }`}
                                onClick={() => toggleSupplement(other)}
                              >
                                <div>
                                  <p className="font-medium">{other.name}</p>
                                  <p className="text-sm text-muted-foreground">{other.dosage}</p>
                                </div>
                                {selectedSupplements.find((s) => s.id === other.id) && (
                                  <CheckCircle className="h-5 w-5 text-purple-600" />
                                )}
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>医薬品選択</CardTitle>
                <CardDescription>服用中の医薬品を選択してください（任意）</CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[480px] pr-4">
                  <div className="space-y-2">
                    {medicationDatabase.map((medication) => (
                      <div
                        key={medication.id}
                        className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                          selectedMedications.find((m) => m.id === medication.id)
                            ? 'bg-blue-50 dark:bg-blue-950 border-blue-300'
                            : 'hover:bg-muted'
                        }`}
                        onClick={() => toggleMedication(medication)}
                      >
                        <div>
                          <p className="font-medium">{medication.name}</p>
                          <p className="text-sm text-muted-foreground">{medication.category}</p>
                        </div>
                        {selectedMedications.find((m) => m.id === medication.id) && (
                          <CheckCircle className="h-5 w-5 text-blue-600" />
                        )}
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle>選択済みアイテム</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {selectedSupplements.map((supp) => (
                  <Badge key={supp.id} variant="secondary" className="pl-2">
                    {getCategoryIcon(supp.category)}
                    <span className="ml-1">{supp.name}</span>
                    <button onClick={() => toggleSupplement(supp)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
                {selectedMedications.map((med) => (
                  <Badge key={med.id} variant="outline" className="pl-2">
                    <Pill className="h-3 w-3" />
                    <span className="ml-1">{med.name}</span>
                    <button onClick={() => toggleMedication(med)} className="ml-2 hover:text-destructive">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
              {(selectedSupplements.length > 0 || selectedMedications.length > 0) && (
                <Button onClick={checkInteractions} className="w-full mt-4" size="lg">
                  相互作用をチェック
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="results" className="space-y-6">
          {interactions.length > 0 ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>相互作用チェック結果</CardTitle>
                  <CardDescription>
                    {interactions.filter((i) => i.severity === 'major').length > 0 ? (
                      <span className="text-red-600">
                        重大な相互作用が{interactions.filter((i) => i.severity === 'major').length}件見つかりました
                      </span>
                    ) : (
                      <span>合計{interactions.length}件の相互作用が見つかりました</span>
                    )}
                  </CardDescription>
                </CardHeader>
              </Card>
              <div className="space-y-4">
                {interactions
                  .sort((a, b) => {
                    const severityOrder: any = { major: 0, moderate: 1, minor: 2, beneficial: 3, info: 4 };
                    return severityOrder[a.severity] - severityOrder[b.severity];
                  })
                  .map((interaction, index) => {
                    const severityInfo = getSeverityInfo(interaction.severity);
                    const Icon = severityInfo.icon;
                    return (
                      <Card key={index} className={severityInfo.bgColor}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-3">
                              <Icon className={`h-6 w-6 ${severityInfo.color}`} />
                              {interaction.item1Name} × {interaction.item2Name}
                            </span>
                            <Badge variant={interaction.severity === 'major' ? 'destructive' : 'secondary'}>
                              {severityInfo.label}
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div>
                            <Label className="text-sm font-semibold">作用機序</Label>
                            <p className="text-sm mt-1">{interaction.mechanism}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-semibold">臨床的影響</Label>
                            <p className="text-sm mt-1">{interaction.clinicalEffect}</p>
                          </div>
                          <div>
                            <Label className="text-sm font-semibold">推奨事項</Label>
                            <Alert className="mt-2">
                              <AlertDescription>{interaction.recommendation}</AlertDescription>
                            </Alert>
                          </div>
                          {interaction.evidence && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <span>エビデンスレベル:</span>
                              <Badge variant="outline">
                                {interaction.evidence === 'high' ? '高' : interaction.evidence === 'moderate' ? '中' : '低'}
                              </Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
              </div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    推奨摂取スケジュール
                  </CardTitle>
                  <CardDescription>相互作用を最小限にする摂取タイミング</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">朝食時</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplements
                          .filter((s) => ['vit-d', 'vit-e', 'vit-k', 'omega3'].includes(s.id))
                          .map((supp) => (
                            <Badge key={supp.id} variant="secondary">
                              {supp.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">昼食時</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplements
                          .filter((s) => ['calcium', 'magnesium'].includes(s.id))
                          .map((supp) => (
                            <Badge key={supp.id} variant="secondary">
                              {supp.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">就寝前</div>
                      <div className="flex flex-wrap gap-2">
                        {selectedSupplements
                          .filter((s) => ['iron', 'zinc'].includes(s.id))
                          .map((supp) => (
                            <Badge key={supp.id} variant="secondary">
                              {supp.name}
                            </Badge>
                          ))}
                      </div>
                    </div>
                  </div>
                  <Alert className="mt-4">
                    <Utensils className="h-4 w-4" />
                    <AlertDescription>
                      脂溶性ビタミン（A、D、E、K）は脂質を含む食事と一緒に摂取すると吸収が向上します
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="pt-6">
                <div className="text-center py-8">
                  <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">相互作用は見つかりませんでした</h3>
                  <p className="text-muted-foreground">選択されたアイテム間に既知の相互作用はありません</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
        <TabsContent value="education" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>サプリメント相互作用について</CardTitle>
              <CardDescription>安全で効果的なサプリメント使用のための基礎知識</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">相互作用の種類</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="bg-red-100 dark:bg-red-900 p-2 rounded-full">
                      <ShieldAlert className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">拮抗作用</h4>
                      <p className="text-sm text-muted-foreground">一方が他方の効果を減弱させる（例：ビタミンK × ワルファリン）</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-orange-100 dark:bg-orange-900 p-2 rounded-full">
                      <AlertTriangle className="h-5 w-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">吸収阻害</h4>
                      <p className="text-sm text-muted-foreground">同時摂取により吸収が阻害される（例：カルシウム × 鉄）</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                      <Zap className="h-5 w-5 text-yellow-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">相加作用</h4>
                      <p className="text-sm text-muted-foreground">同様の作用が増強される（例：オメガ3 × アスピリン → 出血リスク）</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium">相乗作用</h4>
                      <p className="text-sm text-muted-foreground">互いに効果を高め合う（例：ビタミンD × カルシウム）</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">特に注意が必要なサプリメント</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Alert>
                    <Brain className="h-4 w-4" />
                    <AlertTitle>セントジョーンズワート</AlertTitle>
                    <AlertDescription>多くの医薬品の代謝を促進し、効果を減弱させる可能性があります</AlertDescription>
                  </Alert>
                  <Alert>
                    <Pill className="h-4 w-4" />
                    <AlertTitle>ビタミンK</AlertTitle>
                    <AlertDescription>抗凝固薬（ワルファリン）の効果を減弱させます</AlertDescription>
                  </Alert>
                  <Alert>
                    <Heart className="h-4 w-4" />
                    <AlertTitle>オメガ3脂肪酸（高用量）</AlertTitle>
                    <AlertDescription>抗血小板薬・抗凝固薬との併用で出血リスクが増加</AlertDescription>
                  </Alert>
                  <Alert>
                    <FlaskConical className="h-4 w-4" />
                    <AlertTitle>鉄サプリメント</AlertTitle>
                    <AlertDescription>多くのミネラルや医薬品の吸収を阻害する可能性があります</AlertDescription>
                  </Alert>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-3">安全な使用のためのガイドライン</h3>
                <ol className="space-y-2 list-decimal list-inside">
                  <li>医療従事者に全てのサプリメント使用を報告する</li>
                  <li>新しいサプリメントは1つずつ開始し、体調変化を観察する</li>
                  <li>推奨用量を守り、「多ければ良い」という考えは避ける</li>
                  <li>信頼できるメーカーの製品を選択する</li>
                  <li>定期的に必要性を見直し、不要なものは中止する</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <Card className="bg-muted/50">
        <CardContent className="pt-6">
          <p className="text-sm text-muted-foreground text-center">
            このツールは情報提供を目的としており、医療アドバイスの代替ではありません。
            具体的な使用については医療従事者にご相談ください。
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

