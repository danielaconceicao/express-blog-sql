/* const posts = require('../database/db.js');
const fs = require('fs'); */
const connection = require('../database/connectiondb.js')


const index = (req, res) => {
    const sql = 'SELECT * FROM posts';

    connection.query(sql, (err, posts) => {
        if(err) return res.status(500).json({error: 'Database query failed'})
        res.json(posts)
    })
    
    const responseData = {
        data: posts,
        counter: posts.length
    }

    res.status(200).json(responseData)

}


const show = (req, res) => {
    
    const id = req.params.id;
    
    const sql = 'SELECT * FROM posts WHERE id=?'


    connection.query(sql, [id], (err, results) => {
        
        if (err) return res.status(500).json({ error: 'Database query failed' });
        if (results.length === 0) return res.status(404).json({ error: `404! Not found` })
        res.json(results[0])
    })

    /* const post = posts.find(postEl => postEl.id === Number(req.params.id));

    if(!post){
        return res.status(404).json({
            error: 'Not found'
        });
    }

    return res.status(200).json({
        data: post
    }); */

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

    const id = req.params.id
    console.log(id);

    const sql = 'DELETE FROM posts WHERE id=?'

    connection.query(sql, [id], (err, results) => {
        console.log(err, results);
        if (err) return res.status(500).json({ error: err })
        
        if (results.affectedRows === 0) return res.status(404).json({ error: `404! No post found with the this id: ${id}` })

        return res.json({ status: 204, affectedRows: results.affectedRows })

    })



    /* const post = posts.find(postEl => postEl.slug.toLowerCase() === req.params.slug);

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
    }); */
}



module.exports = {
    store, 
    index,
    show,
    update,
    destroy
}