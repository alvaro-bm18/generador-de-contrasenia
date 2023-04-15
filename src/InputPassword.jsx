import React from 'react';
import './InputPass.scss';
export default function InputPassword({val}) {
    return (
        <>
            <input
                type="text"
                name="password"
                id="password"
                value={val}
                className='input-password-generated'
                onChange={() => { }} />
        </>
    );
}