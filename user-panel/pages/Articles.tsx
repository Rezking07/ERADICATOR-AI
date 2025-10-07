
import React, { useState, useEffect } from 'react';
import { Article } from '../types';
import Card from '../components/ui/Card';
import { Link } from 'react-router-dom';
import { useI18n } from '../contexts/I18nContext';

const mockArticles: Article[] = [
  { id: 1, title: 'Memahami Gratifikasi dan Suap', category: 'Hukum', author: 'Dr. Budi Santoso', publish_date: '2023-10-15', image_url: 'https://picsum.photos/400/250?random=1', summary: 'Artikel ini menjelaskan perbedaan mendasar antara gratifikasi dan suap serta dampaknya terhadap tata kelola pemerintahan.', content: 'Full content here...' },
  { id: 2, title: 'Transparansi Anggaran Daerah', category: 'Transparansi', author: 'Andi Wijaya, M.Ec.', publish_date: '2023-10-12', image_url: 'https://picsum.photos/400/250?random=2', summary: 'Pentingnya transparansi dalam pengelolaan anggaran daerah untuk mencegah korupsi dan meningkatkan partisipasi publik.', content: 'Full content here...' },
  { id: 3, title: 'Dampak Korupsi Terhadap Pertumbuhan Ekonomi', category: 'Ekonomi', author: 'Prof. Rina Puspita', publish_date: '2023-10-10', image_url: 'https://picsum.photos/400/250?random=3', summary: 'Analisis mendalam mengenai bagaimana praktik korupsi dapat menghambat pertumbuhan ekonomi suatu negara.', content: 'Full content here...' },
  { id: 4, title: 'Peran Whistleblower dalam Pemberantasan Korupsi', category: 'Hukum', author: 'Lembaga Bantuan Hukum', publish_date: '2023-10-08', image_url: 'https://picsum.photos/400/250?random=4', summary: 'Menyoroti peran krusial dan perlindungan hukum bagi para whistleblower dalam mengungkap kasus korupsi besar.', content: 'Full content here...' },
];

const rawCategories = ['Semua', 'Hukum', 'Transparansi', 'Ekonomi', 'Governance'];

const Articles: React.FC = () => {
    const { t } = useI18n();
    const [articles, setArticles] = useState<Article[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');
    
    const categories = rawCategories.map(cat => {
        if (cat === 'Semua') return { key: cat, name: t('allCategories') };
        const key = `category_${cat.toLowerCase()}`;
        return { key: cat, name: t(key) };
    });

    useEffect(() => {
        // Simulate API fetch
        setArticles(mockArticles);
        setFilteredArticles(mockArticles);
    }, []);

    useEffect(() => {
        let result = articles;
        if (selectedCategory !== 'Semua') {
            result = result.filter(article => article.category === selectedCategory);
        }
        if (searchTerm) {
            result = result.filter(article =>
                article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                article.summary.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredArticles(result);
    }, [searchTerm, selectedCategory, articles]);
    
    const getTranslatedCategory = (category: string) => {
        const key = `category_${category.toLowerCase()}`;
        return t(key);
    };

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('articlesTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('articlesDescription')}</p>

            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
                    <div className="relative w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder={t('searchArticles')}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                        />
                         <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"><path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/></svg>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                        {categories.map(category => (
                            <button
                                key={category.key}
                                onClick={() => setSelectedCategory(category.key)}
                                className={`px-4 py-2 text-sm font-medium rounded-full transition-colors ${selectedCategory === category.key ? 'bg-primary-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                            >
                                {category.name}
                            </button>
                        ))}
                    </div>
                </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.length > 0 ? filteredArticles.map(article => (
                    <Link to={`/articles/${article.id}`} key={article.id}>
                        <Card className="h-full flex flex-col overflow-hidden hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                            <img src={article.image_url} alt={article.title} className="w-full h-48 object-cover"/>
                            <div className="p-5 flex flex-col flex-grow">
                                <span className="text-xs font-semibold uppercase text-primary-500 dark:text-primary-400">{getTranslatedCategory(article.category)}</span>
                                <h3 className="text-lg font-bold mt-1 text-gray-900 dark:text-white flex-grow">{article.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400 my-2">{article.summary}</p>
                                <div className="mt-auto text-xs text-gray-500 dark:text-gray-500">
                                    <span>{article.author}</span> &bull; <span>{article.publish_date}</span>
                                </div>
                            </div>
                        </Card>
                    </Link>
                )) : (
                    <p className="col-span-full text-center text-gray-500 dark:text-gray-400">{t('noArticlesFound')}</p>
                )}
            </div>
        </div>
    );
};

export default Articles;
