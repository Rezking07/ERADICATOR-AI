import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockUsers } from '../data/mockData';
import { User, Role } from '../types';
import Pagination from '../components/ui/Pagination';

const ITEMS_PER_PAGE = 5;

const Users: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredUsers = useMemo(() => {
        return mockUsers.filter(user =>
            user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm]);

    const paginatedUsers = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredUsers.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredUsers, currentPage]);

    const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page on new search
    };

    return (
        <Card
            title="Manajemen Pengguna"
            action={
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Cari pengguna..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                    />
                    <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                </div>
            }
        >
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                        <tr>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Nama Lengkap</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Email</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Peran</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Dibuat Pada</th>
                            <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Login Terakhir</th>
                            <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paginatedUsers.map((user: User) => (
                            <tr key={user.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                <td className="p-4 font-medium text-gray-800 dark:text-white">{user.fullName}</td>
                                <td className="p-4">{user.email}</td>
                                <td className="p-4">
                                    <Badge color={user.role === Role.ADMIN ? 'danger' : 'secondary'}>{user.role.toUpperCase()}</Badge>
                                </td>
                                <td className="p-4">{new Date(user.createdAt).toLocaleDateString('id-ID')}</td>
                                <td className="p-4">{new Date(user.lastLogin).toLocaleString('id-ID')}</td>
                                <td className="p-4 text-center">
                                    <button aria-label={`Ubah pengguna ${user.fullName}`} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors" title="Ubah Pengguna">
                                        <i className="fas fa-edit"></i>
                                    </button>
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
    );
};

export default Users;