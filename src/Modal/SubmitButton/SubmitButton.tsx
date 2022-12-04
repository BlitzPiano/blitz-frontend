import { ReactNode } from 'react'
import './SubmitButton.css'

export interface SubmitButtonProps {
    id?: string
    className?: string
    children?: ReactNode
}

export default function SubmitButton(props: SubmitButtonProps) {
    return (
        <button id={ props.id } className={ `submit ${props.className}` }>{ props.children }</button>
    )
}
