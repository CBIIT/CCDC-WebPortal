const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/files`;

const sayswho = () => {
  const ua = navigator.userAgent;
  let tem;
  let M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
  if (/trident/i.test(M[1])) {
      tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
      return `IE (${tem[1] || ''})`;
  }
  if (M[1] === 'Chrome') {
      tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
      if (tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
  tem = ua.match(/version\/(\d+)/i);
  if (tem != null) M.splice(1, 1, tem[1]);
  return M.join(' ');
};

export function getSubmissionTemplate() {
  fetch(`${baseUrl}/submissionTemplate`)
    .then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Childhood_Cancer_Data_Catalog_Submission_Template.xlsx';
        a.click();
      });
  });
}

export function getUserGuide() {
  fetch(`${baseUrl}/userGuide`)
    .then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const broswerVersion = sayswho();
        if (broswerVersion.indexOf("Safari") > -1) {
          const a = document.createElement('a');
          a.href = url;
          a.download = 'CCDC User Guide 1.1.0.pdf';
          a.click();
        } else {
          window.open(url);
        }
      });
  });
}

export default getSubmissionTemplate;