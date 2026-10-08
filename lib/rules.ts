export type Member={id:string;name:string;email:string|null;user_id?:string|null;admin:number};
export type Reservation={id:string;car:string;start:number;end:number;participants:string[];creator:string;note:string;override:number;version:number;updated:number};
export function overlaps(a:{start:number;end:number},b:{start:number;end:number}){return a.start<b.end&&a.end>b.start;}
export function violations(r:Pick<Reservation,'car'|'start'|'end'|'participants'>,existing:Reservation[],members:Member[],now=Date.now()):string[]{
 const errors:string[]=[];
 if(r.start<now)errors.push('L’inici és al passat.');
 if(r.start>now+168*3600000)errors.push('L’inici supera les 168 hores d’antelació.');
 if(r.end-r.start>10*3600000)errors.push('La reserva supera les 10 hores.');
 for(const other of existing){if(!overlaps(r,other))continue;if(r.car===other.car)errors.push(`${r.car} ja està reservat en una part d’aquest horari.`);for(const id of r.participants.filter(id=>other.participants.includes(id)))errors.push(`${members.find(m=>m.id===id)?.name??'Una persona'} ja participa en una altra reserva en aquest horari.`);}
 return [...new Set(errors)];
}
export type ReservationInput={car:string;start:number;end:number;participants:string[];note:string;id?:string;version?:number;override?:boolean};
export function validShape(r:any):r is ReservationInput{return r&&['Passat','Mazda'].includes(r.car)&&Number.isSafeInteger(r.start)&&Number.isSafeInteger(r.end)&&r.end>r.start&&r.start>0&&r.end<=Date.UTC(2100,0,1)&&Array.isArray(r.participants)&&r.participants.length>0&&r.participants.length<=4&&new Set(r.participants).size===r.participants.length&&r.participants.every((id:unknown)=>typeof id==='string'&&['m1','m2','m3','m4'].includes(id))&&typeof r.note==='string'&&r.note.length<=500;}
