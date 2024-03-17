import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../../index";

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)
    const pages = []

    for(let i = 0; i < pageCount; i++){
        pages.push(i+1)
    }

    return (
        <div className="Pages">
            {pages.map(page =>
                <button
                    key={page}
                    onClick={() => product.setPage(page)}
                >{page}</button>
            )}
        </div>
    );
});

export default Pages;