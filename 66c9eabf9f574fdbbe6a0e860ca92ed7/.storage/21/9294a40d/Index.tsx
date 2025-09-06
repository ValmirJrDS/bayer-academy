import { Link } from 'react-router-dom';
import { DollarSign, Calendar, Users, UserPlus, TrendingUp, AlertTriangle, ArrowRight } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import MetricCard from '@/components/ui/MetricCard';
import StatusBadge from '@/components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { dashboardMetrics, payments, events, allStudents } from '@/data/mockData';

export default function Index() {
  const currentMonthPayments = payments.filter(p => p.month === '2024-09');
  const overduePayments = currentMonthPayments.filter(p => p.status === 'overdue');
  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(amount);
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Welcome Header */}
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            Bem-vindo ao <span className="text-red-500">SportAcademy</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Sistema completo de gestão para academias esportivas infantojuvenis. 
            Controle financeiro, agenda e cadastro de alunos em uma plataforma moderna.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard
            title="Receita Total"
            value={formatCurrency(dashboardMetrics.totalRevenue)}
            change="+12.3% vs mês anterior"
            changeType="positive"
            icon={DollarSign}
          />
          <MetricCard
            title="Alunos Ativos"
            value={dashboardMetrics.activeStudents}
            change={`${dashboardMetrics.enrollmentGrowth}% crescimento`}
            changeType="positive"
            icon={Users}
          />
          <MetricCard
            title="Taxa de Inadimplência"
            value={`${dashboardMetrics.defaultRate}%`}
            change="-2.1% vs mês anterior"
            changeType="positive"
            icon={AlertTriangle}
          />
          <MetricCard
            title="Projeção Mensal"
            value={formatCurrency(dashboardMetrics.projectedRevenue)}
            change="Baseado no histórico"
            changeType="neutral"
            icon={TrendingUp}
          />
        </div>

        {/* Quick Actions */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Link to="/financial">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <DollarSign className="h-8 w-8 text-green-400 mb-2" />
                    <h3 className="font-semibold text-white">Financeiro</h3>
                    <p className="text-sm text-gray-400">Controle de mensalidades</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/calendar">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Calendar className="h-8 w-8 text-blue-400 mb-2" />
                    <h3 className="font-semibold text-white">Agenda</h3>
                    <p className="text-sm text-gray-400">Eventos e atividades</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/students">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Users className="h-8 w-8 text-purple-400 mb-2" />
                    <h3 className="font-semibold text-white">Alunos</h3>
                    <p className="text-sm text-gray-400">Gestão de cadastros</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link to="/enrollment">
            <Card className="bg-gray-900/50 border-gray-800 hover:border-red-500/50 transition-all cursor-pointer group">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <UserPlus className="h-8 w-8 text-yellow-400 mb-2" />
                    <h3 className="font-semibold text-white">Matrícula</h3>
                    <p className="text-sm text-gray-400">Cadastrar novo aluno</p>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-red-400 transition-colors" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Recent Overdue Payments */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Pagamentos em Atraso</CardTitle>
              <Link to="/financial">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Ver Todos
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {overduePayments.slice(0, 5).map(payment => (
                  <div key={payment.id} className="flex items-center justify-between p-3 bg-red-500/10 rounded-lg border border-red-500/20">
                    <div>
                      <p className="text-white font-medium">{payment.studentName}</p>
                      <p className="text-sm text-gray-400">{payment.sport}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-semibold">{formatCurrency(payment.amount)}</p>
                      <StatusBadge status={payment.status} />
                    </div>
                  </div>
                ))}
                {overduePayments.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-400">Nenhum pagamento em atraso! 🎉</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events */}
          <Card className="bg-gray-900/50 border-gray-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Próximos Eventos</CardTitle>
              <Link to="/calendar">
                <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  Ver Agenda
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <div className="flex items-center space-x-3">
                      <div className="text-center">
                        <div className="text-white font-bold">
                          {new Date(event.date).getDate()}
                        </div>
                        <div className="text-gray-400 text-xs">
                          {new Date(event.date).toLocaleDateString('pt-BR', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <p className="text-white font-medium">{event.title}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="border-red-600 text-red-400 text-xs">
                            {event.sport}
                          </Badge>
                          <span className="text-gray-400 text-sm">
                            {event.startTime}
                          </span>
                        </div>
                      </div>
                    </div>
                    <StatusBadge status={event.type} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Students */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-white">Alunos Recentes</CardTitle>
            <Link to="/students">
              <Button variant="outline" size="sm" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                Ver Todos
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {allStudents.slice(0, 6).map(student => (
                <div key={student.id} className="flex items-center space-x-3 p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                  <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {student.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">{student.name}</p>
                    <div className="flex items-center gap-1 mt-1">
                      {student.sports.slice(0, 2).map(sport => (
                        <Badge key={sport} variant="outline" className="border-red-600 text-red-400 text-xs">
                          {sport}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <StatusBadge status={student.status} />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}