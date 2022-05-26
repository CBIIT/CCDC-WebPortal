import React from "react";
import styled from 'styled-components';
import * as downloadApi from "../../api/downloadApi";
import aboutHeaderImage from "../../assets/img/About.png";
import externalIcon from "../../assets/img/resource.svg";
import './aboutPage.css';

const AboutContainer = styled.div`
//   display: inline-flex;
  a[target="_blank"] {
    color: #0052b3;
    font-weight: bold;
    text-underline-offset: 2px;
    background: url(${externalIcon}) left center no-repeat;
    padding-left: 30px;
    background-size: 32px;
    display: inline-table;
  }
`;

const AboutPage = () => {
  const handleDownloadTemplate = (event) => {
    event.preventDefault();
    downloadApi.getSubmissionTemplate();
  };
  return (
    <>
        <AboutContainer>
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
            <div className="aboutGrid" />
            <div className="aboutPageSection1">
                <div className="aboutContent1">
                    <h2 className="aboutContentHeader1">Childhood Cancer Data Initiative</h2>
                    <p>
                        The&nbsp;
                        <a href="https://www.cancer.gov/research/areas/childhood/childhood-cancer-data-initiative" target="_blank" rel="noreferrer noopener">NCI’s Childhood Cancer Data Initiative (CCDI)</a>
                        , which the Childhood Cancer Data Catalog is part of, is an initiative seeking to build a community centered around childhood cancer care and research. Through enhanced data sharing,
                        the initiative works to improve understanding of cancer biology, preventive measures, treatment, quality of life, and survivorship, as well as ensure that the community can learn from
                        every child with cancer.&nbsp;
                        <a href="https://public.govdelivery.com/accounts/USNIHNCI/subscriber/new?topic_id=USNIHNCI_223" target="_blank" rel="noreferrer noopener">Sign-up for email updates</a>
                        &nbsp;from NCI about CCDI.
                    </p>
                    <br />
                    <h2 className="aboutContentHeader1">CCDI Data Catalog</h2>
                    <p style={{ paddingBottom: '10px' }}>
                        The Childhood Cancer Data Catalog (CCDC) is an inventory of pediatric oncology data resources, including childhood cancer repositories, registries, knowledgebases, and catalogs that either
                        manage or refer to data. The data catalog is intended to help researchers, clinicians, and citizen scientists learn about existing pediatric data resources to develop new biomedical hypotheses,
                        analyze the data for clinical or therapeutic efficacy, and foster connections within the community to existing pediatric oncology research sites.
                    </p>
                    <p>
                        Each CCDC participating resource includes information on one or more datasets for review.  Summaries of these datasets include an overview by disease type, information on number of
                        participants and samples, availability of molecular and imaging data, and characteristics of the population included and samples gathered (e.g., age, phenotype). The information found
                        for each dataset is unique, and datasets, even within a single participating resource, may contain varying amounts of available data. After reviewing the dataset summaries, resource links
                        and contact details can be used to connect with resource owners to learn more about how to gain access to the data. The data catalog does not provide access to a resource’s data.
                    </p>
                    <p>
                        Please note, the data on the CCDC site is only updated periodically and data on the site may not be as current as would be found on a resource&apos;s own data sharing site.  For the most up to date
                        information about a dataset, it is recommended to work directly with a resource owner.  The resources owners, not the CCDC, would be in a place to provide in-depth information about a dataset.
                        More information about the point of contact for each resource can be found on the&nbsp;
                        <a href="/participatingresources">Participating Resources</a>
                        &nbsp; page.
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
                            The NCI is interested in expanding resources available in the data catalog. Data resource owners are invited to submit summaries about their
                            data resource(s) to the CCDC to make it known to a broader community and help promote the use of the data.
                        </p>
                        <p style={{ paddingBottom: '10px' }}>
                            If you would like to include your resource in this data catalog, complete the&nbsp;
                            <a href="#" onClick={handleDownloadTemplate}>summary submission template</a>
                            &nbsp;and&nbsp;
                            <br />
                            <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">email to Childhood Cancer Data Initiative</a>
                            . All submitted templates will be reviewed by the CCDC team.  Any accepted data submissions or suggested changes will be incorporated as
                            part of periodic releases of the CCDC site.
                        </p>
                        <p>
                            For questions, please send&nbsp;
                            <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">email to Childhood Cancer Data Initiative</a>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </AboutContainer>
    </>
  );
};

export default AboutPage;