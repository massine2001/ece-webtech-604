import React, { useState, useEffect, useContext } from 'react';
import { supabase } from './supabaseClient';
import Gravatar from 'react-gravatar';
import { UserContext } from '../pages/appContext';

const Comment = ({ comment, onDelete, fetchComments }) => {
  const { user, getUsername, updateComment, deleteComment, getEmail } = useContext(UserContext);
  const [username, setUsername] = useState(null);
  const [email_user_comment, setEmail_user_comment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState('');

  useEffect(() => {
    const fetchUsername = async () => {
      const username = await getUsername(comment.id_user);
      const email_user_comment = await getEmail(comment.id_user);
      setUsername(username);
      setEmail_user_comment(email_user_comment);
    };

    fetchUsername();

    const subscription = supabase
      .from(`user:id=eq.${comment.id_user}`)
      .on('UPDATE', () => fetchUsername())
      .subscribe();

    return () => {
      supabase.removeSubscription(subscription);
    };
  }, [comment]);

  const handleDelete = async () => {
    if (isEditing) {
      await updateComment(comment.id, editedComment, fetchComments);
      setIsEditing(false);
    } else {
      await deleteComment(comment.id, fetchComments);
      onDelete(comment.id);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedComment(comment.text);
  };

  return (
    <div key={comment.id} style={{ backgroundColor: '#FFE8D6', marginBottom: '20px', borderRadius: '15px', padding: '10px', display: 'inline-block', width: 'fit-content' }}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ color: '#8B4500', fontWeight: 'bold', display: 'flex' }}>{username || (email_user_comment && email_user_comment.split('@')[0])}</div>
        <div className='entre-commentaire2'></div>
        {user && user.id === comment.id_user && (
          <>
            <button className='button-modif-commentaire' onClick={handleEdit}>Modify</button>
            <div style={{ marginLeft: '4px', marginRight: '4px' }}> | </div>
            <button className='button-supp-commentaire' onClick={handleDelete}>Delete</button>
          </>
        )}
      </div>
      {isEditing ? (
        <>
          <input value={editedComment} onChange={(e) => setEditedComment(e.target.value)} />
          <button onClick={handleDelete}>Confirm</button>
        </>
      ) : (
        <div>{comment.text}</div>
      )}
      <div className='entre-commentaire'></div>
      <div style={{ fontSize: '11px' }}>
        {new Date(comment.update_at) > new Date(comment.created_at) ? 'Modified the :' : 'Posted the :'}
        {new Date(comment.update_at).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};

const Comments = ({ recipeId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleDelete = (id) => {
    setComments(comments.filter(comment => comment.id !== id));
  };

  const fetchComments = async () => {
    try {
      const { data, error } = await supabase
        .from('comments')
        .select('*, user(*)')
        .eq('id_recipe', recipeId);

      if (error) {
        console.error('Error fetching comments:', error);
      } else {
        setComments(data);
      }
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const addComment = async () => {
    const user = supabase.auth.user();

    if (!user) {
      alert('You should be connected to post a comment.');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('comments')
        .insert([{ text: newComment, id_recipe: recipeId, id_user: user.id }]);

      if (error) {
        console.error('Error adding comment:', error);
      } else {
        fetchComments();
        setNewComment('');
      }
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <div className="super-commentaire">
      <div className="commentaire">
        <h2 className="text-2xl font-bold mb-4">Comments</h2>
        <div className='entre-commentaire3'></div>
        <div className="zone-commentaire">
          {comments.length > 0 ? (
            [...comments].reverse().map((comment) => <Comment key={comment.id} comment={comment} onDelete={handleDelete} fetchComments={fetchComments} />)
          ) : (
            <p className="text-gray-500">No comments for this recipe.</p>
          )}
        </div>
        <div className='ecriture-commentaire'>
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className='zone-ecriture-commentaire'
            placeholder="Share your comment..."
          />
          <button
            onClick={addComment}
            className='btn-commentaire'
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comments;
