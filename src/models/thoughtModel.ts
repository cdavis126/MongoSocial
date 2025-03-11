import { Schema, Types, model, type Document } from 'mongoose';
import reactionSchema from './reactionSchema';
import { IReaction } from './reactionSchema';


interface IThought extends Document {
    thoughtText: string;
    createdAt: Date;
    username: string;
    reactions: Types.DocumentArray<IReaction>;
}

const thoughtSchema = new Schema<IThought>(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now, // REMOVE GETTER
        },
        username: {
            type: String,
            ref: 'User',
            required: true
        },
        reactions: {
            type: [reactionSchema],
            default: []
        }
    },
    {
        timestamps: true,
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

// Virtual to get reaction count
thoughtSchema.virtual('reactionCount').get(function (this: IThought) {
    return this.reactions ? this.reactions.length : 0;
});

const Thought = model<IThought>('Thought', thoughtSchema);
export default Thought;
