import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import { mockMarketPrices } from '../data/mockData';
import { MarketPrice } from '../types';
import Modal from '../components/ui/Modal';
import Pagination from '../components/ui/Pagination';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const ITEMS_PER_PAGE = 5;

const PriceForm: React.FC<{ price?: MarketPrice | null; onSave: (price: MarketPrice) => void; onCancel: () => void; }> = ({ price, onSave, onCancel }) => {
    const [formData, setFormData] = useState<MarketPrice>(price || { id: Date.now(), itemName: '', category: '', region: '', averagePrice: 0, unit: '', source: '', lastUpdated: new Date().toISOString() });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...formData, averagePrice: Number(formData.averagePrice), lastUpdated: new Date().toISOString() });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{price ? 'Ubah Harga' : 'Tambah Harga Baru'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Nama Barang/Jasa</label>
                    <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Kategori</label>
                    <input type="text" name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Wilayah</label>
                    <input type="text" name="region" value={formData.region} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Harga Rata-rata (Rp)</label>
                    <input type="number" name="averagePrice" value={formData.averagePrice} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Satuan</label>
                    <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Sumber</label>
                    <input type="text" name="source" value={formData.source} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-base-300/50 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-base-300 dark:hover:bg-dark-600 transition-colors">Batal</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Simpan Harga</button>
            </div>
        </form>
    );
};

const MarketPrices: React.FC = () => {
    const [prices, setPrices] = useState<MarketPrice[]>(mockMarketPrices);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPrice, setEditingPrice] = useState<MarketPrice | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredPrices = useMemo(() => {
        return prices.filter(price =>
            price.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            price.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
            price.region.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [prices, searchTerm]);

    const paginatedPrices = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredPrices.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredPrices, currentPage]);
    
    const totalPages = Math.ceil(filteredPrices.length / ITEMS_PER_PAGE);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };

    const handleAddNew = () => {
        setEditingPrice(null);
        setIsModalOpen(true);
    };

    const handleEdit = (price: MarketPrice) => {
        setEditingPrice(price);
        setIsModalOpen(true);
    };

    const handleDelete = (priceId: number) => {
        setPrices(prev => prev.filter(p => p.id !== priceId));
    };

    const handleSave = (price: MarketPrice) => {
        if (editingPrice) {
            setPrices(prev => prev.map(p => p.id === price.id ? price : p));
        } else {
            setPrices(prev => [price, ...prev]);
        }
        setIsModalOpen(false);
    };
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };


    return (
        <>
            <Card
                title="Database Harga Pasar"
                action={
                    <div className="flex items-center space-x-4">
                         <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari harga..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button onClick={handleAddNew} className="bg-primary px-4 py-2 rounded-lg font-semibold text-white hover:bg-primary-dark transition-colors whitespace-nowrap">
                            <i className="fas fa-plus mr-2"></i>Tambah Harga
                        </button>
                    </div>
                }
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                            <tr>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Barang/Jasa</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Kategori</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Wilayah</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Harga Rata-rata</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Satuan</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Sumber</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Terakhir Diperbarui</th>
                                <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedPrices.map((price: MarketPrice) => (
                                <tr key={price.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{price.itemName}</td>
                                    <td className="p-4">{price.category}</td>
                                    <td className="p-4">{price.region}</td>
                                    <td className="p-4 font-semibold text-secondary">{formatCurrency(price.averagePrice)}</td>
                                    <td className="p-4">{price.unit}</td>
                                    <td className="p-4">{price.source}</td>
                                    <td className="p-4">{new Date(price.lastUpdated).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4 text-center">
                                        <div className="flex justify-center items-center space-x-2">
                                            <button onClick={() => handleEdit(price)} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors" title="Ubah Harga" aria-label={`Ubah harga ${price.itemName}`}><i className="fas fa-edit"></i></button>
                                            <button onClick={() => setDeletingId(price.id)} className="w-10 h-10 flex items-center justify-center rounded-full text-danger hover:bg-danger/10 transition-colors" title="Hapus Harga" aria-label={`Hapus harga ${price.itemName}`}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                 <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            </Card>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <PriceForm price={editingPrice} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
            <ConfirmationModal
                isOpen={deletingId !== null}
                onClose={() => setDeletingId(null)}
                onConfirm={() => {
                    if (deletingId) handleDelete(deletingId);
                }}
                title="Hapus Data Harga"
                message="Apakah Anda yakin ingin menghapus data harga ini? Tindakan ini tidak dapat dibatalkan."
            />
        </>
    );
};

export default MarketPrices;