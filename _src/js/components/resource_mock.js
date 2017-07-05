export default {

    ['GET /api/hello'] (request, next) {
        let body = 'world!';
        next(request.respondWith(body, {status: 200}));
    },
    
}