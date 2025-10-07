
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { useI18n } from '../contexts/I18nContext';

const ForgotPassword = () => {
    const { t } = useI18n();

    return (
        <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            {t('forgotPasswordTitle')}
                        </h1>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                           {t('forgotPasswordInstruction')}
                        </p>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('yourEmail')}</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="nama@email.com" required />
                            </div>
                            <Button type="submit" className="w-full">{t('sendInstructionsButton')}</Button>
                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                {t('rememberedPassword')} <Link to="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">{t('loginLink')}</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ForgotPassword;
