import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
export function Navbar() {
    const navDialog = document.getElementById('nav-dialog')
    function HandelMenu() {
    navDialog.classList.toggle('hidden');
  }
  return (
    <>
      <nav className="p-3 flex bg-red-400  justify-between items-center">
      
        
      <button className="text-gray-600 p-2  md:hidden" onClick={HandelMenu}>
          <MenuIcon />
        </button>
        <div id="nav-dialog" className=" fixed bg-white inset-0 ">
        <span>Family</span>
        <button className="text-gray-600 p-2 md:hidden justify-between items-right  " onClick={HandelMenu}>
          <CloseIcon />
        </button>
        <div>
            <a href="#" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg" >Priyasnhu</a>
            <a href="#" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg" >Renu</a>
            <a href="#" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg" >Reshu</a>
            <a href="#" className="font-medium m-3 p-3 hover:bg-gray-500 block rounded-lg" >Yug</a>
            

        </div>
        <div className="h-[1px] bg-gray-500 rounded-lg"></div>
            <a href="#" className="font-medium m-3 p-3 hover:bg-purple-400 block rounded-lg" >Family</a>
        </div>
        

        <span>Family</span>
        <div id="nav-menu" className="hidden md:flex gap-10 items-center ">
          <a href="#" className="font-medium hover:text-blue-800">Priyasnhu</a>
          <a href="#" className="font-medium hover:text-blue-800">Renu</a>
          <a href="#" className="font-medium hover:text-blue-800">Reshu</a>
          <a href="#" className="font-medium hover:text-blue-800">Yug</a>
          
        </div>
      </nav>
    </>
  );
}
