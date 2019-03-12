import {connect} from "react-redux";
import React from "react";
import {ArticleActionCreator} from "../../actions/articles.actions";
import ArticleSummary from './partials/ArticleSummary'
import TagOrCategoryListCard from "../tags_categories/TagOrCategoryListCard";
import Pagination from "../shared/Pagination";

class ArticleList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: 'Articles'
        };
    }

    onUrlChanged(location, action) {
        // we can force re-rendering with
        // this.forceUpdate();
        // or with
        // this.setState(this.state);
        if (this.props.location !== location) {
            this.loadArticles(location);
        }
    }

    componentDidMount() {
        this.unlisten = this.props.history.listen(this.onUrlChanged.bind(this));
        this.loadArticles(this.props.location);
    }

    loadArticles(location, page = 1, page_size = 5) {
        const pageRequest = {page, page_size};
        // Please notice why is important to understand difference between props.match.path vs props.location.pathname
        // since this component is mapped to an array, props.match.path is an array, location.pathname is always a string!
        if (location.pathname === '/articles') {
            this.props.fetchArticles(pageRequest);
            this.setState({
                title: 'Newest Articles'
            });
        } else if (location.pathname.startsWith('/articles/by_tag')) {
            // ERROR: this.props.match is pointing to the previous URL!!
            // this.props.fetchArticles({tag: this.props.match.params.tag_slug});
            let slug = location.pathname.split("/", 4)[3];
            this.props.fetchArticles({...pageRequest, tag: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else if (location.pathname.startsWith('/articles/by_category')) {
            let slug = location.pathname.split("/", 4)[3];
            this.props.fetchArticles({...pageRequest, category: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else if (location.pathname.indexOf('by_author') !== -1) {
            let slug = location.pathname.split("/", 4)[3];
            this.props.fetchArticles({...pageRequest, author: slug});
            this.setState({
                title: slug + ' Articles'
            });
        } else {
            this.props.fetchArticles(pageRequest);
            this.setState({
                title: 'Newest Articles'
            });
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {
        if (nextProps.location !== this.props.location) {
            return true;
        }
        return true;
    }

    componentWillUnmount() {
        this.unlisten();
    }

    onArticleSelected(article) {
        this.props.onArticleSelected(article);
    }

    render() {
        return (
            <div className="container row">
                <div className="col-md-8">

                    <h1 className="my-4">
                        {this.state.title}
                    </h1>

                    {this.props.articles_data.articles.map((article, index) => {
                        return <ArticleSummary key={index} onArticleSelected={() => this.onArticleSelected(article)}
                                               article={article}/>
                    })}

                    <Pagination loadMore={this.loadArticles.bind(this)} pageMeta={this.props.articles_data.page_meta}/>
                </div>
                <div className="col-md-4">
                    {/*Search Widget*/}
                    <div className="card my-4">
                        <h5 className="card-header">Search</h5>
                        <div className="card-body">
                            <div className="input-group">
                                <input type="text" className="form-control" placeholder="Search for..."/>
                                <span className="input-group-btn">
                <button className="btn btn-secondary" type="button">Go!</button>
              </span>
                            </div>
                        </div>
                    </div>

                    <TagOrCategoryListCard type="tag"/>
                    <TagOrCategoryListCard type="category"/>

                    {/*<!-- Side Widget -->*/}
                    <div className="card my-4">
                        <h5 className="card-header">Side Widget</h5>
                        <div className="card-body">
                            You can put anything you want inside of these side widgets. They are easy to use, and
                            feature the new Bootstrap 4 card containers!
                        </div>
                    </div>
                </div>
            </div>);
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchArticles: (query) => dispatch(ArticleActionCreator.fetchArticles(query)),
        onArticleSelected: (article) => dispatch(ArticleActionCreator.setArticleSelected(article))
    };
}

function mapStateToProps(state) {
    return {
        articles_data: state.ArticleReducer.articles_data
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);
// export default connect(mapStateToProps, {getArticles})(ArticleList);
// export default connect(mapStateToProps, {getArticles:getArticles})(ArticleList);
