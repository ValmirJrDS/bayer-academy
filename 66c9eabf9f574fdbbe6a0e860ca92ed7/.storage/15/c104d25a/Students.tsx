import { useState, useMemo } from 'react';
import { Search, Filter, Users, Phone, Mail, MapPin, Plus } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { allStudents } from '@/data/mockData';
import { Student } from '@/types';

export default function Students() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sportFilter, setSportFilter] = useState<string>('all');
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const filteredStudents = useMemo(() => {
    return allStudents.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || student.status === statusFilter;
      const matchesSport = sportFilter === 'all' || student.sports.includes(sportFilter);
      return matchesSearch && matchesStatus && matchesSport;
    });
  }, [searchTerm, statusFilter, sportFilter]);

  const uniqueSports = Array.from(new Set(allStudents.flatMap(s => s.sports)));

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birth = new Date(dateOfBirth);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

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
            <h1 className="text-3xl font-bold text-white">Alunos</h1>
            <p className="text-gray-400 mt-2">Gestão de cadastros e fichas dos alunos</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total de Alunos</p>
                  <p className="text-2xl font-bold text-white">{allStudents.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Alunos Ativos</p>
                  <p className="text-2xl font-bold text-white">
                    {allStudents.filter(s => s.status === 'active').length}
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
                  <p className="text-sm font-medium text-gray-400">Modalidades</p>
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
              placeholder="Buscar por nome do aluno..."
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
              <SelectItem value="pending">Pendentes</SelectItem>
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

        {/* Students Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredStudents.map((student) => (
            <Card key={student.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                      <span className="text-white font-semibold text-lg">
                        {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">{student.name}</h3>
                      <p className="text-gray-400 text-sm">{calculateAge(student.dateOfBirth)} anos</p>
                    </div>
                  </div>
                  <StatusBadge status={student.status} />
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex flex-wrap gap-1">
                    {student.sports.map(sport => (
                      <Badge key={sport} variant="outline" className="border-red-600 text-red-400 text-xs">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <div className="text-white font-medium">
                    {formatCurrency(student.monthlyFee)}/mês
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center text-gray-400">
                    <Phone className="h-4 w-4 mr-2" />
                    {student.guardian.phone}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <Mail className="h-4 w-4 mr-2" />
                    {student.guardian.email}
                  </div>
                  <div className="flex items-center text-gray-400">
                    <MapPin className="h-4 w-4 mr-2" />
                    {student.address.city}, {student.address.state}
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      className="w-full mt-4 bg-gray-800 hover:bg-gray-700 text-white"
                      onClick={() => setSelectedStudent(student)}
                    >
                      Ver Ficha Completa
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-gray-900 border-gray-700 text-white max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="text-xl">Ficha do Aluno</DialogTitle>
                    </DialogHeader>
                    {selectedStudent && (
                      <div className="space-y-6">
                        {/* Personal Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-400 mb-3">Dados Pessoais</h3>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <label className="text-sm text-gray-400">Nome Completo</label>
                              <p className="text-white">{selectedStudent.name}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Data de Nascimento</label>
                              <p className="text-white">
                                {new Date(selectedStudent.dateOfBirth).toLocaleDateString('pt-BR')} 
                                ({calculateAge(selectedStudent.dateOfBirth)} anos)
                              </p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">CPF</label>
                              <p className="text-white">{selectedStudent.cpf}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Status</label>
                              <div className="mt-1">
                                <StatusBadge status={selectedStudent.status} />
                              </div>
                            </div>
                          </div>
                          <div className="mt-3">
                            <label className="text-sm text-gray-400">Endereço</label>
                            <p className="text-white">
                              {selectedStudent.address.street}, {selectedStudent.address.number} - 
                              {selectedStudent.address.city}, {selectedStudent.address.state} - 
                              CEP: {selectedStudent.address.zipCode}
                            </p>
                          </div>
                        </div>

                        {/* Guardian Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-400 mb-3">Dados do Responsável</h3>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <label className="text-sm text-gray-400">Nome</label>
                              <p className="text-white">{selectedStudent.guardian.name}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">CPF</label>
                              <p className="text-white">{selectedStudent.guardian.cpf}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Telefone</label>
                              <p className="text-white">{selectedStudent.guardian.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Email</label>
                              <p className="text-white">{selectedStudent.guardian.email}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Profissão</label>
                              <p className="text-white">{selectedStudent.guardian.profession}</p>
                            </div>
                          </div>
                        </div>

                        {/* Emergency Contact */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-400 mb-3">Contato de Emergência</h3>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <label className="text-sm text-gray-400">Nome</label>
                              <p className="text-white">{selectedStudent.emergencyContact.name}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Parentesco</label>
                              <p className="text-white">{selectedStudent.emergencyContact.relationship}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Telefone</label>
                              <p className="text-white">{selectedStudent.emergencyContact.phone}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Email</label>
                              <p className="text-white">{selectedStudent.emergencyContact.email}</p>
                            </div>
                          </div>
                        </div>

                        {/* Health Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-400 mb-3">Informações de Saúde</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="text-sm text-gray-400">Alergias</label>
                              <p className="text-white">
                                {selectedStudent.healthInfo.allergies.length > 0 
                                  ? selectedStudent.healthInfo.allergies.join(', ')
                                  : 'Nenhuma alergia registrada'
                                }
                              </p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Medicamentos</label>
                              <p className="text-white">
                                {selectedStudent.healthInfo.medications.length > 0 
                                  ? selectedStudent.healthInfo.medications.join(', ')
                                  : 'Nenhum medicamento registrado'
                                }
                              </p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Restrições Médicas</label>
                              <p className="text-white">
                                {selectedStudent.healthInfo.restrictions.length > 0 
                                  ? selectedStudent.healthInfo.restrictions.join(', ')
                                  : 'Nenhuma restrição registrada'
                                }
                              </p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Médico</label>
                              <p className="text-white">{selectedStudent.healthInfo.doctorContact}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Plano de Saúde</label>
                              <p className="text-white">{selectedStudent.healthInfo.healthPlan}</p>
                            </div>
                          </div>
                        </div>

                        {/* Sports Info */}
                        <div>
                          <h3 className="text-lg font-semibold text-red-400 mb-3">Modalidades</h3>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {selectedStudent.sports.map(sport => (
                              <Badge key={sport} className="bg-red-600 text-white">
                                {sport}
                              </Badge>
                            ))}
                          </div>
                          <div className="grid gap-3 md:grid-cols-2">
                            <div>
                              <label className="text-sm text-gray-400">Mensalidade</label>
                              <p className="text-white font-semibold">{formatCurrency(selectedStudent.monthlyFee)}</p>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400">Data de Matrícula</label>
                              <p className="text-white">
                                {new Date(selectedStudent.enrollmentDate).toLocaleDateString('pt-BR')}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </Layout>
  );
}