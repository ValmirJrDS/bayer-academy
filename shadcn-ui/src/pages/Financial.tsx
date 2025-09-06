import { useState, useMemo } from 'react';
import { Search, Filter, DollarSign, TrendingUp, Users, AlertTriangle } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { payments, dashboardMetrics } from '@/data/mockData';
import { Payment } from '@/types';

export default function Financial() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedPayments, setSelectedPayments] = useState<string[]>([]);

  const filteredPayments = useMemo(() => {
    return payments.filter(payment => {
      const matchesSearch = payment.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          payment.sport.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const currentMonthPayments = payments.filter(p => p.month === '2024-09');
  const paidCount = currentMonthPayments.filter(p => p.status === 'paid').length;
  const overdueCount = currentMonthPayments.filter(p => p.status === 'overdue').length;
  const pendingCount = currentMonthPayments.filter(p => p.status === 'pending').length;

  const handleSelectPayment = (paymentId: string) => {
    setSelectedPayments(prev => 
      prev.includes(paymentId) 
        ? prev.filter(id => id !== paymentId)
        : [...prev, paymentId]
    );
  };

  const handleMarkAsPaid = (paymentIds: string[]) => {
    // In a real app, this would update the backend
    console.log('Marking as paid:', paymentIds);
    setSelectedPayments([]);
  };

  const handleSendReminder = (paymentIds: string[]) => {
    // In a real app, this would send notifications
    console.log('Sending reminders:', paymentIds);
    setSelectedPayments([]);
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
        <div>
          <h1 className="text-3xl font-bold text-white">Financeiro</h1>
          <p className="text-gray-400 mt-2">Controle de mensalidades e relatórios financeiros</p>
        </div>

        {/* Metrics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Receita Total"
            value={formatCurrency(dashboardMetrics.totalRevenue)}
            change="+12.3% vs mês anterior"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Taxa de Inadimplência"
            value={`${dashboardMetrics.defaultRate}%`}
            change="-2.1% vs mês anterior"
            changeType="positive"
            icon={AlertTriangle}
          />
          <MetricCard
            title="Alunos Ativos"
            value={dashboardMetrics.activeStudents}
            change={`${dashboardMetrics.enrollmentGrowth}% crescimento`}
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Projeção Mensal"
            value={formatCurrency(dashboardMetrics.projectedRevenue)}
            change="Baseado no histórico"
            changeType="neutral"
            icon={TrendingUp}
          />
        </div>

        {/* Status Overview */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Status das Mensalidades - Setembro 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{paidCount}</div>
                <div className="text-sm text-gray-400">Pagamentos em Dia</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">{pendingCount}</div>
                <div className="text-sm text-gray-400">A Vencer</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">{overdueCount}</div>
                <div className="text-sm text-gray-400">Em Atraso</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Filters and Actions */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-1 gap-4 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar por aluno ou modalidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-700 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-gray-900 border-gray-700 text-white">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-gray-900 border-gray-700">
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="paid">Pagos</SelectItem>
                <SelectItem value="pending">A Vencer</SelectItem>
                <SelectItem value="overdue">Em Atraso</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {selectedPayments.length > 0 && (
            <div className="flex gap-2">
              <Button
                onClick={() => handleMarkAsPaid(selectedPayments)}
                className="bg-green-600 hover:bg-green-700"
              >
                Marcar como Pago ({selectedPayments.length})
              </Button>
              <Button
                onClick={() => handleSendReminder(selectedPayments)}
                variant="outline"
                className="border-gray-700 text-white hover:bg-gray-800"
              >
                Enviar Cobrança ({selectedPayments.length})
              </Button>
            </div>
          )}
        </div>

        {/* Payments Table */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Lista de Mensalidades</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">
                      <input
                        type="checkbox"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedPayments(filteredPayments.map(p => p.id));
                          } else {
                            setSelectedPayments([]);
                          }
                        }}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                    </th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Aluno</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Modalidade</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Valor</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Vencimento</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Status</th>
                    <th className="text-left py-3 px-4 text-gray-300 font-medium">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPayments.map((payment) => (
                    <tr key={payment.id} className="border-b border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4">
                        <input
                          type="checkbox"
                          checked={selectedPayments.includes(payment.id)}
                          onChange={() => handleSelectPayment(payment.id)}
                          className="rounded border-gray-600 bg-gray-800"
                        />
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-white font-medium">{payment.studentName}</div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className="border-gray-600 text-gray-300">
                          {payment.sport}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-white font-medium">
                        {formatCurrency(payment.amount)}
                      </td>
                      <td className="py-3 px-4 text-gray-300">
                        {new Date(payment.dueDate).toLocaleDateString('pt-BR')}
                      </td>
                      <td className="py-3 px-4">
                        <StatusBadge status={payment.status} />
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {payment.status !== 'paid' && (
                            <Button
                              size="sm"
                              onClick={() => handleMarkAsPaid([payment.id])}
                              className="bg-green-600 hover:bg-green-700 text-xs"
                            >
                              Pagar
                            </Button>
                          )}
                          {payment.status === 'overdue' && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleSendReminder([payment.id])}
                              className="border-gray-600 text-gray-300 hover:bg-gray-800 text-xs"
                            >
                              Cobrar
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}