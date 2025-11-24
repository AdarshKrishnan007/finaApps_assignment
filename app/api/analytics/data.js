export const analyticsData = {
  productViews: {},
  categoryViews: {},
  modalOpenTimes: {},
};

export const trackProductView = (product) => {
  analyticsData.productViews[product.id] =
    (analyticsData.productViews[product.id] || 0) + 1;
  analyticsData.categoryViews[product.category] =
    (analyticsData.categoryViews[product.category] || 0) + 1;
  analyticsData.modalOpenTimes[product.id] = Date.now();
};

export const trackModalClose = (product) => {
  const startTime = analyticsData.modalOpenTimes[product.id];
  if (startTime) {
    const duration = Date.now() - startTime;
    analyticsData.modalOpenTimes[product.id] = duration;
  }
};

export const getAnalyticsData = () => analyticsData;
