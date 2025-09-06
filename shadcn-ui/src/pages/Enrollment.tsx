import { useState } from 'react';
import { Save, User, Users, Heart, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { sports } from '@/data/mockData';

interface EnrollmentForm {
  // Student data
  studentName: string;
  dateOfBirth: string;
  cpf: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  
  // Guardian data
  guardianName: string;
  guardianCpf: string;
  guardianPhone: string;
  guardianEmail: string;
  guardianProfession: string;
  
  // Emergency contact
  emergencyName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  emergencyEmail: string;
  
  // Health info
  allergies: string;
  medications: string;
  restrictions: string;
  doctorContact: string;
  healthPlan: string;
  
  // Sports selection
  selectedSports: string[];
  
  // Documents
  documentsChecked: string[];
}

const initialForm: EnrollmentForm = {
  studentName: '',
  dateOfBirth: '',
  cpf: '',
  address: {
    street: '',
    number: '',
    city: 'São Paulo',
    state: 'SP',
    zipCode: ''
  },
  guardianName: '',
  guardianCpf: '',
  guardianPhone: '',
  guardianEmail: '',
  guardianProfession: '',
  emergencyName: '',
  emergencyRelationship: '',
  emergencyPhone: '',
  emergencyEmail: '',
  allergies: '',
  medications: '',
  restrictions: '',
  doctorContact: '',
  healthPlan: '',
  selectedSports: [],
  documentsChecked: []
};

const requiredDocuments = [
  'RG do aluno',
  'CPF do aluno',
  'Certidão de nascimento',
  'Comprovante de residência',
  'RG do responsável',
  'CPF do responsável',
  'Atestado médico',
  'Foto 3x4'
];

export default function Enrollment() {
  const [form, setForm] = useState<EnrollmentForm>(initialForm);
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const updateForm = (field: string, value: string | string[]) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateAddress = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: value
      }
    }));
  };

  const toggleSport = (sportName: string) => {
    setForm(prev => ({
      ...prev,
      selectedSports: prev.selectedSports.includes(sportName)
        ? prev.selectedSports.filter(s => s !== sportName)
        : [...prev.selectedSports, sportName]
    }));
  };

  const toggleDocument = (document: string) => {
    setForm(prev => ({
      ...prev,
      documentsChecked: prev.documentsChecked.includes(document)
        ? prev.documentsChecked.filter(d => d !== document)
        : [...prev.documentsChecked, document]
    }));
  };

  const calculateTotalFee = () => {
    return form.selectedSports.reduce((total, sportName) => {
      const sport = sports.find(s => s.name === sportName);
      return total + (sport?.monthlyFee || 0);
    }, 0);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  const handleSubmit = () => {
    // In a real app, this would submit to the backend
    console.log('Enrollment form submitted:', form);
    alert('Matrícula realizada com sucesso!');
  };

  const steps = [
    { number: 1, title: 'Dados do Aluno', icon: User },
    { number: 2, title: 'Responsável', icon: Users },
    { number: 3, title: 'Emergência & Saúde', icon: Heart },
    { number: 4, title: 'Modalidades', icon: FileText },
    { number: 5, title: 'Documentos', icon: FileText }
  ];

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-white">Nova Matrícula</h1>
          <p className="text-gray-400 mt-2">Cadastro completo de novo aluno</p>
        </div>

        {/* Progress Steps */}
        <div className="flex justify-between items-center">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isActive = currentStep === step.number;
            const isCompleted = currentStep > step.number;
            
            return (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  isActive 
                    ? 'bg-red-600 border-red-600 text-white' 
                    : isCompleted 
                    ? 'bg-green-600 border-green-600 text-white'
                    : 'border-gray-600 text-gray-400'
                }`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className={`text-sm font-medium ${
                    isActive ? 'text-red-400' : isCompleted ? 'text-green-400' : 'text-gray-400'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-8 h-0.5 mx-4 ${
                    isCompleted ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            );
          })}
        </div>

        {/* Form Content */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">
              Etapa {currentStep} de {totalSteps}: {steps[currentStep - 1].title}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Student Data */}
            {currentStep === 1 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="studentName" className="text-gray-300">Nome Completo *</Label>
                    <Input
                      id="studentName"
                      value={form.studentName}
                      onChange={(e) => updateForm('studentName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="Nome completo do aluno"
                    />
                  </div>
                  <div>
                    <Label htmlFor="dateOfBirth" className="text-gray-300">Data de Nascimento *</Label>
                    <Input
                      id="dateOfBirth"
                      type="date"
                      value={form.dateOfBirth}
                      onChange={(e) => updateForm('dateOfBirth', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cpf" className="text-gray-300">CPF *</Label>
                    <Input
                      id="cpf"
                      value={form.cpf}
                      onChange={(e) => updateForm('cpf', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="000.000.000-00"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-red-400">Endereço</h3>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="md:col-span-2">
                      <Label htmlFor="street" className="text-gray-300">Rua *</Label>
                      <Input
                        id="street"
                        value={form.address.street}
                        onChange={(e) => updateAddress('street', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Nome da rua"
                      />
                    </div>
                    <div>
                      <Label htmlFor="number" className="text-gray-300">Número *</Label>
                      <Input
                        id="number"
                        value={form.address.number}
                        onChange={(e) => updateAddress('number', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="123"
                      />
                    </div>
                    <div>
                      <Label htmlFor="city" className="text-gray-300">Cidade *</Label>
                      <Input
                        id="city"
                        value={form.address.city}
                        onChange={(e) => updateAddress('city', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="state" className="text-gray-300">Estado *</Label>
                      <Select value={form.address.state} onValueChange={(value) => updateAddress('state', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="SP">São Paulo</SelectItem>
                          <SelectItem value="RJ">Rio de Janeiro</SelectItem>
                          <SelectItem value="MG">Minas Gerais</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode" className="text-gray-300">CEP *</Label>
                      <Input
                        id="zipCode"
                        value={form.address.zipCode}
                        onChange={(e) => updateAddress('zipCode', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="00000-000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Guardian Data */}
            {currentStep === 2 && (
              <div className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="guardianName" className="text-gray-300">Nome do Responsável *</Label>
                    <Input
                      id="guardianName"
                      value={form.guardianName}
                      onChange={(e) => updateForm('guardianName', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianCpf" className="text-gray-300">CPF do Responsável *</Label>
                    <Input
                      id="guardianCpf"
                      value={form.guardianCpf}
                      onChange={(e) => updateForm('guardianCpf', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianPhone" className="text-gray-300">Telefone *</Label>
                    <Input
                      id="guardianPhone"
                      value={form.guardianPhone}
                      onChange={(e) => updateForm('guardianPhone', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="(11) 99999-9999"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianEmail" className="text-gray-300">Email *</Label>
                    <Input
                      id="guardianEmail"
                      type="email"
                      value={form.guardianEmail}
                      onChange={(e) => updateForm('guardianEmail', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="guardianProfession" className="text-gray-300">Profissão</Label>
                    <Input
                      id="guardianProfession"
                      value={form.guardianProfession}
                      onChange={(e) => updateForm('guardianProfession', e.target.value)}
                      className="bg-gray-800 border-gray-700 text-white"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Emergency Contact & Health */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Contato de Emergência</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <Label htmlFor="emergencyName" className="text-gray-300">Nome *</Label>
                      <Input
                        id="emergencyName"
                        value={form.emergencyName}
                        onChange={(e) => updateForm('emergencyName', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyRelationship" className="text-gray-300">Parentesco *</Label>
                      <Select value={form.emergencyRelationship} onValueChange={(value) => updateForm('emergencyRelationship', value)}>
                        <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                          <SelectValue placeholder="Selecione o parentesco" />
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-700">
                          <SelectItem value="pai">Pai</SelectItem>
                          <SelectItem value="mae">Mãe</SelectItem>
                          <SelectItem value="avo">Avô/Avó</SelectItem>
                          <SelectItem value="tio">Tio/Tia</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone" className="text-gray-300">Telefone *</Label>
                      <Input
                        id="emergencyPhone"
                        value={form.emergencyPhone}
                        onChange={(e) => updateForm('emergencyPhone', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyEmail" className="text-gray-300">Email</Label>
                      <Input
                        id="emergencyEmail"
                        type="email"
                        value={form.emergencyEmail}
                        onChange={(e) => updateForm('emergencyEmail', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Informações de Saúde</h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="allergies" className="text-gray-300">Alergias</Label>
                      <Textarea
                        id="allergies"
                        value={form.allergies}
                        onChange={(e) => updateForm('allergies', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Descreva alergias conhecidas..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="medications" className="text-gray-300">Medicamentos em Uso</Label>
                      <Textarea
                        id="medications"
                        value={form.medications}
                        onChange={(e) => updateForm('medications', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Liste medicamentos em uso..."
                      />
                    </div>
                    <div>
                      <Label htmlFor="restrictions" className="text-gray-300">Restrições Médicas</Label>
                      <Textarea
                        id="restrictions"
                        value={form.restrictions}
                        onChange={(e) => updateForm('restrictions', e.target.value)}
                        className="bg-gray-800 border-gray-700 text-white"
                        placeholder="Descreva restrições médicas..."
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <Label htmlFor="doctorContact" className="text-gray-300">Contato do Médico</Label>
                        <Input
                          id="doctorContact"
                          value={form.doctorContact}
                          onChange={(e) => updateForm('doctorContact', e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Dr. Nome - (11) 3333-4444"
                        />
                      </div>
                      <div>
                        <Label htmlFor="healthPlan" className="text-gray-300">Plano de Saúde</Label>
                        <Input
                          id="healthPlan"
                          value={form.healthPlan}
                          onChange={(e) => updateForm('healthPlan', e.target.value)}
                          className="bg-gray-800 border-gray-700 text-white"
                          placeholder="Nome do plano de saúde"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Sports Selection */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Selecione as Modalidades</h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sports.map(sport => (
                      <Card 
                        key={sport.id} 
                        className={`cursor-pointer transition-all ${
                          form.selectedSports.includes(sport.name)
                            ? 'bg-red-600/20 border-red-500'
                            : 'bg-gray-800/50 border-gray-700 hover:border-gray-600'
                        }`}
                        onClick={() => toggleSport(sport.name)}
                      >
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-semibold text-white">{sport.name}</h4>
                            <Checkbox 
                              checked={form.selectedSports.includes(sport.name)}
                              onChange={() => toggleSport(sport.name)}
                            />
                          </div>
                          <div className="space-y-1 text-sm text-gray-400">
                            <p>{formatCurrency(sport.monthlyFee)}/mês</p>
                            <p>Idade: {sport.ageRange.min}-{sport.ageRange.max} anos</p>
                            <p>{sport.schedule.days.join(', ')}</p>
                            <p>{sport.schedule.time}</p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                {form.selectedSports.length > 0 && (
                  <Card className="bg-gray-800/50 border-gray-700">
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-white mb-2">Resumo da Matrícula</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-400">Modalidades selecionadas:</span>
                          <div className="flex gap-1">
                            {form.selectedSports.map(sport => (
                              <Badge key={sport} className="bg-red-600 text-white text-xs">
                                {sport}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-between items-center text-lg font-semibold">
                          <span className="text-white">Total mensal:</span>
                          <span className="text-red-400">{formatCurrency(calculateTotalFee())}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            )}

            {/* Step 5: Documents */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-red-400 mb-4">Documentos Necessários</h3>
                  <div className="space-y-3">
                    {requiredDocuments.map(document => (
                      <div key={document} className="flex items-center space-x-3">
                        <Checkbox
                          checked={form.documentsChecked.includes(document)}
                          onCheckedChange={() => toggleDocument(document)}
                        />
                        <label className="text-white">{document}</label>
                      </div>
                    ))}
                  </div>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                  <CardContent className="p-4">
                    <h4 className="font-semibold text-white mb-4">Resumo Final</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Aluno:</span>
                        <span className="text-white">{form.studentName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Responsável:</span>
                        <span className="text-white">{form.guardianName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Modalidades:</span>
                        <span className="text-white">{form.selectedSports.join(', ')}</span>
                      </div>
                      <div className="flex justify-between font-semibold">
                        <span className="text-gray-400">Mensalidade:</span>
                        <span className="text-red-400">{formatCurrency(calculateTotalFee())}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Documentos:</span>
                        <span className="text-white">
                          {form.documentsChecked.length}/{requiredDocuments.length}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-6">
              <Button
                variant="outline"
                onClick={() => setCurrentStep(prev => Math.max(1, prev - 1))}
                disabled={currentStep === 1}
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                <ChevronLeft className="h-4 w-4 mr-2" />
                Anterior
              </Button>

              {currentStep < totalSteps ? (
                <Button
                  onClick={() => setCurrentStep(prev => Math.min(totalSteps, prev + 1))}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Próximo
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Finalizar Matrícula
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}