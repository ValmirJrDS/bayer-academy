export interface User {
  id: string;
  fullName: string;
  username: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  description: string;
  permissions: string[];
}

export interface Teacher {
  id: string;
  fullName: string;
  nickname: string;
  identity: string;
  cpf: string;
  education: string;
  sports: string[];
  age: number;
  gender: 'masculino' | 'feminino' | 'outro';
  phone: string;
  email: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  hireDate: string;
  salary: number;
  isActive: boolean;
}

export interface SportModality {
  id: string;
  name: string;
  description: string;
  ageGroup: {
    min: number;
    max: number;
  };
  monthlyFee: number;
  maxStudents: number;
  equipment: string[];
  isActive: boolean;
}