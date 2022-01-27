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
    <>
        <div className="aboutPageContainer">
            <div className="aboutPageHeader">
                <h2 className="aboutHeaderText">
                    About
                    <br />
                    Childhood Cancer
                    <br />
                    Data Initiative and the
                    <br />
                    Data Catalog
                </h2>
                <img className="aboutHeaderImage" src={aboutHeaderImage} alt="about page" />
            </div>
        </div>
        <div className="grid" />
        <div className="aboutPageSection1">
            <div className="aboutContent1">
                <h2 className="aboutContentHeader1">Childhood Cancer Data Initiative</h2>
                <p>
                    The Childhood Cancer Data Catalog is part of&nbsp;
                    <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative">NCI’s Childhood Cancer Data Initiative (CCDI)</a>
                    , which is building a community centered around
                    childhood cancer care and research data. Through enhanced data sharing, we can improve understanding of cancer biology, preventive measures,
                    treatment, quality of life, and survivorship, as well as ensure that researchers learn from every child with cancer.&nbsp;
                    <a href="https://public.govdelivery.com/accounts/USNIHNCI/subscriber/new?topic_id=USNIHNCI_223">Sign-up for email updates</a>
                    &nbsp;from NCI about CCDI.
                </p>
                <br />
                <h2 className="aboutContentHeader1">CCDI Data Catalog</h2>
                <p style={{ paddingBottom: '10px' }}>
                    The CCDI Childhood Cancer Data Catalog is an inventory of pediatric oncology data resources, including childhood cancer repositories, registries,
                    data commons, web sites, and catalogs that either manage or refer to data. The data catalog is intended to help researchers learn about existing
                    pediatric data resources to develop new biomedical hypothesis or analyze the data for clinical or therapeutic efficacy. While the data catalog does
                    not provide access to the data, it provides summary information that will allow researchers to select the resource(s) relevant to their work.
                </p>
                <p>
                    Each data resource summary includes an overview by disease type, number of samples analyzed, availability of molecular and imaging data,
                    and characteristics of the samples studied (e.g. age, phenotype). After reviewing the data resource summaries, researchers can use the provided link
                    or contact details to learn how to gain access to the data.
                </p>
            </div>
        </div>
        {/* <br /> */}
        <div className="grid" />
        <div className="aboutPageSection2Container">
            <div className="aboutPageSection2">
                <div className="aboutContent2">
                    <h2 className="aboutContentHeader2">Contribute to the CCDI Data Catalog</h2>
                    <p style={{ paddingBottom: '10px' }}>
                        NCI is interested in expanding this resource. Submit summaries about your data resource to make it known to a broader community and help
                        promote the use of the data.
                    </p>
                    <p style={{ paddingBottom: '10px' }}>
                        If you would like to include your resource in this data catalog, complete the&nbsp;
                        <a href="#" onClick={handleDownloadTemplate}>summary submission template</a>
                        &nbsp;and send it to&nbsp;
                        <br />
                        <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Childhood Cancer Data Initiative</a>
                        .
                    </p>
                    <p>
                        For questions, please contact&nbsp;
                        <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Childhood Cancer Data Initiative</a>
                        .
                    </p>
                </div>
            </div>
        </div>
    </>
  );
};

export default AboutPage;