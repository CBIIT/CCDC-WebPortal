import React from "react";
import styled from 'styled-components';
import contributeHeaderrImage from "../../assets/img/contributeHeader.svg";
import externalIcon from "../../assets/img/resource.svg";
import contributeFlowImg from "../../assets/img/contributeFlow.svg";

const ContributeContainer = styled.div`
//   display: inline-flex;
    a[target="_blank"] {
        color: #004187;
        font-weight: bold;
        text-underline-offset: 2px;
        // background: url(${externalIcon}) right center no-repeat;
        // padding-right: 30px;
        // background-size: 32px;
        display: inline-table;
    }

    .contributePageContainer {
        margin: 0 auto;
        width: 100%;
        /* border-left: 1px solid lightgray; */
        /* border-right: 1px solid lightgray; */

        @media (min-width: 1250px){
            width: 1250px;
        }
    }
    .contributePageHeader {
        /* margin: 0 auto; */
        /* width: 1250px; */
        padding: 28px 10px 30px 28px;
    }
    .contributeHeaderText {
        color: #004187;
        font-family: Inter;
        font-size: 42px;
        font-weight: 600;
        line-height: 40px;
    }
    .contributeHeaderImage {
        margin-top: -170px;
        float: right;
        width: 700px;
    }
    .contributePageSection1 {
        margin: 0 auto;
        width: 1250px;
        padding: 0px 0px 40px 110px;
        border-left: 1px solid lightgray;
        border-right: 1px solid lightgray;
    }
    .contributeContent1 {
        width: 83%;
        padding: 40px 0px 0px 0px;
        text-align: left;
        margin-left: 100px;
        margin-right: 100px;
    }
    .contributeContentHeader1 {
        padding-bottom: 10px;
        /* color: #2dc799; */
        color: #00a272;
        font-weight: 300;
        font-family: Inter;
        font-size: 33px;
    }
    .contributeContent1 a {
        /* color: rgb(0, 150, 255); */
        color: #004187;
        font-weight: bold;
        text-underline-offset: 2px;
    }
    .contributeGrid{
        color: white;
        border-bottom: 1px solid lightgray;
    }
`;

const ContributePage = () => {
  window.scrollTo(0, 0);
  return (
    <>
        <ContributeContainer>
            <div className="contributePageContainer">
                <div className="contributePageHeader">
                    <h2 className="contributeHeaderText">
                        Contribute
                        <br />
                        to the
                        <br />
                        CCDI Data
                        <br />
                        Catalog
                    </h2>
                    <img className="contributeHeaderImage" src={contributeHeaderrImage} alt="contribute Header Image" />
                </div>
            </div>
            <div className="contributeGrid" />
            <div className="contributePageSection1">
                <div className="contributeContent1">
                    <h2 className="contributeContentHeader1">Join the CCDC Community</h2>
                    <p>The Childhood Cancer Data Catalog (CCDC) serves as an inventory of pediatric and adolescent, and young adult oncology data resources. The strength of CCDC lies in the resources and datasets it contains. By fostering connections within the pediatric cancer research community, the CCDC can grow stronger.</p>
                    <p>The CCDC provides summaries of resources at a study-level and does not store raw-data or code. Data resource owners are encouraged to submit summaries about their data resource(s) to the CCDC to make them known to a broader community. This helps increase the visibility, promote its re-use, and enhance the functionality and content of the CCDC.</p>
                    <p>If your resource or study involves participants younger than 40 and focuses on cancer or supports cancer research, you are eligible to contribute.</p>
                    <br />
                    <h2 className="contributeContentHeader1">How to Contribute?</h2>
                    <p style={{ paddingBottom: '10px' }}>
                        Review the&nbsp;
                        <a href="/Childhood_Cancer_Data_Catalog_Submission_Template.xlsx" target="_blank" rel="noreferrer">CCDC Submission Template</a>
                        , complete it, and send it to&nbsp;
                        <a href="mailto:NCIChildhoodCancerDataInitiative@mail.nih.gov">Participating Resources</a>
                        . All submitted templates will undergo review by the CCDC team. The CCDC team will collaborate closely with resource and data owners to summarize data and integrate it into periodic releases of the CCDC site.
                    </p>
                    <img className="contributeFlow" src={contributeFlowImg} alt="contribute Flow Image" />
                </div>
            </div>
            {/* <br /> */}
            <div className="grid" />
        </ContributeContainer>
    </>
  );
};

export default ContributePage;