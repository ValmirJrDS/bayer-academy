import { User, Role, Teacher, SportModality } from '../types/auth';

export const roles: Role[] = [
  {
    id: '1',
    name: 'Administrador',
    description: 'Acesso completo ao sistema',
    permissions: ['all']
  },
  {
    id: '2',
    name: 'Professor',
    description: 'Acesso limitado para professores',
    permissions: ['students:read', 'calendar:read', 'calendar:write']
  },
  {
    id: '3',
    name: 'Recepcionista',
    description: 'Acesso para recepção e atendimento',
    permissions: ['students:read', 'students:write', 'enrollment:write']
  },
  {
    id: '4',
    name: 'Financeiro',
    description: 'Acesso ao módulo financeiro',
    permissions: ['financial:read', 'financial:write', 'students:read']
  }
];

export const users: User[] = [
  {
    id: '1',
    fullName: 'Administrador do Sistema',
    username: 'admin',
    password: 'admin',
    role: 'Administrador',
    isActive: true,
    createdAt: '2024-01-01'
  },
  {
    id: '2',
    fullName: 'Carlos Silva',
    username: 'carlos.silva',
    password: '123456',
    role: 'Professor',
    isActive: true,
    createdAt: '2024-02-15'
  },
  {
    id: '3',
    fullName: 'Maria Santos',
    username: 'maria.santos',
    password: '123456',
    role: 'Recepcionista',
    isActive: true,
    createdAt: '2024-03-01'
  }
];

export const teachers: Teacher[] = [
  {
    id: '1',
    fullName: 'Carlos Eduardo Silva',
    nickname: 'Professor Carlos',
    identity: '12.345.678-9',
    cpf: '123.456.789-00',
    education: 'Educação Física - UNIFESP',
    sports: ['Futebol', 'Futsal'],
    age: 32,
    gender: 'masculino',
    phone: '(11) 99999-1111',
    email: 'carlos.silva@sportacademy.com',
    address: {
      street: 'Rua dos Esportes',
      number: '100',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-567'
    },
    hireDate: '2024-01-15',
    salary: 4500,
    isActive: true
  },
  {
    id: '2',
    fullName: 'Ana Paula Rodrigues',
    nickname: 'Professora Ana',
    identity: '98.765.432-1',
    cpf: '987.654.321-00',
    education: 'Educação Física - USP, Especialização em Natação',
    sports: ['Natação'],
    age: 28,
    gender: 'feminino',
    phone: '(11) 88888-2222',
    email: 'ana.rodrigues@sportacademy.com',
    address: {
      street: 'Av. Aquática',
      number: '250',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-890'
    },
    hireDate: '2024-02-01',
    salary: 4200,
    isActive: true
  },
  {
    id: '3',
    fullName: 'Roberto Oliveira Santos',
    nickname: 'Mestre Roberto',
    identity: '11.222.333-4',
    cpf: '111.222.333-44',
    education: 'Educação Física - UNICAMP, Faixa Preta 3º Dan Judô',
    sports: ['Judô'],
    age: 45,
    gender: 'masculino',
    phone: '(11) 77777-3333',
    email: 'roberto.santos@sportacademy.com',
    address: {
      street: 'Rua das Artes Marciais',
      number: '75',
      city: 'São Paulo',
      state: 'SP',
      zipCode: '01234-123'
    },
    hireDate: '2023-08-10',
    salary: 5000,
    isActive: true
  }
];

export const sportModalities: SportModality[] = [
  {
    id: '1',
    name: 'Futebol',
    description: 'Modalidade esportiva mais popular do Brasil',
    ageGroup: { min: 6, max: 15 },
    monthlyFee: 150,
    maxStudents: 20,
    equipment: ['Bola', 'Cones', 'Coletes', 'Traves'],
    isActive: true
  },
  {
    id: '2',
    name: 'Futsal',
    description: 'Futebol adaptado para quadras cobertas',
    ageGroup: { min: 6, max: 15 },
    monthlyFee: 120,
    maxStudents: 16,
    equipment: ['Bola de Futsal', 'Cones', 'Coletes'],
    isActive: true
  },
  {
    id: '3',
    name: 'Basquete',
    description: 'Esporte coletivo com cestas',
    ageGroup: { min: 8, max: 15 },
    monthlyFee: 180,
    maxStudents: 15,
    equipment: ['Bola de Basquete', 'Cones', 'Cestas'],
    isActive: true
  },
  {
    id: '4',
    name: 'Vôlei',
    description: 'Esporte de rede com saque, passe e ataque',
    ageGroup: { min: 10, max: 15 },
    monthlyFee: 160,
    maxStudents: 12,
    equipment: ['Bola de Vôlei', 'Rede', 'Antenas'],
    isActive: true
  },
  {
    id: '5',
    name: 'Natação',
    description: 'Esporte aquático completo',
    ageGroup: { min: 6, max: 15 },
    monthlyFee: 200,
    maxStudents: 8,
    equipment: ['Pranchas', 'Pull Buoy', 'Noodles', 'Óculos'],
    isActive: true
  },
  {
    id: '6',
    name: 'Judô',
    description: 'Arte marcial japonesa',
    ageGroup: { min: 6, max: 15 },
    monthlyFee: 140,
    maxStudents: 15,
    equipment: ['Tatames', 'Faixas', 'Judogis'],
    isActive: true
  },
  {
    id: '7',
    name: 'Balé',
    description: 'Dança clássica e expressão corporal',
    ageGroup: { min: 4, max: 15 },
    monthlyFee: 130,
    maxStudents: 12,
    equipment: ['Barras', 'Espelhos', 'Som'],
    isActive: true
  },
  {
    id: '8',
    name: 'Ginástica',
    description: 'Exercícios de flexibilidade e coordenação',
    ageGroup: { min: 5, max: 15 },
    monthlyFee: 170,
    maxStudents: 10,
    equipment: ['Colchões', 'Trampolins', 'Argolas'],
    isActive: true
  }
];