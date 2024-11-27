export const formatLodgerPost = (lodger_post, user_id) => {
    return {
        ...lodger_post,
        user_id
    };
}