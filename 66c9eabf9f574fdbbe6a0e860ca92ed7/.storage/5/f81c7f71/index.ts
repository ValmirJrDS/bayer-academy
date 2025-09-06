export interface Student {
  id: string;
  name: string;
  dateOfBirth: string;
  cpf: string;
  address: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
  photo?: string;
  status: 'active' | 'inactive' | 'pending';
  sports: string[];
  guardian: {
    name: string;
    cpf: string;
    phone: string;
    email: string;
    profession: string;
  };
  emergencyContact: {
    name: string;
    relationship: string;
    phone: string;
    email: string;
  };
  healthInfo: {
    allergies: string[];
    medications: string[];
    restrictions: string[];
    doctorContact: string;
    healthPlan: string;
  };
  enrollmentDate: string;
  monthlyFee: number;
}

export interface Payment {
  id: string;
  studentId: string;
  studentName: string;
  sport: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  month: string;
}

export interface Event {
  id: string;
  title: string;
  type: 'training' | 'game' | 'evaluation' | 'special' | 'meeting';
  sport: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  participants?: string[];
}

export interface Sport {
  id: string;
  name: string;
  monthlyFee: number;
  ageRange: {
    min: number;
    max: number;
  };
  schedule: {
    days: string[];
    time: string;
  };
  active: boolean;
}

export interface DashboardMetrics {
  totalRevenue: number;
  defaultRate: number;
  enrollmentGrowth: number;
  projectedRevenue: number;
  totalStudents: number;
  activeStudents: number;
}