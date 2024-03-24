import AdminSideBar from "./systemAdmin/sidebar";

function Sidebar({role}: {role: string}) {
  return (
    role === "admin" ? <AdminSideBar /> : <></>
  )
}
export default Sidebar;