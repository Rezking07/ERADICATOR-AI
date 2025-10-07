import React, { useState, useCallback } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Spinner from '../components/ui/Spinner';
import { UploadCloudIcon, DownloadIcon, BotIcon, UserIcon, SendIcon } from '../components/icons/IconComponents';
import { AnalysisResult, ChatMessage } from '../types';
import { getCorruptionAnalysis, getAiAssistantResponse } from '../services/geminiService';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { useI18n } from '../contexts/I18nContext';

// Declare XLSX for SheetJS library loaded from CDN
declare var XLSX: any;

const CorruptionAnalysis: React.FC = () => {
    const { t } = useI18n();
    const [file, setFile] = useState<File | null>(null);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [error, setError] = useState<string | null>(null);

    // State for the interactive discussion
    const [discussionMessages, setDiscussionMessages] = useState<ChatMessage[]>([]);
    const [isAiResponding, setIsAiResponding] = useState(false);
    const [discussionInput, setDiscussionInput] = useState('');


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setAnalysisResult(null);
            setError(null);
            setDiscussionMessages([]);
        }
    };

    const handleAnalyze = useCallback(async () => {
        if (!file) return;

        const fileName = file.name.toLowerCase();
        const isExcel = fileName.endsWith('.xlsx') || fileName.endsWith('.xls');
        const isText = fileName.endsWith('.txt') || fileName.endsWith('.csv');

        if (!isExcel && !isText) {
            setError(t('validation.unsupportedFileType'));
            return;
        }

        setIsAnalyzing(true);
        setAnalysisResult(null);
        setError(null);
        setDiscussionMessages([]);

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                let fileContent: string;
                if (isExcel) {
                    const data = event.target?.result;
                    const workbook = XLSX.read(data, { type: 'array' });
                    const firstSheetName = workbook.SheetNames[0];
                    const worksheet = workbook.Sheets[firstSheetName];
                    fileContent = XLSX.utils.sheet_to_csv(worksheet);
                } else {
                    fileContent = event.target?.result as string;
                }

                if (!fileContent || !fileContent.trim()) {
                    throw new Error("File content could not be read or is empty.");
                }
                const result = await getCorruptionAnalysis(fileContent);
                setAnalysisResult(result);
            } catch (err) {
                setError(t('analysisFailedError'));
                console.error(err);
            } finally {
                setIsAnalyzing(false);
            }
        };
        reader.onerror = () => {
            setError(t('validation.fileReadError'));
            setIsAnalyzing(false);
        };
        
        if (isExcel) {
            reader.readAsArrayBuffer(file);
        } else {
            reader.readAsText(file);
        }

    }, [file, t]);

     const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!discussionInput.trim() || isAiResponding || !analysisResult) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: 'user',
            text: discussionInput,
        };
        setDiscussionMessages(prev => [...prev, userMessage]);
        setDiscussionInput('');
        setIsAiResponding(true);

        try {
            const analysisContext = `Here is the analysis result for context:\nRisk Level: ${analysisResult.riskLevel}\nSummary: ${analysisResult.summary}\nInsights: ${analysisResult.insights.join(', ')}`;
            const aiResponseText = await getAiAssistantResponse(discussionInput, analysisContext);
            const aiMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiResponseText,
            };
            setDiscussionMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: t('aiError'),
            };
            setDiscussionMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsAiResponding(false);
        }
    };

    const getRiskLevelClasses = (level: AnalysisResult['riskLevel']) => {
        switch (level) {
            case 'High': return 'bg-red-100 text-red-800 border-red-500 dark:bg-red-900/50 dark:text-red-300';
            case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-500 dark:bg-yellow-900/50 dark:text-yellow-300';
            case 'Low': return 'bg-green-100 text-green-800 border-green-500 dark:bg-green-900/50 dark:text-green-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-500 dark:bg-gray-700 dark:text-gray-300';
        }
    };
    
    const translateRisk = (risk: AnalysisResult['riskLevel']) => {
        const map = {
            'High': t('riskHigh'),
            'Medium': t('riskMedium'),
            'Low': t('riskLow')
        };
        return map[risk];
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">{t('analysisTitle')}</h1>
            <p className="text-gray-600 dark:text-gray-400">{t('analysisDescription')}</p>

            <Card>
                <div className="flex flex-col items-center justify-center w-full">
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <UploadCloudIcon className="w-10 h-10 mb-4 text-gray-500 dark:text-gray-400" />
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">{t('clickToUpload')}</span> {t('dragAndDrop')}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{t('fileTypes')}</p>
                        </div>
                        <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".txt,.csv,.xlsx,.xls" />
                    </label>
                    {file && <p className="mt-4 text-gray-700 dark:text-gray-300">{t('selectedFile')}: <span className="font-semibold">{file.name}</span></p>}
                </div>

                <div className="mt-6 text-center">
                    <Button onClick={handleAnalyze} disabled={!file || isAnalyzing} size="lg">
                        {isAnalyzing ? (
                            <>
                                <Spinner />
                                <span className="ml-2">{t('analyzing')}</span>
                            </>
                        ) : t('startAnalysis')}
                    </Button>
                </div>
            </Card>
            
            {error && (
                <Card className="border-red-500 bg-red-50 dark:bg-red-900/20">
                    <p className="text-red-700 dark:text-red-300">{error}</p>
                </Card>
            )}

            {analysisResult && (
                <>
                    <Card>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{t('analysisResults')}</h2>
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('potentialThreat')}</h3>
                                <div className={`mt-2 p-4 border-l-4 rounded-md ${getRiskLevelClasses(analysisResult.riskLevel)}`}>
                                    <p className="text-xl font-bold">{translateRisk(analysisResult.riskLevel)}</p>
                                </div>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('explanation')}</h3>
                                <p className="mt-2 text-gray-600 dark:text-gray-400">{analysisResult.summary}</p>
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300">{t('additionalInsights')}</h3>
                                <ul className="mt-2 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-400">
                                    {analysisResult.insights.map((insight: string, index: number) => <li key={index}>{insight}</li>)}
                                </ul>
                            </div>
                            <div className="pt-4 flex space-x-4">
                                <Button variant="secondary">
                                    <DownloadIcon className="w-4 h-4 mr-2" />
                                    {t('downloadPDF')}
                                </Button>
                                <Button variant="secondary">
                                    <DownloadIcon className="w-4 h-4 mr-2" />
                                    {t('downloadExcel')}
                                </Button>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{t('discussWithAI')}</h2>
                        <div className="h-72 flex flex-col border rounded-lg dark:border-gray-700">
                             <div className="flex-grow overflow-y-auto p-4 space-y-4">
                                {discussionMessages.map(message => (
                                    <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                        {message.sender === 'ai' && (
                                            <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
                                                <BotIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                        <div className={`max-w-md p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
                                            <div className="prose prose-sm dark:prose-invert max-w-none">
                                                <MarkdownRenderer content={message.text} />
                                            </div>
                                        </div>
                                         {message.sender === 'user' && (
                                            <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center text-gray-600 dark:text-gray-300 flex-shrink-0">
                                                <UserIcon className="w-5 h-5" />
                                            </div>
                                        )}
                                    </div>
                                ))}
                                 {isAiResponding && (
                                     <div className="flex items-start gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
                                            <BotIcon className="w-5 h-5" />
                                        </div>
                                        <div className="max-w-lg p-3 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none">
                                            <div className="flex items-center space-x-1">
                                                <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                                <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                                <span className="h-2 w-2 bg-primary-400 rounded-full animate-bounce"></span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="p-2 border-t border-gray-200 dark:border-gray-700">
                                <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={discussionInput}
                                        onChange={(e) => setDiscussionInput(e.target.value)}
                                        placeholder={t('askAboutAnalysis')}
                                        className="flex-grow p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                                        disabled={isAiResponding}
                                    />
                                    <Button type="submit" disabled={isAiResponding || !discussionInput.trim()}>
                                        <SendIcon className="w-5 h-5"/>
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </Card>
                </>
            )}
        </div>
    );
};

export default CorruptionAnalysis;
