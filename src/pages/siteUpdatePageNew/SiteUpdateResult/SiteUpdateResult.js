import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ReactHtmlParser from "html-react-parser";
import html2pdf from "html2pdf.js";
import { OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import NCILogoExport from "../../../assets/img/NCI_Logo.png";
import externalIcon from "../../../assets/img/resource-00a272.svg";
import ClinicalTrialsIcon from '../../../assets/img/ClinicalTrials.icon.svg';
import GenomicsIcon from '../../../assets/img/Genomics.icon.svg';
import ImagingIcon from '../../../assets/img/Imaging.icon.svg';
import XenograftIcon from '../../../assets/img/Xenograft.icon.svg';
import EpidemiologicIcon from '../../../assets/img/Epidemiologic.icon.svg';
import CellLinesIcon from '../../../assets/img/CellLines.icon.svg';

const SiteUpdateResultContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 20px 20px 50px 0;
`;

const NavContainer = styled.div`
  width: 420px;
  display: flex;
  padding: 0 0 50px 0;
`;

const ResultInfo = styled.div`
  margin-left: 20px;
  padding: 25px;
  font-weight: bold;
`;

const SiteUpdateItem = styled.div`
  margin: 0px 0px 50px 0px;
  scroll-margin: 200px;
`;

const SiteUpdateCard = styled.div`
  display: grid;
  border: 1px solid #b6dffd;
  box-shadow: 3px 3px 10px lightgray;
  // margin-top: 20px;
  // margin: -44px 30px 0px 370px;
  padding: 15px 29px;
  max-height: 1138px;
  overflow-y: auto;
  position: relative;
`;

const SiteUpdateCardTitle = styled.div`
    color: #00A272;
    font-family: Inter;
    font-size: 23px;
    font-weight: 600;
    line-height: 23px;
    height: 38px;
    border-bottom: 2px solid #004187;
    margin: 5px 0px 5px 0px;
    padding-bottom: 10px;
`;

const DataContentType = styled.div`
  font-size: 3rem;
  line-height: 23px;
  border-bottom: 2px solid lightgray;
  margin: 0px 0px 10px 0px;
  padding-bottom: 6px;

  .typeIcon {
    height: 30px;
    margin: 0px 8px 0px 8px;
  }

  .typeIcon:hover {
    cursor: pointer;
  }

  .clinicalIcon {
    height: 35px;
    margin: 0px 8px 0px 8px;
  }

  .clinicalIcon:hover {
    cursor: pointer;
  }
`;

const SiteUpdateExport = styled.div`
    position: absolute;
    right: 29px;
    top: 10px;
    z-index: 9;

    .spanText {
      padding-right: 30px;
      display: flex;
    }
    
    .buttonStyle {
      width: 100px;
      position: relative;
      font-size: 14px;
      font-weight: bold;
      text-align: right;
      color: white;
      padding: 10px 0px 10px 200px;
      margin-top: -3px;
      text-transform: uppercase;
      display: flex;
      -webkit-box-pack: center;
      justify-content: right;
      -webkit-box-align: center;
      align-items: center;
      float: right;
      text-decoration: none;
    }
    
    .buttonStyle:hover {
      color: lightgray;
      text-decoration: none;
    }
    
    .buttonStyle::after {
      position: absolute;
      z-index: -1;
      content: "";
      border-bottom: 35px solid #004187;
      border-left: 35px solid transparent;
      height: 0;
      width: 159px;
    }    
`;

const SiteUpdateCardDescription = styled.div`
    color: #000000;
    font-family: Lato;
    font-size: 14px;
    line-height: 17px;
    padding: 0px 0px 20px 0px;

    a {
        // color: #00a272;
        // text-decoration: none;
        text-decoration-color: #0563C1;
        font-weight: 500;
    }

    a[target="_blank"]::after {
      content: " ";
      font-weight: bold;
      color: #004187;
      font-size: 14px;
      background-image: url(${externalIcon});
      background-repeat: no-repeat;
      background-size: 100%;
      background-position-y: 4px;
      background-position-x: -2px;
      width: 17px;
      height: 17px;
      display: inline-table;
    }
`;

const SpinnerContainer = styled.div`
  position: relative; 
  left: 50%;
  width: 100%;
  bottom: 45px;
  font-size: 1.5rem;
  color: grey;
`;

const SiteUpdateResult = ({
  siteUpdateList,
  onLoadSiteUpdates,
  onAddSiteUpdates,
}) => {
    const { hash } = window.location;
    const [isTotal, setIsTotal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [isFetching, setIsFetching] = useState(false);
    const pageSize = 100;
    const iconSrc = {
                      Clinical: ClinicalTrialsIcon,
                      'Genomics/Omics': GenomicsIcon,
                      Imaging: ImagingIcon,
                      Xenograft: XenograftIcon,
                      Epidemiologic: EpidemiologicIcon,
                      'Cell Lines': CellLinesIcon,
                    };

    const handleLoadMore = async () => {
      const content = {
        pageInfo: {
          page: Math.ceil(siteUpdateList.length / pageSize) + 1,
          pageSize,
        }
      };
      if (isTotal) {
        return;
      }
      setLoading(true);
      const result = await onAddSiteUpdates(content).catch(error => {
        throw new Error(`Loading site updates failed: ${error}`);
      });
      setLoading(false);
      if (result.data.length < pageSize) {
        setIsTotal(true);
      }
    };

    useEffect(() => {
      const f = async () => {
        const content = {
          pageInfo: {
            page: 1,
            pageSize,
          }
        };
        setLoading(true);
        await onLoadSiteUpdates(content).catch(error => {
          throw new Error(`Loading site updates failed: ${error}`);
        });
        setLoading(false);
      };
      f();
    }, []);
    useEffect(() => {
      if (siteUpdateList.length > 0) {
        if (hash !== '') {
          const id = hash.replace('#', '');
          const element = document.getElementById(id);
          if (element) element.scrollIntoView({ behavior: 'smooth'});
        }
      }
    }, [siteUpdateList]);

    useEffect(() => {
      const f = async () => {
        if (!isFetching) return;
        await handleLoadMore();
        setIsFetching(false);
      };
      f();
    }, [isFetching]);

    const handleExport = (idx) => {
      const img = document.createElement("img");
      img.src = NCILogoExport;
      img.width = '1';
      const element = document.getElementById(`${idx}_desc`);
      const elementClone = element.cloneNode(true);
      const titleDiv = document.getElementById(`${idx}_title`);
      const dateDiv = document.getElementById(`${idx}_date`);
      const newDiv = document.createElement("div");
      const newDivTitle = document.createElement("div");
      newDivTitle.style = "display: flex;margin-bottom: 15px;";
      const titleSpan = document.createElement('span');
      titleSpan.style = "color: #004187;font-family: Inter;font-size: 28px;font-weight:600;";
      titleSpan.appendChild(document.createTextNode("Site Update Release Notes"));
      newDivTitle.appendChild(titleSpan);
      const newDivUpdate = document.createElement("div");
      newDivUpdate.style = "display: flex;";
      const updateSpan = document.createElement('span');
      updateSpan.style = "color: #567aac;font-family: Inter;font-size: 14px;line-height: 25px;";
      updateSpan.appendChild(document.createTextNode("UPDATE TITLE:"));
      const updateSpanValue = document.createElement('span');
      updateSpanValue.style = "margin-left: 45px;color: #004187;font-family: Inter;font-size: 16px;font-weight:600;line-height: 25px;";
      updateSpanValue.appendChild(document.createTextNode(titleDiv.innerText));
      newDivUpdate.appendChild(updateSpan);
      newDivUpdate.appendChild(updateSpanValue);
      const newDivDate = document.createElement("div");
      newDivDate.style = "display: flex;";
      const dateSpan = document.createElement('span');
      dateSpan.style = "color: #567aac;font-family: Inter;font-size: 14px;line-height: 25px;";
      dateSpan.appendChild(document.createTextNode("DATE OF RELEASE:"));
      const dateSpanValue = document.createElement('span');
      dateSpanValue.style = "margin-left: 20px;color: #004187;font-family: Inter;font-size: 16px;font-weight:600;line-height: 25px;";
      dateSpanValue.appendChild(document.createTextNode(dateDiv.innerText));
      newDivDate.appendChild(dateSpan);
      newDivDate.appendChild(dateSpanValue);
      const breakline = document.createElement("HR");
      breakline.style = "height: 1px; background-color: #3b6697; margin-bottom: 40px;";
      newDiv.appendChild(newDivTitle);
      newDiv.appendChild(newDivUpdate);
      newDiv.appendChild(newDivDate);
      newDiv.appendChild(breakline);
      newDiv.appendChild(elementClone);
      const opt = {
        margin: [35, 15, 20, 15],
        filename: "siteupdate_export.pdf",
        image: {type: 'jpeg', quality: 1},
        html2canvas: {dpi: 72, scale: 4, letterRendering: true},
        jsPDF: {unit: 'mm', format: 'a4', orientation: 'portrait'}
      };

      html2pdf().from(newDiv).set(opt).toContainer()
      .toCanvas()
      .toPdf()
      .get('pdf')
      .then((pdf) => {
        const totalPages = pdf.internal.getNumberOfPages();
        for (let i = 1; i <= totalPages; i += 1) {
            pdf.setPage(i);
            pdf.addImage(img, 'PNG', 13, 7, 120, 15);
            pdf.setDrawColor("#606061");
            pdf.setLineWidth(1.0);
            pdf.line(15, 27, 195, 27);
            pdf.setDrawColor("#3b6697");
            pdf.setLineWidth(0.2);
            pdf.line(15, 280, 195, 280);
            pdf.setFontSize(8);
            pdf.setFont(pdf.getFont().fontName, "normal");
            pdf.setTextColor("#000000");
            pdf.text('U.S. Department of Health and Human Services | National Institutes of Health | National Cancer Institute', 35,
                pdf.internal.pageSize.getHeight() / 1.04);
            pdf.setFont(pdf.getFont().fontName, "bold");
            pdf.text(`Page ${i} of ${totalPages}`, 180, pdf.internal.pageSize.getHeight() / 1.04);
        }
        })
        .save();
    };
  const selectedIdx = 1;
  return (
    <>
      <SiteUpdateResultContainer>
        <NavContainer>
          hello
        </NavContainer>
        <ResultInfo />
        {
            siteUpdateList.length === 0 ? (
            <ResultInfo>
              {/* No Results */}
            </ResultInfo>
          )
          : (
              <SiteUpdateItem id={`post${siteUpdateList[selectedIdx].id}`}>
                <SiteUpdateCard>
                  <SiteUpdateCardTitle id={`post${siteUpdateList[selectedIdx].id}_title`} title={siteUpdateList[selectedIdx].title}>
                    {siteUpdateList[selectedIdx].title}
                  </SiteUpdateCardTitle>
                  { siteUpdateList[selectedIdx].content_type
                  && (
                    <DataContentType>
                      {
                        siteUpdateList[selectedIdx].content_type.split(",").map((type, typeidx) => {
                          const typekey = `update_${typeidx}`;
                          const newType = type.trim();
                          const newTooltip = type.trim();
                          return (
                            <OverlayTrigger
                              key={typekey}
                              placement="bottom"
                              overlay={
                                (
                                  <Popover
                                    style={{
                                      marginLeft: '0px', padding: '10px', fontSize: '12px', zIndex: 98
                                    }}
                                  >
                                    {newTooltip}
                                  </Popover>
                                )
                              }
                            >
                              <img src={iconSrc[newType]} className={newType === "Clinical" ? "clinicalIcon" : "typeIcon"} alt={`${newType} icon`} />
                            </OverlayTrigger>
                          );
                        })
                      }
                    </DataContentType>
                  )}
                  <SiteUpdateExport>
                    <a href="#" role="button" className="buttonStyle" onClick={() => handleExport(`post${siteUpdateList[selectedIdx].id}`)}>
                      <span className="spanText">
                        <svg aria-hidden="true" focusable="false" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="svg-inline--fa fa-arrow-from-bottom fa-w-12 fa-lg">
                          <path fill="currentColor" d="M360 480H24c-13.3 0-24-10.7-24-24v-24c0-13.3 10.7-24 24-24h336c13.3 0 24 10.7 24 24v24c0 13.3-10.7 24-24 24zM90.4 216.5l65.6-65.6V360c0 13.3 10.7 24 24 24h24c13.3 0 24-10.7 24-24V150.9l65.6 65.6c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L209 30.1c-9.4-9.4-24.6-9.4-33.9 0L39.5 165.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0z" className="" />
                        </svg>
                        &nbsp;&nbsp;export
                      </span>
                    </a>
                  </SiteUpdateExport>
                  <SiteUpdateCardDescription id={`post${siteUpdateList[selectedIdx].id}_desc`}>
                    <div id={`post${siteUpdateList[selectedIdx].id}_date`}>{siteUpdateList[selectedIdx].post_date}</div>
                    {ReactHtmlParser(siteUpdateList[selectedIdx].description)}
                  </SiteUpdateCardDescription>
                </SiteUpdateCard>
              </SiteUpdateItem>
          )
        }
      </SiteUpdateResultContainer>
      <SpinnerContainer>
        {loading && <Spinner animation="border" />}
      </SpinnerContainer>
    </>
  );
};

SiteUpdateResult.propTypes = {
    siteUpdateList: PropTypes.array.isRequired,
    onLoadSiteUpdates: PropTypes.func.isRequired,
    onAddSiteUpdates: PropTypes.func.isRequired,
};

export default SiteUpdateResult;