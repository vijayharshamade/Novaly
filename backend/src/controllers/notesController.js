import Note from "../models/Note.js";

export async function getAllNotes(_, res) {
  try {
    const notes = await Note.find().sort({ createdAt: -1 }); // -1 will sort in desc. order (newest first)
    res.status(200).json(notes);
  } catch (error) {
    console.error("Error in getAllNotes controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getSingleNote = async (req, res) => {
  try {
    const singleNote = await Note.findById(req.params.id);
    if (!singleNote)
      return res.status(404).json({ message: "Note not found!" });
    res.status(200).json({ message: "Note found Successfully", singleNote });
  } catch (error) {
    console.error("Error in getSingleNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({ title, content });
    const savedNote = await note.save();
    res.status(201).json({ message: "Note Created Successfully", savedNote });
  } catch (error) {
    console.log("Error Creating the note", error);
    res.send(500).json({ message: "Internal Server Error" });
  }
};

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
      },
      { new: true } // <-- THIS RETURNS UPDATED DOCUMENT
    );

    if (!updatedNote)
      return res.status(404).json({ message: "Note not found" });

    res.status(200).json({ message: "Note Updated Successfully", updatedNote });
  } catch (error) {
    console.log("Error Updating the Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id);
    if (!deletedNote)
      return res.status(404).json({ message: "Note not found" });
    res.status(200).json({ message: "Note Deleted Successfully", deletedNote });
  } catch (error) {
    console.log("Error Deleting the Note", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
