import * as React from "react"; 

export const ImageHoverZoom = ({ imageUrl }) => {
    return (
        <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
            <img
                src={imageUrl}
                alt=""
                className="object-cover h-48 w-full transition-all duration-400 ease-in-out transform hover:scale-125"
            />
        </div>
    );
};