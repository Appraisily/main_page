export function useAnalytics() {
  const trackStartAppraisal = () => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'start_appraisal',
        category: 'Conversion',
        action: 'Click',
        label: 'Start Appraisal'
      });
    }
  };

  return { trackStartAppraisal };
}