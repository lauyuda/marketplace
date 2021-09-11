import * as React from "react";
import { useAuthState } from "domains/auth";
import { TrashIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import { numberWithCommas } from "lib/number-with-commas";

export const CartItem = ({ _id, title, imageUrl, price, quantity, refreshDeleteCart }) => {
  const auth = useAuthState()
  return (
    <li className="flex px-4 sm:px-6 py-4">
      <img className="h-10 w-10 rounded-full" src={imageUrl} alt="" />
      <div className="flex-1 flex justify-between items-center ml-3">
        <div>
          <p className="text-sm font-medium text-gray-900">
            {title}
          </p>
          <p className="text-sm text-gray-500">${numberWithCommas(price)} x {quantity}</p>
        </div>
        <div className="flex items-center gap-2">
          <div>${numberWithCommas(price * quantity)}</div>
          <button type="button" className="
                        text-red-400
                        p-1
                        rounded-full
                        hover:bg-gray-50
                        focus:outline-none
                        focus:bg-gray-50
                        focus:ring
                        focus:ring-pink-500
                        focus:ring-opacity-30
                        transition
                        duration-150
                        ease-in-out
                      " title="Remove item"
            onClick={() => refreshDeleteCart(_id, auth.accessToken)}>
            <TrashIcon className="w-6 h-6" stroke="currentColor" viewBox="0 0 24 24" />
          </button>
        </div>
      </div>
    </li>
  );
};

CartItem.propTypes = {
  /**
   * Text that will be always displayed, usually a summary
   * of the content.
   */
  title: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
};
