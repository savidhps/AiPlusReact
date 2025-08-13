import React, {useState} from 'react';
import { postJSON } from '../api';
import { useNavigate } from 'react-router-dom';

export default function SignUp(){
  const [form,setForm] = useState({name:'',email:'',password:''});
  const navigate = useNavigate();
  const submit = async e=>{
    e.preventDefault();
    const res = await postJSON('/api/auth/signup', form);
    if(res.msg === 'ok') { alert('Registered'); navigate('/'); }
    else alert(res.msg || 'error');
  };
  return (
    <form onSubmit={submit}>
      <h2>SignUp</h2>
      <input placeholder="Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} required/><br/>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/><br/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><br/>
      <button type="submit">Register</button>
    </form>
  );
}
