var express = require('express');
var app = express();

app.use(express.compress());
app.use(express.static('public'));

console.log('Building recipe database...');
// TODO use ES6 Maps instead of {} when V8 gets .forEach() support
var recipes = {};
var categories = {};

var fs = require('fs');
var list = fs.readdirSync('recipes');
list.forEach(function (dir) {
    var base = 'recipes/' + dir;
    var recipe = recipes[dir] = JSON.parse(fs.readFileSync(base + '/metadata.json', 'utf8'));
    recipe.id = dir;
    recipe.description = fs.readFileSync(base + '/description.md', 'utf8');
});

Object.keys(recipes).forEach(function (key) {
    var recipe = recipes[key];
    recipe.categories.forEach(function (category) {
        if (categories.hasOwnProperty(category)) {
            categories[category].push(recipe.id);
        } else {
            categories[category] = [recipe.id];
        }
    });
});

app.get('/api/v1/categories', function (req, res) {
    var list = Object.keys(categories).map(function (key) {
        return {
            id: key,
            recipes: categories[key]
        }
    });

    res.json({
        categories: list
    });
});

app.get('/api/v1/categories/:id', function (req, res) {
    var id = req.params.id;
    var recipes = categories[id];

    if (typeof recipes === 'undefined') {
        res.statusCode = 404;
        return res.send('Error 404: Category not found');
    }

    res.json({
        category: {
            id: id,
            recipes: recipes
        }
    });
});

app.get('/api/v1/recipes', function (req, res) {
    var ids = req.query.ids;
    list = ids.map(function (id) {
        return recipes[id];
    });

    res.json({
        recipes: list
    });
});

app.get('/api/v1/recipes/:id', function (req, res) {
    var id = req.params.id;
    var recipe;

    if (!isNaN(id)) {
        recipe = recipes[id];
    }

    if (typeof recipe === 'undefined') {
        res.statusCode = 404;
        return res.send('Error 404: Recipe not found');
    }

    res.json({
        recipe: recipe
    });
});

var server = app.listen('8080');
console.log('Starting server on port %d...', server.address().port);
