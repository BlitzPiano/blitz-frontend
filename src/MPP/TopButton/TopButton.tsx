import './TopButton.css'

interface TopButtonPropsNormal {
    type: string
    className?: string
}

interface TopButtonPropsText extends TopButtonPropsNormal {
    type: 'text'
    text: string
}

interface TopButtonPropsIcon extends TopButtonPropsNormal {
    type: 'icon'
    icon: string
}

export type TopButtonProps = TopButtonPropsText | TopButtonPropsIcon;

export function TopButton(props: TopButtonProps) {
    if (props.type == 'icon') {
        return (
            <button className={`top-button icon-button ${props.className}`}><img src={ props.icon } style={{ verticalAlign: 'middle' }} loading="lazy" /></button>
        )
    } else {
        return (
            <button className={`top-button ${props.className}`}>{ props.text }</button>
        )
    }
}
