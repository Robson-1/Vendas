import { HTMLAttributes } from 'react'

interface InputProps extends HTMLAttributes<HTMLInputElement> {
    id: string
    onChange?: (value) => void
    label: string
    columnClasses?: string
    value: string
    
    
}

export const Input: React.FC<InputProps> = ({
    onChange,
    label,
    columnClasses,
    id,
    value,
    ...inputProps
}: InputProps) => {
    return (
        <div className={`field column ${columnClasses}`}>
            <label className="label" htmlFor={id}> {label} </label>
            <div className="control">
                <input className="input"
                    id={id} {...inputProps}
                        onChange={e => {
                        if (onChange) {
                            onChange(e.target.value)
                        }
                    }}
                    />
            </div>
        </div>
    )
}