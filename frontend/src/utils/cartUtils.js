export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // calculate items price
  state.itemsPrice = addDecimals(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // calculate shipping price
  // if order is above 15000 then free eles let's take 100 rupees
  state.shippingPrice = addDecimals(
    state.itemsPrice > 15000 ? 0 : state.itemsPrice > 0 ? 100 : 0
  );
  // calculate tax price (12% tax)
  state.taxPrice = addDecimals(Number(0.12 * state.itemsPrice).toFixed(2));
  // calculate total price
  state.totalPrice = (
    Number(state.itemsPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);
  localStorage.setItem("cart", JSON.stringify(state));
  return state;
};
