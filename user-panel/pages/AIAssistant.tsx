
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { getAiAssistantResponse } from '../services/geminiService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { SendIcon, UserIcon, BotIcon } from '../components/icons/IconComponents';
import MarkdownRenderer from '../components/ui/MarkdownRenderer';
import { useI18n } from '../contexts/I18nContext';

const AIAssistant: React.FC = () => {
    const { t } = useI18n();
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Effect to set initial greeting message based on language
    useEffect(() => {
        setMessages([{ id: 1, sender: 'ai', text: t('aiGreeting') }]);
    }, [t]);


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage: ChatMessage = {
            id: Date.now(),
            sender: 'user',
            text: input,
        };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponseText = await getAiAssistantResponse(input);
            const aiMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: aiResponseText,
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: ChatMessage = {
                id: Date.now() + 1,
                sender: 'ai',
                text: t('aiError'),
            };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-120px)]">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">{t('aiAssistantTitle')}</h1>
            <Card className="flex-grow flex flex-col">
                <div className="flex-grow overflow-y-auto p-4 space-y-4">
                    {messages.map(message => (
                        <div key={message.id} className={`flex items-start gap-3 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                            {message.sender === 'ai' && (
                                <div className="w-8 h-8 rounded-full bg-primary-500 flex items-center justify-center text-white flex-shrink-0">
                                    <BotIcon className="w-5 h-5" />
                                </div>
                            )}
                            <div className={`max-w-lg p-3 rounded-lg ${message.sender === 'user' ? 'bg-primary-600 text-white rounded-br-none' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'}`}>
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
                    {isLoading && (
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
                    <div ref={messagesEndRef} />
                </div>
                <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder={t('typeYourQuestion')}
                            className="flex-grow p-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                            disabled={isLoading}
                        />
                        <Button type="submit" disabled={isLoading || !input.trim()}>
                            <SendIcon className="w-5 h-5"/>
                        </Button>
                    </form>
                </div>
            </Card>
        </div>
    );
};

export default AIAssistant;
