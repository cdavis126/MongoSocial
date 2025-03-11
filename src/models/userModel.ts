import { Schema, model, Types, Document } from 'mongoose';
import pkg from 'validator';

const { isEmail } = pkg;

// Define TypeScript interface for a User
export interface IUser extends Document {
    username: string;
    email: string;
    thoughts?: Types.ObjectId[];
    friends: Types.ObjectId[];
}

// Create User Schema
const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: (email: string) => isEmail(email),
                message: 'Please enter a valid email address'
            }
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
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

// Ensure `friends` array exists before accessing its length
userSchema.virtual('friendCount').get(function (this: IUser) {
    return this.friends ? this.friends.length : 0;
});

// Create User model
const User = model<IUser>('User', userSchema);

export default User;

