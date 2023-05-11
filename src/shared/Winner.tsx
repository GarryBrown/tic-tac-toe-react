import React, { ReactElement } from 'react';
import { TableSymbol } from './interfaces';

interface IProps {
    name: TableSymbol;
}
export function Winner({name}: IProps): ReactElement {
    return (
        <span>
            <p>Победитель: {name}</p>
        </span>
    )
}