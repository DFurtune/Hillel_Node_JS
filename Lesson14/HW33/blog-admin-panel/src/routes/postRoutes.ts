import { Router } from 'express';
import postController from '../controllers/postController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = Router();

// Create a new post
router.post('/', authenticateToken, postController.createPost);

// Get all posts
router.get('/', postController.getAllPosts);

// Get a single post by ID
router.get('/:id', postController.getPost);

// Update a post by ID
router.put('/:id', authenticateToken, postController.updatePost);

// Delete a post by ID
router.delete('/:id', authenticateToken, postController.deletePost);

export default router;