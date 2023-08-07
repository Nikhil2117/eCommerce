export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) =>{
    //calculate items price
    state.itemPrice = addDecimals(
        state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
      );

      //calculate Shipping price
      state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

      //calculate tax price
      state.taxPrice = addDecimals(Number((0.15 * state.itemPrice).toFixed(2)));

      //calculate total price
      state.totalPrice = Number(state.itemPrice) + Number(state.shippingPrice) + Number(state.taxPrice)

      localStorage.setItem("cart", JSON.stringify(state));
      return state;
}
