const LinkRedirectsRouter = require('express').Router();
const { getLink } = require('../utilities/getLink.js');
const { saveVisitor } = require('../utilities/saveVisitor');

LinkRedirectsRouter.get('/:batch/:course', saveVisitor, async(req, res, next) => {
    const batch = req.params.batch;
    const course = req.params.course;
    const redirectLink = await getLink(batch, course.toUpperCase());
    if (!redirectLink.err) {
        res.redirect(redirectLink);
    }

    next(redirectLink.err)
});

module.exports = LinkRedirectsRouter;