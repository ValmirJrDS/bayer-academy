import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, User, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!username || !password) {
      setError('Por favor, preencha todos os campos');
      setIsLoading(false);
      return;
    }

    const success = login(username, password);
    
    if (success) {
      navigate('/');
    } else {
      setError('Usuário ou senha incorretos');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Sport<span className="text-red-500">Academy</span>
          </h1>
          <p className="text-gray-400">Sistema de Gestão Esportiva</p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-900/50 border-gray-800">
          <CardHeader>
            <CardTitle className="text-white text-center">Acesso ao Sistema</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert className="bg-red-500/10 border-red-500/20">
                  <AlertCircle className="h-4 w-4 text-red-400" />
                  <AlertDescription className="text-red-400">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-300">Usuário</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 bg-gray-800 border-gray-700 text-white"
                    placeholder="Digite seu usuário"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-gray-800 border-gray-700 text-white"
                    placeholder="Digite sua senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 hover:bg-red-700 text-white"
              >
                {isLoading ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="text-center">
                <button
                  type="button"
                  className="text-sm text-gray-400 hover:text-red-400 transition-colors"
                  onClick={() => alert('Funcionalidade de recuperação de senha será implementada em breve')}
                >
                  Esqueceu sua senha?
                </button>
              </div>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700">
              <h4 className="text-white font-medium mb-2">Credenciais de Demonstração:</h4>
              <div className="text-sm text-gray-400 space-y-1">
                <p><strong>Administrador:</strong> admin / admin</p>
                <p><strong>Professor:</strong> carlos.silva / 123456</p>
                <p><strong>Recepcionista:</strong> maria.santos / 123456</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}