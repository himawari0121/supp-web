import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { CheckCircle, FlaskConical, Brain, Zap } from './icons';
import { Search } from './icons';
import useSupplementStore from '../stores/useSupplementStore';

export default function SupplementSelectionTab() {
  const {
    supplementDatabase,
    selectedSupplements,
    searchTerm,
    setSearchTerm,
    toggleSupplement,
  } = useSupplementStore();
  const allSupplements = [
    ...supplementDatabase.vitamins,
    ...supplementDatabase.minerals,
    ...supplementDatabase.herbs,
    ...supplementDatabase.others,
  ];
  return (
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
                </div>
              </ScrollArea>
            </div>
          </CardContent>
        </Card>
      </div>
    </TabsContent>
  );
}
