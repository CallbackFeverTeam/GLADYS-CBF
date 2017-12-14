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
     * Get all Skins
     */
    index: function(req, res, next) {
        req.query.skin = req.session.Skin;
        gladys.skin.get(req.query)
            .then(function(skins) {
                return res.json(skins);
            })
            .catch(next);
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
        req.body.id = req.params.id;
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
        gladys.skin.delete({
                id: req.params.id
            })
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
        gladys.skin.getBySkinId({id: req.params.id})
          .then((skin) => res.json(skin))
          .catch(next);
    },

};