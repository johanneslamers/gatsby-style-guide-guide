import React from "react";
import GatsbyLink from "gatsby-link";
import Helmet from "react-helmet";

import Link from "../components/Link";
import PageHeader from "../components/PageHeader";
import Card from "../components/Card";

export default function ComponentDetail({ data }) {
    const { edges: posts } = data.allMarkdownRemark;
    return (
        <div className="l-container">
            <PageHeader title="Components" description="This is a list of all the components" />

            <ul className="c-card-list l-grid l-grid--3up">
            {posts
                .filter(post => post.node.frontmatter.group == 'components')
                .filter(post => post.node.frontmatter.subgroup)
                .map(({ node: post }) => {
                    return (
                        <li className="l-grid__item">
                            <Card href={"/components/"+post.frontmatter.subgroup} kicker={post.frontmatter.subgroup} title={post.frontmatter.title} key={post.id} />
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export const pageQuery = graphql`
    query ComponentQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___title] }) {
            edges {
                node {
                    excerpt(pruneLength: 250)
                    id
                    frontmatter {
                        title
                        description
                        date(formatString: "MMMM DD, YYYY")
                        path
                        group
                        subgroup
                    }
                }
            }
        }
    }
`;
