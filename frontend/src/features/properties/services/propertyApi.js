const API=import.meta.env.VITE_API_BASE_URL||'http://localhost:5000/api'
async function request(path,options={}){const r=await fetch(`${API}${path}`,{credentials:'include',...options,headers:{'Content-Type':'application/json',...(options.headers||{})}});const d=await r.json().catch(()=>({}));if(!r.ok)throw new Error(d.message||'Request failed');return d}
export const getProperties=(params={})=>{const q=new URLSearchParams(Object.entries(params).filter(([,v])=>v!==undefined&&v!==''));return request(`/properties?${q}`)}
export const getProperty=(id)=>request(`/properties/${id}`)
export const createProperty=(data)=>request('/properties',{method:'POST',body:JSON.stringify(data)})
export const updateProperty=(id,data)=>request(`/properties/${id}`,{method:'PATCH',body:JSON.stringify(data)})
export const viewProperty=(id)=>request(`/properties/${id}/view`,{method:'POST'})
