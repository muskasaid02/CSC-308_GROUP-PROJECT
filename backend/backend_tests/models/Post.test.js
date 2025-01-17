import mongoose from 'mongoose';
import Post from '../../models/Post';
import dotenv from 'dotenv';

dotenv.config();

describe('Post Model', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
    });

    afterAll(async () => {
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await Post.deleteMany({});
    });

    it('should create a post with a hashed password', async () => {
        const validPost = {
            title: 'Test Post',
            content: 'Test Content',
            date: new Date(),
            user_id: new mongoose.Types.ObjectId(),
            password: 'PlainPassword123',
        };

        const post = await Post.create(validPost);

        // Password should be hashed
        expect(post.password).not.toBe(validPost.password);
        expect(post.password).toMatch(/^\$2[ayb]\$.{56}$/); // bcrypt hash regex
    });

    it('should allow only valid moods', async () => {
        const validPost = {
            title: 'Test Post',
            content: 'Test Content',
            date: new Date(),
            user_id: new mongoose.Types.ObjectId(),
            mood: 'happy', // Valid mood
        };
    
        const post = await Post.create(validPost);
    
        // Debugging log (remove if no longer needed)
        console.log(post);
    
        // Check mood with different approaches
        expect(post.mood).toBe('happy');
        expect(post).toHaveProperty('mood', 'happy');
    });
    

    it('should default mood to "neutral" if not provided', async () => {
        const validPost = {
            title: 'Test Post',
            content: 'Test Content',
            date: new Date(),
            user_id: new mongoose.Types.ObjectId(),
        };

        const post = await Post.create(validPost);
        expect(post.mood).toBe('neutral');
    });

    it('should throw an error for invalid mood values', async () => {
        const invalidPost = {
            title: 'Test Post',
            content: 'Test Content',
            date: new Date(),
            user_id: new mongoose.Types.ObjectId(),
            mood: 'angry', // Invalid mood
        };

        await expect(Post.create(invalidPost))
            .rejects
            .toThrow();
    });
});
