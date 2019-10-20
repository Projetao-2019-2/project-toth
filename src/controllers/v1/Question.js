const { Question, sequelize } = require('../../models')

class QuestionController {
    async Create(req, res) {
        const Question = await Question.create({
            author: req.body.author,
            text: req.body.text,
        });

        if (!Question)
            return res.status(500).json({ message: "Unable to create Question." });

        return res.send('Question Created!');
    }

    async Find(req, res) {
        const { Id } = req.params;
        const Question = await Question.findOne({ where: { Id } });

        if (!Question)
            return res.status(404).json({ message: "Question not found." });

        res.json({ Question });
    }

    async List(req, res) {
        const questions = await Question.findAll();

        if (!questions)
            return res.status(500).json({ message: "No questions found." });

        res.json({ questions })
    }



    async Update(req, res) {
        const { Id } = req.params;
        const { Text } = req.body;

        if (Text == undefined)
            return res.status(400).json({ message: "Cannot be empty." });

        const Question = await Comment.findOne({ where: { Id } });

        if (!Question)
            return res.status(404).json({ message: "Question not found." });

        const [updated] = await Comment.update(req.body, { where: { id: Id } });

        if (!updated)
            return res.status(500).json({ message: "Update failed." });

        const updatedComment = await Comment.findOne({ where: { id: Id } });
        res.json({ updatedComment });
    }

    async Delete(req, res) {
        const { Id } = req.params;
        const deleted = await Question.destroy({ where: { id: Id } });

        if (!deleted)
            return res.status(404).json({ message: "Question not found." });

        return res.status(204).send("Question deleted!");
    }


}
module.exports = new QuestionController()