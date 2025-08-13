import React, {useState} from 'react';
import { postJSON, getJSON } from '../api';

export default function AdminDashboard(){
  const [logged,setLogged] = useState(false);
  const [summary,setSummary] = useState(null);
  const [feedbacks,setFeedbacks] = useState([]);

  const login = async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    const res = await postJSON('/api/admin/login', {username,password});
    if(res.msg === 'ok'){ setLogged(true); fetchSummary(); fetchFBs(); }
    else alert('invalid');
  };

  const fetchSummary = async () => {
    const s = await getJSON('/api/admin/summary');
    setSummary(s);
  };

  const fetchFBs = async () => {
    const f = await getJSON('/api/feedback');
    setFeedbacks(f);
  };

  if(!logged){
    return (
      <form onSubmit={login}>
        <h2>Admin Login</h2>
        <input name="username" placeholder="admin"/><br/>
        <input name="password" placeholder="admin123" type="password"/><br/>
        <button type="submit">Login</button>
      </form>
    );
  }

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {summary && (
        <div>
          <div>Total Users: {summary.totalUsers}</div>
          <div>Total Feedback: {summary.totalFeedback}</div>
          <div>By Emotion: {JSON.stringify(summary.byEmotion)}</div>
        </div>
      )}
      <h3>All feedback</h3>
      <table border="1" cellPadding="6">
        <thead><tr><th>name</th><th>rating</th><th>comment</th><th>predicted</th><th>date</th></tr></thead>
        <tbody>
          {feedbacks.map(f=>(
            <tr key={f._id}>
              <td>{f.name}</td>
              <td>{f.rating}</td>
              <td style={{maxWidth:400}}>{f.comment}</td>
              <td>{f.predictedEmotion}</td>
              <td>{new Date(f.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
