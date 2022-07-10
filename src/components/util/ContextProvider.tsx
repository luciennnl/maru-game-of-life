import React, { FC } from "react";
import { Provider } from "react-redux";
import { Store } from "redux";

interface ContextProviderProps {
    children: React.ReactNode;
    store: Store;
}

const ContextProvider : FC<ContextProviderProps> = (props) => {
    return <Provider store={props.store}>
        {props.children}
    </Provider>
}

export default ContextProvider;