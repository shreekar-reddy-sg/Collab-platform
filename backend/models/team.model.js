import mongoose, { Schema } from "mongoose";

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    members: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
    }],
});

export const Team = mongoose.model('Team', teamSchema);