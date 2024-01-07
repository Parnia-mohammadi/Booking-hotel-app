import { Outlet } from "react-router-dom"

function Hotels() {
  return (
    <div>
        <div className="sidebar">
            <Outlet/>
        </div>
        <div className="map">map</div>
    </div>
  )
}

export default Hotels