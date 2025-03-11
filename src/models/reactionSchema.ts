import { Schema, Types, Document } from 'mongoose';

// Define the TypeScript interface for a Reaction
export interface IReaction extends Document {
    reactionId: Types.ObjectId;
    reactionBody: string;
    username: string;
    createdAt: Date;
}

// Create the Reaction Schema
const reactionSchema = new Schema<IReaction>(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId(),
        },
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280,
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now, // Fix: Direct function reference (no `()`)
        },
    },
    {
        timestamps: true,
        toJSON: { virtuals: true, getters: true }, 
        id: false,
    }
);

export default reactionSchema;




