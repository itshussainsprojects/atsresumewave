'use client';

import ReactTilt from 'react-parallax-tilt';
import { twMerge } from 'tailwind-merge';

const ImgTilt = ({ props, children }) => {
    return (
        <ReactTilt
            trackOnWindow={true}
            tiltReverse={true}
            glareEnable={true}
            className={twMerge('shadow-2xl shadow-gray-900 w-64 md:w-[28rem] lg:w-[32rem] 2xl:w-[36rem]')}
            {...props}
        >
            {children}
        </ReactTilt>
    );
};

export default ImgTilt;
