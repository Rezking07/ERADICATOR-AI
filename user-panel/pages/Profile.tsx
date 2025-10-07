
import React from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useTheme } from '../contexts/ThemeContext';
import { useI18n } from '../contexts/I18nContext';

const Profile: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    const { t } = useI18n();

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('profileTitle')}</h1>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('personalInfo')}</h2>
                <div className="flex items-center space-x-6 mb-6">
                    <img className="w-24 h-24 rounded-full" src="https://picsum.photos/200" alt="Profile"/>
                    <div>
                        <Button variant="secondary">{t('uploadPhoto')}</Button>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{t('uploadPhotoHint')}</p>
                    </div>
                </div>
                <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="fullName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('fullName')}</label>
                            <input type="text" id="fullName" defaultValue="John Doe" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('emailAddress')}</label>
                            <input type="email" id="email" defaultValue="john.doe@example.com" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button>{t('saveChanges')}</Button>
                    </div>
                </form>
            </Card>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('changePassword')}</h2>
                <form className="space-y-4">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="current_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('currentPassword')}</label>
                            <input type="password" id="current_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                        <div>
                            <label htmlFor="new_password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('newPassword')}</label>
                            <input type="password" id="new_password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                        </div>
                    </div>
                    <div className="pt-2">
                        <Button>{t('updatePassword')}</Button>
                    </div>
                </form>
            </Card>

             <Card>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('displaySettings')}</h2>
                <div className="flex items-center justify-between">
                    <p className="text-gray-700 dark:text-gray-300">{t('darkMode')}</p>
                    <label htmlFor="theme-toggle" className="inline-flex relative items-center cursor-pointer">
                        <input type="checkbox" id="theme-toggle" className="sr-only peer" checked={theme === 'dark'} onChange={toggleTheme} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                    </label>
                </div>
            </Card>

        </div>
    );
};

export default Profile;
