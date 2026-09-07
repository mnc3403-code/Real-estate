import { pool } from '../config/database.js'
export async function overview(req,res,next){try{
 const uid=req.user.user_id, role=req.user.role
 if(role==='user'){
  const [saved,inq,appt,props]=await Promise.all([
   pool.query('SELECT COUNT(*)::int count FROM saved_properties WHERE user_id=$1',[uid]),
   pool.query("SELECT COUNT(*)::int count FROM inquiries WHERE customer_id=$1 AND status NOT IN ('closed','spam')",[uid]),
   pool.query("SELECT COUNT(*)::int count FROM appointments WHERE customer_id=$1 AND status IN ('requested','confirmed') AND scheduled_start>=NOW()",[uid]),
   pool.query("SELECT COUNT(*)::int count FROM properties WHERE status='published'")
  ]); return res.json({success:true,role,stats:{saved:saved.rows[0].count,inquiries:inq.rows[0].count,appointments:appt.rows[0].count,availableProperties:props.rows[0].count}})
 }
 if(role==='agent'){
  const [listings,leads,appts,views]=await Promise.all([
   pool.query("SELECT COUNT(*)::int count FROM properties WHERE agent_id=$1 AND status IN ('published','pending','draft')",[uid]),
   pool.query("SELECT COUNT(*)::int count FROM inquiries WHERE agent_id=$1 AND status NOT IN ('closed','spam')",[uid]),
   pool.query("SELECT COUNT(*)::int count FROM appointments WHERE agent_id=$1 AND status IN ('requested','confirmed') AND scheduled_start>=NOW()",[uid]),
   pool.query("SELECT COUNT(*)::int count FROM property_views pv JOIN properties p ON p.id=pv.property_id WHERE p.agent_id=$1",[uid])
  ]); return res.json({success:true,role,stats:{listings:listings.rows[0].count,leads:leads.rows[0].count,appointments:appts.rows[0].count,views:views.rows[0].count}})
 }
 const [users,props,pending,reports]=await Promise.all([
  pool.query('SELECT COUNT(*)::int count FROM users'),pool.query("SELECT COUNT(*)::int count FROM properties WHERE status='published'"),
  pool.query("SELECT COUNT(*)::int count FROM properties WHERE status='pending'"),pool.query("SELECT COUNT(*)::int count FROM admin_reports WHERE status IN ('open','reviewing')")
 ]); return res.json({success:true,role,stats:{users:users.rows[0].count,publishedProperties:props.rows[0].count,pendingProperties:pending.rows[0].count,openReports:reports.rows[0].count}})
}catch(e){next(e)}}
