const express = require('express');
const router = express.Router();
const Feedback = require('../models/FeedBack');
const User = require('../models/User');

router.post('/login', (req,res)=>{
  const {username,password} = req.body;
  if(username === 'admin' && password === 'admin123'){
    return res.json({msg:'ok'});
  }
  res.status(401).json({msg:'invalid'});
});

// dashboard summary: counts per predictedEmotion, total feedbacks, total users
router.get('/summary', async (req,res)=>{
  try{
    const totalUsers = await User.countDocuments();
    const totalFeedback = await Feedback.countDocuments();
    const agg = await Feedback.aggregate([
      { $group: { _id: "$predictedEmotion", count: { $sum: 1 } } }
    ]);
    // build a map
    const byEmotion = {};
    agg.forEach(a => byEmotion[a._id || 'unknown'] = a.count);
    res.json({ totalUsers, totalFeedback, byEmotion });
  }catch(err){console.error(err);res.status(500).json({msg:'err'})}
});

module.exports = router;
