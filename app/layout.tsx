import type {Metadata} from 'next';
import './globals.css';
export const metadata:Metadata={title:'Hinata Garatge',description:'El Passat i el Mazda, organitzats entre tots.',manifest:'/manifest.webmanifest',icons:{icon:'/hinata-driver-bn.png',apple:'/hinata-driver-bn.png'},appleWebApp:{capable:true,title:'Hinata Garatge',statusBarStyle:'default'}};
export default function Layout({children}:{children:React.ReactNode}){return <html lang="ca"><body>{children}</body></html>;}
