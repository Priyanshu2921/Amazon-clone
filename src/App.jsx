
import{AmazonHeader} from "./header";
import { Navbar } from "./amazon-nav-bar";
import {Carousel} from "./Carsoul";
import{MobileCarousel} from "./Mobile-carsoul";
import{Desktopheader} from "./Desktop-header";
import{MobileSearchBar} from "./header";
import './index.css';

export default function App() {
  return (<div>
    <Desktopheader/>
    <Navbar/> 
    <AmazonHeader/>
    <MobileSearchBar/>
    <Carousel/>
    <MobileCarousel/>
  
   

</div>

    
  )
}