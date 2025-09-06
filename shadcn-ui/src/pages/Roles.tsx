import { useState } from 'react';
import { Plus, Edit, Trash2, Shield, Users } from 'lucide-react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { roles, users } from '@/data/authData';

export default function Roles() {
  const handleDeleteRole = (roleId: string) => {
    const role = roles.find(r => r.id === roleId);
    const usersWithRole = users.filter(u => u.role === role?.name);
    
    if (usersWithRole.length > 0) {
      alert(`Não é possível excluir esta função pois existem ${usersWithRole.length} usuário(s) associado(s).`);
      return;
    }
    
    if (confirm('Tem certeza que deseja excluir esta função?')) {
      console.log('Deleting role:', roleId);
      // In a real app, this would call an API
    }
  };

  const getUserCountByRole = (roleName: string) => {
    return users.filter(u => u.role === roleName).length;
  };

  return (
    <Layout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Funções</h1>
            <p className="text-gray-400 mt-2">Gestão de funções e permissões do sistema</p>
          </div>
          <Button className="bg-red-600 hover:bg-red-700">
            <Plus className="h-4 w-4 mr-2" />
            Nova Função
          </Button>
        </div>

        {/* Stats */}
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Shield className="h-8 w-8 text-green-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Total de Funções</p>
                  <p className="text-2xl font-bold text-white">{roles.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900/50 border-gray-800">
            <CardContent className="p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-400" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-400">Usuários Cadastrados</p>
                  <p className="text-2xl font-bold text-white">{users.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Roles Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {roles.map((role) => {
            const userCount = getUserCountByRole(role.name);
            
            return (
              <Card key={role.id} className="bg-gray-900/50 border-gray-800 hover:border-gray-700 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                        <Shield className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">{role.name}</h3>
                        <p className="text-gray-400 text-sm">{role.description}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div>
                      <label className="text-sm text-gray-400">Usuários com esta função</label>
                      <p className="text-white font-medium">{userCount} usuário(s)</p>
                    </div>
                    
                    <div>
                      <label className="text-sm text-gray-400">Permissões</label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {role.permissions.map(permission => (
                          <Badge key={permission} variant="outline" className="border-blue-600 text-blue-400 text-xs">
                            {permission === 'all' ? 'Todas' : permission}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 border-gray-600 text-gray-300 hover:bg-gray-800"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Editar
                    </Button>
                    {role.name !== 'Administrador' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteRole(role.id)}
                        className="border-red-600 text-red-400 hover:bg-red-600/10"
                        disabled={userCount > 0}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Permissions Info */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Informações sobre Permissões</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h4 className="text-white font-medium mb-2">Permissões Disponíveis:</h4>
                <div className="space-y-1 text-sm text-gray-400">
                  <p><strong>all:</strong> Acesso completo ao sistema</p>
                  <p><strong>students:read:</strong> Visualizar alunos</p>
                  <p><strong>students:write:</strong> Editar alunos</p>
                  <p><strong>financial:read:</strong> Visualizar financeiro</p>
                  <p><strong>financial:write:</strong> Editar financeiro</p>
                  <p><strong>calendar:read:</strong> Visualizar agenda</p>
                  <p><strong>calendar:write:</strong> Editar agenda</p>
                  <p><strong>enrollment:write:</strong> Realizar matrículas</p>
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Usuários por Função:</h4>
                <div className="space-y-2">
                  {roles.map(role => (
                    <div key={role.id} className="flex justify-between items-center">
                      <span className="text-gray-300">{role.name}</span>
                      <Badge variant="outline" className="border-gray-600 text-gray-300">
                        {getUserCountByRole(role.name)} usuário(s)
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}