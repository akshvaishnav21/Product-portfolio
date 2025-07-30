// Database functionality removed - using in-memory storage only
export function executeQuery() {
  console.warn('Database functionality has been removed');
  return Promise.resolve({ rows: [] });
}