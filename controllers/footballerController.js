const Footballer = require('../models/Footballer'); 
const addFootballer = async (req, res) => {
  const { full_name, position, nationality, dob, bio, avatar, created_by } = req.body;

  if (!full_name || !position || !nationality || !dob || !created_by) {
    return res
      .status(400)
      .json({ msg: 'Fields full_name, position, nationality, dob, and created_by are required' });
  }

  try {
    const footballer = new Footballer({
      full_name,
      position,
      nationality,
      dob,
      bio,
      avatar,
      created_by,
    });

    await footballer.save();
    res.status(201).json({ msg: 'Footballer added successfully', footballer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};



const updateFootballer = async (req, res) => {
  const { id } = req.params;
  const { full_name, position, nationality, dob, bio, avatar, updated_by } = req.body;

  try {
    const footballer = await Footballer.findByIdAndUpdate(
      id,
      { full_name, position, nationality, dob, bio, avatar, updated_by },
      { new: true, runValidators: true }
    );

    if (!footballer) {
      return res.status(404).json({ msg: 'Footballer not found' });
    }

    res.status(200).json({ msg: 'Footballer updated successfully', footballer });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send('Server Error');
  }
};


const getAllFootballers = async (req, res) => {
  try {
    const footballers = await Footballer.find();
    res.status(200).json(footballers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};


  
const getFootballerById = async (req, res) => {
  const { id } = req.params;

  try {
    const footballer = await Footballer.findById(id);

    if (!footballer) {
      return res.status(404).json({ msg: 'Footballer not found' });
    }

    res.status(200).json(footballer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send('Server Error');
  }
};


  const deleteFootballer = async (req, res) => {
  const { id } = req.params;

  try {
    const footballer = await Footballer.findByIdAndDelete(id);

    if (!footballer) {
      return res.status(404).json({ msg: 'Footballer not found' });
    }

    res.status(200).json({ msg: 'Footballer deleted successfully' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(400).json({ msg: 'Invalid ID format' });
    }
    res.status(500).send('Server Error');
  }
};


   module.exports = {addFootballer, updateFootballer, getAllFootballers, getFootballerById, deleteFootballer};