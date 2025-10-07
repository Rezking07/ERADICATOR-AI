
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Article } from '../types';
import Card from '../components/ui/Card';
import Spinner from '../components/ui/Spinner';
import { summarizeArticle } from '../services/geminiService';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { BotIcon } from '../components/icons/IconComponents';
import { useI18n } from '../contexts/I18nContext';

const mockArticles: Article[] = [
  { id: 1, title: 'Memahami Gratifikasi dan Suap', category: 'Hukum', author: 'Dr. Budi Santoso', publish_date: '2023-10-15', image_url: 'https://picsum.photos/800/400?random=1', summary: 'Artikel ini menjelaskan perbedaan mendasar antara gratifikasi dan suap serta dampaknya terhadap tata kelola pemerintahan.', content: 'Gratifikasi dan suap adalah dua istilah yang seringkali dianggap sama, padahal keduanya memiliki perbedaan signifikan dalam konteks hukum pidana korupsi di Indonesia. Memahami perbedaan ini krusial untuk menciptakan lingkungan bisnis dan pemerintahan yang bersih. Suap, secara sederhana, adalah pemberian sesuatu dengan maksud untuk mempengaruhi keputusan pejabat publik. Ada unsur "transaksional" yang jelas. Sementara itu, gratifikasi memiliki cakupan lebih luas, mencakup semua pemberian yang diterima oleh pegawai negeri atau penyelenggara negara, yang tidak perlu dibuktikan adanya maksud jahat saat pemberian. Namun, jika gratifikasi tersebut tidak dilaporkan dalam waktu 30 hari ke Komisi Pemberantasan Korupsi (KPK), maka pemberian tersebut dianggap suap.' },
  { id: 2, title: 'Transparansi Anggaran Daerah', category: 'Transparansi', author: 'Andi Wijaya, M.Ec.', publish_date: '2023-10-12', image_url: 'https://picsum.photos/800/400?random=2', summary: 'Pentingnya transparansi dalam pengelolaan anggaran daerah untuk mencegah korupsi dan meningkatkan partisipasi publik.', content: 'Transparansi anggaran adalah kunci utama dalam mewujudkan good governance. Ketika pemerintah daerah membuka akses informasi mengenai alokasi dan realisasi anggaran kepada publik, ruang untuk korupsi menjadi lebih sempit. Masyarakat dapat turut mengawasi, memberikan masukan, dan memastikan bahwa setiap rupiah uang rakyat digunakan secara efektif dan efisien untuk kepentingan publik. Beberapa metode untuk meningkatkan transparansi antara lain melalui portal data terbuka, publikasi laporan keuangan secara berkala, dan melibatkan organisasi masyarakat sipil dalam proses perencanaan anggaran.' },
  { id: 3, title: 'Dampak Korupsi Terhadap Pertumbuhan Ekonomi', category: 'Ekonomi', author: 'Prof. Rina Puspita', publish_date: '2023-10-10', image_url: 'https://picsum.photos/800/400?random=3', summary: 'Analisis mendalam mengenai bagaimana praktik korupsi dapat menghambat pertumbuhan ekonomi suatu negara.', content: 'Korupsi sering disebut sebagai "pajak tersembunyi" yang membebani perekonomian. Praktik ini meningkatkan biaya transaksi, menciptakan ketidakpastian bagi investor, dan mengalihkan sumber daya dari sektor produktif ke kantong pribadi. Akibatnya, investasi asing menurun, proyek-proyek infrastruktur menjadi berkualitas rendah dengan biaya membengkak, dan daya saing negara di pasar global melemah. Secara jangka panjang, korupsi menciptakan ketimpangan ekonomi yang semakin lebar dan merusak kepercayaan masyarakat terhadap institusi negara.' },
  { id: 4, title: 'Peran Whistleblower dalam Pemberantasan Korupsi', category: 'Hukum', author: 'Lembaga Bantuan Hukum', publish_date: '2023-10-08', image_url: 'https://picsum.photos/800/400?random=4', summary: 'Menyoroti peran krusial dan perlindungan hukum bagi para whistleblower dalam mengungkap kasus korupsi besar.', content: 'Whistleblower atau peniup peluit adalah individu yang berani mengungkap praktik ilegal atau tidak etis di dalam sebuah organisasi. Dalam konteks pemberantasan korupsi, peran mereka sangat vital. Namun, risiko yang mereka hadapi juga sangat besar, mulai dari pemecatan, intimidasi, hingga ancaman fisik. Oleh karena itu, وجود mekanisme perlindungan hukum yang kuat bagi whistleblower adalah sebuah keharusan. Undang-undang perlindungan saksi dan korban harus dapat menjamin keamanan dan kerahasiaan identitas mereka agar lebih banyak orang berani bersuara melawan korupsi.' },
];

const ArticleDetail: React.FC = () => {
    const { t } = useI18n();
    const { id } = useParams<{ id: string }>();
    const [article, setArticle] = useState<Article | null>(null);
    const [loading, setLoading] = useState(true);
    const [aiSummary, setAiSummary] = useState('');
    const [isSummaryLoading, setIsSummaryLoading] = useState(false);
    
    useEffect(() => {
        setLoading(true);
        setAiSummary('');
        // Simulate API fetch
        setTimeout(() => {
            const foundArticle = mockArticles.find(a => a.id.toString() === id);
            setArticle(foundArticle || null);
            setLoading(false);
        }, 500);
    }, [id]);

    useEffect(() => {
        if (article) {
            const fetchSummary = async () => {
                setIsSummaryLoading(true);
                const result = await summarizeArticle(article.content);
                setAiSummary(result.summary);
                setIsSummaryLoading(false);
            };
            fetchSummary();
        }
    }, [article]);

    const relatedArticles = mockArticles.filter(a => a.category === article?.category && a.id !== article?.id).slice(0, 2);

    const getTranslatedCategory = (category: string) => {
        const key = `category_${category.toLowerCase()}`;
        return t(key);
    };

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Spinner /></div>;
    }

    if (!article) {
        return <div className="text-center text-gray-500 dark:text-gray-400">{t('articleNotFound')}</div>;
    }

    return (
        <div className="max-w-4xl mx-auto">
            <Card>
                <img src={article.image_url} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-6" />
                <span className="text-sm font-semibold uppercase text-primary-500 dark:text-primary-400">{getTranslatedCategory(article.category)}</span>
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">{article.title}</h1>
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-6">
                    <span>{t('by')}: <strong>{article.author}</strong></span>
                    <span className="mx-2">&bull;</span>
                    <span>{t('published')}: {article.publish_date}</span>
                </div>
                
                {isSummaryLoading ? (
                    <div className="flex justify-center my-4"><Spinner /></div>
                ) : (
                    aiSummary && (
                        <Card className="my-6 bg-primary-50 dark:bg-primary-900/20 border-l-4 border-primary-500">
                             <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
                                <BotIcon className="w-5 h-5 mr-2 text-primary-600 dark:text-primary-400"/>
                                {t('aiKeyTakeaways')}
                            </h3>
                            <div className="prose prose-sm dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                                <MarkdownRenderer content={aiSummary} />
                            </div>
                        </Card>
                    )
                )}

                <div className="prose dark:prose-invert max-w-none text-gray-700 dark:text-gray-300">
                    <p>{article.content}</p>
                </div>
            </Card>

            {relatedArticles.length > 0 && (
                <div className="mt-8">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">{t('relatedArticles')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {relatedArticles.map(rel => (
                            <Link to={`/articles/${rel.id}`} key={rel.id}>
                                <Card className="h-full overflow-hidden hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300">
                                    <img src={rel.image_url.replace('800/400', '400/250')} alt={rel.title} className="w-full h-40 object-cover"/>
                                    <div className="p-5">
                                        <h3 className="text-md font-bold text-gray-900 dark:text-white">{rel.title}</h3>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">{rel.author}</p>
                                    </div>
                                 </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleDetail;
