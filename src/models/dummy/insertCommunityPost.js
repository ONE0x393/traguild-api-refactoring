const CommunityPost = require('@src/models/02-community/CommunityPost');
const esClient = require('@src/config/esClient');

const insertCommunityPost = async () => {
    const posts = await CommunityPost.bulkCreate([
        {
            "post_name": "가입인사",
            "user_idx": 1,
            "post_detail": "안녕하세요. 처음으로 글을 올려봅니다. 잘 부탁드립니다.",
            "created_time": "2021-01-01 00:00:00",
            "updated_time": "2021-01-01 00:00:00",
            "is_deleted": false,
        },
        {
            "post_name": "새로운 시작",
            "user_idx": 2,
            "post_detail": "<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nisl tincidunt eget nullam non. Quis hendrerit dolor magna eget est lorem ipsum dolor sit. Volutpat odio facilisis mauris sit amet massa. Commodo odio aenean sed adipiscing diam donec adipiscing tristique. Mi eget mauris pharetra et. Non tellus orci ac auctor augue. Elit at imperdiet dui accumsan sit. Ornare arcu dui vivamus arcu felis. Egestas integer eget aliquet nibh praesent. In hac habitasse platea dictumst quisque sagittis purus. Pulvinar elementum integer enim neque volutpat ac.</p><p>Senectus et netus et malesuada. Nunc pulvinar sapien et ligula ullamcorper malesuada proin. Neque convallis a cras semper auctor. Libero id faucibus nisl tincidunt eget. Leo a diam sollicitudin tempor id. A lacus vestibulum sed arcu non odio euismod lacinia. In tellus integer feugiat scelerisque. Feugiat in fermentum posuere urna nec tincidunt praesent. Porttitor rhoncus dolor purus non enim praesent elementum facilisis. Nisi scelerisque eu ultrices vitae auctor eu augue ut lectus. Ipsum faucibus vitae aliquet nec ullamcorper sit amet risus. Et malesuada fames ac turpis egestas sed. Sit amet nisl suscipit adipiscing bibendum est ultricies. Arcu ac tortor dignissim convallis aenean et tortor at. Pretium viverra suspendisse potenti nullam ac tortor vitae purus. Eros donec ac odio tempor orci dapibus ultrices. Elementum nibh tellus molestie nunc. Et magnis dis parturient montes nascetur. Est placerat in egestas erat imperdiet. Consequat interdum varius sit amet mattis vulputate enim.</p><p>Sit amet nulla facilisi morbi tempus. Nulla facilisi cras fermentum odio eu. Etiam erat velit scelerisque in dictum non consectetur a erat. Enim nulla aliquet porttitor lacus luctus accumsan tortor posuere. Ut sem nulla pharetra diam. Fames ac turpis egestas maecenas. Bibendum neque egestas congue quisque egestas diam. Laoreet id donec ultrices tincidunt arcu non sodales neque. Eget felis eget nunc lobortis mattis aliquam faucibus purus. Faucibus interdum posuere lorem ipsum dolor sit.</p>",
            "created_time": "2021-01-02 10:15:00",
            "updated_time": "2021-01-02 10:15:00",
            "is_deleted": true
        },
        {
            "post_name": "반가워요",
            "user_idx": 3,
            "post_detail": "이 커뮤니티에 새로 가입했습니다. 잘 부탁드립니다!",
            "created_time": "2021-01-03 08:30:00",
            "updated_time": "2021-01-03 08:30:00",
            "is_deleted": false
        },
        {
            "post_name": "첫 글",
            "user_idx": 4,
            "post_detail": "처음으로 글을 써봅니다. 잘 부탁드립니다.",
            "created_time": "2021-01-04 14:45:00",
            "updated_time": "2021-01-04 14:45:00",
            "is_deleted": true
        },
        {
            "post_name": "인사드립니다",
            "user_idx": 5,
            "post_detail": "안녕하세요! 여러분들과 소통하고 싶습니다.",
            "created_time": "2021-01-05 12:00:00",
            "updated_time": "2021-01-05 12:00:00",
            "is_deleted": false
        },
    ]);

    for(const post of posts){
        await esClient.index({
            index: 'community_post',
            id: post.post_idx,
            body: post
        });
    }

    return posts;
}

module.exports = insertCommunityPost;