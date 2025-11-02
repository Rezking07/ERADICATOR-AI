// user-panel/services/apiService.ts

import { DatabaseCredentials } from '../types';

export const getTables = async (credentials: DatabaseCredentials): Promise<string[]> => {
  const response = await fetch('/api/get_tables.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error('Failed to get tables');
  }

  const data = await response.json();
  return data;
};

export const getReports = async (userId: number): Promise<any[]> => {
    const response = await fetch(`/api/getReports.php?user_id=${userId}`);
    if (!response.ok) {
        throw new Error('Failed to fetch reports');
    }
    return response.json();
}

export const getTableData = async (credentials: DatabaseCredentials, table: string): Promise<any[]> => {
  const response = await fetch('/api/get_table_data.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ ...credentials, table }),
  });

  if (!response.ok) {
    throw new Error('Failed to get table data');
  }

  const data = await response.json();
  return data;
};
