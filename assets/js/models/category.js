App.Category = DS.Model.extend({
    recipes: DS.hasMany('recipe', {
        async: true
    })
});
