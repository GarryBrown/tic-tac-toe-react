import { ReactElement } from 'react';

interface IProps {
    cross?: boolean;
    zero?: boolean
}
export function Cell({cross, zero}: IProps): ReactElement {
    return (
        <span>
            {cross && 'X'}
            {zero && 'O'}
        </span>
    )
}