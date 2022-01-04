import React from "react";
// import * as downloadApi from "../../api/downloadApi";
import './glossaryPage.css';

// animate content on start
const items = document.querySelectorAll('.filter-sections div');
animate(items);

// filter on click
// each('.filter-links li a', function(el) {
each('.filter-links a', function(el) {
  el.addEventListener('click', function(e) {
    e.preventDefault();
    filterLinks(el);
  });
});

// filter links functions
function filterLinks(element) {
  const el = element.textContent,
    linksTolowerCase = el.toLowerCase();
  // if all remove all elements
  if (el === 'All') {
    // first show all view class
    each('.view', function(e) {
      e.classList.remove('view');
    });
    // no show init content
    animate(items);
  } else {
    // if not click all remove all elements
    each('.view', function(e) {
      e.classList.remove('view');
    });
  }
  // show current elements
  animate(document.querySelectorAll('.' + linksTolowerCase));
}
// forech arrays
function each(el, callback) {
  const allDivs = document.querySelectorAll(el),
    alltoArr = Array.prototype.slice.call(allDivs);
  Array.prototype.forEach.call(alltoArr, function(selector, index) {
    if (callback) return callback(selector);
  });
};
function animate(item) {
  (function show(counter) {
    setTimeout(function() {
      item[counter].classList.add('view');
      counter++;
      if (counter < item.length) show(counter);
    }, 50);
  })(0);
}

const Glossary = () => {
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
                    {/* <a className="nav-link" href="">All</a> */}
                    {/* <a className="nav-link" href="">A</a> */}
                    <a className="nav-link" href="">A</a>
                    {/* <a className="nav-link" aria-current="page" href="#A">A</a> */}
                    <a className="nav-link disabled" href="" tabIndex="-1" aria-disabled="true">B</a>
                    {/* <a className="nav-link" href="#C">C</a> */}
                    <a className="nav-link" href="">C</a>
                    <a className="nav-link" href="">D</a>
                    <a className="nav-link" href="">E</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">F</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">G</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">H</a>
                    <a className="nav-link" href="#I">I</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">J</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">K</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">L</a>
                    <a className="nav-link" href="">M</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">N</a>
                    <a className="nav-link" href="">O</a>
                    <a className="nav-link" href="">P</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">Q</a>
                    <a className="nav-link" href="">R</a>
                    <a className="nav-link" href="">S</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">T</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">U</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">V</a>
                    <a className="nav-link disabled" href="" aria-disabled="true">W</a>
                    <a className="nav-link" href="">X</a>
                    <a className="nav-link disabled" href="" tabIndex="-1" aria-disabled="true">Y</a>
                    <a className="nav-link disabled" href="" tabIndex="-1" disabled="true">Z</a>
                  </nav>
                </div>
            </div>
        </div>
        <div className="grid" />
        <div className="glossaryPageSection1">
            <div className="glossaryContent1">
              <div className="filter-sections">
                <div className="a">
                  <h2 className="glossaryItemHeader">Aliquot</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">Pertaining to a portion of the whole; any one of two or more samples of something, of the same volume or weight.</p>
                  <p className="glossaryItemLink"><a href="https://datascience.nih.gov/biomedical-data-repositories-and-knowledgebases">https://datascience.nih.gov/biomedical-data-repositories-and-knowledgebases</a></p>
                  <br />
                  <br />
                </div>
                <div className="a">
                  <h2 className="glossaryItemHeader">Any</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">One, some, every, or all without specification. This term means that the statistic value applies to the set of all values in the digest partition for the data element summarized.</p>
                  <p className="glossaryItemLink"><a href="https://datascience.nih.gov/sites/default/files/bd2k/docs/DDI_Workshop_summary.pdf">https://datascience.nih.gov/sites/default/files/bd2k/docs/DDI_Workshop_summary.pdf</a></p>
                  <br />
                  <br />
                </div>
                <div className="a">
                  <h2 className="glossaryItemHeader">Average</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">A statistical calculation describing the central tendency of a set of numbers.</p>
                  <p className="glossaryItemLink"><a href="https://grants.nih.gov/grants/glossary.htm#P">https://grants.nih.gov/grants/glossary.htm#P</a></p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Case</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A collection of data related to a specific individual in the context of a specific project. </p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Catalog</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">A data catalog is not a data repository but rather a place where data is described with an index to what is available. A collection of digests and references (e.g., URL or POC) to corresponding research artifacts. There is a consistent structure across the collection of digests to facilitate filtering and identifying research artifacts of interest. A catalog contains some combination of Summary Research Data, Summary Clinical Data, Data Overview, and Resource Metadata.</p>
                  <p className="glossaryItemLink"><a href="https://seer.cancer.gov/registries/cancer_registry/index.html">https://seer.cancer.gov/registries/cancer_registry/index.html</a></p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Cell Line</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A cell culture developed from a single cell or group of similar cells and therefore consisting of cells with a uniform genetic makeup that can be reproduced for various types of research. A cell line is different than a tissue sample in that it is grown as a culture of identical cells and can be reproduced indefinitely.</p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Cell Lines</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Data associated with primary or immortalized cell lines. Usually from human but animal models Includes omics data, intervention responses, histology.</p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Clinical</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Structured data used for research, deidentified, but not genomics data, imaging data, or mere demographic data. This includes clinical interventions (treatments or surgery), biopsy reports/analyses, pathology/histology reports, medical histories, family history, etc. Can be from research or point of care. Note: Different from demographic data.</p>
                  <br />
                  <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Collection</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A group of datasets collected together for any reason by an organization of researchers, stewards, or stakeholders either pertaining to a common theme or for a common purpose. For example, the Treehouse Childhood Cancer Initiative maintains a collection of cell line data as part of their repository of pediatric cancer genomic data.</p>
                  <br />
                <br />
                </div>
                <div className="c">
                  <h2 className="glossaryItemHeader">Count</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">The number or amount of something.</p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Dataset Abbreviated Name</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">Dataset abbreviation or acronym. </p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Dataset Description</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">General information about the dataset.</p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Dataset ID</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">An identifier of the dataset that may be unique within a data resource.</p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Dataset Name</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A name used to refer to the dataset. For example, a project name.</p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Dataset POC</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">Point of contact for obtaining access to or more information about this research component, e.g. about a project or case.</p>
                  <br />
                  <br />
                </div>
                <div className="d">
                  <h2 className="glossaryItemHeader">Donor</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A donor is an individual (either human or animal) from which tissue for grafting, tissue for creating a cell line, or tumor sample for studying was taken. In these contexts the datasets are not associated with clinical or project cases. Minimal information about a donor helps describe the grafted tissue, the cell line, or the tumor sample.</p>
                  <br />
                  <br />
                </div>
                <div className="e">
                  <h2 className="glossaryItemHeader">Exact Value</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">Rather than a summary, this statistic term indicates that the summarized data element value and the statistic value are the same, which happens when the digest partition corresponds to one instance rather than a set of instances. </p>
                  <br />
                  <br />
                </div>
                <div className="i">
                  <h2 className="glossaryItemHeader">Imaging</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Includes radiology images or other types of images.</p>
                  <br />
                  <br />
                </div>
                <div className="m">
                  <h2 className="glossaryItemHeader">Maximum</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">The largest possible value.</p>
                  <br />
                  <br />
                </div>
                <div className="m">
                  <h2 className="glossaryItemHeader">Minimum</h2>
                  <span className="glossaryItemType">Statistic Type</span>
                  <p className="glossaryItemDescription">The smallest possible value.</p>
                  <br />
                  <br />
                </div>
                <div className="m">
                  <h2 className="glossaryItemHeader">Mixed</h2>
                  <span className="glossaryItemType">Pediatric Specific</span>
                  <p className="glossaryItemDescription">A data resource hosts pediatric, young adult, and adult oncology research data</p>
                  <br />
                  <br />
                </div>
                <div className="o">
                  <h2 className="glossaryItemHeader">Omics</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Includes sequence data, proteomic data, or transcriptomic data.</p>
                  <br />
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader" id="P">Pediatric Only</h2>
                  <span className="glossaryItemType">Pediatric Specific</span>
                  <p className="glossaryItemDescription">A data resource exclusively hosts pediatric and young adult (lesssssss40 years old) oncology research data</p>
                  <br />
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Primary Dataset Scope</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A classification of common administrative or physical construct to which a researcher associates data. For example, a dataset whose scope is a project contains information belonging to one project. A typical dataset scope is Project, Program, or Collection. Collection is a generic scope whose scoping criteria are not built into the term.</p>
                  <br />
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Program</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization&apos;s mission or some specific program-related aspect of that mission.</p>
                  <br />
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Program</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">A coherent assembly of plans, project activities, and supporting resources contained within an administrative framework, the purpose of which is to implement an organization&apos;s mission or some specific program-related aspect of that mission.</p>
                  <br />
                  <br />
                </div>
                <div className="p">
                  <h2 className="glossaryItemHeader">Project</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">Any specifically defined piece of work that is undertaken or attempted to meet the goals of a program and that involves one or more case studies. Also known as a Study or Trial. </p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Reference</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">A URL or other identifier for a paper, journal, or other non-structured written medium for information about a research dataset.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Registry</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">A cancer registry is an information system designed for the collection, storage, and management of data on persons with cancer. An inventory of individuals or samples, usually focused on a specific diagnosis or condition. In some cases, public health laws require collecting information in registries about individuals who have a specific disease or condition. In other cases, individuals provide information about themselves to these registries voluntarily. Thus, a registry contains Individual Clinical Data, but not Individual Research Data.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Research Data Repository</h2>
                  <span className="glossaryItemType">Resource Type</span>
                  <p className="glossaryItemDescription">Biomedical data repositories accept submission of relevant data from the community to store, organize, validate, archive, preserve and distribute the data, in compliance with the FAIR Data Principles.  A system for storing multiple research artifacts, provided at least some of the research artifacts contain Individual Research Data. A data repository often contains artifacts from multiple studies. Some data repositories accept research datasets irrespective of the structure of those datasets; other data repositories require all research datasets to conform to a standard reference model.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Research Dataset</h2>
                  <span className="glossaryItemType">Dataset Structure</span>
                  <p className="glossaryItemDescription">An administrative research construct to which data are directly associated and which aligns with components of research practice. </p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Data Content Type</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A classification of the type of the data hosted in the data resource’s own repository and which corresponds to the research purpose the data serves or from what part of the research process the data were generated.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Description</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">Textual information about a resource.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource ID</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A technical key to uniquely identify a data resource construct within a data catalog. </p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Name</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A name used to refer to a resource.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource POC</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">Point of contact for obtaining access to or more information about this resource. The source information may call this author or owner or POC.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                  <h2 className="glossaryItemHeader">Resource Type</h2>
                  <span className="glossaryItemType">Resource Structure</span>
                  <p className="glossaryItemDescription">A classification based on the selection or purpose of information in the resource. Types of systems are: Registry, Research Data Repository, Catalog, or Program.</p>
                  <br />
                  <br />
                </div>
                <div className="r">
                    <h2 className="glossaryItemHeader">Resource URI</h2>
                    <span className="glossaryItemType">Resource Structure</span>
                    <p className="glossaryItemDescription">A unique identifier for the resource</p>
                    <br />
                    <br />
                </div>
                <div className="s">
                  <h2 className="glossaryItemHeader">Sample</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">Material taken from a biological entity for testing, diagnostic, propagation, treatment or research purposes, including a sample obtained from a living organism or taken from the biological object after halting of all its life functions. A sample, also known as a biospecimen, can contain one or more components including but not limited to cellular molecules, cells, tissues, organs, body fluids, embryos, and body excretory products.</p>
                  <br />
                  <br />
                </div>
                <div className="x">
                  <h2 className="glossaryItemHeader">Xenograft</h2>
                  <span className="glossaryItemType">Data Content Type</span>
                  <p className="glossaryItemDescription">Includes omics data, whole-body imaging, intervention responses, and histology data derived from a xenograft.</p>
                  <br />
                  <br />
                </div>
                <div className="x">
                  <h2 className="glossaryItemHeader">Xenograft</h2>
                  <span className="glossaryItemType">Primary Dataset Scope</span>
                  <p className="glossaryItemDescription">Cells, tissues, or organs from a donor that are transplanted into a recipient of another species.</p>
                  <br />
                  <br />
                </div>
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