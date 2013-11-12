(function () {
  var hoodie  = new Hoodie()
    , store = hoodie.open("hoodie-plugin-plugins")
    , pluginsList = $("#plugins-list")

  var reactive = hoodie.reactive(pluginsList, $("script", pluginsList).text(), function (store) {
    var defer = hoodie.defer()

    store.findAll("plugin").done(function (plugins) {
      defer.resolve({plugins: plugins})
    })

    return defer.promise()
  }, {store: store})

  store.connect()
})()

