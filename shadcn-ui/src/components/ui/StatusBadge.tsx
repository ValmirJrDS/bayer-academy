import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: 'paid' | 'pending' | 'overdue' | 'active' | 'inactive' | 'training' | 'game' | 'evaluation' | 'special' | 'meeting';
  className?: string;
}

const statusConfig = {
  paid: {
    label: 'Pago',
    className: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  pending: {
    label: 'A Vencer',
    className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  },
  overdue: {
    label: 'Em Atraso',
    className: 'bg-red-500/10 text-red-400 border-red-500/20'
  },
  active: {
    label: 'Ativo',
    className: 'bg-green-500/10 text-green-400 border-green-500/20'
  },
  inactive: {
    label: 'Inativo',
    className: 'bg-gray-500/10 text-gray-400 border-gray-500/20'
  },
  training: {
    label: 'Treino',
    className: 'bg-blue-500/10 text-blue-400 border-blue-500/20'
  },
  game: {
    label: 'Jogo',
    className: 'bg-red-500/10 text-red-400 border-red-500/20'
  },
  evaluation: {
    label: 'Avaliação',
    className: 'bg-purple-500/10 text-purple-400 border-purple-500/20'
  },
  special: {
    label: 'Evento Especial',
    className: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
  },
  meeting: {
    label: 'Reunião',
    className: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
  }
};

export default function StatusBadge({ status, className }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  );
}