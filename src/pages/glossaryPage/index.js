import React, {useState} from "react";
// import {Tabs, Tab, Sonnet} from 'react-bootstrap';
// import * as downloadApi from "../../api/downloadApi";
import './glossaryPage.css';

const Glossary = () => {
  const [key, setKey] = useState('A');

  return (
    <>
      <div className="glossaryPageContainer">
        <div className="glossaryPageHeader">
            <h2 className="glossaryHeaderText">
                Data Catalog Glossary
                <br />
            </h2>
            <div className="filter-links">
              <nav className="nav justify-content-center">
                <a className={key === 'A' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('A')}>A</a>
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">B</a>
                <a className={key === 'C' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('C')}>C</a>
                <a className={key === 'D' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('D')}>D</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">E</a>
                <a className={key === 'F' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('F')}>F</a>
                <a className={key === 'G' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('G')}>G</a>
                <a className={key === 'H' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('H')}>H</a>
                <a className={key === 'I' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('I')}>I</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">J</a>
                <a className={key === 'K' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('K')}>K</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">L</a>
                <a className={key === 'M' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('M')}>M</a>
                <a className={key === 'N' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('N')}>N</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">O</a>
                <a className={key === 'P' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('P')}>P</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">Q</a>
                <a className={key === 'R' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('R')}>R</a>
                <a className={key === 'S' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('S')}>S</a>
                <a className={key === 'T' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('T')}>T</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">U</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">V</a>
                <a className="nav-link disabled" href="#" aria-disabled="true">W</a>
                <a className={key === 'X' ? "nav-link nav-link-active" : "nav-link"} href="#" onClick={() => setKey('X')}>X</a>
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Y</a>
                <a className="nav-link disabled" href="#" tabIndex="-1" aria-disabled="true">Z</a>
              </nav>
            </div>
        </div>
      </div>
      <div className="glossaryGrid" />
      <div className="glossaryPageSection1">
      <div className="glossaryContent1">
        <div className="filter-sections">
          {
            key === 'A' && (
              <>
                <div className="a">
                  <h2 className="glossaryItemHeader">Aliquot</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">Pertaining to a portion of the whole; any one of two or more samples of something, of the same volume or weight.</p>
                  <p className="glossaryItemLink"><a href="https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C25414" target="_blank" rel="noreferrer noopener">https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C25414</a></p>
                  <br />
                </div>
                {/* <div className="a">
                  <h2 className="glossaryItemHeader">Any</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">One, some, every, or all without specification. This term means that the statistic value applies to the set of all values in the digest partition for the data element summarized.</p>
                  <p className="glossaryItemLink"><a href="https://datascience.nih.gov/sites/default/files/bd2k/docs/DDI_Workshop_summary.pdf" target="_blank" rel="noreferrer noopener">https://datascience.nih.gov/sites/default/files/bd2k/docs/DDI_Workshop_summary.pdf</a></p>
                  <br />
                </div> */}
                <div className="a">
                  <h2 className="glossaryItemHeader">Assay</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A laboratory test to find and measure the amount of a specific substance.</p>
                  <p className="glossaryItemLink"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/assay" target="_blank" rel="noreferrer noopener">https://www.cancer.gov/publications/dictionaries/cancer-terms/def/assay</a></p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'C' && (
              <>
                <div className="c">
                  <h2 className="glossaryItemHeader">Case</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A collection of data related to a specific individual in the context of a specific project. </p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Catalog</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">A data catalog is not a data repository but rather a place where data is described with an index to what is available. A collection of digests and references (e.g., URL or POC) to corresponding research artifacts. There is a consistent structure across the collection of digests to facilitate filtering and identifying research artifacts of interest. A catalog contains some combination of Summary Research Data, Summary Clinical Data, Data Overview, and Resource Metadata.</p>
                  <p className="glossaryItemLink"><a href="https://seer.cancer.gov/registries/cancer_registry/index.html" target="_blank" rel="noreferrer noopener">https://seer.cancer.gov/registries/cancer_registry/index.html</a></p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">CCDC</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">Childhood Cancer Data Catalog</p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">CCDI</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">Childhood Cancer Data Initiative</p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">CCSS</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Childhood Cancer Survivor Study</p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Cell Line</h2>
                  <span className="glossaryItemType">Data Content Type, Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A permanently established cell culture that will proliferate indefinitely given appropriate fresh medium and space.</p>
                  <p className="glossaryItemLink"><a href="https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C16403" target="_blank" rel="noreferrer noopener">https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C16403</a></p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">CGCI</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Cancer Genome Characterization Initiative</p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Clinical</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Relating to the examination and treatment of patients dependent on direct observation.</p>
                  <p className="glossaryItemLink"><a href="https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C25398" target="_blank" rel="noreferrer noopener">https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C25398</a></p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">COG</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Children&apos;s Oncology Group</p>
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Collection</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'D' && (
              <>
                <div className="d">
                  <h2 className="glossaryItemHeader">Data Content Type</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A classification of the type of the data hosted in the data resource’s own repository and which corresponds to the research purpose the data serves or from what part of the research process the data were generated.</p>
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Donor</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A person who gives blood, cells, tissue, or an organ for use in another person, such as in a blood transfusion or an organ transplant.</p>
                  <p className="glossaryItemLink"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/donor" target="_blank" rel="noreferrer noopener">https://www.cancer.gov/publications/dictionaries/cancer-terms/def/donor</a></p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'F' && (
              <>
                <div className="e">
                  <h2 className="glossaryItemHeader">FOIA</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">General Abbreviation</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'G' && (
              <>
                <div className="g">
                  <h2 className="glossaryItemHeader">GDC</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Resource Abbreviation</p>
                  <br />
                </div>
                <div className="g">
                  <h2 className="glossaryItemHeader">Genomics/Omics</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Includes DNA/RNA sequence data, proteomic data, transcriptomic data, etc.</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'H' && (
              <>
                <div className="h">
                  <h2 className="glossaryItemHeader">HTAN</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Human Tumor Atlas Network</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'I' && (
              <>
                <div className="i">
                  <h2 className="glossaryItemHeader">Imaging</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">A process that makes pictures of areas inside the body. Imaging uses methods such as x-rays (high-energy radiation), ultrasound (high-energy sound waves), and radio waves.</p>
                  <p className="glossaryItemLink"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/imaging" target="_blank" rel="noreferrer noopener">https://www.cancer.gov/publications/dictionaries/cancer-terms/def/imaging</a></p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'K' && (
              <>
                <div className="k">
                  <h2 className="glossaryItemHeader">KF</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Kids First</p>
                  <br />
                </div>
                <div className="k">
                  <h2 className="glossaryItemHeader">Knowledgebase </h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">Biomedical knowledgebases extract, accumulate, organize, annotate, and link the growing body of information that is related to and relies on core datasets.</p>
                  <p className="glossaryItemLink"><a href="https://datascience.nih.gov/biomedical-data-repositories-and-knowledgebases" target="_blank" rel="noreferrer noopener">https://datascience.nih.gov/biomedical-data-repositories-and-knowledgebases</a></p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'M' && (
              <>
                <div className="m">
                  <h2 className="glossaryItemHeader">Mixed</h2>
                  <span className="glossaryItemType">Pediatric Specific</span>
                  <p className="glossaryItemDescription">A data resource hosts pediatric, young adult, and adult oncology research data</p>
                  <br />
                </div>
                <div className="m">
                  <h2 className="glossaryItemHeader">MyPart</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">My Pediatric and Adult Rare Tumor network</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'N' && (
              <>
                <div className="n">
                  <h2 className="glossaryItemHeader">NCCR</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">National Childhood Cancer Registry</p>
                  <br />
                </div>
                <div className="n">
                  <h2 className="glossaryItemHeader">NCI</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">National Cancer Institute</p>
                  <br />
                </div>
                <div className="n">
                  <h2 className="glossaryItemHeader">NIH</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">National Institutes of Health </p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'P' && (
              <>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PCAT</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">PDX for Childhood Cancer Therapeutics</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PCDC</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Pediatric Cancer Data Commons</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PDX</h2>
                  <span className="glossaryItemType">General Abbreviation</span>
                  <p className="glossaryItemDescription">Patient Derived Xenograft</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PEDC</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">PedcBioPortal for Integrated Childhood Cancer Genomics</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">Pediatric Only</h2>
                  <span className="glossaryItemType">Pediatric Specific</span>
                  <p className="glossaryItemDescription">A data resource exclusively hosts pediatric and young adult (&#60; 40 years old) oncology research data</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PedMATCH</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Pediatric Molecular Analysis for Therapy Choice</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PGDI</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Pediatric Genomic Data Inventory</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">PPTC</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Pediatric Preclinical Testing Consortium</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Primary Dataset Scope</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A classification of common administrative or physical construct to which a researcher associates data. For example, a dataset whose scope is a project contains information belonging to one project. A typical dataset scope is Project, Program, or Collection. Collection is a generic scope whose scoping criteria are not built into the term.</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Program</h2>
                  <span className="glossaryItemType">Primary Dataset Scope, Resource Type</span>
                  <p className="glossaryItemDescription">A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization&apos;s mission or some specific program-related aspect of that mission.</p>
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Project</h2>
                  <span className="glossaryItemType">Primary Dataset Scope, Resource Type</span>
                  <p className="glossaryItemDescription">Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial. </p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'R' && (
              <>
                <div className="r">
                  <h2 className="glossaryItemHeader">Reference</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A URL or other identifier for a paper, journal, or other non-structured written medium for information about a research dataset.</p>
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Registry</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">A cancer registry is an information system designed for the collection, storage, and management of data on persons with cancer. An inventory of individuals or samples, usually focused on a specific diagnosis or condition. In some cases, public health laws require collecting information in registries about individuals who have a specific disease or condition. In other cases, individuals provide information about themselves to these registries voluntarily. Thus, a registry contains Individual Clinical Data, but not Individual Research Data.</p>
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Research Data Repository</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">Biomedical data repositories accept submission of relevant data from the community to store, organize, validate, archive, preserve and distribute the data, in compliance with the FAIR Data Principles.  A system for storing multiple research artifacts, provided at least some of the research artifacts contain Individual Research Data. A data repository often contains artifacts from multiple studies. Some data repositories accept research datasets irrespective of the structure of those datasets; other data repositories require all research datasets to conform to a standard reference model.</p>
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Research Dataset</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A collection of related data records.</p>
                  <p className="glossaryItemLink"><a href="https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C47824" target="_blank" rel="noreferrer noopener">https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C47824</a></p>
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Data Content Type</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A classification of the type of the data hosted in the data resource’s own repository and which corresponds to the research purpose the data serves or from what part of the research process the data were generated.</p>
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Type</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A classification based on the selection or purpose of information in the resource. Types of systems are: Registry, Research Data Repository, Catalog, or Program.</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'S' && (
              <>
                <div className="s">
                  <h2 className="glossaryItemHeader">Sample</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">Material taken from a biological entity for testing, diagnostic, propagation, treatment or research purposes, including a sample obtained from a living organism or taken from the biological object after halting of all its life functions. A sample, also known as a biospecimen, can contain one or more components including but not limited to cellular molecules, cells, tissues, organs, body fluids, embryos, and body excretory products.</p>
                  <p className="glossaryItemLink"><a href="https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C70699" target="_blank" rel="noreferrer noopener">https://ncithesaurus.nci.nih.gov/ncitbrowser/ConceptReport.jsp?dictionary=NCI_Thesaurus&ns=ncit&code=C70699</a></p>
                  <br />
                </div>
                <div className="s">
                  <h2 className="glossaryItemHeader">SRA</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Sequence Read Archive</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'T' && (
              <>
                <div className="t">
                  <h2 className="glossaryItemHeader">TARGET</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">Therapeutically Applicable Research to Generate Effective Treatments</p>
                  <br />
                </div>
                <div className="t">
                  <h2 className="glossaryItemHeader">TCIA</h2>
                  <span className="glossaryItemType">Resource Abbreviation</span>
                  <p className="glossaryItemDescription">The Cancer Imaging Archive</p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
          {
            key === 'X' && (
              <>
                <div className="x">
                  <h2 className="glossaryItemHeader">Xenograft</h2>
                  <span className="glossaryItemType">Data Content Type, Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">The transplant of an organ, tissue, or cells to an individual of another species.</p>
                  <p className="glossaryItemLink"><a href="https://www.cancer.gov/publications/dictionaries/cancer-terms/def/xenograft" target="_blank" rel="noreferrer noopener">https://www.cancer.gov/publications/dictionaries/cancer-terms/def/xenograft</a></p>
                  <br />
                  <br />
                </div>
              </>
            )
          }
        </div>
      </div>
      </div>
    {/* <br /> */}
    <div className="grid" />
    <div className="glossaryPageSection2Container">
    {/* <br /> */}
    </div>
    </>
  );
};

export default Glossary;