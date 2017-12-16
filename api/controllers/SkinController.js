/** 
  * Gladys Project
  * http://gladysproject.com
  * Software under licence Creative Commons 3.0 France 
  * http://creativecommons.org/licenses/by-nc-sa/3.0/fr/
  * You may not use this software for commercial purposes.
  * @author :: Pierre-Gilles Leymarie
  */
  
module.exports = {

    /**
     * Get skins user
     */
    getSkinUser: function(req, res, next) {
        var skin = {
            body: req.session.Skin.body,
            box: req.session.Skin.box, 
            tab: req.session.Skin.tab,
            toogle: req.session.Skin.toogle,
            slider: req.session.Skin.slider
        }
        res.json(skin);
    },

    /**
     * Create a skin
     */
    create: function(req, res, next) {
        req.body.skin = req.session.Skin.id;
        gladys.skin.create(req.body)
            .then(function(skin) {
                return res.json(skin);
            })
            .catch(next);
    },

    /**
     * Update a skin
     */
    update: function(req, res, next) {
        gladys.skin.update(req.body)
            .then(function(skin) {
                return res.json(skin);
            })
            .catch(next);
    },

    /**
     * Delete a skin
     */
    delete: function(req, res, next) {
        gladys.skin.delete({id: req.params.id})
            .then(function(skin) {
                return res.json(skin);
            })
            .catch(next);
    },

    /**
     * Get a skin by id
     */

    getById: function(req, res, next) {
        gladys.skin.getById({id: req.params.id})
          .then((skin) => res.json(skin))
          .catch(next);
    },

    /**
     * Get a skin by skinId
     */

    getBySkinId: function(req, res, next) {
        gladys.skin.getBySkinId(req.params.id)
          .then((skin) => res.json(skin))
          .catch(next);
    },

};