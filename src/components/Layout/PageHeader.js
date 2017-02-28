import React, {PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';

import '../../css/layout/PageHeader.css';

const PageHeader = ({pageTitle, subTitle}) => {
    const renderPageTitle = (pageTitle, subTitle) => {
        if (!subTitle)
            return <h1 ><strong>{pageTitle}</strong></h1>
        return <h1 >{pageTitle}<span><strong><Glyphicon glyph="chevron-right"/>{subTitle}</strong></span></h1>;
    };

    return pageTitle && pageTitle !== "" ? (
        <div className="page-header">
                {renderPageTitle(pageTitle, subTitle)}
        </div>   
    ) : (<div></div>);
}

PageHeader.propTypes = {
    pageTitle: PropTypes.string.isRequired,
    subTitle: PropTypes.string
};

export default PageHeader;