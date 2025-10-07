
import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { RabItem } from '../types';
import { DownloadIcon, BotIcon } from '../components/icons/IconComponents';
import { getRabSuggestion } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import { useI18n } from '../contexts/I18nContext';

const RABGenerator: React.FC = () => {
    const { t } = useI18n();
    const [items, setItems] = useState<RabItem[]>([]);
    const [currentItem, setCurrentItem] = useState({ description: '', quantity: 1, unit: '', unitPrice: 0 });
    const [isSuggestionLoading, setIsSuggestionLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setCurrentItem(prev => ({ ...prev, [name]: value }));
    };

    const handleGetSuggestion = async () => {
        if (!currentItem.description) return;
        setIsSuggestionLoading(true);
        try {
            const suggestion = await getRabSuggestion(currentItem.description);
            setCurrentItem(prev => ({
                ...prev,
                unitPrice: suggestion.unitPrice,
                unit: suggestion.unit
            }));
        } catch (error) {
            console.error("Error getting RAB suggestion:", error);
            alert(t('failedGetAISuggestion'));
        } finally {
            setIsSuggestionLoading(false);
        }
    };

    const handleAddItem = () => {
        if (!currentItem.description || !currentItem.unit || currentItem.quantity <= 0 || currentItem.unitPrice <= 0) {
            alert(t('fillFieldsError'));
            return;
        }
        const newItem: RabItem = {
            id: Date.now(),
            ...currentItem,
            quantity: Number(currentItem.quantity),
            unitPrice: Number(currentItem.unitPrice),
            total: Number(currentItem.quantity) * Number(currentItem.unitPrice),
        };
        setItems(prev => [...prev, newItem]);
        setCurrentItem({ description: '', quantity: 1, unit: '', unitPrice: 0 }); // Reset form
    };

    const grandTotal = items.reduce((acc, item) => acc + item.total, 0);

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('rabTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('rabDescription')}</p>

            <Card>
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('addNewItem')}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                    <div className="lg:col-span-2">
                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('description')}</label>
                        <div className="relative">
                            <input type="text" name="description" value={currentItem.description} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                            <Button type="button" onClick={handleGetSuggestion} disabled={isSuggestionLoading || !currentItem.description} size="sm" variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 !py-1">
                                {isSuggestionLoading ? <Spinner /> : <BotIcon className="w-4 h-4 mr-1" />}
                                {t('aiSuggestion')}
                            </Button>
                        </div>
                    </div>
                    <div>
                        <label htmlFor="quantity" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('quantity')}</label>
                        <input type="number" name="quantity" value={currentItem.quantity} onChange={handleInputChange} min="1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="unit" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('unit')}</label>
                        <input type="text" name="unit" value={currentItem.unit} onChange={handleInputChange} placeholder={t('unitPlaceholder')} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                    <div>
                        <label htmlFor="unitPrice" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('unitPrice')}</label>
                        <input type="number" name="unitPrice" value={currentItem.unitPrice} onChange={handleInputChange} min="0" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" />
                    </div>
                </div>
                 <div className="mt-4 flex justify-end">
                    <Button onClick={handleAddItem}>{t('addItem')}</Button>
                </div>
            </Card>
            
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('costDetails')}</h2>
                    <div className="flex space-x-2">
                        <Button variant="secondary" size="sm"><DownloadIcon className="w-4 h-4 mr-2"/> PDF</Button>
                        <Button variant="secondary" size="sm"><DownloadIcon className="w-4 h-4 mr-2"/> Excel</Button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th scope="col" className="px-6 py-3">{t('description')}</th>
                                <th scope="col" className="px-6 py-3 text-right">{t('quantity')}</th>
                                <th scope="col" className="px-6 py-3">{t('unit')}</th>
                                <th scope="col" className="px-6 py-3 text-right">{t('unitPrice')} (Rp)</th>
                                <th scope="col" className="px-6 py-3 text-right">{t('total')} (Rp)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">{item.description}</td>
                                    <td className="px-6 py-4 text-right">{item.quantity.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4">{item.unit}</td>
                                    <td className="px-6 py-4 text-right">{item.unitPrice.toLocaleString('id-ID')}</td>
                                    <td className="px-6 py-4 text-right">{item.total.toLocaleString('id-ID')}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr className="font-semibold text-gray-900 dark:text-white bg-gray-50 dark:bg-gray-700">
                                <th scope="row" colSpan={4} className="px-6 py-3 text-base text-right">{t('grandTotal')}</th>
                                <td className="px-6 py-3 text-right text-base">{grandTotal.toLocaleString('id-ID')}</td>
                            </tr>
                        </tfoot>
                    </table>
                     {items.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">{t('noItemsAdded')}</p>}
                </div>
            </Card>
        </div>
    );
};

export default RABGenerator;
