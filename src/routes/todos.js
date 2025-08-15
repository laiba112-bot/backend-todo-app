const router = require('express').Router();
const Todo = require('../models/Todo');
const auth = require('../middleware/auth');

// All routes here require auth
router.use(auth);

router.get('/', async (req, res) => {
  const items = await Todo.find({ user: req.userId }).sort({ createdAt: -1 });
  res.json(items);
});

router.post('/', async (req, res) => {
  const { text } = req.body;
  if (!text) return res.status(400).json({ message: 'Text is required' });
  const todo = await Todo.create({ user: req.userId, text });
  res.status(201).json(todo);
});

router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const { text, done } = req.body;
  const updated = await Todo.findOneAndUpdate(
    { _id: id, user: req.userId },
    { $set: { ...(text !== undefined ? { text } : {}), ...(done !== undefined ? { done } : {}) } },
    { new: true }
  );
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const deleted = await Todo.findOneAndDelete({ _id: id, user: req.userId });
  if (!deleted) return res.status(404).json({ message: 'Not found' });
  res.json({ ok: true });
});

module.exports = router;
