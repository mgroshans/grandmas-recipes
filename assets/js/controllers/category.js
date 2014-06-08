App.CategoryController = Ember.ObjectController.extend({
    recipes: (function () {
        return Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
            sortProperties: ['name'],
            content: this.get('content.recipes')
        });
   }).property('content.recipes')
});
