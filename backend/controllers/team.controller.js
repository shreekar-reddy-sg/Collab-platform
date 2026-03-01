import Team from "../models/team.model.js";

export const createTeam = async (req, res) => {
    try {
        const { name } = req.body;
        const team = new Team({ name, members: [req.user.id] });
        await team.save();
        res.status(201).json({ message: 'Team created successfully', team });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }   
};