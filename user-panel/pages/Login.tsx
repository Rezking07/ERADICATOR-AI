
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { GoogleIcon } from '../components/icons/IconComponents';
import { useI18n } from '../contexts/I18nContext';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useI18n();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({ email: '', password: '' });

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        if (!email) {
            newErrors.email = t('validation.emailRequired');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t('validation.emailInvalid');
            isValid = false;
        }

        if (!password) {
            newErrors.password = t('validation.passwordRequired');
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Mock login logic
            localStorage.setItem('authToken', 'mock-jwt-token');
            navigate('/dashboard');
        }
    };

    const handleGoogleLogin = () => {
        // Simulate successful Google login
        console.log("Simulating Google Sign-In...");
        localStorage.setItem('authToken', 'mock-google-jwt-token');
        navigate('/dashboard');
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('loginTitle')}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleLogin} noValidate>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('yourEmail')}</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`}
                                    placeholder="nama@email.com" 
                                    required 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('password')}</label>
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    placeholder="••••••••" 
                                    className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`}
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                    </div>
                                    <div className="ml-3 text-sm">
                                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">{t('rememberMe')}</label>
                                    </div>
                                </div>
                                <Link to="/forgot-password" className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">{t('forgotPasswordLink')}</Link>
                            </div>
                            <Button type="submit" className="w-full">{t('loginButton')}</Button>
                            
                            <div className="relative flex items-center justify-center !mt-6">
                                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                                        {t('or')}
                                    </span>
                                </div>
                            </div>

                            <Button type="button" variant="secondary" className="w-full !mt-6" onClick={handleGoogleLogin}>
                                <GoogleIcon className="w-5 h-5 mr-3" />
                                {t('loginWithGoogle')}
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {t('noAccount')} <Link to="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t('registerLink')}</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
