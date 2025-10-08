import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { PriceReference } from '../types';
import { SearchIcon, BotIcon } from '../components/icons/IconComponents';
import { getPriceSuggestion } from '../services/geminiService';
import Spinner from '../components/ui/Spinner';
import { useI18n } from '../contexts/I18nContext';

const mockInitialReferences: PriceReference[] = [
    { id: 1, name: 'Laptop Spek Tinggi', category: 'Elektronik', region: 'Jakarta', price: 15000000, source: 'TokoKomputer.com', notes: 'Harga promo bulan Oktober', addedDate: '2023-10-20' },
    { id: 2, name: 'Kertas A4 80gr', category: 'ATK', region: 'Surabaya', price: 55000, source: 'Supplier ATK Utama', notes: 'Harga per rim', addedDate: '2023-10-18' },
    { id: 3, name: 'Semen Gresik 50kg', category: 'Bahan Bangunan', region: 'Bandung', price: 72000, source: 'Toko Bangunan Jaya', notes: '', addedDate: '2023-10-15' },
];

const mockCategories = ['Elektronik', 'ATK', 'Bahan Bangunan', 'Furnitur', 'Lainnya'];
const mockRegions = ['Jakarta', 'Surabaya', 'Bandung', 'Medan', 'Makassar'];

const PriceReferencePage: React.FC = () => {
    const { t } = useI18n();
    const [activeTab, setActiveTab] = useState<'check' | 'add'>('check');
    const [references, setReferences] = useState<PriceReference[]>(mockInitialReferences);
    const [searchTerm, setSearchTerm] = useState('');
    const [isPriceLoading, setIsPriceLoading] = useState(false);
    const [aiPriceSuggestion, setAiPriceSuggestion] = useState<number | null>(null);

    const initialFormState = {
        name: '',
        category: mockCategories[0],
        region: mockRegions[0],
        price: '',
        source: '',
        notes: ''
    };
    const [formState, setFormState] = useState(initialFormState);
    const [formErrors, setFormErrors] = useState<Partial<typeof initialFormState>>({});

    const filteredReferences = useMemo(() => {
        if (!searchTerm) return references;
        return references.filter(ref =>
            ref.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, references]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState(prev => ({ ...prev, [name]: value }));
        setAiPriceSuggestion(null); // Clear suggestion on input change
    };

    const handlePriceCheck = async () => {
        if (!formState.name || !formState.region) {
            alert(t('fillNameAndRegion'));
            return;
        }
        setIsPriceLoading(true);
        setAiPriceSuggestion(null);
        try {
            const result = await getPriceSuggestion(formState.name, formState.region);
            setAiPriceSuggestion(result.suggestedPrice);
        } catch (error) {
            console.error("Error getting price suggestion:", error);
            alert(t('failedGetAISuggestion'));
        } finally {
            setIsPriceLoading(false);
        }
    };


    const validateForm = () => {
        const errors: Partial<typeof initialFormState> = {};
        if (!formState.name.trim()) errors.name = t('validation.itemNameRequired');
        if (!formState.source.trim()) errors.source = t('validation.sourceRequired');
        if (!formState.price || Number(formState.price) <= 0) errors.price = t('validation.priceRequired');
        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleAddReference = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;

        const newReference: PriceReference = {
            id: Date.now(),
            name: formState.name,
            category: formState.category,
            region: formState.region,
            price: Number(formState.price),
            source: formState.source,
            notes: formState.notes,
            addedDate: new Date().toISOString().split('T')[0]
        };

        setReferences(prev => [newReference, ...prev]);
        setFormState(initialFormState);
        setAiPriceSuggestion(null);
        alert(t('referenceAddedSuccess'));
        setActiveTab('check');
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('priceReferenceTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('priceReferenceDescription')}</p>

            <div className="border-b border-gray-200 dark:border-gray-700">
                <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                    <button
                        onClick={() => setActiveTab('check')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'check' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        {t('checkPriceTab')}
                    </button>
                    <button
                        onClick={() => setActiveTab('add')}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'add' ? 'border-primary-500 text-primary-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-200'}`}
                    >
                        {t('addReferenceTab')}
                    </button>
                </nav>
            </div>

            {activeTab === 'check' && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('checkPriceTab')}</h2>
                     <div className="relative w-full md:w-1/2 mb-4">
                        <input
                            type="text"
                            placeholder={t('searchItemName')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <SearchIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">{t('itemName')}</th>
                                    <th scope="col" className="px-6 py-3">{t('itemCategory')}</th>
                                    <th scope="col" className="px-6 py-3">{t('region')}</th>
                                    <th scope="col" className="px-6 py-3 text-right">{t('price')}</th>
                                    <th scope="col" className="px-6 py-3">{t('source')}</th>
                                    <th scope="col" className="px-6 py-3">{t('reportDate')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredReferences.map((ref) => (
                                    <tr key={ref.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{ref.name}</td>
                                        <td className="px-6 py-4">{ref.category}</td>
                                        <td className="px-6 py-4">{ref.region}</td>
                                        <td className="px-6 py-4 text-right">{ref.price.toLocaleString('id-ID')}</td>
                                        <td className="px-6 py-4">{ref.source}</td>
                                        <td className="px-6 py-4">{ref.addedDate}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {filteredReferences.length === 0 && <p className="text-center py-8 text-gray-500 dark:text-gray-400">{t('priceInfoNotFound')}</p>}
                    </div>
                </Card>
            )}

            {activeTab === 'add' && (
                <Card>
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">{t('addReferenceFormTitle')}</h2>
                    <form onSubmit={handleAddReference} className="space-y-4" noValidate>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('itemName')}</label>
                                <input type="text" name="name" id="name" value={formState.name} onChange={handleInputChange} className={`bg-gray-50 border ${formErrors.name ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`} />
                                {formErrors.name && <p className="mt-1 text-xs text-red-500">{formErrors.name}</p>}
                            </div>
                            <div>
                                <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('itemCategory')}</label>
                                <select name="category" id="category" value={formState.category} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    {mockCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                                </select>
                            </div>
                             <div>
                                <label htmlFor="region" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('region')}</label>
                                <select name="region" id="region" value={formState.region} onChange={handleInputChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white">
                                    {mockRegions.map(reg => <option key={reg} value={reg}>{reg}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('price')}</label>
                                <div className="relative">
                                     <input type="number" name="price" id="price" value={formState.price} onChange={handleInputChange} placeholder="contoh: 50000" className={`bg-gray-50 border ${formErrors.price ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`} />
                                     <Button type="button" onClick={handlePriceCheck} disabled={isPriceLoading || !formState.name} size="sm" variant="secondary" className="absolute right-2 top-1/2 -translate-y-1/2 !py-1">
                                        {isPriceLoading ? <Spinner /> : <BotIcon className="w-4 h-4 mr-1" />}
                                        {t('aiPriceCheck')}
                                    </Button>
                                </div>
                                 {formErrors.price && <p className="mt-1 text-xs text-red-500">{formErrors.price}</p>}
                                 {aiPriceSuggestion !== null && (
                                     <p className="mt-2 text-sm text-primary-600 dark:text-primary-400">
                                         {t('aiPriceSuggestion')}: <strong>Rp{aiPriceSuggestion.toLocaleString('id-ID')}</strong>
                                     </p>
                                 )}
                            </div>
                             <div>
                                <label htmlFor="source" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('priceSourceInfo')}</label>
                                <input type="text" name="source" id="source" value={formState.source} onChange={handleInputChange} placeholder={t('sourcePlaceholder')} className={`bg-gray-50 border ${formErrors.source ? 'border-red-500' : 'border-gray-300'} text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white`} />
                                {formErrors.source && <p className="mt-1 text-xs text-red-500">{formErrors.source}</p>}
                            </div>
                        </div>
                         <div>
                            <label htmlFor="notes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{t('additionalNotes')}</label>
                            <textarea name="notes" id="notes" value={formState.notes} onChange={handleInputChange} rows={3} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder={t('notesPlaceholder')}></textarea>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">{t('clickAddReference')}</Button>
                        </div>
                    </form>
                </Card>
            )}

        </div>
    );
};

export default PriceReferencePage;