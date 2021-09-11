import { ShoppingBagIcon } from "@heroicons/react/outline";
import PropTypes from "prop-types";
import * as React from "react";
import { CartItem } from "components/cart-item";
import { numberWithCommas } from "lib/number-with-commas";

const reducer = (accumulator, currentValue) => accumulator + (currentValue.listing.price * currentValue.quantity);

export const ShoppingCart = ({ listingData, refreshDeleteCart }) => {

    return (
        <div className="flex flex-col h-full">
            <div className="py-6 px-4 bg-pink-700 sm:px-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-medium text-white">Your shopping cart</h2>
                </div>
                <div className="mt-1">
                    <p className="text-sm text-pink-300">
                        Listing added into your shopping cart
                    </p>
                </div>
            </div>
            <div>
                <ul className="divide-y divide-gray-200"></ul>
            </div>
            {listingData.length !==0 ?
                <>
                    <ul id="cart-item-list" className="divide-y divide-gray-200">
                        {listingData &&
                            listingData.map((item) => (
                                <CartItem
                                    key={item.listing._id}
                                    _id={item.listing._id}
                                    title={item.listing.title}
                                    imageUrl={item.listing.imageUrl}
                                    price={item.listing.price}
                                    quantity={item.quantity}
                                    refreshDeleteCart={refreshDeleteCart}
                                />
                            ))}
                    </ul>
                    <div className="flex-shrink-0 px-4 py-4 flex justify-end border-t border-gray-200">
                        <span>Total <span className="text-3xl">$<span>{numberWithCommas(listingData.reduce(reducer, 0).toFixed(2))}</span></span></span>
                    </div>
                </>
                :
                <div className="px-4 sm:px-6 pb-12">
                    <div className="pt-6 pb-5">
                        <div id="no-cart-item-message">
                            <div className="p-4 text-center">
                                <ShoppingBagIcon
                                    className="inline-block w-12 h-12 text-gray-300"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24" />
                            </div>
                            <p className="text-center text-gray-500">
                                There is no item in your shopping cart.
                            </p>
                        </div>
                    </div>
                </div>
            }


        </div>
    );
};

ShoppingCart.propTypes = {
    listingData: PropTypes.array.isRequired,
};


