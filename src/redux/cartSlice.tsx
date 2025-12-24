import { createSlice } from "@reduxjs/toolkit";

const initialState: { items: any[] } = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.items = action.payload;
        },

        increaseQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },

        decreaseQty: (state, action) => {
            const item = state.items.find(i => i.id === action.payload);

            if (item) {
                if (item.quantity > 1) {
                    item.quantity -= 1;
                } else {
                    state.items = state.items.filter(
                        i => i.id !== action.payload
                    )
                }
            }
        },

        addToCart: (state, action) => {
            const product = action.payload;
            const item = state.items.find(i => i.id === product.id)

            if (item) {
                item.quantity += 1;
            } else {
                state.items.push({ ...product, quantity: 1 });
            }
        },

        removeFromCart: (state, action) => {
            state.items = state.items.filter(
                item => item.id !== action.payload
            )
        },
    }
});

export const {
    addToCart,
    increaseQty,
    decreaseQty,
    removeFromCart,
    setCart,
} = cartSlice.actions;

export default cartSlice.reducer;