import "./Backdrop.css";

const Backdrop = (props) => {
  return (
    <div>
        <div className="backdrop" onClick={props.onClick}></div>
    </div>
  )
}

export default Backdrop