import styles from './Input.module.css'

function Input({ type, placeholder, name, text, handleOnChange, value }){

    return (
        <div className={styles.form_control}>
            <label htmlFor={name} >{text}</label>
            <input type={type} placeholder={placeholder} name={name} id={name} onChange={handleOnChange} value={value}></input>
        </div>

    )
}
export default Input