import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Hinata Garaje',description:'El Passat y el Mazda, organizados entre todos.',manifest:'/manifest.webmanifest',icons:{icon:'/hinata-driver-bn.png',apple:'/hinata-driver-bn.png'},appleWebApp:{capable:true,title:'Hinata Garaje',statusBarStyle:'default'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="es"><body>{children}</body></html>;}
