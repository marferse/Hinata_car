import {respond,save,cancel} from '../../../lib/store';
export async function POST(req:Request){return respond(()=>save(req,false));}
export async function PUT(req:Request){return respond(()=>save(req,true));}
export async function DELETE(req:Request){return respond(()=>cancel(req));}
