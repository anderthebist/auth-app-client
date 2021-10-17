import React, { useEffect, useRef, useState } from 'react';

type OwnProps = {
    content: React.ReactNode,
    isHidden: boolean
}

const SearchRecomend: React.FC<OwnProps> = ({content, isHidden}) => {

    if(isHidden) return <></>

    return (
        <div className="search__users__recomended">
            {content}
        </div>
    )
}

export default SearchRecomend;