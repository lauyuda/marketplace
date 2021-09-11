import { ShoppingCartIcon } from "@heroicons/react/solid";
import PropTypes from "prop-types";
import * as React from "react";
import { Button } from "./button";

const AddCartButton = () => (
  <Button
    variant="primary"
    onClick={() => alert("Adding to cart!")}
  >
    <ShoppingCartIcon className="h-4 w-4 mr-1.5" />
    ADD TO CART
  </Button>
);


const Badge = ({ children }) => (
  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
    {children}
  </span>
);

export const CartListingItem = (props) => {

  return (
    <div className="relative flex flex-col">
      <div className="group block w-full rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-pink-500 overflow-hidden">
        <img
          src={props.imageUrl}
          alt=""
          className="object-cover h-48 w-full transition-all duration-400 ease-in-out transform hover:scale-125"
        />
        <button type="button" className="absolute inset-0 focus:outline-none">
          <span className="sr-only">View details for {props.title}</span>
        </button>
      </div>
      <div className="flex-1 flex md:flex-col justify-between items-start md:items-stretch gap-3 px-2">
        <div className="mt-1 flex-1">
          <div className="flex justify-between items-center gap-3">
            <div>
              RM <span className="text-2xl font-bold">{props.price}</span>
            </div>
            {props.onlyOne ? (
              <Badge>Only One</Badge>
            ) : (
              <div className="text-sm text-gray-500">
                {props.availableStock} piece available
              </div>
            )}
          </div>
          <p className="block text-sm font-medium text-gray-900 truncate pointer-events-none">
            {props.title}
          </p>
          <p className="block text-sm font-medium text-gray-500 pointer-events-none">
            {props.description}
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 py-3">
          <AddCartButton />
        </div>
      </div>
    </div>
  );
};

CartListingItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  imageUrl: PropTypes.string,
  /**
   * Required if `onlyOne` is `false`.
   */
  availableStock: PropTypes.number,
  onlyOne: PropTypes.bool,
};
