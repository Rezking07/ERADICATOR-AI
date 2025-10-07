import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { mockRabProjects, mockRabItems, mockUsers } from '../data/mockData';
import { RabProject, RabItem } from '../types';
import Modal from '../components/ui/Modal';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const ItemForm: React.FC<{ item?: RabItem | null; onSave: (item: Omit<RabItem, 'id' | 'projectId' | 'subtotal'>) => void; onCancel: () => void; }> = ({ item, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
        itemName: item?.itemName || '',
        quantity: item?.quantity || 1,
        unit: item?.unit || 'unit',
        unitPrice: item?.unitPrice || 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({
            ...formData,
            quantity: Number(formData.quantity),
            unitPrice: Number(formData.unitPrice),
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{item ? 'Ubah Item Anggaran' : 'Tambah Item Anggaran'}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Nama Item</label>
                    <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Jumlah</label>
                    <input type="number" name="quantity" min="1" value={formData.quantity} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Satuan</label>
                    <input type="text" name="unit" value={formData.unit} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Harga Satuan (Rp)</label>
                    <input type="number" name="unitPrice" min="0" value={formData.unitPrice} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
                </div>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-base-300/50 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-base-300 dark:hover:bg-dark-600 transition-colors">Batal</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Simpan Item</button>
            </div>
        </form>
    );
};

const RabDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const projectId = parseInt(id || '0', 10);
    
    const [project, setProject] = useState<RabProject | null>(null);
    const [items, setItems] = useState<RabItem[]>([]);
    
    const [isItemModalOpen, setIsItemModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<RabItem | null>(null);
    const [deletingItemId, setDeletingItemId] = useState<number | null>(null);

    useEffect(() => {
        const foundProject = mockRabProjects.find(p => p.id === projectId) || null;
        if (foundProject) {
            const projectItems = mockRabItems.filter(i => i.projectId === projectId);
            setItems(projectItems);
            setProject(foundProject);
        }
    }, [projectId]);

    // Live calculation for the total budget and item count
    const { totalBudget, itemCount } = useMemo(() => {
        const currentItems = items;
        const budget = currentItems.reduce((sum, item) => sum + item.subtotal, 0);
        return { totalBudget: budget, itemCount: currentItems.length };
    }, [items]);
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };
    
    const handleAddNewItem = () => {
        setEditingItem(null);
        setIsItemModalOpen(true);
    };

    const handleEditItem = (item: RabItem) => {
        setEditingItem(item);
        setIsItemModalOpen(true);
    };
    
    const handleDeleteItem = (itemId: number) => {
        setItems(prev => prev.filter(i => i.id !== itemId));
        setDeletingItemId(null);
    };

    const handleSaveItem = (itemData: Omit<RabItem, 'id' | 'projectId' | 'subtotal'>) => {
        if (editingItem) {
            // Edit existing item
            setItems(prev => prev.map(i => i.id === editingItem.id ? { ...i, ...itemData, subtotal: itemData.quantity * itemData.unitPrice } : i));
        } else {
            // Add new item
            const newItem: RabItem = {
                id: Date.now(),
                projectId,
                ...itemData,
                subtotal: itemData.quantity * itemData.unitPrice,
            };
            setItems(prev => [...prev, newItem]);
        }
        setIsItemModalOpen(false);
    };
    
    if (!project) {
        return (
            <Card>
                <p>Proyek RAB tidak ditemukan.</p>
                <Link to="/rab" className="text-primary mt-4 inline-block">Kembali ke Proyek RAB</Link>
            </Card>
        );
    }
    
    const userFullName = mockUsers.find(u => u.id === project.userId)?.fullName || 'Pengguna Tidak Dikenal';

    return (
        <div className="space-y-8">
             <Card>
                <div className="flex justify-between items-start">
                    <div>
                        <h2 className="text-xl font-bold text-gray-800 dark:text-white">{project.projectName}</h2>
                        <p className="text-text-light-secondary dark:text-gray-400">Dibuat oleh: {userFullName} pada {new Date(project.createdAt).toLocaleString('id-ID')}</p>
                         <p className="text-text-light-secondary dark:text-gray-400 mt-1">Total Item: <span className="font-semibold text-gray-800 dark:text-white">{itemCount}</span></p>
                    </div>
                     <div className="text-right">
                        <p className="text-sm text-text-light-secondary dark:text-gray-400">Total Anggaran</p>
                        <p className="text-2xl font-bold text-secondary">{formatCurrency(totalBudget)}</p>
                    </div>
                </div>
            </Card>

            <Card
                title="Rincian Anggaran"
                action={
                    <button onClick={handleAddNewItem} className="bg-primary px-4 py-2 rounded-lg font-semibold text-white hover:bg-primary-dark transition-colors transform hover:-translate-y-0.5">
                        <i className="fas fa-plus mr-2"></i>Tambah Item
                    </button>
                }
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                            <tr>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Item</th>
                                <th className="p-4 text-right font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Jumlah</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Satuan</th>
                                <th className="p-4 text-right font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Harga Satuan</th>
                                <th className="p-4 text-right font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Subtotal</th>
                                <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {items.map((item) => (
                                <tr key={item.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{item.itemName}</td>
                                    <td className="p-4 text-right">{item.quantity}</td>
                                    <td className="p-4">{item.unit}</td>
                                    <td className="p-4 text-right">{formatCurrency(item.unitPrice)}</td>
                                    <td className="p-4 text-right font-semibold text-gray-800 dark:text-white">{formatCurrency(item.subtotal)}</td>
                                    <td className="p-4 text-center">
                                       <div className="flex justify-center items-center space-x-2">
                                            <button onClick={() => handleEditItem(item)} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors" title="Ubah Item" aria-label={`Ubah item ${item.itemName}`}><i className="fas fa-edit"></i></button>
                                            <button onClick={() => setDeletingItemId(item.id)} className="w-10 h-10 flex items-center justify-center rounded-full text-danger hover:bg-danger/10 transition-colors" title="Hapus Item" aria-label={`Hapus item ${item.itemName}`}><i className="fas fa-trash"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                             {items.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="text-center p-8 text-text-light-secondary dark:text-gray-500">
                                        Belum ada item anggaran. Klik "Tambah Item" untuk memulai.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isItemModalOpen} onClose={() => setIsItemModalOpen(false)}>
                <ItemForm item={editingItem} onSave={handleSaveItem} onCancel={() => setIsItemModalOpen(false)} />
            </Modal>
            
            <ConfirmationModal
                isOpen={deletingItemId !== null}
                onClose={() => setDeletingItemId(null)}
                onConfirm={() => {
                    if (deletingItemId) handleDeleteItem(deletingItemId);
                }}
                title="Hapus Item Anggaran"
                message="Apakah Anda yakin ingin menghapus item ini dari anggaran? Tindakan ini tidak dapat dibatalkan."
            />
        </div>
    );
};

export default RabDetail;