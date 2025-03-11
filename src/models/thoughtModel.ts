import { Schema, Types, model, Document } from 'mongoose';
import reactionSchema from './reactionSchema';
import { IReaction } from './reactionSchema';

// Define TypeScript interface for a Thought
export interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.DocumentArray<IReaction>;
}

// Create Thought Schema
const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (value: Date) =>
                value.toLocaleString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: true
                })
        },
        username: {
            type: String,
            ref: 'User',
            required: true
        },
        reactions: [reactionSchema]
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// Create a virtual called `reactionCount` that retrieves the length of the `reactions` array
thoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

// Create Thought model
const Thought = model<IThought>('Thought', thoughtSchema);

export default Thought;
