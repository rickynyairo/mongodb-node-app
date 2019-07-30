import { model, Schema, Document } from 'mongoose';
import { Post } from '../controllers/interfaces';
 
const postSchema = new Schema({
  author: String,
  content: String,
  title: String,
});
 
const postModel = model<Post & Document>('Post', postSchema);
 
export default postModel;