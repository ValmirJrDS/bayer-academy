import { useState, useMemo } from 'react';
import { Search, Filter, Users, Phone, Mail, MapPin, Plus, Edit, Trash2 } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { teachers } from '@/data/authData';
import { Teacher } from '@/types/auth';

export default function Teachers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = useMemo(() => {
    return teachers.filter(teacher => {
      const matchesSearch = teacher.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          teacher.nickname.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'active' && teacher.isActive) ||
                          (statusFilter === 'inactive' && !teacher.isActive);
      const matchesSport = sportFilter === 'all' || teacher.sports.includes(sportFilter);
      return matchesSearch && matchesStatus && matchesSport;
    });
  }, [searchTerm, statusFilter, sportFilter]);

  const uniqueSports = Array.from(new Set(teachers.flatMap(t => t.sports)));

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Professores</h1>
            <p className="text-gray-400 mt-2">Gestão do corpo docente da academia</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Professor
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total de Professores</p>
                  <p className="text-2xl font-bold text-white">{teachers.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Professores Ativos</p>
                  <p className="text-2xl font-bold text-white">
                    {teachers.filter(t => t.isActive).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-yellow-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Modalidades Cobertas</p>
                  <p className="text-2xl font-bold text-white">{uniqueSports.length}</p>
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
              placeholder="Buscar por nome ou apelido..."
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
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="active">Ativos</SelectItem>
              <SelectItem value="inactive">Inativos</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sportFilter} onValueChange={setSportFilter}>
            <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
              <SelectValue placeholder="Modalidade" />
            </SelectTrigger>
            <SelectContent className="bg-gray-900 border-gray-700">
              <SelectItem value="all">Todas</SelectItem>
              {uniqueSports.map(sport => (
                <SelectItem key={sport} value={sport}>{sport}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Teachers Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeachers.map((teacher) => (
            <Card key={teacher.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {teacher.fullName.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{teacher.fullName}</h3>
                      <p className="text-gray-400 text-sm">{teacher.nickname}</p>
                      <p className="text-gray-400 text-sm">{teacher.age} anos - {teacher.gender}</p>
                    </div>
                  </div>
                  <StatusBadge status={teacher.isActive ? 'active' : 'inactive'} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {teacher.sports.map(sport => (
                      <Badge key={sport} variant="outline" className="border-red-600 text-red-400 text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-white font-medium">
                    {formatCurrency(teacher.salary)}/mês
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    {teacher.phone}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    {teacher.email}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {teacher.address.city}, {teacher.address.state}
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button 
                        className="flex-1 bg-gray-800 hover:bg-gray-700 text-white"
                        onClick={() => setSelectedTeacher(teacher)}
                      >
                        Ver Detalhes
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-xl">Ficha do Professor</DialogTitle>
                      </DialogHeader>
                      {selectedTeacher && (
                        <div className="space-y-6">
                          {/* Personal Info */}
                          <div>
                            <h3 className="text-lg font-semibold text-red-400 mb-3">Dados Pessoais</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div>
                                <label className="text-sm text-gray-400">Nome Completo</label>
                                <p className="text-white">{selectedTeacher.fullName}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Como é Chamado</label>
                                <p className="text-white">{selectedTeacher.nickname}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">RG</label>
                                <p className="text-white">{selectedTeacher.identity}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">CPF</label>
                                <p className="text-white">{selectedTeacher.cpf}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Idade</label>
                                <p className="text-white">{selectedTeacher.age} anos</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Gênero</label>
                                <p className="text-white capitalize">{selectedTeacher.gender}</p>
                              </div>
                            </div>
                          </div>

                          {/* Professional Info */}
                          <div>
                            <h3 className="text-lg font-semibold text-red-400 mb-3">Dados Profissionais</h3>
                            <div className="space-y-3">
                              <div>
                                <label className="text-sm text-gray-400">Formação</label>
                                <p className="text-white">{selectedTeacher.education}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Modalidades</label>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedTeacher.sports.map(sport => (
                                    <Badge key={sport} className="bg-red-600 text-white">
                                      {sport}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                              <div className="grid gap-3 md:grid-cols-2">
                                <div>
                                  <label className="text-sm text-gray-400">Data de Contratação</label>
                                  <p className="text-white">
                                    {new Date(selectedTeacher.hireDate).toLocaleDateString('pt-BR')}
                                  </p>
                                </div>
                                <div>
                                  <label className="text-sm text-gray-400">Salário</label>
                                  <p className="text-white font-semibold">{formatCurrency(selectedTeacher.salary)}</p>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Contact Info */}
                          <div>
                            <h3 className="text-lg font-semibold text-red-400 mb-3">Contato</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                              <div>
                                <label className="text-sm text-gray-400">Telefone</label>
                                <p className="text-white">{selectedTeacher.phone}</p>
                              </div>
                              <div>
                                <label className="text-sm text-gray-400">Email</label>
                                <p className="text-white">{selectedTeacher.email}</p>
                              </div>
                            </div>
                            <div className="mt-3">
                              <label className="text-sm text-gray-400">Endereço</label>
                              <p className="text-white">
                                {selectedTeacher.address.street}, {selectedTeacher.address.number} - 
                                {selectedTeacher.address.city}, {selectedTeacher.address.state} - 
                                CEP: {selectedTeacher.address.zipCode}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  <Button size="sm" variant="outline" className="border-gray-600 text-gray-300 hover:bg-gray-800">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}