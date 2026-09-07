import { pool } from '../config/database.js'

export async function listProperties({ search, city, type, listingType, minPrice, maxPrice, status = 'published', agentId, limit = 24, offset = 0 }) {
  const values = []; const where = []
  const add = (value) => { values.push(value); return `$${values.length}` }
  if (status !== 'all') where.push(`p.status = ${add(status)}`)
  if (search) { const v=add(`%${search}%`); where.push(`(p.title ILIKE ${v} OR p.city ILIKE ${v} OR COALESCE(p.description,'') ILIKE ${v})`) }
  if (city) where.push(`p.city = ${add(city)}`)
  if (type) where.push(`p.property_type = ${add(type)}`)
  if (listingType) where.push(`p.listing_type = ${add(listingType)}`)
  if (minPrice !== undefined && minPrice !== '') where.push(`p.price >= ${add(minPrice)}`)
  if (maxPrice !== undefined && maxPrice !== '') where.push(`p.price <= ${add(maxPrice)}`)
  if (agentId) where.push(`p.agent_id = ${add(agentId)}`)
  const limitParam=add(Math.min(Number(limit)||24,100)); const offsetParam=add(Number(offset)||0)
  const result = await pool.query(`SELECT p.*, json_build_object('id',u.id,'firstName',u.first_name,'lastName',u.last_name,'email',u.email,'phone',u.phone) AS agent,
    (SELECT COUNT(*) FROM property_views pv WHERE pv.property_id=p.id)::int AS views,
    (SELECT COUNT(*) FROM inquiries i WHERE i.property_id=p.id)::int AS inquiries,
    (SELECT COUNT(*) FROM saved_properties sp WHERE sp.property_id=p.id)::int AS saves,
    (SELECT pi.image_url FROM property_images pi WHERE pi.property_id=p.id ORDER BY pi.is_primary DESC, pi.display_order ASC LIMIT 1) AS image_url
    FROM properties p JOIN users u ON u.id=p.agent_id
    ${where.length ? 'WHERE '+where.join(' AND ') : ''}
    ORDER BY p.featured DESC, p.created_at DESC LIMIT ${limitParam} OFFSET ${offsetParam}`, values)
  return result.rows
}
export async function getProperty(id) {
  const r=await pool.query(`SELECT p.*, json_build_object('id',u.id,'firstName',u.first_name,'lastName',u.last_name,'email',u.email,'phone',u.phone) agent,
    (SELECT COUNT(*) FROM property_views pv WHERE pv.property_id=p.id)::int views,
    (SELECT COUNT(*) FROM inquiries i WHERE i.property_id=p.id)::int inquiries,
    (SELECT COUNT(*) FROM saved_properties sp WHERE sp.property_id=p.id)::int saves
    FROM properties p JOIN users u ON u.id=p.agent_id WHERE p.id=$1`,[id]); return r.rows[0]??null
}
export async function createProperty(data) {
 const r=await pool.query(`INSERT INTO properties (agent_id,title,description,property_type,listing_type,status,price,currency,bedrooms,bathrooms,area_sqft,year_built,address_line,city,state_region,postal_code,country,latitude,longitude,featured)
 VALUES ($1,$2,$3,$4,$5,'pending',$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,false) RETURNING *`,
 [data.agentId,data.title,data.description,data.propertyType,data.listingType,data.price,data.currency||'BDT',data.bedrooms,data.bathrooms,data.areaSqft,data.yearBuilt,data.addressLine,data.city,data.stateRegion,data.postalCode,data.country||'Bangladesh',data.latitude,data.longitude]); return r.rows[0]
}
export async function updateProperty(id, data, agentId) {
 const r=await pool.query(`UPDATE properties SET title=COALESCE($1,title),description=COALESCE($2,description),property_type=COALESCE($3,property_type),listing_type=COALESCE($4,listing_type),price=COALESCE($5,price),currency=COALESCE($6,currency),bedrooms=COALESCE($7,bedrooms),bathrooms=COALESCE($8,bathrooms),area_sqft=COALESCE($9,area_sqft),year_built=COALESCE($10,year_built),address_line=COALESCE($11,address_line),city=COALESCE($12,city),state_region=COALESCE($13,state_region),postal_code=COALESCE($14,postal_code),country=COALESCE($15,country),latitude=COALESCE($16,latitude),longitude=COALESCE($17,longitude),status='pending',rejection_reason=NULL WHERE id=$18 AND agent_id=$19 RETURNING *`,
 [data.title,data.description,data.propertyType,data.listingType,data.price,data.currency,data.bedrooms,data.bathrooms,data.areaSqft,data.yearBuilt,data.addressLine,data.city,data.stateRegion,data.postalCode,data.country,data.latitude,data.longitude,id,agentId]); return r.rows[0]??null
}
export async function adminSetPropertyStatus(id,status,reason) {
 const r=await pool.query(`UPDATE properties SET status=$1,rejection_reason=$2 WHERE id=$3 RETURNING *`,[status,status==='rejected'?reason:null,id]); return r.rows[0]??null
}
