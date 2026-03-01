import Channel from '../models/channel.model';

export const createChannel = async (req, res) => {
    try {
        const { name, team } = req.body;
        const channel = new Channel({ name, team });
        await channel.save();
        res.status(201).json({ message: 'Channel created successfully', channel });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};