import './RangeBar.scss';
export default function RangeBar({ min, max, value, change }) {
    return (
        <>
            <div className="range-container">
                <input
                    type="range"
                    min={min}
                    max={max}
                    value={value}
                    name="lenPassword"
                    id="lenPassword"
                    onChange={() => { change() }} />
                <div className="bar-range"></div>
            </div>
        </>
    );
}