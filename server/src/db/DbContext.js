import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { PostSchema } from '../models/Post.js';
import { CommentSchema } from '../models/Comment.js';
import { PostLikerSchema } from '../models/PostLiker.js';
import { CommentLikerSchema } from '../models/CommentLiker.js';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Posts = mongoose.model('Post', PostSchema);
  Comments = mongoose.model('Comment', CommentSchema)
  PostLikers = mongoose.model('PostLiker', PostLikerSchema)
  CommentLikers = mongoose.model('CommentLiker', CommentLikerSchema)
}

export const dbContext = new DbContext()
