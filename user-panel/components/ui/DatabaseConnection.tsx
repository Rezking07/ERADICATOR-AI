// user-panel/components/ui/DatabaseConnection.tsx

import React, { useState } from 'react';
import { useI18n } from '../../contexts/I18nContext';
import Button from './Button';
import { getTables, getTableData } from '../../services/apiService';
import { getCorruptionAnalysis } from '../../services/geminiService';
import { AnalysisResult } from '../../types';

interface DatabaseConnectionProps {
    setAnalysisResult: (result: AnalysisResult | null) => void;
    isAnalyzing: boolean;
}

const DatabaseConnection: React.FC<DatabaseConnectionProps> = ({ setAnalysisResult, isAnalyzing }) => {
  const { t } = useI18n();
  const [host, setHost] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [database, setDatabase] = useState('');
  const [tables, setTables] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      const tables = await getTables({ host, username, password, database });
      setTables(tables);
      setError(null);
    } catch (err) {
      setError(t('databaseConnectionError'));
      setTables([]);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{t('databaseConnection')}</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('host')}</label>
        <input
          type="text"
          value={host}
          onChange={(e) => setHost(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('username')}</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('password')}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{t('database')}</label>
        <input
          type="text"
          value={database}
          onChange={(e) => setDatabase(e.target.value)}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
        />
      </div>
      <Button onClick={handleConnect} disabled={isAnalyzing}>{isAnalyzing ? 'Analyzing...' : t('connect')}</Button>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      {tables.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{t('tables')}</h3>
          <ul className="mt-4 space-y-2">
            {tables.map((table) => (
              <li key={table}>
                <Button variant="secondary" onClick={() => handleSelectTable(table)}>
                  {table}
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );

  const handleSelectTable = async (table: string) => {
    try {
      const tableData = await getTableData({ host, username, password, database }, table);
      const fileContent = JSON.stringify(tableData);
      const result = await getCorruptionAnalysis(fileContent);
      setAnalysisResult(result);
    } catch (err) {
      setError(t('analysisFailedError'));
    }
  };
};

export default DatabaseConnection;
