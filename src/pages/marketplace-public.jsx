import { LoginForm, useAuth, LogoutButton } from "domains/auth";
import { ListingItem, useListings } from "domains/marketplace";
import { ShoppingCart } from "domains/shopping-cart";
import * as React from "react";

const addToCart = (listingId, token) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace/cart/items", {
    method: "POST",
    body: JSON.stringify({
      quantity: 1,
      listingId,
    }),
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

const getCart = (token) =>
  fetch("https://ecomm-service.herokuapp.com/marketplace/cart/items", {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    throw new Error(res.statusText);
  });

const deleteFromCart = (_id, token) =>
  fetch(`https://ecomm-service.herokuapp.com/marketplace/cart/items/${_id}`, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })

export const MarketplacePublic = () => {
  const { listings } = useListings();
  const auth = useAuth();
  const [cart, setCart] = React.useState([])

  React.useEffect(() => {
    auth.status === 'anonymous' && setCart([])
    auth.accessToken && getCart(auth.accessToken).then((data) => setCart(data));
  }, [auth.accessToken, auth.status]);

  // laggy method
  const refreshAddCart = (listingId, token) => {
    // addToCart(listingId, token).then(() => getCart(token)).then((data) => setCart(data))
    addToCart(listingId, token);

    const itemToAdd = listings.find(item => item._id === listingId);
    const newCart = [...cart]
    if (newCart.some(item => item.listing._id === itemToAdd._id)) {
      newCart.find(item => item.listing._id === listingId).quantity += 1;
      setCart(newCart);
    }
    else {
      const newCart = [...cart, { listing: itemToAdd, _id: itemToAdd._id, quantity: 1 }];
      setCart(newCart);
    }
  }

  const refreshDeleteCart = (listingId, token) => {
    // laggy method
    // deleteFromCart(listingId, token).then(() => getCart(token)).then((data) => setCart(data))
    deleteFromCart(listingId, token);
    const filteredCart = cart.filter(item => {
      return item.listing._id !== listingId;
    });
    setCart(filteredCart);
  }

  return (
    <>
      {auth.status === 'anonymous' ?
        <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
          <LoginForm
            onSuccess={(accessToken) => {
              auth.login(accessToken);
            }}
          />
        </div>
        :
        <>
          <div className="p-3 text-center">
            <LogoutButton />
          </div>
          <main className="bg-gray-50 lg:flex">
            <div className="flex-1">
              <div className="max-w-7xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:px-8">
                <div className="sm:flex sm:flex-col sm:align-center mb-12">
                  <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">
                    Marketplace
                  </h1>
                </div>
                <div className="grid md:grid-cols-2 gap-x-4 gap-y-8 xl:grid-cols-3 xl:gap-x-6">
                  {listings &&
                    listings.map((item) => (
                      <ListingItem
                        imageUrl={item.imageUrl}
                        title={item.title}
                        description={item.description}
                        price={item.price}
                        availableStock={item.numOfStock}
                        onlyOne={item.availability === "single-item"}
                        onAddToCart={
                          auth.status === "authenticated"
                            ? () => refreshAddCart(item._id, auth.accessToken)
                            : undefined
                        }
                        key={item._id}
                      />
                    ))}
                </div>
              </div>
            </div>
            <div className="flex-initial bg-white w-full lg:max-w-md border-b border-gray-100">
              <ShoppingCart listingData={cart} refreshDeleteCart={refreshDeleteCart} />
            </div>
          </main>
        </>
      }
    </>
  );
};
