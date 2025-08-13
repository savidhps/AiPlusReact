const express = require('express');
const router = express.Router();
const Feedback = require('../models/FeedBack');
const { predict } = require('../classifier');

router.post('/', async (req,res)=>{
  try{
    const {userId,name,email,rating,comment} = req.body;
    if(!comment) return res.status(400).json({msg:'comment required'});
    const predictedEmotion = predict(comment);
    const fb = new Feedback({userId,name,email,rating,comment,predictedEmotion});
    await fb.save();
    res.json({msg:'ok', feedback: fb});
  }catch(err){ console.error(err); res.status(500).json({msg:'err'})}
});

router.get('/', async (req,res)=>{
  // return all feedback (for admin)
  try{
    const all = await Feedback.find().sort({createdAt:-1});
    res.json(all);
  }catch(err){console.error(err);res.status(500).json({msg:'err'})}
});

module.exports = router;
