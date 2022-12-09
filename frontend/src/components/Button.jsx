import "./Button.sass"

export const Button = ({type, onclick, children}) => {

    return(
        <button className = {type + " button"} onClick = {onclick}>
            {children}
        </button>
    )
}