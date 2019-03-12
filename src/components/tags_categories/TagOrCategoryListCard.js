import React from "react";
import {NavLink} from "react-router-dom";
import {connect} from "react-redux";
import {fetchTags} from './../../actions/tag.actions'
import {fetchCategories} from './../../actions/category.actions'
import {withRouter} from "react-router";

class TagOrCategoryListCard extends React.Component {

    componentDidMount() {
        if (this.props.type === 'tag')
            this.props.fetchTags();
        else
            this.props.fetchCategories();
    }

    render() {
        const title = this.props.type === 'tag' ? 'Tags' : 'Categories';
        const prefixUrl = this.props.type === 'tag' ? '/articles/by_tag/' : '/articles/by_category/';
        return (
            <div className="card my-4">
                <h5 className="card-header">{title}</h5>
                <div className="card-body">
                    <div className="row">
                        <div className="col-lg-6">
                            <ul className="list-unstyled mb-0">
                                {this.props.items.map((item, index) => {
                                    return (
                                        <li>
                                            <NavLink to={prefixUrl + item.slug} key={index}>{item.name}</NavLink>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


function mapStateToProps(state, props) {
    return {
        items: props.type === 'tag' ? state.TagsReducer.tags : state.CategoriesReducer.categories
    }
}

export default withRouter(connect(mapStateToProps, {fetchTags, fetchCategories: fetchCategories})(TagOrCategoryListCard));
