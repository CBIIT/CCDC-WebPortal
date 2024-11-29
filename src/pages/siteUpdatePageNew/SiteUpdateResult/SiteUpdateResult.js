import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Collapse from 'react-bootstrap/Collapse';
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
  padding: 0 20px 50px 0;
`;

const NavContainer = styled.div`
  display: flex;
  padding: 0 0 50px 0;
  border-right: 1px solid #E0E4E7;
  border-top: 3px solid #C3D5E0;

  .navListContainer {
    width: 230px;
    margin: 5px;
    padding-left: 0;
  }

  .navTitle {
    color: #004187;
    font-family: Lato;
    font-size: 21px;
    font-style: normal;
    font-weight: 900;
    line-height: 150%; /* 31.5px */
    letter-spacing: 0.105px;
    padding: 7px 0 6px 10px;
    background: #F7F8FA;
  }

  .dateSubListContainer {
    list-style-type: none;
    margin-bottom: 2px;
  }

  .yearTitleContainer {
    background: #F7F8FA;  
    padding: 0 10px;
  }

  .yearTitle {
    width: 100%;
    padding: 7px 0;
    // margin-top: 2px;
    border: none;
    color: #8A9296;
    font-family: Lato;
    font-size: 12.8px;
    font-style: normal;
    font-weight: 600;
    line-height: 15.36px; /* 120% */
    text-align: left;
    border-top: 1px solid #4BA4E3;
    background: #F7F8FA;
  }

  .yearTitle:not(.collapsed)::after {
    background-image: none;
    transform: rotate(-180deg);
  }

  .yearTitle::after {
    flex-shrink: 0;
    width: 1rem;
    height: 0;
    display: inline-block;
    vertical-align: .5em;
    content: "";
    border-top: .6em solid;
    border-right: .5em solid transparent;
    border-bottom: 0;
    border-left: .5em solid transparent;
    font-size: 1rem;
    background-image: none;
    transition: transform .2s ease-in-out;
    color: #4ba4e3;
    text-align: right;
    float:right;
  }

  .dateSubList {
    padding: 0;
  }

  .dateListItem {
    list-style-type: none;
    padding: 5px 10px;

    a {
      text-decoration: none;
      color: #004187;
      font-family: Lato;
      font-size: 17px;
      font-style: normal;
      font-weight: 700;
      line-height: 150%; /* 25.5px */
    }

    :nth-child(6n+1) {
    background-color: #e9e9e9;
  }

    :nth-child(6n+3) {
      background-color: #d6e6f3;
    }

    :nth-child(6n+5) {
      background-color: #e9e2bc;
    }
  }

  .dateListItemText {
    width: 100%;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResultInfo = styled.div`
  margin-left: 20px;
  font-weight: bold;
`;

const SiteUpdateItem = styled.div`
  scroll-margin: 200px;
`;

const SiteUpdateCard = styled.div`
  display: grid;
  border: 1px solid #b6dffd;
  box-shadow: 3px 3px 10px lightgray;
  // margin-top: 20px;
  // margin: -44px 30px 0px 370px;
  padding: 15px 29px;
  width: 910px;
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

    .dateContainer {
      color: #707F8D;
      font-family: Lato;
      font-size: 16px;
      font-style: normal;
      font-weight: 400;
      line-height: 150%; /* 24px */
      margin-bottom: 10px;
    }

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
    const [siteUpdateNav, setSiteUpdateNav] = useState([]);
    const [open, setOpen] = useState([]);
    const [selectedIdx, setSelectedIdx] = useState(0);
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

    const formatDate = (date) => {
      const dateData = `${date.substring(5, 7)}/${date.substring(8, 10)}/${date.substring(0, 4)}`;
      const newDate = new Date(dateData);
      const newDateArr = newDate.toDateString().split(' ');
      const month = newDate.toLocaleString('default', { month: 'long' });
      const newDateFormat = month.concat(' ', newDateArr[2], ', ', newDateArr[3]);
      return newDateFormat;
    };

    const createNav = () => {
      const NavList = [];
      let SubObj = null;
      let SubList = [];
      let prevYear = 0;
      for (let i = 0; i < siteUpdateList.length; i += 1) {
        const currYear = siteUpdateList[i].post_date.split("-")[0];
        const yearObj = {};
        const date = siteUpdateList[i].post_date;
        const newDateFormat = formatDate(date);
        if (prevYear !== currYear) {
          if (SubObj) {
            SubObj.list = SubList;
            NavList.push(SubObj);
          }
          SubList = [];
          SubObj = {};
          SubObj.year = currYear;
          prevYear = currYear;
        }
        yearObj.date = newDateFormat;
        yearObj.index = i;
        SubList.push(yearObj);
        if (i === siteUpdateList.length - 1) {
          SubObj.list = SubList;
          NavList.push(SubObj);
        }
      }
      return NavList;
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
      setSiteUpdateNav(createNav());
      const openArr = [];
      openArr[0] = true;
      for (let i = 1; i < siteUpdateNav.length; i += 1) {
        openArr[i] = false;
      }
      setOpen(openArr);
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

  const handleClick = (idx) => {
    const newOpen = Object.assign([], open);
    newOpen[idx] = !newOpen[idx];
    setOpen(newOpen);
  };

  return (
    <>
      <SiteUpdateResultContainer>
        <NavContainer>
          <ul className="navListContainer">
            <div className="navTitle">Release Note</div>
          {
            siteUpdateNav.map((subObj, objidx) => {
              const objkey = `obj_${objidx}`;
              return (
                <li key={objkey} className="dateSubListContainer">
                  <div className="yearTitleContainer">
                    <button type="button" className={`yearTitle ${open[objidx] ? "" : "collapsed"}`} onClick={() => handleClick(objidx)}>{subObj.year}</button>
                  </div>
                  <Collapse in={open[objidx]}>
                    <ul className="dateSubList">
                    {
                      subObj.list.map((navItem, yearidx) => {
                        const yearkey = `obj_${yearidx}`;
                        return (
                          <li key={yearkey} className="dateListItem" style={selectedIdx === navItem.index ? {border: '3px solid #676767', padding: '2px 7px'} : null}>
                            <a href="#" role="button" onClick={() => setSelectedIdx(navItem.index)}>
                              <div className="dateListItemText">{navItem.date}</div>
                            </a>
                          </li>
                        );
                      })
                    }
                    </ul>
                  </Collapse>
                </li>
              );
            })
          }
          </ul>
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
                    <div className="dateContainer" id={`post${siteUpdateList[selectedIdx].id}_date`}>{formatDate(siteUpdateList[selectedIdx].post_date)}</div>
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