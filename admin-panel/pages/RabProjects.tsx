import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import { mockRabProjects, mockRabItems, mockUsers } from '../data/mockData';
import { RabProject } from '../types';
import Pagination from '../components/ui/Pagination';
import Modal from '../components/ui/Modal';

const ITEMS_PER_PAGE = 5;

const ProjectForm: React.FC<{ onSave: (projectName: string) => void; onCancel: () => void; }> = ({ onSave, onCancel }) => {
    const [projectName, setProjectName] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(projectName);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Buat Proyek RAB Baru</h2>
            <div>
                <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Nama Proyek</label>
                <input
                    type="text"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                    required
                />
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-base-300/50 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-base-300 dark:hover:bg-dark-600 transition-colors">Batal</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Simpan Proyek</button>
            </div>
        </form>
    );
};


const RabProjects: React.FC = () => {
    const [projects, setProjects] = useState<RabProject[]>(mockRabProjects);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(amount);
    };
    
    const getUserName = (userId: number) => mockUsers.find(u => u.id === userId)?.fullName || 'N/A';
    
    const getItemCount = (projectId: number) => mockRabItems.filter(item => item.projectId === projectId).length;

    const filteredProjects = useMemo(() => {
        return projects.filter(project =>
            project.projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            (getUserName(project.userId)).toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [projects, searchTerm]);
    
    const paginatedProjects = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredProjects, currentPage]);

    const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
    
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };
    
    const handleSaveNewProject = (projectName: string) => {
        const newProject: RabProject = {
            id: Date.now(),
            userId: 1, // Assuming admin is creating
            projectName,
            totalBudget: 0,
            createdAt: new Date().toISOString(),
        };
        setProjects(prev => [newProject, ...prev]);
        setIsModalOpen(false);
    };

    return (
        <>
            <Card
                title="Proyek RAB"
                action={
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari proyek..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button onClick={() => setIsModalOpen(true)} className="bg-primary px-4 py-2 rounded-lg font-semibold text-white hover:bg-primary-dark transition-colors whitespace-nowrap">
                            <i className="fas fa-plus mr-2"></i>Buat Proyek Baru
                        </button>
                    </div>
                }
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                            <tr>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Proyek</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Pengguna</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Total Anggaran</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Jumlah Item</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Tanggal Dibuat</th>
                                <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedProjects.map((project: RabProject) => (
                                <tr key={project.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{project.projectName}</td>
                                    <td className="p-4">{getUserName(project.userId)}</td>
                                    <td className="p-4 font-semibold text-secondary">{formatCurrency(project.totalBudget)}</td>
                                    <td className="p-4 text-center">{getItemCount(project.id)}</td>
                                    <td className="p-4">{new Date(project.createdAt).toLocaleDateString('id-ID')}</td>
                                    <td className="p-4 text-center">
                                        <Link to={`/rab/${project.id}`} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-dark transition-colors shadow-sm hover:shadow-md transform hover:-translate-y-px">
                                            Lihat Detail
                                        </Link>
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
                <ProjectForm onSave={handleSaveNewProject} onCancel={() => setIsModalOpen(false)} />
            </Modal>
        </>
    );
};

export default RabProjects;