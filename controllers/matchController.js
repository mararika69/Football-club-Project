const Match = require('../models/Match'); // Import your model

// Get all matches
exports.getAllMatches = async (req, res) => {
  try {
    const matches = await Match.find(); // Fetch all matches from the database

    if (matches.length === 0) {
      return res.status(404).json({ msg: 'No matches found' });
    }

    res.status(200).json(matches); // Return all matches
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get matches by status
exports.getMatchesByStatus = async (req, res) => {
  try {
    const { status } = req.query; // Query parameter for status
    const matches = await Match.find({ status });

    if (matches.length === 0) {
      return res.status(404).json({ msg: `No matches found with status: ${status}` });
    }

    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Paginate matches
exports.getPaginatedMatches = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, limit 10
    const matches = await Match.find()
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    if (matches.length === 0) {
      return res.status(404).json({ msg: 'No matches found' });
    }

    res.status(200).json({ page: parseInt(page), limit: parseInt(limit), matches });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Create a match
exports.createMatch = async (req, res) => {
  try {
    const { id, teamA, teamB, date, venue, created_by } = req.body;
    const existingMatch = await Match.findOne({ id });
    if (existingMatch) {
      return res.status(400).json({ msg: 'Match with this ID already exists' });
    }

    const match = new Match({ id, teamA, teamB, date, venue, created_by });
    await match.save();

    res.status(201).json({ msg: 'Match created successfully', match });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update match scores
exports.updateMatchScores = async (req, res) => {
  try {
    const { id } = req.params;
    const { homeScore, awayScore } = req.body;

    const match = await Match.findOne({ id });

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    match.homeScore = homeScore !== undefined ? homeScore : match.homeScore;
    match.awayScore = awayScore !== undefined ? awayScore : match.awayScore;

    await match.save();
    res.status(200).json({ msg: 'Match scores updated successfully', match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a match
exports.deleteMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMatch = await Match.findOneAndDelete({ id });

    if (!deletedMatch) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    res.status(200).json({ msg: 'Match deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get match details
exports.getMatchDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const match = await Match.findOne({ id });

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    res.status(200).json(match); // Return match details
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Search matches by team name
exports.searchMatchesByTeamName = async (req, res) => {
  try {
    const { teamName } = req.query;

    const matches = await Match.find({
      $or: [
        { 'teamA.name': { $regex: teamName, $options: 'i' } },
        { 'teamB.name': { $regex: teamName, $options: 'i' } },
      ],
    });

    if (matches.length === 0) {
      return res.status(404).json({ msg: `No matches found with team name: ${teamName}` });
    }

    res.status(200).json(matches);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// Update a match
exports.updateMatch = async (req, res) => {
  try {
    const { id } = req.params;
    const { teamA, teamB, date, venue, status } = req.body;

    const match = await Match.findOne({ id });

    if (!match) {
      return res.status(404).json({ msg: 'Match not found' });
    }

    match.teamA = teamA || match.teamA;
    match.teamB = teamB || match.teamB;
    match.date = date || match.date;
    match.venue = venue || match.venue;
    match.status = status || match.status;

    await match.save();
    res.status(200).json({ msg: 'Match updated successfully', match });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};
