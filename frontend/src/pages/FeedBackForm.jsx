import React, {useState} from 'react';
import { postJSON } from '../api';

export default function FeedbackForm(){
  const stored = localStorage.getItem('user');
  const user = stored ? JSON.parse(stored) : null;
  const [form,setForm] = useState({rating:5,comment:''});
  const [result,setResult] = useState(null);

  const submit = async e=>{
    e.preventDefault();
    const payload = {
      userId: user?.id,
      name: user?.name,
      email: user?.email,
      rating: form.rating,
      comment: form.comment
    };
    const res = await postJSON('/api/feedback', payload);
    if(res.msg === 'ok') {
      alert('Submitted');
      setResult(res.feedback.predictedEmotion);
    } else {
      alert('error');
    }
  };

  return (
    <div>
      <h2>Feedback</h2>
      {!user && <div style={{color:'grey'}}>Please sign in to submit feedback (you can still submit, but user info blank)</div>}
      <form onSubmit={submit}>
        <label>Rating <input type="number" min="1" max="5" value={form.rating} onChange={e=>setForm({...form,rating:e.target.value})}/></label><br/>
        <textarea placeholder="Write your feedback" value={form.comment} onChange={e=>setForm({...form,comment:e.target.value})} required rows={6} cols={60}/>
        <br/>
        <button type="submit">Send Feedback</button>
      </form>
      {result && <div><strong>Predicted emotion:</strong> {result}</div>}
    </div>
  );
}
