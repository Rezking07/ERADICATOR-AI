import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { GoogleIcon } from '../components/ui/Icons';

const Login: React.FC = () => {
    const [email, setEmail] = useState('admin@eradicator.id');
    const [password, setPassword] = useState('password'); // Dummy password
    const { login } = useAuth();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        login(email);
    };

    const handleGoogleLogin = () => {
        // Simulate Google Login for the mock admin user
        login('admin@eradicator.id');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-base-100 to-base-200 dark:from-dark-900 dark:to-dark-800 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white dark:bg-dark-800/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 border border-transparent dark:border-dark-700">
                    <div className="text-center mb-8">
                        <div className="w-20 h-20 bg-gradient-to-br from-primary-dark to-primary-light rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-primary/30">
                            <i className="fas fa-shield-alt text-white text-3xl"></i>
                        </div>
                        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">ERADICATOR</h1>
                        <p className="text-text-light-secondary dark:text-gray-400">Login Panel Admin</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-2">Alamat Email</label>
                            <input 
                                type="email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-base-200 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                                placeholder="admin@eradicator.id" 
                                required 
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-2">Kata Sandi</label>
                            <input 
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg bg-base-200 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary focus:border-transparent transition-all" 
                                placeholder="••••••••" 
                                required 
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-gradient-to-r from-primary to-primary-light text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg hover:shadow-primary/30 transition-shadow"
                        >
                            Masuk ke Sistem
                        </button>
                    </form>

                    <div className="my-6 flex items-center">
                        <div className="flex-grow border-t border-base-300 dark:border-dark-600"></div>
                        <span className="flex-shrink mx-4 text-text-light-secondary dark:text-gray-400 text-sm">ATAU</span>
                        <div className="flex-grow border-t border-base-300 dark:border-dark-600"></div>
                    </div>
                    
                    <button 
                        onClick={handleGoogleLogin}
                        type="button" 
                        className="w-full flex items-center justify-center bg-white dark:bg-dark-700 border border-base-300 dark:border-dark-600 text-text-light dark:text-white py-3 px-6 rounded-lg font-semibold hover:bg-base-200 dark:hover:bg-dark-600 transition-colors"
                    >
                        <GoogleIcon className="w-5 h-5 mr-3" />
                        Masuk dengan Google
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;