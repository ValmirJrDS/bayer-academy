import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  DollarSign, 
  Calendar, 
  Users, 
  UserPlus,
  GraduationCap,
  Settings,
  Shield,
  Trophy,
  LogOut,
  Menu,
  X,
  ChevronDown,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const navigation = [
  { name: 'Home', href: '/', icon: Home, type: 'single' },
  {
    name: 'Administração',
    icon: Settings,
    type: 'dropdown',
    items: [
      { name: 'Financeiro', href: '/financial', icon: DollarSign },
      { name: 'Relatórios', href: '/reports', icon: BarChart3 },
      { name: 'Funções', href: '/roles', icon: Shield },
      { name: 'Funcionários', href: '/employees', icon: Users },
      { name: 'Modalidades', href: '/modalities', icon: Trophy },
    ]
  },
  {
    name: 'Alunos',
    icon: Users,
    type: 'dropdown',
    items: [
      { name: 'Professores', href: '/teachers', icon: GraduationCap },
      { name: 'Matrícula', href: '/enrollment', icon: UserPlus },
      { name: 'Alunos Geral', href: '/students', icon: Users },
      { name: 'Agenda', href: '/calendar', icon: Calendar },
    ]
  },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  const isActiveDropdown = (items: any[]) => {
    return items.some(item => location.pathname === item.href);
  };

  return (
    <header className="bg-black border-b border-red-900/20">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="text-2xl font-bold text-white">
              Sport<span className="text-red-500">Academy</span>
            </span>
          </Link>
        </div>
        
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        
        <div className="hidden lg:flex lg:gap-x-2">
          {navigation.map((item) => {
            const Icon = item.icon;
            
            if (item.type === 'single') {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 text-sm font-semibold leading-6 px-3 py-2 rounded-md transition-colors ${
                    isActive
                      ? 'text-red-500 bg-red-500/10'
                      : 'text-gray-300 hover:text-white hover:bg-gray-800'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {item.name}
                </Link>
              );
            }

            if (item.type === 'dropdown') {
              const isActive = isActiveDropdown(item.items);
              return (
                <DropdownMenu key={item.name}>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`flex items-center gap-2 text-sm font-semibold leading-6 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'text-red-500 bg-red-500/10'
                          : 'text-gray-300 hover:text-white hover:bg-gray-800'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.name}
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-gray-900 border-gray-700" align="start">
                    {item.items.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = location.pathname === subItem.href;
                      return (
                        <DropdownMenuItem key={subItem.name} asChild>
                          <Link
                            to={subItem.href}
                            className={`flex items-center gap-2 px-3 py-2 text-sm transition-colors ${
                              isSubActive
                                ? 'text-red-400 bg-red-500/10'
                                : 'text-gray-300 hover:text-white hover:bg-gray-800'
                            }`}
                          >
                            <SubIcon className="h-4 w-4" />
                            {subItem.name}
                          </Link>
                        </DropdownMenuItem>
                      );
                    })}
                  </DropdownMenuContent>
                </DropdownMenu>
              );
            }

            return null;
          })}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4">
          <div className="text-sm text-gray-300">
            Olá, <span className="text-white font-medium">{user?.fullName}</span>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-gray-700 text-gray-300 hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sair
          </Button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link to="/" className="-m-1.5 p-1.5" onClick={() => setMobileMenuOpen(false)}>
                <span className="text-xl font-bold text-white">
                  Sport<span className="text-red-500">Academy</span>
                </span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => {
                    const Icon = item.icon;
                    
                    if (item.type === 'single') {
                      const isActive = location.pathname === item.href;
                      return (
                        <Link
                          key={item.name}
                          to={item.href}
                          className={`flex items-center gap-3 rounded-lg px-3 py-2 text-base font-semibold leading-7 transition-colors ${
                            isActive
                              ? 'text-red-500 bg-red-500/10'
                              : 'text-gray-300 hover:text-white hover:bg-gray-800'
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <Icon className="h-5 w-5" />
                          {item.name}
                        </Link>
                      );
                    }

                    if (item.type === 'dropdown') {
                      return (
                        <div key={item.name} className="space-y-1">
                          <div className="flex items-center gap-3 px-3 py-2 text-base font-semibold text-gray-300">
                            <Icon className="h-5 w-5" />
                            {item.name}
                          </div>
                          <div className="ml-6 space-y-1">
                            {item.items.map((subItem) => {
                              const SubIcon = subItem.icon;
                              const isSubActive = location.pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                                    isSubActive
                                      ? 'text-red-500 bg-red-500/10'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800'
                                  }`}
                                  onClick={() => setMobileMenuOpen(false)}
                                >
                                  <SubIcon className="h-4 w-4" />
                                  {subItem.name}
                                </Link>
                              );
                            })}
                          </div>
                        </div>
                      );
                    }

                    return null;
                  })}
                </div>
                <div className="py-6">
                  <div className="text-sm text-gray-300 mb-4">
                    Olá, <span className="text-white font-medium">{user?.fullName}</span>
                  </div>
                  <Button
                    variant="outline"
                    onClick={handleLogout}
                    className="w-full border-gray-700 text-gray-300 hover:bg-gray-800"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}