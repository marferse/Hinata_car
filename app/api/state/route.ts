import {respond,state} from '../../../lib/store';
export const dynamic='force-dynamic';
export async function GET(req:Request){return respond(()=>state(req));}
