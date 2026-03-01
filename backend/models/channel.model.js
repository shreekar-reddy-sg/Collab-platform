import mongoose, { Schema } from "mongoose";

const channelSchema = new Schema({
    name: {
        type: String,   
        required: true,
    },
    team: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        required: true,
    }
}, {
    timestamps: true,
});

export const Channel = mongoose.model('Channel', channelSchema);