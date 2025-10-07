
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { GoogleIcon } from '../components/icons/IconComponents';
import { useI18n } from '../contexts/I18nContext';

const Register: React.FC = () => {
    const navigate = useNavigate();
    const { t } = useI18n();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateForm = () => {
        const { fullName, email, password, confirmPassword } = formData;
        const newErrors = { fullName: '', email: '', password: '', confirmPassword: '' };
        let isValid = true;

        if (!fullName.trim()) {
            newErrors.fullName = t('validation.fullNameRequired');
            isValid = false;
        }

        if (!email.trim()) {
            newErrors.email = t('validation.emailRequired');
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = t('validation.emailInvalid');
            isValid = false;
        }

        if (!password) {
            newErrors.password = t('validation.passwordRequired');
            isValid = false;
        } else if (password.length < 8) {
            newErrors.password = t('validation.passwordMinLength');
            isValid = false;
        }
        
        if (!confirmPassword) {
            newErrors.confirmPassword = t('validation.confirmPasswordRequired');
            isValid = false;
        } else if (password !== confirmPassword) {
            newErrors.confirmPassword = t('validation.passwordMismatch');
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
            // Mock registration logic
            console.log("Registration successful with data:", formData);
            localStorage.setItem('authToken', 'mock-jwt-token');
            navigate('/dashboard');
        }
    };

    const handleGoogleRegister = () => {
        // Simulate successful Google registration/login
        console.log("Simulating Google Sign-Up...");
        localStorage.setItem('authToken', 'mock-google-jwt-token');
        navigate('/dashboard');
    };
    
    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('registerTitle')}
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={handleRegister} noValidate>
                            <div>
                                <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('fullName')}</label>
                                <input type="text" name="fullName" id="fullName" value={formData.fullName} onChange={handleInputChange} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.fullName ? 'border-red-500 focus:border-red-500' : ''}`} placeholder="John Doe" required />
                                {errors.fullName && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.fullName}</p>}
                            </div>
                             <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('yourEmail')}</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.email ? 'border-red-500 focus:border-red-500' : ''}`} placeholder="nama@email.com" required />
                                {errors.email && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.email}</p>}
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('password')}</label>
                                <input type="password" name="password" id="password" value={formData.password} onChange={handleInputChange} placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.password ? 'border-red-500 focus:border-red-500' : ''}`} required />
                                {errors.password && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.password}</p>}
                            </div>
                            <div>
                                <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('confirmPassword')}</label>
                                <input type="password" name="confirmPassword" id="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="••••••••" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white ${errors.confirmPassword ? 'border-red-500 focus:border-red-500' : ''}`} required />
                                {errors.confirmPassword && <p className="mt-2 text-sm text-red-600 dark:text-red-500">{errors.confirmPassword}</p>}
                            </div>
                            <Button type="submit" className="w-full">{t('createAccountButton')}</Button>
                            
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

                            <Button type="button" variant="secondary" className="w-full !mt-6" onClick={handleGoogleRegister}>
                                <GoogleIcon className="w-5 h-5 mr-3" />
                                {t('registerWithGoogle')}
                            </Button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {t('haveAccount')} <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t('loginLink')}</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Register;
