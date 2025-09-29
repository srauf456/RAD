import { useDashboardContext } from "../context/DashboardContext";

function Card(props){
    const {theme} = useDashboardContext();
return(
    <div className={theme === "dark" ? "bg-gray-700 text-white"  : "bg-white text-black"}>
    <div className="rounded shadow p-4 flex justify-between flex-col ">
        <h3 className="text-lg font-semibold">{props.title} </h3>
        <p className="text-2xl font-bold">{props.value}</p>
        </div>
    </div>
)
}

export default Card;