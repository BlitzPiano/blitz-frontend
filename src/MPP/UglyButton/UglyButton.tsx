import { ReactNode } from 'react'
import './UglyButton.css'

export interface UglyButtonProps {
    id?: string
    className?: string
    children?: ReactNode
    hidden?: boolean
}

function UglyButton(props: UglyButtonProps) {
    return (
        <div id={ props.id } className={ `ugly-button ${props.className}` }
                style={ props.hidden ? { display: 'none' } : undefined }>
            { props.children }
        </div>
    )
}

export default UglyButton
