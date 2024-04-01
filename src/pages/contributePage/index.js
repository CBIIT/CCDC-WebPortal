import React from "react";
import styled from 'styled-components';
import contributeHeaderrImage from "../../assets/img/contributeHeader.svg";
import contributeHeaderTablet from "../../assets/img/contributeHeaderTablet.svg";
import contributeHeaderMobile from "../../assets/img/contributeHeaderMobile.svg";
import externalIcon from "../../assets/img/resource.svg";
import contributeFlowImg from "../../assets/img/contributeFlow.svg";
import contributeFlowMobile from "../../assets/img/contributeFlowMobile.svg";

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
        padding: 28px 0 30px 0;
        @media (max-width: 768px){
            padding-bottom: 130px;
        }
    }
    .contributeHeaderText {
        color: #004187;
        font-family: Poppins;
        font-size: 42px;
        font-weight: 600;
        line-height: 40px;
        padding: 0 10px 0 28px;
        letter-spacing: -0.03em;

        @media (max-width: 768px){
            color: transparent;
        }
    }
    .contributeHeaderImage {
        margin-top: -170px;
        float: right;
        width: 770px;
        display: block;

        @media (max-width: 1000px){
            display: none;
        }
    }
    .contributeHeaderTablet {
        margin-top: -170px;
        float: right;
        width: 550px;
        display: none;

        @media (max-width: 1000px){
            display: block;
        }

        @media (max-width: 768px){
            display: none;
        }
    }
    .contributeHeaderMobile {
        height: 322px;
        width: 100%;
        display: none;
        margin-top: -200px;
        float: right;
        object-fit: cover;
        background: url(${contributeHeaderMobile});

        @media (max-width: 768px){
            display: block;
            background-position: calc(100vw - 770px);
        }

        @media (max-width: 658px){
            background-position: -110px;
        }
    }

    .contributeHeaderMobileCover {
        display: none;
        @media (max-width: 768px){
            height: 322px;
            width: 100%;
            display: none;
            margin-top: -321px;
            float: right;
            // background-color: #003D75CC;
            display: block;
            .contributeHeaderText {
                color: #FFFFFF;
                padding: 70px 0 0 50px;
                font-family: Poppins;
                font-size: 42px;
                font-weight: 600;
                line-height: 41px;
                width: 270px;
                letter-spacing: -0.03em;
            }
        }

    }
    .contributePageSection1 {
        margin: 0 auto;
        width: 100%;
        @media (min-width: 1260px){
            width: 1250px;
        }
    }
    .contributeContent1 {
        // font-family: Open Sans;
        padding: 40px 30px 40px 300px;
        text-align: left;
        margin: 0 10px;
        border-left: 1px solid lightgray;
        border-right: 1px solid lightgray;

        @media (max-width: 1269px){
            padding-left: calc(100vw - 970px);
        }

        @media (max-width: 1000px){
            padding-left: 30px;
        }
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

    .contributeFlow {
        display: block;

        @media (max-width: 1000px){
            display: none;
        }
    }

    .contributeFlowMobile {
        display: none;

        @media (max-width: 1000px){
            display: block;
            margin: 0 auto;
        }
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
                    <img className="contributeHeaderTablet" src={contributeHeaderTablet} alt="contribute Header Tablet" />
                    <div className="contributeHeaderMobile" />
                    <div className="contributeHeaderMobileCover">
                        <div className="contributeHeaderText">Contribute to the CCDI Data Catalog</div>
                    </div>
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
                    <img className="contributeFlowMobile" src={contributeFlowMobile} alt="contribute Flow Image Mobile" />
                </div>
            </div>
        </ContributeContainer>
    </>
  );
};

export default ContributePage;