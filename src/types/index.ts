export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  path: string;
  color: string;
}

export interface ProcessingStatus {
  state: 'idle' | 'processing' | 'success' | 'error';
  message: string;
  progress?: number;
}
