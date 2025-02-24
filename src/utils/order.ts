export const getStatusColor = (status: string) => {
  const colors = {
    PENDING: "warning",
    PROCESSING: "info",
    SHIPPED: "primary",
    DELIVERED: "success",
    CANCELLED: "error",
  } as const;
  return colors[status as keyof typeof colors];
};
