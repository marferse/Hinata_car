/** Decorative photos; the adjacent labels identify each family car. */
export default function CarThumbnail({car}:{car:string}) {
 const passat=car==='Passat';
 return <span className={'car-thumbnail car-photo '+(passat?'car-estate':'car-compact')} aria-hidden="true">
  <img src={passat?'/cars/passat-blue.jpg':'/cars/mazda2-blue.png'} alt="" width={passat?1280:980} height={passat?610:427}/>
 </span>;
}
