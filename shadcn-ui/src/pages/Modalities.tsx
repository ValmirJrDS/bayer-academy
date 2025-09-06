import { useState, useMemo } from 'react';
import { Search, Plus, Edit, Trash2, Trophy, Users, DollarSign } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { sportModalities } from '@/data/authData';

export default function Modalities() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredModalities = useMemo(() => {
    return sportModalities.filter(modality => {
      const matchesSearch = modality.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          modality.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && modality.isActive) ||
                          (statusFilter === 'inactive' && !modality.isActive);
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleDeleteModality = (modalityId: string) => {
    if (confirm('Tem certeza que deseja excluir esta modalidade?')) {
      console.log('Deleting modality:', modalityId);
      // In a real app, this would call an API
    }
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Modalidades</h1>
            <p className="text-gray-400 mt-2">Gestão das modalidades esportivas oferecidas</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Modalidade
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total de Modalidades</p>
                  <p className="text-2xl font-bold text-white">{sportModalities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Trophy className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Modalidades Ativas</p>
                  <p className="text-2xl font-bold text-white">
                    {sportModalities.filter(m => m.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Receita Potencial</p>
                  <p className="text-2xl font-bold text-white">
                    {formatCurrency(
                      sportModalities
                        .filter(m => m.isActive)
                        .reduce((sum, m) => sum + (m.monthlyFee * m.maxStudents), 0)
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar por nome ou descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-gray-900 border-gray-700 text-white"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Todas</SelectItem>
              <SelectItem value="active">Ativas</SelectItem>
              <SelectItem value="inactive">Inativas</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Modalities Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredModalities.map((modality) => (
            <Card key={modality.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <Trophy className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{modality.name}</h3>
                      <p className="text-gray-400 text-sm">{modality.description}</p>
                    </div>
                  </div>
                  <StatusBadge status={modality.isActive ? 'active' : 'inactive'} />
                </div>

                <div className="space-y-3 mb-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm text-gray-400">Faixa Etária</label>
                      <p className="text-white font-medium">
                        {modality.ageGroup.min} - {modality.ageGroup.max} anos
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Mensalidade</label>
                      <p className="text-white font-medium">{formatCurrency(modality.monthlyFee)}</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Máx. Alunos</label>
                      <p className="text-white font-medium">{modality.maxStudents} alunos</p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Receita Máx.</label>
                      <p className="text-white font-medium">
                        {formatCurrency(modality.monthlyFee * modality.maxStudents)}
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm text-gray-400">Equipamentos</label>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {modality.equipment.slice(0, 3).map(equipment => (
                        <Badge key={equipment} variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          {equipment}
                        </Badge>
                      ))}
                      {modality.equipment.length > 3 && (
                        <Badge variant="outline" className="border-gray-600 text-gray-300 text-xs">
                          +{modality.equipment.length - 3}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                  >
                    <Edit className="h-4 w-4 mr-2" />
                    Editar
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteModality(modality.id)}
                    className="border-red-600 text-red-400 hover:bg-red-600/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Equipment Summary */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Resumo de Equipamentos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-white font-medium mb-3">Equipamentos por Modalidade:</h4>
                <div className="space-y-2">
                  {filteredModalities.filter(m => m.isActive).map(modality => (
                    <div key={modality.id} className="flex justify-between items-center">
                      <span className="text-gray-300">{modality.name}</span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {modality.equipment.length} itens
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Capacidade Total:</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Alunos (máximo)</span>
                    <Badge className="bg-green-600 text-white">
                      {sportModalities.filter(m => m.isActive).reduce((sum, m) => sum + m.maxStudents, 0)} alunos
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Receita Potencial</span>
                    <Badge className="bg-blue-600 text-white">
                      {formatCurrency(
                        sportModalities
                          .filter(m => m.isActive)
                          .reduce((sum, m) => sum + (m.monthlyFee * m.maxStudents), 0)
                      )}
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}