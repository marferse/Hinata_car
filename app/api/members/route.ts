import {respond,updateMembers} from '../../../lib/store';
export async function PUT(req:Request){return respond(()=>updateMembers(req));}
