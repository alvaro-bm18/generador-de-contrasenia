import './ButtonNormal.scss';

export default function ButtonNormal({ click, children }) {
    return (
        <>
            <button className="button-normal" onClick={() => { click() }}>
                {children}
            </button>
        </>
    );
}