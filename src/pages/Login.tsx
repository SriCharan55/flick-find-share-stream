
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Layout } from '@/components/Layout/Layout';
import { LoginForm } from '@/components/LoginForm';
import { RegisterForm } from '@/components/RegisterForm';
import { useAuth } from '@/contexts/AuthContext';

const Login = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  
  // If already logged in, redirect to home
  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  
  return (
    <Layout>
      <div className="container max-w-md mx-auto px-4 py-12">
        <div className="space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-muted-foreground mt-2">
              Sign in to access your watchlist and personalized recommendations
            </p>
          </div>
          
          <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              <TabsContent value="login">
                <LoginForm />
              </TabsContent>
              <TabsContent value="register">
                <RegisterForm />
              </TabsContent>
            </Tabs>
            
            <div className="mt-6 text-center text-sm">
              <p className="text-muted-foreground">
                {activeTab === 'login' ? "Don't have an account?" : "Already have an account?"}
                <button
                  className="ml-1 text-primary hover:underline"
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                >
                  {activeTab === 'login' ? 'Register' : 'Login'}
                </button>
              </p>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>
              By continuing, you agree to our
              <a href="#" className="mx-1 text-primary hover:underline">Terms of Service</a>
              and
              <a href="#" className="ml-1 text-primary hover:underline">Privacy Policy</a>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
