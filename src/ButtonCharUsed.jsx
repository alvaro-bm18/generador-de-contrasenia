import React from 'react';
import './ButtonCharUsed.scss';
export default function ButtonCharUsed({ click, classBtn, text, children }) {
    return (
        <>
            <button onClick={() => { click() }} className={classBtn}>
                <div className="icon-button">
                    {children}
                </div>
                {text}
            </button>
        </>
    );
}