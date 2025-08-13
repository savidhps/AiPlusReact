import React, {useState} from 'react';
import { postJSON } from '../api';
import { useNavigate } from 'react-router-dom';

export default function SignIn(){
  const [form,setForm] = useState({email:'',password:''});
  const navigate = useNavigate();
  const submit = async e=>{
    e.preventDefault();
    const res = await postJSON('/api/auth/signin', form);
    if(res.msg === 'ok'){ localStorage.setItem('user', JSON.stringify(res.user)); alert('Signed in'); navigate('/feedback'); }
    else alert(res.msg || 'invalid');
  };
  return (
    <form onSubmit={submit}>
      <h2>SignIn</h2>
      <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} required/><br/>
      <input placeholder="Password" type="password" value={form.password} onChange={e=>setForm({...form,password:e.target.value})} required/><br/>
      <button type="submit">Sign In</button>
    </form>
  );
}
