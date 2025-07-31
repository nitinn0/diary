// routes/notes.js
const express = require("express");
const Note = require("../models/Note");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/create", auth, async (req, res) => {
  try {
    const note = new Note({ userId: req.user.id, content: req.body.content });
    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Error creating note" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Error fetching notes" });
  }
});

router.post("/ai-generate", auth, async (req, res) => {
  try {
    if (req.user.role === "free") {
      return res.status(403).json({ message: "Upgrade to premium or pro to use AI generation" });
    }
    
    const { model = "gpt-3.5-turbo" } = req.body;
    
    // Simulate different AI models based on user role and selected model
    let aiNote = "";
    
    if (req.user.role === "premium") {
      if (model === "gpt-4") {
        aiNote = `[GPT-4] Today was a day of profound reflection and growth. I found myself contemplating the intricate balance between ambition and contentment, realizing that true fulfillment often lies in the journey rather than the destination. Each moment, whether challenging or joyful, contributes to the rich tapestry of my personal development.`;
      } else {
        aiNote = `[GPT-3.5 Turbo] Today was filled with small moments of joy and learning. I appreciated the simple pleasures and reflected on how each experience shapes my perspective.`;
      }
    } else if (req.user.role === "pro") {
      switch (model) {
        case "gpt-4-turbo":
          aiNote = `[GPT-4 Turbo] Today unfolded as a masterclass in human experience - from the subtle interplay of emotions to the profound insights that emerged from seemingly ordinary interactions. I found myself deeply engaged in the art of mindful observation, discovering layers of meaning in moments that might otherwise pass unnoticed.`;
          break;
        case "claude-3":
          aiNote = `[Claude 3] Today's experiences wove together like a carefully crafted narrative, each thread contributing to a larger understanding of myself and the world around me. I found beauty in the complexity of human emotions and the simple elegance of natural processes.`;
          break;
        case "gpt-4":
          aiNote = `[GPT-4] Today was a day of deep intellectual and emotional exploration. I found myself analyzing patterns in my thoughts and behaviors, gaining new insights into my motivations and aspirations.`;
          break;
        default:
          aiNote = `[GPT-3.5 Turbo] Today was a wonderful day filled with meaningful experiences and personal growth. I'm grateful for the opportunities to learn and connect with others.`;
      }
    }
    
    res.json({ content: aiNote });
  } catch (error) {
    res.status(500).json({ message: "Error generating AI note" });
  }
});

// Update note
router.put("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { content: req.body.content },
      { new: true }
    );
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Error updating note" });
  }
});

// Delete note
router.delete("/:id", auth, async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting note" });
  }
});

module.exports = router;
