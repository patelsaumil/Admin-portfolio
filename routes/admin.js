const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const Skill = require('../models/Skill');

router.get('/', (_req, res) => res.redirect('/projects'));


// List add/edit
router.get('/projects', async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });
  const editId = req.query.edit || null;  
  res.render('projects/index', { title: 'Projects', projects, editId });
});

// Create
router.post('/projects', async (req, res) => {
  const { title, description, technologies, url, github, imageUrl } = req.body;
  await Project.create({
    title,
    description,
    technologies: (technologies || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    url, github, imageUrl
  });
  res.redirect('/projects');
});

// Update
router.put('/projects/:id', async (req, res) => {
  const { title, description, technologies, url, github, imageUrl } = req.body;
  await Project.findByIdAndUpdate(req.params.id, {
    title,
    description,
    technologies: (technologies || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    url, github, imageUrl
  });
  res.redirect('/projects');
});

// Delete
router.delete('/projects/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.redirect('/projects');
});

router.get('/skills', async (req, res) => {
  const skills = await Skill.find().sort({ name: 1 });
  const editId = req.query.edit || null;
  res.render('skills/index', { title: 'Skills', skills, editId });
});

// Create
router.post('/skills', async (req, res) => {
  const { name, level, percent, iconUrl } = req.body;
  await Skill.create({ name, level, percent, iconUrl });
  res.redirect('/skills');
});

// Update (inline)
router.put('/skills/:id', async (req, res) => {
  const { name, level, percent, iconUrl } = req.body;
  await Skill.findByIdAndUpdate(req.params.id, { name, level, percent, iconUrl });
  res.redirect('/skills');
});

// Delete
router.delete('/skills/:id', async (req, res) => {
  await Skill.findByIdAndDelete(req.params.id);
  res.redirect('/skills');
});

module.exports = router;
