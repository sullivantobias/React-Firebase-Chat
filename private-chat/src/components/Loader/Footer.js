import React from 'react';

import './styles.scss';

export const Loader = ({ dark }) => {
    return (
        <div className="cmp-loader">
            <div className={ `spinner ${ dark ? 'dark' : '' }` }/>
        </div>
    )
};
