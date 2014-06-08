App.Recipe = DS.Model.extend({
    name: DS.attr(),
    description: DS.attr(),
    categories: DS.hasMany('category', {
        async: true
    })
});
