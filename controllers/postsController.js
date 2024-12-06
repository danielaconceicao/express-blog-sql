const posts = require('../database/db.js');
const fs = require('fs');



const show = (req, res) => {
    const post = posts.find(postEl => postEl.id === Number(req.params.id));

    if(!post){
        return res.status(404).json({
            error: 'Not found'
        });
    }

    return res.status(200).json({
        data: post//nao funciona
    });
}


const store = (req, res) => {
    const post = {
        
        title: req.body.title,
        slug: req.body.slug,
        content: req.body.content,
        image: req.body.image,
        tags: req.body.tags
    }

    posts.push(post);
    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`);
    
    //console.log(req.body)
    return res.status(201).json({
        status: 201,
        data: posts,
        counter: posts.length
    });

}

const update = (req, res) => {
    const post = posts.find(postEl => postEl.slug.toLowerCase() === req.params.slug);

    if(!post){
        return res.status(404).json({
            error: `Not found`
        });
    }

    post.title = req.body.title
    post.slug = req.body.slug
    post.content = req.body.content
    post.image = req.body.image
    post.tags = req.body.tags

    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(posts, null, 4)}`);

    return res.status(200).json({
        status: 200,
        data: posts
    });
}

const destroy = (req, res) => {
    const post = posts.find(postEl => postEl.slug.toLowerCase() === req.params.slug);

    if(!post){
        return res.status(404).json({
            error: `Not found`
        });
    }

    const newPosts = posts.filter(postEl => postEl.slug.toLowerCase() !== req.params.slug);

    fs.writeFileSync('./database/db.js', `module.exports = ${JSON.stringify(newPosts, null, 4)}`);

    return res.status(200).json({
        status: 200,
        data: newPosts
    });
}



module.exports = {
    store, 
    index,
    show,
    update,
    destroy
}