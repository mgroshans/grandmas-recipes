window.App = Ember.Application.create({
    LOG_TRANSITIONS: true
});

Ember.Inflector.inflector.irregular('category', 'categories');

DS.RESTAdapter.reopen({
    namespace: 'api/v1'
});

Ember.Handlebars.registerBoundHelper('format-markdown', function (input) {
    if (typeof input === 'undefined') {
        return new Handlebars.SafeString('');
    }

    return new Handlebars.SafeString(marked(input));
});
