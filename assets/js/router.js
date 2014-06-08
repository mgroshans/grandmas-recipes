App.Router.map(function () {
    this.resource('category', {
        path: '/category/:category_id'
    });
    this.resource('recipe', {
        path: '/recipe/:recipe_id'
    });
});
