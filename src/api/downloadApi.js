const baseUrl = `${process.env.REACT_APP_API_URL ? process.env.REACT_APP_API_URL : ''}/service/files`;

export function getSubmissionTemplate() {
  fetch(`${baseUrl}/submissionTemplate`)
    .then(response => {
      response.blob().then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Childhood_Cancer_Data_Catalog_Submission_Template.xlsm';
        a.click();
      });
  });
}

export default getSubmissionTemplate;