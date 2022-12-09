import "./NavHorizontal.sass"

export const NavHorizontal = ({arrayItens, state}) => {
    return(
        <div className="nav">
            {arrayItens.map((item, index) => {
                return <span className = {"itemNav " + (item.selected === true ? "itemSelected" : "")}
                 onClick = {() => state({value: item.value, number : item.number})} key = {index}>{item.value}</span>
            })}
        </div>
    )
}