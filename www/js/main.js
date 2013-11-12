(function () {
  var hoodie  = new Hoodie()
    , store = hoodie.open("hoodie-plugin-plugins")
    , pluginsList = $("#plugins-list")
    , searchField = $("#search")

  function filterList () {
    var q = searchField.val().toLowerCase()
      , plugins = $("a", pluginsList)

    if (!q) return plugins.removeClass("hidden")

    plugins.each(function () {
      var plugin = $(this)
      if (plugin.text().toLowerCase().indexOf(q) == -1) {
        plugin.addClass("hidden")
      }
    })
  }

  searchField.keyup(filterList)

  hoodie.reactive(pluginsList, $("script", pluginsList).text(), function (store) {
    var defer = hoodie.defer()

    store.findAll("plugin").done(function (plugins) {
      plugins.forEach(function (p) {
        p.name = p.id.replace("hoodie-plugin-", "")
      })
      defer.then(filterList)
      defer.resolve({plugins: plugins})
    })

    return defer.promise()
  }, {store: store})

  store.connect()

})()

