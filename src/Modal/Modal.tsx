import { ReactNode } from 'react'
import './Modal.css'

export interface ModalProps {
    id: string
    className?: string
    children?: ReactNode
}

export function Modal(props: ModalProps) {
    return (
        <div id={ props.id } className={`dialog ${props.className}`}>
            { props.children }
        </div>
    )
}

export const gModal: typeof Modal | undefined = undefined;
