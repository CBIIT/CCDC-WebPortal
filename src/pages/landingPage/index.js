import React, {useState} from 'react';
import { useNavigate, Link } from "react-router-dom";
import { Button } from 'react-bootstrap';
import SiteUpdateWidget from './SiteUpdateWidget';
import Carousel from '../../components/Carousel';
import './landingPage.css';

const HomePage = () => {
  const [localText, setLocalText] = useState("");
  const navigate = useNavigate();
  window.scrollTo(0, 0);

  const handleTextInputChange = (event) => {
    const text = event.target.value;
    setLocalText(text);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?search_text=${localText}`);
    }
  };

  return (
      <>
          <div className="searchContainer">
              <div className="heroImage" />
              <div className="heroTextContainer">
                  <div className="heroTextWrapper">
                      <div className="headerTitle">
                          <span>Childhood</span>
                          <span>Cancer</span>
                          <span>Data Catalog</span>
                      </div>
                      <div className="headerDesc">
                        A searchable database of pediatric data resources,&nbsp;
                        <br />
                        sharing clinical care and research data generated by&nbsp;
                        <br />
                        the pediatric cancer research community.
                      </div>
                      <div className="heroSearchBox">
                          <div className="search">
                              <input type="text" className="searchTerm" placeholder="Search for Datasets" value={localText} onChange={(e) => handleTextInputChange(e)} onKeyPress={(e) => handleKeyPress(e)} />
                              <Link to={`/search?search_text=${localText}`} className="headerLink">
                                  <button type="submit" className="searchButton">
                                      <svg
                                        width="30"
                                        fontWeight="500"
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="search"
                                        className="searchIcon"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 512 512"
                                      >
                                          <path
                                            fill="#FFBF17"
                                            d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0
                                              208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7
                                              99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7
                                                  0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128
                                                  57.2 128 128 0 70.7-57.2 128-128 128z"
                                          />
                                      </svg>
                                  </button>
                              </Link>
                          </div>
                      </div>
                      <div className="headerWidget">
                        <SiteUpdateWidget />
                      </div>
                  </div>
              </div>
          </div>
          <div className="cards">
              <Carousel />
          </div>
          <div className="infoContainer">
              <div className="heroImage2">
                <div className="heroTextContainer2">
                    <div className="heroTextWrapper2">
                    <div className="row">
                        <div className="column1">
                            <div className="headerContent2">
                                What can
                                <br />
                                you expect
                                <br />
                                from the
                                <br />
                                Data Catalog
                            </div>
                        </div>
                        <div className="column2">
                            <p className="infoSection">
                                The CCDI Childhood Cancer Data Catalog is a searchable database of
                                National Cancer Institute and other pediatric cancer resources.
                                <br />
                                <br />
                                Resources include repositories, registries, programs, knowledgebases, analytic tools
                                and catalogs that either manage or refer to data. Users can browse
                                and filter the list of data resources or enter search terms to identify
                                data of interest.
                                <br />
                                <br />
                                Links to those data resources are provided in the browse or search results.
                                <br />
                                <br />
                            </p>
                            <a href="/search" className="headerLink2">
                                <Button className="buttonText color-white">
                                    <span className="buttonLabel">EXPLORE THE CATALOG&emsp;&emsp;&emsp;&emsp;&emsp;</span>
                                    <span className="buttonIcon">
                                        <i className="fas fa-caret-right" />
                                    </span>
                                </Button>
                            </a>
                        </div>
                    </div>
                    </div>
                </div>
              </div>
          </div>
      </>
  );
};

export default HomePage;