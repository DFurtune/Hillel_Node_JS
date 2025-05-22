export interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
}

class PostModel {
  private posts: Post[] = [];

  createPost(post: Post): Post {
    this.posts.push(post);
    return post;
  }

  getPost(id: string): Post | undefined {
    return this.posts.find((post) => post.id === id);
  }

  updatePost(id: string, updatedPost: Partial<Post>): Post | undefined {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      this.posts[postIndex] = { ...this.posts[postIndex], ...updatedPost };
      return this.posts[postIndex];
    }
    return undefined;
  }

  deletePost(id: string): boolean {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex !== -1) {
      this.posts.splice(postIndex, 1);
      return true;
    }
    return false;
  }

  getAllPosts(): Post[] {
    return this.posts;
  }
}

export const postModel = new PostModel();
