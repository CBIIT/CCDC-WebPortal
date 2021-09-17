import React from "react";
import './aboutPage.css';

const AboutPage = () => (
    <div className="aboutPageContainer">
        <h2 className="aboutHeader">About Page</h2>
        <div className="aboutPageContent">
            <form className="aboutSection1">
                <h2 style={{ paddingBottom: "20px" }}>About Page Section 1</h2>
                <p>
                    This is only placeholder text for the about page. This app uses React, Redux, React Router, and may other helpful libraries.
                    It is building a community centered
                    around childhood cancer care and research data. Through enhanced data sharing, we can
                    improve our understanding of cancer biology to improve preventive measures, treatment, quality of life, and survivorship,
                    as well as ensure that researchers learn from every child with cancer.
                    <p />
                    <div className="space20" />
                    While childhood cancers represent the leading cause of death in children over the age of 1, they are collectively rare, comprising approximately 1%‒3%
                    of cancers diagnosed annually in the United States. Information on diagnosis, treatment, and outcomes is often stored at
                    the hospital or institution where a child is treated, making it difficult to answer scientific questions about childhood cancer.
                    Sharing clinical care and research data generated by children’s hospitals, clinics, or networks broadly with the community can help us learn faster and on a scale much larger than any single
                    institution caring for children can learn on its own.
                </p>
            </form>
        </div>
        <div className="space20" />
        <div className="aboutPageContent">
            <form className="aboutSection1">
                <h2 style={{ paddingBottom: "20px" }}>About Page Section 2</h2>
                <p>
                    This is only placeholder text for the about page. More text goes here.
                    For to be successful, it requires the engagement of the entire childhood cancer care and research community. To enable broad participation, CCDC
                    is organized into committees and working groups that include diverse representation from the childhood cancer community
                    including diverse advocates, pediatric oncologists, researchers, and data scientists that represent the children, adolescents, and young adults served. To focus
                    and align priorities, a steering committee will provide strategic direction and feedback on working group activities and will collaborate with the community.
                    <p />
                    <div className="space20" />
                    Contact Information: Example Text
                    <div className="space20" />
                    Websites Update Information: Example Text
                    <div className="space20" />
                    Featured and Related News Information: Example Text
                    <div className="space20" />
                    Other Useful Links and Websites: Example Text
                </p>
            </form>
        </div>

    </div>
);

export default AboutPage;