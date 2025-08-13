const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

// Projects JSON
router.get('/projects', async (_req, res) => {
  const data = await Project.find().sort({ createdAt: -1 });
  res.json(data);
});

// Skills JSON
router.get('/skills', async (_req, res) => {
  const data = await Skill.find().sort({ name: 1 });
  res.json(data);
});

module.exports = router;
