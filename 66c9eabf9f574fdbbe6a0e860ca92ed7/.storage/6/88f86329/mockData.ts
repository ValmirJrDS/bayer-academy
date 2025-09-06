import { Student, Payment, Event, Sport, DashboardMetrics } from '../types';

export const sports: Sport[] = [
  {
    id: '1',
    name: 'Futebol',
    monthlyFee: 150,
    ageRange: { min: 6, max: 15 },
    schedule: { days: ['Segunda', 'Quarta', 'Sexta'], time: '16:00-17:30' },
    active: true
  },
  {
    id: '2',
    name: 'Futsal',
    monthlyFee: 120,
    ageRange: { min: 6, max: 15 },
    schedule: { days: ['Terça', 'Quinta'], time: '17:00-18:30' },
    active: true
  },
  {
    id: '3',
    name: 'Basquete',
    monthlyFee: 180,
    ageRange: { min: 8, max: 15 },
    schedule: { days: ['Segunda', 'Quarta'], time: '18:00-19:30' },
    active: true
  },
  {
    id: '4',
    name: 'Vôlei',
    monthlyFee: 160,
    ageRange: { min: 10, max: 15 },
    schedule: { days: ['Terça', 'Quinta'], time: '19:00-20:30' },
    active: true
  },
  {
    id: '5',
    name: 'Natação',
    monthlyFee: 200,
    ageRange: { min: 6, max: 15 },
    schedule: { days: ['Segunda', 'Quarta', 'Sexta'], time: '15:00-16:00' },
    active: true
  },
  {
    id: '6',
    name: 'Judô',
    monthlyFee: 140,
    ageRange: { min: 6, max: 15 },
    schedule: { days: ['Terça', 'Quinta'], time: '16:00-17:00' },
    active: true
  }
];

export const students: Student[] = [
  {
    id: '1',
    name: 'Lucas Silva Santos',
    dateOfBirth: '2012-03-15',
    cpf: '123.456.789-01',
    address: {
      street: 'Rua das Flores',
      number: '123',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    status: 'active',
    sports: ['Futebol'],
    guardian: {
      name: 'Maria Silva Santos',
      cpf: '987.654.321-00',
      phone: '(11) 99999-1111',
      email: 'maria.santos@email.com',
      profession: 'Professora'
    },
    emergencyContact: {
      name: 'João Silva',
      relationship: 'Pai',
      phone: '(11) 99999-2222',
      email: 'joao.silva@email.com'
    },
    healthInfo: {
      allergies: ['Amendoim'],
      medications: [],
      restrictions: [],
      doctorContact: 'Dr. Pedro - (11) 3333-4444',
      healthPlan: 'Unimed'
    },
    enrollmentDate: '2024-01-15',
    monthlyFee: 150
  },
  {
    id: '2',
    name: 'Ana Carolina Lima',
    dateOfBirth: '2013-07-22',
    cpf: '234.567.890-12',
    address: {
      street: 'Av. Paulista',
      number: '456',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01310-100'
    },
    status: 'active',
    sports: ['Natação', 'Vôlei'],
    guardian: {
      name: 'Carlos Lima',
      cpf: '876.543.210-99',
      phone: '(11) 88888-3333',
      email: 'carlos.lima@email.com',
      profession: 'Engenheiro'
    },
    emergencyContact: {
      name: 'Rita Lima',
      relationship: 'Mãe',
      phone: '(11) 88888-4444',
      email: 'rita.lima@email.com'
    },
    healthInfo: {
      allergies: [],
      medications: ['Vitamina D'],
      restrictions: [],
      doctorContact: 'Dra. Ana - (11) 5555-6666',
      healthPlan: 'Bradesco Saúde'
    },
    enrollmentDate: '2024-02-01',
    monthlyFee: 360
  },
  {
    id: '3',
    name: 'Pedro Henrique Costa',
    dateOfBirth: '2011-11-08',
    cpf: '345.678.901-23',
    address: {
      street: 'Rua Augusta',
      number: '789',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01305-000'
    },
    status: 'active',
    sports: ['Basquete'],
    guardian: {
      name: 'Fernanda Costa',
      cpf: '765.432.109-88',
      phone: '(11) 77777-5555',
      email: 'fernanda.costa@email.com',
      profession: 'Médica'
    },
    emergencyContact: {
      name: 'Roberto Costa',
      relationship: 'Pai',
      phone: '(11) 77777-6666',
      email: 'roberto.costa@email.com'
    },
    healthInfo: {
      allergies: ['Lactose'],
      medications: [],
      restrictions: [],
      doctorContact: 'Dr. Carlos - (11) 7777-8888',
      healthPlan: 'SulAmérica'
    },
    enrollmentDate: '2024-01-20',
    monthlyFee: 180
  },
  {
    id: '4',
    name: 'Gabriela Oliveira',
    dateOfBirth: '2014-05-12',
    cpf: '456.789.012-34',
    address: {
      street: 'Rua Oscar Freire',
      number: '321',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01426-001'
    },
    status: 'active',
    sports: ['Judô'],
    guardian: {
      name: 'Juliana Oliveira',
      cpf: '654.321.098-77',
      phone: '(11) 66666-7777',
      email: 'juliana.oliveira@email.com',
      profession: 'Advogada'
    },
    emergencyContact: {
      name: 'Marcos Oliveira',
      relationship: 'Pai',
      phone: '(11) 66666-8888',
      email: 'marcos.oliveira@email.com'
    },
    healthInfo: {
      allergies: [],
      medications: [],
      restrictions: ['Problema no joelho direito'],
      doctorContact: 'Dr. Luiz - (11) 9999-0000',
      healthPlan: 'Amil'
    },
    enrollmentDate: '2024-03-01',
    monthlyFee: 140
  },
  {
    id: '5',
    name: 'Rafael Mendes',
    dateOfBirth: '2012-09-30',
    cpf: '567.890.123-45',
    address: {
      street: 'Rua Consolação',
      number: '654',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01302-907'
    },
    status: 'active',
    sports: ['Futebol', 'Futsal'],
    guardian: {
      name: 'Patricia Mendes',
      cpf: '543.210.987-66',
      phone: '(11) 55555-9999',
      email: 'patricia.mendes@email.com',
      profession: 'Dentista'
    },
    emergencyContact: {
      name: 'André Mendes',
      relationship: 'Pai',
      phone: '(11) 55555-0000',
      email: 'andre.mendes@email.com'
    },
    healthInfo: {
      allergies: ['Poeira'],
      medications: ['Antialérgico'],
      restrictions: [],
      doctorContact: 'Dra. Carla - (11) 1111-2222',
      healthPlan: 'Porto Seguro'
    },
    enrollmentDate: '2024-01-10',
    monthlyFee: 270
  }
];

// Generate more students to reach 20 total
const additionalStudents: Student[] = Array.from({ length: 15 }, (_, i) => {
  const names = [
    'Isabella Santos', 'Matheus Rodrigues', 'Sophia Ferreira', 'João Pedro Silva',
    'Manuela Costa', 'Enzo Gabriel Lima', 'Valentina Oliveira', 'Arthur Souza',
    'Helena Almeida', 'Miguel Barbosa', 'Alice Pereira', 'Davi Martins',
    'Laura Ribeiro', 'Bernardo Carvalho', 'Beatriz Araújo'
  ];
  
  const sportCombos = [
    ['Futebol'], ['Basquete'], ['Vôlei'], ['Natação'], ['Judô'], ['Futsal'],
    ['Futebol', 'Futsal'], ['Natação', 'Judô'], ['Basquete', 'Vôlei']
  ];
  
  const selectedSports = sportCombos[i % sportCombos.length];
  const totalFee = selectedSports.reduce((sum, sport) => {
    const sportData = sports.find(s => s.name === sport);
    return sum + (sportData?.monthlyFee || 0);
  }, 0);

  return {
    id: (i + 6).toString(),
    name: names[i],
    dateOfBirth: `201${2 + (i % 3)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    cpf: `${String(i + 100).padStart(3, '0')}.${String(i + 200).padStart(3, '0')}.${String(i + 300).padStart(3, '0')}-${String(i + 10).padStart(2, '0')}`,
    address: {
      street: `Rua ${i + 1}`,
      number: String((i + 1) * 100),
      city: 'São Paulo',
      state: 'SP',
      zipCode: `0${String(i + 1000).slice(-4)}-000`
    },
    status: i % 10 === 0 ? 'pending' : 'active',
    sports: selectedSports,
    guardian: {
      name: `Responsável ${names[i]}`,
      cpf: `${String(i + 400).padStart(3, '0')}.${String(i + 500).padStart(3, '0')}.${String(i + 600).padStart(3, '0')}-${String(i + 20).padStart(2, '0')}`,
      phone: `(11) ${String(i + 90000).padStart(5, '0')}-${String(i + 1000).padStart(4, '0')}`,
      email: `responsavel${i + 6}@email.com`,
      profession: ['Professor', 'Médico', 'Engenheiro', 'Advogado', 'Comerciante'][i % 5]
    },
    emergencyContact: {
      name: `Emergência ${names[i]}`,
      relationship: ['Pai', 'Mãe', 'Avô', 'Avó', 'Tio'][i % 5],
      phone: `(11) ${String(i + 80000).padStart(5, '0')}-${String(i + 2000).padStart(4, '0')}`,
      email: `emergencia${i + 6}@email.com`
    },
    healthInfo: {
      allergies: i % 3 === 0 ? ['Amendoim'] : [],
      medications: i % 4 === 0 ? ['Vitamina D'] : [],
      restrictions: i % 5 === 0 ? ['Restrição médica'] : [],
      doctorContact: `Dr. ${names[i].split(' ')[0]} - (11) ${String(i + 3000).padStart(4, '0')}-${String(i + 4000).padStart(4, '0')}`,
      healthPlan: ['Unimed', 'Bradesco', 'SulAmérica', 'Amil', 'Porto Seguro'][i % 5]
    },
    enrollmentDate: `2024-0${Math.floor(Math.random() * 3) + 1}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
    monthlyFee: totalFee
  };
});

export const allStudents = [...students, ...additionalStudents];

export const payments: Payment[] = allStudents.flatMap(student => {
  const months = ['2024-09', '2024-08', '2024-07', '2024-06', '2024-05', '2024-04'];
  return months.map((month, index) => {
    const dueDate = `${month}-05`;
    const daysPastDue = new Date().getTime() - new Date(dueDate).getTime();
    const daysDiff = Math.floor(daysPastDue / (1000 * 60 * 60 * 24));
    
    let status: 'paid' | 'pending' | 'overdue' = 'paid';
    let paidDate: string | undefined = `${month}-${String(Math.floor(Math.random() * 10) + 1).padStart(2, '0')}`;
    
    // 60% paid, 25% pending, 15% overdue
    const rand = Math.random();
    if (index < 2) { // Recent months
      if (rand < 0.15) {
        status = 'overdue';
        paidDate = undefined;
      } else if (rand < 0.4) {
        status = 'pending';
        paidDate = undefined;
      }
    }
    
    return {
      id: `${student.id}-${month}`,
      studentId: student.id,
      studentName: student.name,
      sport: student.sports[0],
      amount: student.monthlyFee,
      dueDate,
      paidDate,
      status,
      month
    };
  });
});

export const events: Event[] = [
  {
    id: '1',
    title: 'Treino de Futebol - Categoria Sub-12',
    type: 'training',
    sport: 'Futebol',
    date: '2024-09-06',
    startTime: '16:00',
    endTime: '17:30',
    description: 'Treino técnico focado em passes e finalizações'
  },
  {
    id: '2',
    title: 'Jogo Amistoso - Basquete',
    type: 'game',
    sport: 'Basquete',
    date: '2024-09-07',
    startTime: '14:00',
    endTime: '16:00',
    description: 'Amistoso contra Academia Esportiva Central'
  },
  {
    id: '3',
    title: 'Avaliação Física - Natação',
    type: 'evaluation',
    sport: 'Natação',
    date: '2024-09-08',
    startTime: '15:00',
    endTime: '17:00',
    description: 'Avaliação trimestral de desempenho'
  },
  {
    id: '4',
    title: 'Reunião de Pais - Judô',
    type: 'meeting',
    sport: 'Judô',
    date: '2024-09-10',
    startTime: '19:00',
    endTime: '20:30',
    description: 'Apresentação dos resultados e próximos torneios'
  },
  {
    id: '5',
    title: 'Torneio Interno - Futsal',
    type: 'special',
    sport: 'Futsal',
    date: '2024-09-15',
    startTime: '09:00',
    endTime: '17:00',
    description: 'Torneio entre as categorias da academia'
  }
];

export const dashboardMetrics: DashboardMetrics = {
  totalRevenue: 32450,
  defaultRate: 8.5,
  enrollmentGrowth: 12.3,
  projectedRevenue: 38200,
  totalStudents: allStudents.length,
  activeStudents: allStudents.filter(s => s.status === 'active').length
};