export const DYNAMIC_CONTENTS_QUERY = `#graphql
    query dynamicContens {
        metaobjects(first: 250, type: "dynamic_content") {
            nodes {
                id
                title: field(key: "title"){
                    value
                }
                description: field(key: "description"){
                    value
                }
                linkLabel: field(key: "link_label"){
                    value
                }
                linkUrl: field(key: "link_url"){
                    value
                }
            }
        }
    }
`;
