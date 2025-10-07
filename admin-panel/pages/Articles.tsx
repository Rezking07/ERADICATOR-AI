import React, { useState, useMemo } from 'react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { mockArticles, mockUsers } from '../data/mockData';
import { Article, ArticleStatus, ExternalArticle } from '../types';
import Modal from '../components/ui/Modal';
import { searchArticles } from '../services/geminiService';
import Pagination from '../components/ui/Pagination';
import ConfirmationModal from '../components/ui/ConfirmationModal';

const ITEMS_PER_PAGE = 5;

const ArticleForm: React.FC<{ article?: Article | null; onSave: (article: Article) => void; onCancel: () => void; }> = ({ article, onSave, onCancel }) => {
    const [formData, setFormData] = useState<Omit<Article, 'id' | 'adminId' | 'slug'>>(
        article || { title: '', content: '', status: ArticleStatus.DRAFT, publishedAt: '', imageUrl: '' }
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const slug = formData.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
        const finalArticle: Article = {
            id: article?.id && article.id !== 0 ? article.id : Date.now(),
            adminId: 1,
            slug,
            publishedAt: formData.status === ArticleStatus.PUBLISHED && !(article?.publishedAt) ? new Date().toISOString() : article?.publishedAt || '',
            ...formData
        };
        onSave(finalArticle);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{article && article.id !== 0 ? 'Ubah Artikel' : 'Buat Artikel Baru'}</h2>
            <div>
                <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Judul</label>
                <input type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">URL Gambar</label>
                <input type="text" name="imageUrl" value={formData.imageUrl || ''} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" placeholder="https://example.com/image.jpg" />
            </div>
            {formData.imageUrl && (
                <div>
                    <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Pratinjau Gambar</label>
                    <img src={formData.imageUrl} alt="Pratinjau" className="mt-2 rounded-lg w-full h-48 object-cover border border-base-300 dark:border-dark-600" />
                </div>
            )}
            <div>
                <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Konten</label>
                <textarea name="content" value={formData.content} onChange={handleChange} rows={10} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-text-light-secondary dark:text-gray-300 mb-1">Status</label>
                <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary">
                    <option value={ArticleStatus.DRAFT}>Draf</option>
                    <option value={ArticleStatus.PUBLISHED}>Diterbitkan</option>
                </select>
            </div>
            <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={onCancel} className="bg-base-300/50 dark:bg-dark-700 px-4 py-2 rounded-lg font-semibold hover:bg-base-300 dark:hover:bg-dark-600 transition-colors">Batal</button>
                <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors">Simpan Artikel</button>
            </div>
        </form>
    );
};

const Articles: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>(mockArticles);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState<ExternalArticle[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);

    const filteredArticles = useMemo(() => {
        return articles.filter(article =>
            article.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [articles, searchTerm]);

    const paginatedArticles = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        return filteredArticles.slice(startIndex, startIndex + ITEMS_PER_PAGE);
    }, [filteredArticles, currentPage]);

    const totalPages = Math.ceil(filteredArticles.length / ITEMS_PER_PAGE);

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) return;
        setIsSearching(true);
        setSearchError(null);
        setSearchResults([]);
        try {
            const results = await searchArticles(searchQuery);
            setSearchResults(results);
        } catch (error) {
            setSearchError(error instanceof Error ? error.message : 'Terjadi kesalahan tidak diketahui.');
        } finally {
            setIsSearching(false);
        }
    };
    
    const handleUseContent = (externalArticle: ExternalArticle) => {
        const newArticleData: Article = {
            id: 0, // Placeholder for new article
            adminId: 1,
            title: externalArticle.title,
            content: `${externalArticle.summary}\n\nSumber: ${externalArticle.url}`,
            slug: '',
            status: ArticleStatus.DRAFT,
            publishedAt: '',
            imageUrl: '',
        };
        setEditingArticle(newArticleData);
        setIsModalOpen(true);
    };


    const handleAddNew = () => {
        setEditingArticle(null);
        setIsModalOpen(true);
    };

    const handleEdit = (article: Article) => {
        setEditingArticle(article);
        setIsModalOpen(true);
    };
    
    const handleDelete = (articleId: number) => {
        setArticles(prev => prev.filter(a => a.id !== articleId));
    };

    const handleSave = (article: Article) => {
        if (editingArticle && editingArticle.id !== 0) {
            setArticles(prev => prev.map(a => a.id === article.id ? article : a));
        } else {
            setArticles(prev => [article, ...prev]);
        }
        setIsModalOpen(false);
    };
    
    const getAdminName = (adminId: number) => mockUsers.find(u => u.id === adminId)?.fullName || 'N/A';

    return (
        <div className="space-y-8">
            <Card title="Pencarian Artikel Cerdas">
                <p className="text-sm text-text-light-secondary dark:text-gray-400 -mt-4 mb-4">Cari ide atau referensi artikel dari internet menggunakan AI.</p>
                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        placeholder="Contoh: 'berita korupsi terbaru'"
                        className="flex-grow px-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                    />
                    <button 
                        onClick={handleSearch} 
                        disabled={isSearching}
                        className="bg-secondary text-white px-4 py-2 rounded-lg font-semibold hover:bg-secondary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                    >
                        {isSearching ? (
                            <><i className="fas fa-spinner fa-spin mr-2"></i>Mencari...</>
                        ) : (
                            <><i className="fas fa-search mr-2"></i>Cari dengan AI</>
                        )}
                    </button>
                </div>
                <div className="mt-6 space-y-4 max-h-96 overflow-y-auto pr-2">
                    {isSearching && <p className="text-center text-text-light-secondary dark:text-gray-400">Harap tunggu, AI sedang mencari artikel terbaik untuk Anda...</p>}
                    {searchError && <p className="text-center text-danger bg-danger/10 p-3 rounded-lg">{searchError}</p>}
                    {searchResults.map((result, index) => (
                        <div key={index} className="p-4 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300/50 dark:border-dark-600">
                            <h3 className="font-semibold text-primary">{result.title}</h3>
                            <p className="text-xs text-text-light-secondary dark:text-gray-400 mb-2">Sumber: <a href={result.url} target="_blank" rel="noopener noreferrer" className="hover:underline">{result.source}</a></p>
                            <p className="text-sm text-text-light dark:text-gray-300 mb-3">{result.summary}</p>
                            <button 
                                onClick={() => handleUseContent(result)}
                                className="bg-primary/20 text-primary-dark dark:text-primary-light px-3 py-1.5 rounded-md text-sm font-semibold hover:bg-primary/30 transition-colors">
                                <i className="fas fa-file-import mr-2"></i>Gunakan Konten Ini
                            </button>
                        </div>
                    ))}
                </div>
            </Card>

            <Card
                title="Manajemen Artikel"
                action={
                    <div className="flex items-center space-x-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Cari artikel..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                                className="w-full pl-10 pr-4 py-2 rounded-lg bg-base-100 dark:bg-dark-700 border border-base-300 dark:border-dark-600 focus:ring-2 focus:ring-primary"
                            />
                            <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
                        </div>
                        <button onClick={handleAddNew} className="bg-primary px-4 py-2 rounded-lg font-semibold text-white hover:bg-primary-dark transition-colors whitespace-nowrap">
                            <i className="fas fa-plus mr-2"></i>Buat Artikel
                        </button>
                    </div>
                }
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="border-b-2 border-base-300/50 dark:border-dark-700">
                            <tr>
                                <th className="p-4 w-32 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Gambar</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Judul</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Penulis</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th className="p-4 font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Diterbitkan Pada</th>
                                <th className="p-4 text-center font-semibold text-sm text-gray-600 dark:text-gray-300 uppercase tracking-wider">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedArticles.map((article: Article) => (
                                <tr key={article.id} className="border-b border-base-300/50 dark:border-dark-700 last:border-b-0 even:bg-base-100 dark:even:bg-dark-700/40 hover:bg-base-100 dark:hover:bg-dark-700/60 transition-colors">
                                    <td className="p-4">
                                        {article.imageUrl ? (
                                            <img src={article.imageUrl} alt={article.title} className="w-24 h-16 object-cover rounded-md shadow-sm" />
                                        ) : (
                                            <div className="w-24 h-16 bg-base-100 dark:bg-dark-700 rounded-md flex items-center justify-center text-xs text-text-light-secondary dark:text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-4 font-medium text-gray-800 dark:text-white">{article.title}</td>
                                    <td className="p-4">{getAdminName(article.adminId)}</td>
                                    <td className="p-4">
                                        <Badge color={article.status === ArticleStatus.PUBLISHED ? 'secondary' : 'warning'}>
                                            {article.status === ArticleStatus.PUBLISHED ? 'DITERBITKAN' : 'DRAF'}
                                        </Badge>
                                    </td>
                                    <td className="p-4">{article.publishedAt ? new Date(article.publishedAt).toLocaleDateString('id-ID') : 'N/A'}</td>
                                    <td className="p-4 text-center">
                                       <div className="flex justify-center items-center space-x-2">
                                            <button onClick={() => handleEdit(article)} className="w-10 h-10 flex items-center justify-center rounded-full text-primary hover:bg-primary/10 transition-colors" title="Ubah Artikel" aria-label={`Ubah artikel ${article.title}`}><i className="fas fa-edit"></i></button>
                                            <button onClick={() => setDeletingId(article.id)} className="w-10 h-10 flex items-center justify-center rounded-full text-danger hover:bg-danger/10 transition-colors" title="Hapus Artikel" aria-label={`Hapus artikel ${article.title}`}><i className="fas fa-trash"></i></button>
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
                <ArticleForm article={editingArticle} onSave={handleSave} onCancel={() => setIsModalOpen(false)} />
            </Modal>
             <ConfirmationModal
                isOpen={deletingId !== null}
                onClose={() => setDeletingId(null)}
                onConfirm={() => {
                    if (deletingId) handleDelete(deletingId);
                    setDeletingId(null);
                }}
                title="Hapus Artikel"
                message="Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan."
            />
        </div>
    );
};

export default Articles;