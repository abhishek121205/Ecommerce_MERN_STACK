import React from 'react'


const Logo = (props) => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 300 150"
            width={props.w}
            height={props.h}
        >

            {/* Main Text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fontFamily="'Pacifico', cursive"
                fontSize="80"
                fontWeight="bold"
                fill="#333"
                dy="1"
            >
                Abhi
            </text>

            {/* Sub Text */}
            <text
                x="50%"
                y="50%"
                textAnchor="middle"
                fontFamily="'Pacifico', cursive"
                fontSize="46"
                fill="#555"
                dy="50"
            >
                Shop here
            </text>
        </svg>
    )
}
{/* <svg
    width={props.w}
    height={props.h}
    viewBox="0 0 400 200"
    xmlns="http://www.w3.org/2000/svg"
>
    <text
        x="50%"
        y="60%"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="'Pacifico', cursive"
        fontSize="110"
        fill=""
    >
        Abhi
    </text>
</svg> */}
export default Logo
