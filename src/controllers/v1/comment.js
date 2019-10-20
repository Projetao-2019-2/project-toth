const { Comment, sequelize } = require('../../models')

class CommentController {
    async CommentCreate(req, res) {
        const comment = await Comment.create(
            {
                author: req.body.author,
                text: req.body.text,
                score: 0
            }
        );

        if (!comment)
            return res.status('500').json({ message: "Couldn't create comment." });

        return res.send('Comment sent!');
    }


    async CommentList(req, res) {
        const comments = await Comment.findAll();

        if (!comments)
            return res.status('500').json({ message: "No comments found." });

        res.json({ comments })
    }

    async CommentFind(req, res) {
        const { CId } = req.params;
        const comment = await Comment.findOne({ where: { CId } });

        if (!comment)
            return res.status('404').json({ message: "Comment not found." });

        res.json({ comment });
    }

    async CommentUpdate(req, res) {
        const { CId } = req.params;
        const { CText } = req.body;

        if (CText == undefined)
            return res.status('400').json({ message: "Comment cannot be empty." });

        const comment = await Comment.findOne({ where: { CId } });

        if (!comment)
            return res.status('404').json({ message: "Comment not found." });

        const [updated] = await Comment.update(req.body, { where: { id: CId } });

        if (!updated)
            return res.status('500').json({ message: "Update failed." });

        const updatedComment = await Comment.findOne({ where: { id: CId } });
        res.json({ updatedComment });
    }

    async CommentDelete(req, res) {
        const { CId } = req.params;
        const deleted = await Comment.destroy({ where: { id: CId } });

        if (!deleted)
            return res.status('404').json({ message: "Comment not found." });

        return res.status('204').send("Comment deleted!");
    }


}
module.exports = new CommentController()