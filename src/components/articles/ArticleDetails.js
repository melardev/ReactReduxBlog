import React from 'react';
import {connect} from 'react-redux';
import {fetchArticle} from '../../actions/articles.actions';
import './ArticleDetails.css'
import {NavLink} from "react-router-dom";
import {createComment, clearCommentCreatedFlag} from '../../actions/comments.actions';

class ArticleDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment_data: '',
        };
    }

    componentWillMount() {
        this.props.fetchArticle(this.props.match.params.slug)
    }

    onDeleteClick() {
        this.props.deleteArticle(this.props.params.id)
            .then(() => {
                // Todo: Show somethinga dialog, snack etc
                this.context.router.push('/');
            });
    }

    postComment() {
        this.props.createComment(this.props.match.params.slug, this.state.comment_data);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.comment_created === false && this.props.comment_created === true) {
            this.setState({
                comment_data: ''
            });
            this.props.clearCommentCreatedFlag();
        }
    }

    onCommentDataChanged(event) {
        this.setState({
            comment_data: event.target.value
        });
    }

    render() {
        const {article} = this.props;
        let image = {};
        // article has to be loaded
        if (!article.id) {
            return <div>Loading...</div>
        } else {
            // TODO: read images from article and use one as featured image
        }

        if (article.id) {
            return (
                <div className="post">
                    <div className="post-header">
                        <div className="post-header-profile">
                            <img src="/images/user_generic.png" alt="avatar image"/>
                        </div>
                        <div className="post-header-author">
                            <div className="post-header-author-name"><span
                                id="author-name">{article.user.username}</span></div>
                            <div className="post-header-post-summary"><span
                                id="post-description">{article.created_at}</span>
                            </div>
                        </div>
                    </div>
                    <div className="post-description">
                        <div className="post-description-title">
                            <h1>{article.title}</h1>
                        </div>
                        <div className="post-description-subtitle">
                            <h2>{article.description}</h2>
                        </div>
                        {image.url &&
                        <div className="post-description-cover">
                            <img src={image.url} id="cover-photo" alt="article's featured image"/>
                        </div>
                        }
                    </div>
                    <div className="post-content">
                        {article.body}
                        <div className="post-content-tags">
                            <ul>
                                {article.tags.map((tag, index) => {
                                    return (<li key={index}>
                                        <NavLink to={`/articles/by_tag/${tag.slug}`}>{tag.name}</NavLink>
                                    </li>)
                                })}

                                {article.categories.map((category, index) => {
                                    return (<li key={index + article.tags.length}>
                                        <NavLink to={`/articles/by_category/${category.slug}`}>{category.name}</NavLink>
                                    </li>)
                                })}

                            </ul>
                        </div>
                        <div className="post-content-divider"/>
                    </div>

                    <div className="post-divider"/>
                    <div className="post-comment">
                        <div className="post-comment-header"><span>Comments</span></div>
                        {this.props.is_authenticated && <div className="post-comment-input">
                            <div className="post-comment-input-profile">
                                <img src="/images/user_generic.png"
                                     id="comment-profile" alt="user's profile image"/></div>
                            <div className="post-comment-input-field">
                                <textarea placeholder="Write a comment" onChange={this.onCommentDataChanged.bind(this)}
                                          value={this.state.comment_data}/>
                            </div>
                        </div>}
                        {this.props.is_authenticated && <div className="post-comment-button">
                            <button onClick={this.postComment.bind(this)}>Publish</button>
                        </div>}
                        {!this.props.is_authenticated && <div className="post-comment-button">
                            <NavLink className="btn btn-success" to="/login">Login</NavLink>
                            &nbsp;
                            <NavLink className="btn btn-info" to="/login">Register</NavLink>
                        </div>}
                        <div className="post-comment-container">
                            {this.props.comments.length > 0 && this.props.comments.map((comment, index) => {
                                return (<div key={index}
                                             className="post-comment-container-individual">
                                    <div className="post-comment-container-individual-profile">
                                        <img src="/images/user_generic.png" alt="user's profile image"/>
                                    </div>
                                    <div className="post-comment-container-individual-content">
                                        <div className="post-comment-container-individual-content-message">
                                            <p>
                                                <span id="comment-name">{comment.user.username}</span><br/>
                                                {comment.content}
                                            </p>
                                        </div>
                                        <div className="post-comment-container-individual-content-information"><span
                                            id="like">Date</span><span id="date">• {comment.created_at}</span></div>
                                    </div>
                                </div>);
                            })}

                        </div>
                    </div>
                </div>
            )
        }
    }
}

function mapStateToProps(state, props) {
    return {
        // this is temporary, we first render the info we had from the previous fetch, but then we have to fetch the whole article
        article: state.ArticleReducer.selected_article,
        is_authenticated: state.AuthReducer.is_authenticated,
        comments: state.CommentReducer.comments_data.comments,
        comment_created: state.CommentReducer.comment_created
    };
}


export default connect(mapStateToProps, {
    // Each time we call this.props.getArticle() it will trigger dispatch(getArticleAction)
    fetchArticle,
    createComment,
    clearCommentCreatedFlag
    // Each time we call this.props.deleteArticle() it will trigger dispatch(getDeleteArticleAction)
})(ArticleDetails);
