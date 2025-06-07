import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { AlertTriangle, Info, CheckCircle, Search, X, Pill, FlaskConical, ShieldAlert, Clock, Zap, Heart, Brain, Utensils } from './icons';

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
};

const medicationDatabase = [
  { id: 'warfarin', name: 'ワルファリン', category: '抗凝固薬' },
  { id: 'aspirin', name: 'アスピリン', category: '抗血小板薬' },
];

const interactionDatabase = [
  {
    items: ['vit-k', 'warfarin'],
    severity: 'major',
    type: 'antagonism',
    mechanism: 'ビタミンKはワルファリンの抗凝固作用を減弱させます',
    clinicalEffect: 'INRの低下、血栓症リスクの増加',
    recommendation: 'ビタミンK摂取量を一定に保つ',
  },
];

export default function SupplementInteractionChecker() {
  const [selectedSupplements, setSelectedSupplements] = useState<any[]>([]);
  const [selectedMedications, setSelectedMedications] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [interactions, setInteractions] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('selection');

  const allSupplements = [...supplementDatabase.vitamins, ...supplementDatabase.minerals];

  const filteredSupplements = allSupplements.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const toggleSupplement = (supp: any) => {
    setSelectedSupplements(prev => prev.find(s => s.id === supp.id) ? prev.filter(s => s.id !== supp.id) : [...prev, supp]);
  };

  const toggleMedication = (med: any) => {
    setSelectedMedications(prev => prev.find(m => m.id === med.id) ? prev.filter(m => m.id !== med.id) : [...prev, med]);
  };

  const checkInteractions = () => {
    const found: any[] = [];
    const allIds = [...selectedSupplements.map(s => s.id), ...selectedMedications.map(m => m.id)];
    for (let i = 0; i < allIds.length; i++) {
      for (let j = i + 1; j < allIds.length; j++) {
        const int = interactionDatabase.find(d => d.items.includes(allIds[i]) && d.items.includes(allIds[j]));
        if (int) {
          const item1 = [...allSupplements, ...medicationDatabase].find(x => x.id === allIds[i]);
          const item2 = [...allSupplements, ...medicationDatabase].find(x => x.id === allIds[j]);
          found.push({ ...int, item1Name: item1?.name, item2Name: item2?.name });
        }
      }
    }
    setInteractions(found);
    setActiveTab('results');
  };

  const getSeverityLabel = (sev: string) => sev === 'major' ? '重大' : '注意';

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div style={{ background: '#8b5cf6', color: 'white', padding: '1rem', borderRadius: '4px' }}>
        <h1 style={{ fontSize: '1.5rem' }}>サプリメント相互作用チェッカー</h1>
      </div>

      <Tabs defaultValue="selection" value={activeTab} onChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="selection">選択</TabsTrigger>
          <TabsTrigger value="results" >結果</TabsTrigger>
        </TabsList>

        <TabsContent value="selection">
          <Card>
            <CardHeader>
              <CardTitle>サプリメント</CardTitle>
            </CardHeader>
            <CardContent>
              <Input placeholder="検索..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <ScrollArea className="h-40">
                {filteredSupplements.map(s => (
                  <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                    <span>{s.name}</span>
                    <Button onClick={() => toggleSupplement(s)}>追加</Button>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>医薬品</CardTitle>
            </CardHeader>
            <CardContent>
              {medicationDatabase.map(m => (
                <div key={m.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.25rem 0' }}>
                  <span>{m.name}</span>
                  <Button onClick={() => toggleMedication(m)}>追加</Button>
                </div>
              ))}
            </CardContent>
          </Card>

          <Button onClick={checkInteractions}>相互作用をチェック</Button>
        </TabsContent>

        <TabsContent value="results">
          {interactions.length === 0 ? (
            <Alert>
              <AlertDescription>相互作用は見つかりませんでした</AlertDescription>
            </Alert>
          ) : (
            interactions.map((i, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <CardTitle>{i.item1Name} × {i.item2Name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{i.mechanism}</p>
                  <p>{i.recommendation}</p>
                  <Badge>{getSeverityLabel(i.severity)}</Badge>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
