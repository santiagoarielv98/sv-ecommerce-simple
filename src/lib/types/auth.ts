export type ServerResponse = {
  success: boolean;
  errors?: Array<{
    message: string;
    path: string[];
  }>;
};
