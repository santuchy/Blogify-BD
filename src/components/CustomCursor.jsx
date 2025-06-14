import React from 'react';
import AnimatedCursor from 'react-animated-cursor';


const CustomCursor = () => {

    return (
        <div>
            <AnimatedCursor
                innerSize={8}
                outerSize={35}
                innerScale={1}
                outerScale={2}
                outerAlpha={0}
                hasBlendMode={true}
                innerStyle={{
                    backgroundColor: '#f6e05e'
                }}
                outerStyle={{
                    border: '3px solid #f6e05e'
                }}
            />
        </div>
    );
};

export default CustomCursor;