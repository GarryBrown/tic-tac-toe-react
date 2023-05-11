import { Provider } from 'react-redux'
import React from 'react';
import store from './store';
import { ReduxImpl } from './Redux-impl';

export function ReduxWrapper() {
    return (
        <Provider store={store}>
            <ReduxImpl/>
        </Provider>
    )
}