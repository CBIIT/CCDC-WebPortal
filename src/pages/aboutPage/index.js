import React from "react";
import * as downloadApi from "../../api/downloadApi";
import aboutHeaderImage from "../../assets/img/About.png";
import './aboutPage.css';

const AboutPage = () => {
  const handleDownloadTemplate = (event) => {
    event.preventDefault();
    downloadApi.getSubmissionTemplate();
  };

  return (
    <div className="aboutPageContainer">
        <h2 className="aboutHeader">About Childhood Cancer Data Initiative and the Data Catalog</h2>
        <img className="aboutHeaderImage" src={aboutHeaderImage} alt="about page" />
        <div className="aboutPageSection1">
            <div className="aboutContent1">
                <h2 className="aboutContentHeader1">Childhood Cancer Data Initiative</h2>
                <p>
                    The Childhood Cancer Data Catalog is part of&nbsp;
                    <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative">NCI’s Childhood Cancer Data Initiative (CCDI)</a>
                    &nbsp;, which is building a community centered around
                    childhood cancer care and research data. Through enhanced data sharing, we can improve understanding of cancer biology, preventive measures,
                    treatment, quality of life, and survivorship, as well as ensure that researchers learn from every child with cancer.&nbsp;
                    <a href="https://public.govdelivery.com/accounts/USNIHNCI/subscriber/new?topic_id=USNIHNCI_223">Sign-up for email updates</a>
                    &nbsp;from NCI about CCDI.
                </p>
                <br />
                <h2 className="aboutContentHeader1">CCDI Data Catalog</h2>
                <p>
                    The CCDI Childhood Cancer Data Catalog is an inventory of pediatric oncology data resources, including childhood cancer repositories, registries,
                    data commons, web sites, and catalogs that either manage or refer to data. The data catalog is intended to help researchers learn about existing
                    pediatric data resources to develop new biomedical hypothesis or analyze the data for clinical or therapeutic efficacy. While the data catalog does
                    not provide access to the data, it provides summary information that will allow researchers to select the resource(s) relevant to their work.
                </p>
                <br />
                <p>
                    Each data resource summary includes an overview by disease type, number of samples taken and analyzed, availability of molecular and imaging data,
                    and characteristics of the samples studied (e.g., age, phenotype). After reviewing the data resource summaries, researchers can use the provided link
                    or contact details to learn how to gain access to the data.
                </p>
            </div>
        </div>
        <br />
        <div className="aboutPageSection2">
            <div className="aboutContent2">
                <h2 className="aboutContentHeader2">Contribute to the CCDI Data Catalog</h2>
                <p>
                    NCI is interested in expanding this resource. Submit summaries about your data resource makes the existence known to a broader community and helps to
                    promote the use of the data.
                </p>
                <br />
                <p>
                    If you would like to include your resource in this data catalog, complete the&nbsp;
                    <a href="#" onClick={handleDownloadTemplate}>summary submission template</a>
                    &nbsp;and send it to&nbsp;
                    <br />
                    <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Childhood Cancer Data Initiative</a>
                    &nbsp;. Summaries quantify one or more data element values such as count, minimum, maximum, or average. A data element is a unit of data such as a disease
                    diagnosis, or case age. Each assertion in a summary pertains to a data element and its value or set of values in a dataset.
                </p>
                <br />
                <p>
                    For questions, please contact&nbsp;
                    <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Childhood Cancer Data Initiative</a>
                    .
                </p>
            </div>
        </div>
    </div>
  );
};

export default AboutPage;