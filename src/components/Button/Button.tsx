import { AllHTMLAttributes } from 'react';
import { classNames } from 'src/utils/css';
import styles from './Button.module.scss';

interface ButtonProps extends Omit<AllHTMLAttributes<HTMLElement>, 'size' | 'color'> {
    children: React.ReactNode;
    primary?: boolean;
    outline?: boolean;
    type?: 'submit' | 'button';
    size?: 'small' | 'medium' | 'large';
}

function Button(props: ButtonProps) {
    const {
        children,
        className,
        primary,
        outline,
        type = 'button',
        size = 'medium',
        ...rest
    } = props;

    const buttonClassName = classNames(
        styles.button,
        // @ts-ignore
        primary && styles.primary,
        outline && styles.outline,
        size && styles[size],
        className && className,
    );

    return (
        <button className={buttonClassName} {...rest}>
            <span>
                {children}
            </span>
        </button>
    )
}

export default Button;
