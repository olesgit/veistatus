import React, {PropTypes} from 'react';
import {Link} from 'react-router';

const LinkSetSubtitle = ({to, children, pageTitle}) => {
    return (
        <Link to={{ pathname: to, state: { subTitle: children, pageTitle: pageTitle} }}>{children}</Link>
    );
};

LinkSetSubtitle.propTypes = {
    to: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    pageTitle: PropTypes.string
};

export default LinkSetSubtitle;