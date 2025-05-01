export interface CustomError extends Error {
  statusCode?: number;
  errors?: any[];
  code?: string | number;
  expose?: boolean;
}
