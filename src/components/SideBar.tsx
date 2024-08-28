import Navigation from "./Navgation";

export default function SideBar() {
  return (
    <div className="h-screen w-[300px] fixed bg-green shadow-custom-dark">
      <div className="flex justify-center py-4 w-full">
        <img className="w-32 h-32" src="assets/logo.png" alt="" />
      </div>
      <div className="flex justify-center mt-20 w-full px-5">
        <Navigation />
      </div>
    </div>
  );
}
