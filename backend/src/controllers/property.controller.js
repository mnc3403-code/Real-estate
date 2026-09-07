import { pool } from '../config/database.js'
import { createProperty, getProperty, listProperties, updateProperty, adminSetPropertyStatus } from '../models/property.model.js'
export async function list(req,res,next){try{const rows=await listProperties(req.query);res.json({success:true,properties:rows})}catch(e){next(e)}}
export async function detail(req,res,next){try{const p=await getProperty(req.params.id);if(!p)return res.status(404).json({success:false,message:'Property not found.'});res.json({success:true,property:p})}catch(e){next(e)}}
export async function create(req,res,next){try{const p=await createProperty({...req.body,agentId:req.user.user_id});res.status(201).json({success:true,property:p})}catch(e){next(e)}}
export async function update(req,res,next){try{const p=await updateProperty(req.params.id,req.body,req.user.user_id);if(!p)return res.status(404).json({success:false,message:'Property not found or not owned by you.'});res.json({success:true,property:p})}catch(e){next(e)}}
export async function moderate(req,res,next){try{const p=await adminSetPropertyStatus(req.params.id,req.body.status,req.body.reason);if(!p)return res.status(404).json({success:false,message:'Property not found.'});res.json({success:true,property:p})}catch(e){next(e)}}
export async function view(req,res,next){try{await pool.query('INSERT INTO property_views(property_id,viewer_id,session_key) VALUES($1,$2,$3)',[req.params.id,req.user?.user_id||null,req.user?null:req.ip]);res.json({success:true})}catch(e){next(e)}}
