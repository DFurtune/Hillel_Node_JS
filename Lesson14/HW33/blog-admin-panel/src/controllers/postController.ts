import { Request, Response } from 'express';
import { postModel, Post } from '../models/post';
import { v4 as uuidv4 } from 'uuid';

class PostController {
    async createPost(req: Request, res: Response) {
        try {
            const { title, content, authorId } = req.body;
            const post: Post = {
                id: uuidv4(),
                title,
                content,
                authorId,
            };
            const createdPost = postModel.createPost(post);
            res.status(201).json(createdPost);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getPost(req: Request, res: Response) {
        try {
            const post = postModel.getPost(req.params.id);
            if (!post) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(post);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = postModel.getAllPosts();
            res.json(posts);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async updatePost(req: Request, res: Response) {
        try {
            const updatedPost = postModel.updatePost(req.params.id, req.body);
            if (!updatedPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.json(updatedPost);
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }

    async deletePost(req: Request, res: Response) {
        try {
            const deleted = postModel.deletePost(req.params.id);
            if (!deleted) {
                return res.status(404).json({ message: 'Post not found' });
            }
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ message: error.message });
        }
    }
}

export default new PostController();